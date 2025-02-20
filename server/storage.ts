import { type Article, type InsertArticle, type TimelineEvent, type InsertTimelineEvent } from "@shared/schema";
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
  getTimelineEvents(): Promise<TimelineEvent[]>;
  getTimelineCategories(): Promise<string[]>;
  createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent>;
}

export class FileStorage implements IStorage {
  private timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      title: "New Electronic Warfare System",
      description: "Development of advanced electronic warfare capabilities announced",
      date: new Date("2024-01-15"),
      category: "Electronic Warfare",
      articleId: 1
    },
    {
      id: 2,
      title: "Nuclear Doctrine Updates",
      description: "Major updates to nuclear strategic policies revealed",
      date: new Date("2024-01-10"),
      category: "Nuclear",
      articleId: 2
    },
    {
      id: 3,
      title: "Air Defense System Upgrade",
      description: "Next-generation air defense system successfully tested",
      date: new Date("2024-01-20"),
      category: "Air Power",
      articleId: 1
    },
    {
      id: 4,
      title: "Hypersonic Missile Test",
      description: "Successful test of new hypersonic missile system completed",
      date: new Date("2024-01-25"),
      category: "Nuclear",
      articleId: 2
    },
    {
      id: 5,
      title: "Cyber Defense Initiative",
      description: "Launch of new cyber defense program for critical infrastructure",
      date: new Date("2024-01-30"),
      category: "Electronic Warfare",
      articleId: 1
    }
  ];
  private nextEventId = 6;

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

    fs.mkdirSync(articlesDir, { recursive: true });

    const slug = article.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const filePath = path.join(articlesDir, `${slug}.md`);

    const fileContent = matter.stringify(article.content, {
      title: article.title,
      summary: article.summary,
      region: article.region,
      category: article.category,
      imageUrl: article.imageUrl,
      publishedAt: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, fileContent);

    const articles = await this.getArticles();
    return articles[articles.length - 1];
  }

  async getTimelineEvents(): Promise<TimelineEvent[]> {
    return this.timelineEvents;
  }

  async getTimelineCategories(): Promise<string[]> {
    const categories = new Set(this.timelineEvents.map(event => event.category));
    return Array.from(categories);
  }

  async createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent> {
    const newEvent: TimelineEvent = {
      ...event,
      id: this.nextEventId++,
    };
    this.timelineEvents.push(newEvent);
    return newEvent;
  }
}

export const storage = new FileStorage();