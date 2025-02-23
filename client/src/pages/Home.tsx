import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.png";
import { Link } from "wouter";

export default function Home() {
  return (
      <div className="container py-16">
        <div className="text-center max-w-3xl mx-auto">
          <img
              src={logo}
              alt="Defense News Logo"
              className="h-20 w-20 mx-auto mb-8"
          />
          <h1 className="text-5xl font-bold mb-6">Defense News Platform</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your trusted source for comprehensive coverage of global defense developments,
            from electronic warfare to nuclear policy and air power.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/articles">
              <Button size="lg">Browse Articles</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
  );
}
