// src/utils/constants.js

export const SITE_NAME = "Knowledge24hr"

// ─── Blogger API ───────────────────────────────────────────
export const BLOGGER_FEED_URL =
  "https://k24hr.blogspot.com/feeds/posts/default?alt=json&cors=true"

export const BLOGGER_LABELS = {
  gk:               "gk",
  funFacts:         "fun-facts",
  scienceFacts:     "science-facts",
  randomFacts:      "random-facts",
  health:           "health",
  motivation:       "motivation",
  selfImprovement:  "self-improvement",
  extremes:         "extremes",
  fullForms:        "full-forms",
  quiz:             "quiz",
}

export const MAX_POSTS = 20   // posts per fetch
// ───────────────────────────────────────────────────────────

export const CATEGORIES = [
  {
    id: "gk",
    title: "General Knowledge",
    description: "Test and expand your world knowledge with quizzes, full forms, and extreme facts.",
    icon: "🧠",
    color: "green",
    route: "/gk",
    tags: ["Full Forms", "MCQ Quiz", "Extremes"],
  },
  {
    id: "facts",
    title: "Facts",
    description: "Discover fun, science, and creepy facts across all categories with detailed writeups.",
    icon: "✨",
    color: "blue",
    route: "/facts",
    tags: ["Fun Facts", "Science", "Creepy"],
  },
  {
    id: "tips",
    title: "Tips",
    description: "Practical tips for health, self-improvement, and everyday life to help you grow.",
    icon: "💡",
    color: "amber",
    route: "/tips",
    tags: ["Health", "Motivation", "Self Growth"],
  },
]

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/YOUR_PAGE",
  facebook:  "https://facebook.com/YOUR_PAGE",
}

export const FOOTER_LINKS = [
  { label: "Privacy Policy", route: "/privacy" },
  { label: "Disclaimer",     route: "/disclaimer" },
  { label: "About",          route: "/about" },
  { label: "Contact",        route: "/contact" },
]
