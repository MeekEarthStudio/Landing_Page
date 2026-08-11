import type { MetadataRoute } from "next";

const SITE_URL = "https://meekearthmusic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/services",
    "/blog",
    "/music",
    "/music/grace",
    "/music/carlton",
    "/documentary",
    "/good-samaritan",
  ];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
