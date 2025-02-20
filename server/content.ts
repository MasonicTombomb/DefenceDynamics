import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { type Article } from "@shared/schema";

const md = new MarkdownIt();
const contentDir = path.join(process.cwd(), "content");

export function getAllArticles(): Article[] {
  const articles: Article[] = [];
  
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
          id: articles.length + 1,
          title: data.title,
          content: md.render(content),
          summary: data.summary,
          region: data.region,
          category: data.category,
          imageUrl: data.imageUrl,
          publishedAt: new Date(data.publishedAt),
        });
      }
    }
  }
  
  processDirectory(contentDir);
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
