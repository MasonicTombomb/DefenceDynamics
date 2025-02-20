import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Article } from "@shared/schema";
import ArticleList from "@/components/articles/ArticleList";
import { Breadcrumb } from "@/types/article";
import { ChevronRight } from "lucide-react";

export default function Category() {
  const { region = "", category = "" } = useParams();
  
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: [`/api/articles/region/${region}/category/${category}`],
  });

  const breadcrumbs: Breadcrumb[] = [
    { label: "Home", href: "/" },
    { label: region, href: `/region/${region}` },
    { label: category, href: `/region/${region}/category/${category}` },
  ];

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

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

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 capitalize">
          {category}
        </h1>
        <p className="text-muted-foreground capitalize">
          {region} Region
        </p>
      </div>

      {articles && articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No articles found for this category.
        </div>
      )}
    </div>
  );
}
