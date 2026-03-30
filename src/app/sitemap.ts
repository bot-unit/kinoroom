import type { MetadataRoute } from "next";
import { directors, getDirectorPath } from "@/lib/directors";

export const dynamic = "force-static";

const BASE_URL = "https://kinoroom-559d8.web.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const directorEntries: MetadataRoute.Sitemap = directors.map((director) => ({
    url: `${BASE_URL}${getDirectorPath(director)}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/privacy/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...directorEntries,
  ];
}
