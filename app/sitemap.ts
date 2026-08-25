import type { MetadataRoute } from "next";
import { cases, insights } from "@/data/site";

const baseUrl = "https://coads-homepage.vercel.app";
const lastModified = new Date("2026-08-25T00:00:00+09:00");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/solutions", "/cases", "/insights", "/contact"];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));

  const casePages: MetadataRoute.Sitemap = cases.map(({ slug }) => ({
    url: `${baseUrl}/cases/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const insightPages: MetadataRoute.Sitemap = insights.map(({ slug }) => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticPages, ...casePages, ...insightPages];
}
