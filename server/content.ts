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
  const articles = getAllArticles();
  const categorySet = new Set<string>();

  articles
      .filter(article => article.region.toLowerCase() === region.toLowerCase())
      .forEach(article => {
        if (Array.isArray(article.categories)) {
          article.categories.forEach(category => categorySet.add(category));
        } else if (article.category) {
          categorySet.add(article.category);
        }
      });

  return Array.from(categorySet);
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

        const categories = Array.isArray(data.category) ? data.category : [data.category];
        articles.push({
          id: id++,
          title: data.title,
          content: content,
          summary: data.summary,
          region: data.region,
          category: categories[0],
          categories: categories,
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
  return getAllArticles().filter(article => {
    const regionMatch = article.region.toLowerCase() === region.toLowerCase();
    const categoryMatch = Array.isArray(article.categories)
        ? article.categories.includes(category)
        : article.category === category;
    return regionMatch && categoryMatch;
  });
}