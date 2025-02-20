import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertArticleSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
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

  return createServer(app);
}