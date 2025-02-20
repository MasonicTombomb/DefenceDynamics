import Timeline from "@/components/timeline/Timeline";

export default function TimelinePage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Defense Events Timeline</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Explore key events in global defense developments. Click on events to read 
        detailed articles and understand the context behind each development.
      </p>
      <Timeline />
    </div>
  );
}
