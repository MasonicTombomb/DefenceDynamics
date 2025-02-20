import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertArticleSchema, insertTimelineEventSchema } from "@shared/schema";
import { getAvailableRegions, getAvailableCategories } from "./content";

export async function registerRoutes(app: Express) {
  app.get("/api/regions", (_req, res) => {
    const regions = getAvailableRegions();
    res.json(regions);
  });

  app.get("/api/regions/:region/categories", (req, res) => {
    const categories = getAvailableCategories(req.params.region);
    res.json(categories);
  });

  app.get("/api/articles", async (_req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });

  app.get("/api/articles/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid article ID" });
    }
    const article = await storage.getArticle(id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  });

  app.get("/api/articles/region/:region", async (req, res) => {
    const articles = await storage.getArticlesByRegion(req.params.region);
    res.json(articles);
  });

  app.get("/api/articles/region/:region/category/:category", async (req, res) => {
    const articles = await storage.getArticlesByRegionAndCategory(
      req.params.region,
      req.params.category
    );
    res.json(articles);
  });

  app.post("/api/articles", async (req, res) => {
    const parsed = insertArticleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }
    const article = await storage.createArticle(parsed.data);
    res.status(201).json(article);
  });

  app.get("/api/timeline-events", async (_req, res) => {
    const events = await storage.getTimelineEvents();
    res.json(events);
  });

  app.get("/api/timeline-categories", async (_req, res) => {
    const categories = await storage.getTimelineCategories();
    res.json(categories);
  });

  app.post("/api/timeline-events", async (req, res) => {
    const parsed = insertTimelineEventSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }
    const event = await storage.createTimelineEvent(parsed.data);
    res.status(201).json(event);
  });

  return createServer(app);
}