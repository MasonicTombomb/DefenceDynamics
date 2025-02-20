import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@shared/schema";
import { format } from "date-fns";
import { Link } from "wouter";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.id}`}>
      <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-lg">
        <div className="aspect-video relative">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge>{article.region}</Badge>
            <Badge variant="outline">{article.category}</Badge>
          </div>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {article.summary}
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            {format(new Date(article.publishedAt), "MMM d, yyyy")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}