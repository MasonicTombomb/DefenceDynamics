import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Article } from "@shared/schema";
import { Breadcrumb } from "@/types/article";
import { ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function ArticlePage() {
  const { id = "" } = useParams();

  const { data: article, isLoading } = useQuery<Article>({
    queryKey: [`/api/articles/${id}`],
  });

  if (isLoading || !article) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  const breadcrumbs: Breadcrumb[] = [
    { label: "Home", href: "/" },
    { label: article.region, href: `/region/${article.region.toLowerCase()}` },
    { label: Array.isArray(article.categories) ? article.categories[0] : article.category,
      href: `/region/${article.region.toLowerCase()}/category/${(Array.isArray(article.categories) ? article.categories[0] : article.category).toLowerCase()}` },
    { label: "Article", href: `/article/${id}` },
  ];

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        {breadcrumbs.map((crumb, i) => (
          <div key={crumb.href} className="flex items-center">
            {i > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
            <a 
              href={crumb.href} 
              className="hover:text-foreground transition-colors capitalize"
            >
              {crumb.label}
            </a>
          </div>
        ))}
      </div>

      <article className="prose prose-invert mx-auto">
        <div className="flex gap-2 mb-4">
          <Badge>{article.region}</Badge>
          {Array.isArray(article.categories)
              ? article.categories.map((cat) => (
                  <Badge key={cat} variant="outline">{cat}</Badge>
              ))
              : <Badge variant="outline">{article.category}</Badge>
          }
        </div>

        <h1 className="mb-4">{article.title}</h1>

        <div className="aspect-video mb-8">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>

        <div className="text-sm text-muted-foreground mb-8">
          Published on {format(new Date(article.publishedAt), "MMMM d, yyyy")}
        </div>

        <div className="lead mb-8">
          {article.summary}
        </div>

        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </div>
  );
}