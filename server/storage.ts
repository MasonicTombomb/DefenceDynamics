import { articles, type Article, type InsertArticle } from "@shared/schema";

export interface IStorage {
  getArticles(): Promise<Article[]>;
  getArticlesByRegion(region: string): Promise<Article[]>;
  getArticlesByRegionAndCategory(region: string, category: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
}

export class MemStorage implements IStorage {
  private articles: Map<number, Article>;
  private currentId: number;

  constructor() {
    this.articles = new Map();
    this.currentId = 1;
    this.seedData();
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticlesByRegion(region: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      (article) => article.region.toLowerCase() === region.toLowerCase()
    );
  }

  async getArticlesByRegionAndCategory(region: string, category: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(
      (article) => 
        article.region.toLowerCase() === region.toLowerCase() &&
        article.category.toLowerCase() === category.toLowerCase()
    );
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const id = this.currentId++;
    const article: Article = {
      ...insertArticle,
      id,
      publishedAt: new Date(),
    };
    this.articles.set(id, article);
    return article;
  }

  private seedData() {
    const sampleArticles: InsertArticle[] = [
      {
        title: "New EW System Deployment in Eastern Europe",
        content: "Detailed analysis of new electronic warfare capabilities...",
        summary: "Latest developments in European EW systems",
        region: "Europe",
        category: "Electronic Warfare",
        imageUrl: "https://placehold.co/600x400",
      },
      {
        title: "Russian Nuclear Doctrine Updates",
        content: "Analysis of recent changes in Russian nuclear policy...",
        summary: "Changes in Russian nuclear strategic thinking",
        region: "Russia",
        category: "Nuclear",
        imageUrl: "https://placehold.co/600x400",
      },
      // Add more sample articles as needed
    ];

    sampleArticles.forEach((article) => this.createArticle(article));
  }
}

export const storage = new MemStorage();
