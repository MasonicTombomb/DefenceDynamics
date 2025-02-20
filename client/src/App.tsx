import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layout/Navbar";
import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Region from "@/pages/Region";
import Category from "@/pages/Category";
import Article from "@/pages/Article";
import Timeline from "@/pages/Timeline";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/articles" component={Articles} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/region/:region" component={Region} />
      <Route path="/region/:region/category/:category" component={Category} />
      <Route path="/article/:id" component={Article} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Router />
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;