// src/hooks/useBloggerPosts.js

import { useState, useEffect } from "react"
import { fetchAllPosts, fetchPostsByLabel } from "../services/bloggerApi"

/**
 * Universal hook for fetching Blogger posts.
 *
 * Usage:
 *   useBloggerPosts()          → all recent posts (Home)
 *   useBloggerPosts("gk")      → posts with label "gk"
 *   useBloggerPosts("fun-facts") → posts with label "fun-facts"
 */
export function useBloggerPosts(label = null) {
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    let cancelled = false   // prevent state update if component unmounts

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const data = label
          ? await fetchPostsByLabel(label)
          : await fetchAllPosts()

        if (!cancelled) setPosts(data)
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load posts.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => { cancelled = true }   // cleanup on unmount
  }, [label])   // re-fetch if label changes

  return { posts, loading, error }
}