// src/services/bloggerApi.js

const PAGE_SIZE = 50
const BLOG_URL = "https://k24hr.blogspot.com"

function extractThumbnail(entry) {
  if (entry["media$thumbnail"]) {
    return entry["media$thumbnail"].url.replace(/\/s[0-9]+\//, "/s600/")
  }
  const content = entry["content"]?.["$t"] || entry["summary"]?.["$t"] || ""
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : null
}

function stripHtml(html = "") {
  // First remove all HTML tags
  const withoutTags = html.replace(/<[^>]*>/g, " ")
  // Then decode HTML entities like &nbsp; &amp; &lt; etc
  const decoded = withoutTags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
  // Clean up extra spaces
  return decoded.replace(/\s+/g, " ").trim()
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

// JSONP — works on localhost AND production, zero CORS issues
function fetchJsonp(bloggerUrl) {
  return new Promise((resolve, reject) => {
    const callbackName = "bloggerCb_" + Math.random().toString(36).slice(2)
    const url = `${bloggerUrl}&alt=json-in-script&callback=${callbackName}`

    const script = document.createElement("script")
    script.src = url

    const timer = setTimeout(() => {
      cleanup()
      reject(new Error("Blogger request timed out"))
    }, 10000)

    window[callbackName] = (data) => {
      cleanup()
      resolve(data)
    }

    function cleanup() {
      clearTimeout(timer)
      delete window[callbackName]
      if (script.parentNode) script.parentNode.removeChild(script)
    }

    script.onerror = () => {
      cleanup()
      reject(new Error("Failed to fetch from Blogger"))
    }

    document.head.appendChild(script)
  })
}

async function fetchAllPages(baseUrl) {
  let allEntries = []
  let startIndex = 1

  while (true) {
    const bloggerUrl = `${baseUrl}&max-results=${PAGE_SIZE}&start-index=${startIndex}`
    const data = await fetchJsonp(bloggerUrl)
    const entries = data.feed.entry || []
    allEntries = [...allEntries, ...entries]
    if (entries.length < PAGE_SIZE) break
    startIndex += PAGE_SIZE
  }

  return allEntries
}

export async function fetchAllPosts() {
  const base = `${BLOG_URL}/feeds/posts/default?`
  const entries = await fetchAllPages(base)
  return entries.map(parsePost)
}

export async function fetchPostsByLabel(label) {
  const base = `${BLOG_URL}/feeds/posts/default/-/${encodeURIComponent(label)}?`
  const entries = await fetchAllPages(base)
  return entries.map(parsePost)
}

export async function fetchPostBySlug(slug) {
  const posts = await fetchAllPosts()
  return posts.find((p) => p.slug === slug) || null
}