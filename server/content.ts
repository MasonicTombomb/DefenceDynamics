import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { type Article } from "@shared/schema";

const contentDir = path.join(process.cwd(), "content");

export function getAvailableRegions(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs.readdirSync(contentDir).map(region => 
    region.charAt(0).toUpperCase() + region.slice(1)
  );
}

export function getAvailableCategories(region: string): string[] {
  const regionPath = path.join(contentDir, region.toLowerCase());
  if (!fs.existsSync(regionPath)) return [];
  return fs.readdirSync(regionPath).map(category => 
    category.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  );
}

export function getAllArticles(): Article[] {
  const articles: Article[] = [];
  let id = 1;

  function processDirectory(dir: string) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContent);

        articles.push({
          id: id++,
          title: data.title,
          content: content, // Use content directly without markdown processing
          summary: data.summary,
          region: data.region,
          category: data.category,
          imageUrl: data.imageUrl,
          publishedAt: new Date(data.publishedAt),
        });
      }
    }
  }

  if (fs.existsSync(contentDir)) {
    processDirectory(contentDir);
  }
  return articles;
}

export function getArticle(id: number): Article | undefined {
  return getAllArticles().find(article => article.id === id);
}

export function getArticlesByRegion(region: string): Article[] {
  return getAllArticles().filter(
    article => article.region.toLowerCase() === region.toLowerCase()
  );
}

export function getArticlesByRegionAndCategory(region: string, category: string): Article[] {
  return getAllArticles().filter(
    article => 
      article.region.toLowerCase() === region.toLowerCase() &&
      article.category.toLowerCase() === category.toLowerCase()
  );
}