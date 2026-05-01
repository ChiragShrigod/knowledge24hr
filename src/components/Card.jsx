// src/components/Card.jsx

import React from "react"
import { useNavigate } from "react-router-dom"

const FALLBACK_IMAGE = "https://placehold.co/600x300?text=Knowledge24hr"

const LABEL_COLORS = {
  "gk":               "bg-green-100 text-green-700",
  "fun-facts":        "bg-blue-100 text-blue-700",
  "science-facts":    "bg-purple-100 text-purple-700",
  "random-facts":     "bg-yellow-100 text-yellow-700",
  "health":           "bg-rose-100 text-rose-700",
  "motivation":       "bg-orange-100 text-orange-700",
  "self-improvement": "bg-teal-100 text-teal-700",
  "extremes":         "bg-red-100 text-red-700",
  "full-forms":       "bg-indigo-100 text-indigo-700",
  "quiz":             "bg-pink-100 text-pink-700",
}

export default function Card({ post }) {
  const navigate = useNavigate()

  // ── guard: nothing to render ──────────────────────────────
  if (!post) return null

  const { slug, title, excerpt, thumbnail, labels = [], published } = post

  const dateLabel = published
    ? new Date(published).toLocaleDateString("en-IN", {
        day:   "numeric",
        month: "short",
        year:  "numeric",
      })
    : ""

  function handleClick() {
    navigate(`/post/${slug}`)
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* ── Thumbnail ── */}
      <div className="w-full h-44 overflow-hidden bg-gray-100">
        <img
          src={thumbnail || FALLBACK_IMAGE}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = FALLBACK_IMAGE }}
        />
      </div>

      {/* ── Body ── */}
      <div className="p-4 flex flex-col gap-2 flex-1">

        {/* Labels */}
        {labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {labels.map((label) => (
              <span
                key={label}
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  LABEL_COLORS[label] || "bg-gray-100 text-gray-600"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-gray-500 text-sm line-clamp-3 flex-1">
            {excerpt}
          </p>
        )}

        {/* Date + Read More */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">{dateLabel}</span>
          <span className="text-xs font-semibold text-blue-600 hover:underline">
            Read more →
          </span>
        </div>

      </div>
    </div>
  )
}