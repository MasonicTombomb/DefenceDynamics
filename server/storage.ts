import { articles, type Article, type InsertArticle } from "@shared/schema";

export interface IStorage {
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
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

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
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
        content: `In a significant development for European electronic warfare capabilities, several NATO member states have announced the deployment of a new advanced electronic warfare system across Eastern Europe. This state-of-the-art system represents a major leap forward in defensive capabilities and strategic deterrence.

The system, developed through multinational cooperation, incorporates cutting-edge signal processing technology and advanced machine learning algorithms to provide enhanced electromagnetic spectrum awareness and protection capabilities.

Key Features:
- Advanced signal detection and analysis capabilities
- Rapid response to emerging electromagnetic threats
- Integration with existing NATO air defense networks
- Mobile deployment capabilities for tactical flexibility

Strategic Implications:
The deployment of this system marks a significant shift in the region's electronic warfare capabilities, providing enhanced protection against various forms of electronic threats and improving overall situational awareness.

Future Developments:
Plans are already in place for further upgrades and expansions of the system, with additional deployments scheduled for the coming years. These developments will continue to strengthen European defense capabilities in the electromagnetic spectrum.`,
        summary: "Latest developments in European EW systems showcase advanced capabilities and strategic implications",
        region: "Europe",
        category: "Electronic Warfare",
        imageUrl: "https://placehold.co/1200x800",
      },
      {
        title: "Russian Nuclear Doctrine Updates",
        content: "Analysis of recent changes in Russian nuclear policy...",
        summary: "Changes in Russian nuclear strategic thinking",
        region: "Russia",
        category: "Nuclear",
        imageUrl: "https://placehold.co/600x400",
      },
    ];

    sampleArticles.forEach((article) => this.createArticle(article));
  }
}

export const storage = new MemStorage();