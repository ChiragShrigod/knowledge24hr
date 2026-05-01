// src/services/bloggerApi.js

import { BLOGGER_FEED_URL, MAX_POSTS } from "../utils/constants"

// ── helpers ────────────────────────────────────────────────

/**
 * Extracts a clean thumbnail URL from a Blogger post entry.
 * Tries media thumbnail first, then finds first <img> in content.
 */
function extractThumbnail(entry) {
  // 1. media:thumbnail (Blogger sets this if post has an image)
  if (entry["media$thumbnail"]) {
    return entry["media$thumbnail"].url.replace(/\/s[0-9]+\//, "/s600/")
  }

  // 2. parse first <img> from post content
  const content =
    entry["content"]?.["$t"] || entry["summary"]?.["$t"] || ""
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : null
}

/**
 * Strips all HTML tags and returns plain text (for excerpt).
 */
function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim()
}

/**
 * Normalises a raw Blogger entry into a clean post object.
 */
function parsePost(entry) {
  const id = entry["id"]["$t"].split(".post-").pop()  // numeric post id

  const title = entry["title"]?.["$t"] || "Untitled"

  const published = entry["published"]?.["$t"] || ""

  const labels = (entry["category"] || []).map((c) => c.term)

  const rawContent =
    entry["content"]?.["$t"] || entry["summary"]?.["$t"] || ""
  const excerpt = stripHtml(rawContent).slice(0, 160)

  const thumbnail = extractThumbnail(entry)

  // self link → used to build our internal route
  const link =
    (entry["link"] || []).find((l) => l.rel === "alternate")?.href || ""

  // slug = last path segment of Blogger URL
  const slug = link.split("/").pop().replace(".html", "") || id

  return { id, slug, title, published, labels, excerpt, rawContent, thumbnail, link }
}

// ── public API ─────────────────────────────────────────────

/**
 * Fetches all recent posts (up to MAX_POSTS).
 */
export async function fetchAllPosts() {
  const url = `${BLOGGER_FEED_URL}&max-results=${MAX_POSTS}&orderby=published`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Blogger API error: ${res.status}`)
  const data = await res.json()
  const entries = data.feed.entry || []
  return entries.map(parsePost)
}

/**
 * Fetches posts filtered by a single Blogger label.
 * @param {string} label  e.g. "fun-facts"
 */
export async function fetchPostsByLabel(label) {
  const url = `${BLOGGER_FEED_URL}&max-results=${MAX_POSTS}&orderby=published&q=label:${encodeURIComponent(label)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Blogger API error: ${res.status}`)
  const data = await res.json()
  const entries = data.feed.entry || []
  return entries.map(parsePost)
}

/**
 * Fetches a single post by its slug.
 * Strategy: fetch all posts, find by slug (small blog = fine).
 * @param {string} slug
 */
export async function fetchPostBySlug(slug) {
  const posts = await fetchAllPosts()
  return posts.find((p) => p.slug === slug) || null
}