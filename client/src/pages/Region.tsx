import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Article } from "@shared/schema";
import ArticleList from "@/components/articles/ArticleList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/types/article";
import { ChevronRight } from "lucide-react";

export default function Region() {
  const { region = "" } = useParams();

  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>({
    queryKey: [`/api/articles/region/${region}`],
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<string[]>({
    queryKey: [`/api/regions/${region}/categories`],
  });

  const breadcrumbs: Breadcrumb[] = [
    { label: "Home", href: "/" },
    { label: region, href: `/region/${region}` },
  ];

  if (articlesLoading || categoriesLoading) return <div>Loading...</div>;

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        {breadcrumbs.map((crumb, i) => (
          <div key={crumb.href} className="flex items-center">
            {i > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
            <a href={crumb.href} className="hover:text-foreground">
              {crumb.label}
            </a>
          </div>
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-8 capitalize">{region} Defense News</h1>

      <Tabs defaultValue={categories[0]}>
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <ArticleList
              articles={
                  articles?.filter((a) => a.categories?.includes(category) || a.category === category) ?? []
              }
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}