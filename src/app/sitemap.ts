import type { MetadataRoute } from "next";

const SITE_URL = "https://morga.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: "2026-11-05",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
