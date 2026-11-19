import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * Explicit list of major AI search crawlers, LLM agents, and retrieval bots.
 * Explicitly defining these alongside the wildcard (*) guarantees that AI agents
 * from OpenAI, Google Gemini, Anthropic Claude, Perplexity, and others can crawl
 * and index public pages while respecting sensitive route restrictions.
 */
const AI_AGENTS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Google / Gemini
  "Google-Extended",
  "GoogleOther",
  "GoogleOther-Image",
  "GoogleOther-Video",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity AI
  "PerplexityBot",
  // Apple Intelligence
  "Applebot-Extended",
  // Amazon
  "Amazonbot",
  // Meta AI
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "FacebookBot",
  // ByteDance
  "Bytespider",
  // Cohere
  "cohere-ai",
  // Mistral AI
  "MistralBot",
  // Open Foundation & Search AI
  "CCBot",
  "Diffbot",
  "DuckAssistBot",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_INDEXABLE === "false") {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      sitemap: absoluteUrl("/sitemap.xml"),
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      ...AI_AGENTS.map((agent) => ({
        userAgent: agent,
        allow: "/",
        disallow: ["/admin", "/api/"],
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
