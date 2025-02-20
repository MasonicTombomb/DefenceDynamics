import { useQuery } from "@tanstack/react-query";
import ArticleList from "@/components/articles/ArticleList";
import { Article } from "@shared/schema";

export default function Home() {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Defense News</h1>
      {articles && <ArticleList articles={articles} />}
    </div>
  );
}
