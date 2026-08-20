import type { MetadataRoute } from "next";
import { cases, insights } from "@/data/site";

const baseUrl = "https://coads-homepage.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/solutions", "/cases", "/insights", "/contact"];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));

  const casePages: MetadataRoute.Sitemap = cases.map(({ slug }) => ({
    url: `${baseUrl}/cases/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  const insightPages: MetadataRoute.Sitemap = insights.map(({ slug }) => ({
    url: `${baseUrl}/insights/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7
  }));

  return [...staticPages, ...casePages, ...insightPages];
}
