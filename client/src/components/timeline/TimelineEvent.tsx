import { TimelineEvent } from "@shared/schema";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

interface TimelineEventProps {
  event: TimelineEvent;
  index: number;
}

export default function TimelineEventCard({ event, index }: TimelineEventProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-8"
    >
      <Card className="relative hover:shadow-lg transition-shadow">
        <div className="absolute left-0 w-1 h-full bg-primary rounded-l-lg" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <Badge variant="outline">
              {format(new Date(event.date), "MMM d, yyyy")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{event.description}</p>
          {event.articleId && (
            <Link href={`/article/${event.articleId}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-primary hover:underline"
              >
                Read full article →
              </motion.button>
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
