import { type Article, type InsertArticle } from "@shared/schema";
import { getAllArticles, getArticle, getArticlesByRegion, getArticlesByRegionAndCategory } from "./content";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface IStorage {
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  getArticlesByRegion(region: string): Promise<Article[]>;
  getArticlesByRegionAndCategory(region: string, category: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
}

export class FileStorage implements IStorage {
  async getArticles(): Promise<Article[]> {
    return getAllArticles();
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return getArticle(id);
  }

  async getArticlesByRegion(region: string): Promise<Article[]> {
    return getArticlesByRegion(region);
  }

  async getArticlesByRegionAndCategory(region: string, category: string): Promise<Article[]> {
    return getArticlesByRegionAndCategory(region, category);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const articlesDir = path.join(
      process.cwd(),
      "content",
      article.region.toLowerCase(),
      article.category.toLowerCase()
    );

    // Ensure directory exists
    fs.mkdirSync(articlesDir, { recursive: true });

    // Create a slug from the title
    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const filePath = path.join(articlesDir, `${slug}.md`);

    // Create frontmatter
    const fileContent = matter.stringify(article.content, {
      title: article.title,
      summary: article.summary,
      region: article.region,
      category: article.category,
      imageUrl: article.imageUrl,
      publishedAt: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, fileContent);

    // Return the newly created article
    const articles = await this.getArticles();
    return articles[articles.length - 1];
  }
}

export const storage = new FileStorage();