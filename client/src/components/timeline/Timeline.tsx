import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TimelineEvent } from "@shared/schema";
import TimelineEventCard from "./TimelineEvent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Timeline() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: events = [], isLoading } = useQuery<TimelineEvent[]>({
    queryKey: ["/api/timeline-events"],
  });

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ["/api/timeline-categories"],
  });

  const filteredEvents = selectedCategory === "all"
    ? events
    : events.filter(event => event.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading timeline...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
        {filteredEvents.map((event, index) => (
          <TimelineEventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
}
