// src/services/bloggerApi.js

import { BLOGGER_FEED_URL } from "../utils/constants"

const PAGE_SIZE = 50

function extractThumbnail(entry) {
  if (entry["media$thumbnail"]) {
    return entry["media$thumbnail"].url.replace(/\/s[0-9]+\//, "/s600/")
  }
  const content = entry["content"]?.["$t"] || entry["summary"]?.["$t"] || ""
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : null
}

function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").trim()
}

function parsePost(entry) {
  const id = entry["id"]["$t"].split(".post-").pop()
  const title = entry["title"]?.["$t"] || "Untitled"
  const published = entry["published"]?.["$t"] || ""
  const labels = (entry["category"] || []).map((c) => c.term)
  const rawContent = entry["content"]?.["$t"] || entry["summary"]?.["$t"] || ""
  const excerpt = stripHtml(rawContent).slice(0, 160)
  const thumbnail = extractThumbnail(entry)
  const link = (entry["link"] || []).find((l) => l.rel === "alternate")?.href || ""
  const slug = link.split("/").pop().replace(".html", "") || id
  return { id, slug, title, published, labels, excerpt, rawContent, thumbnail, link }
}

function proxyUrl(bloggerUrl) {
  if (import.meta.env.DEV) {
    // localhost — use corsproxy.io
    return `https://corsproxy.io/?${encodeURIComponent(bloggerUrl)}`
  }
  // production — use allorigins
  return `https://api.allorigins.win/get?url=${encodeURIComponent(bloggerUrl)}`
}

async function fetchJson(bloggerUrl) {
  const url = proxyUrl(bloggerUrl)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Blogger API error: ${res.status}`)
  if (import.meta.env.DEV) {
    return await res.json()
  } else {
    // allorigins wraps the response: { contents: "json string..." }
    const wrapper = await res.json()
    return JSON.parse(wrapper.contents)
  }
}

async function fetchAllPages(baseUrl) {
  let allEntries = []
  let startIndex = 1

  while (true) {
    const bloggerUrl = `${baseUrl}&max-results=${PAGE_SIZE}&start-index=${startIndex}`
    const data = await fetchJson(bloggerUrl)
    const entries = data.feed.entry || []
    allEntries = [...allEntries, ...entries]
    if (entries.length < PAGE_SIZE) break
    startIndex += PAGE_SIZE
  }

  return allEntries
}

export async function fetchAllPosts() {
  const entries = await fetchAllPages(BLOGGER_FEED_URL)
  return entries.map(parsePost)
}

export async function fetchPostsByLabel(label) {
  const base = `https://k24hr.blogspot.com/feeds/posts/default/-/${encodeURIComponent(label)}?alt=json`
  const entries = await fetchAllPages(base)
  return entries.map(parsePost)
}

export async function fetchPostBySlug(slug) {
  const posts = await fetchAllPosts()
  return posts.find((p) => p.slug === slug) || null
}