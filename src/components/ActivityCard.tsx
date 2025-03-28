
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export interface ActivityProps {
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  category?: string;
}

export const ActivityCard: React.FC<ActivityProps> = ({
  title,
  description,
  date,
  imageUrl,
  category = 'Activity',
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card className="ghibli-card overflow-hidden h-full flex flex-col">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {category && (
            <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-primary text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>
      )}
      <CardHeader className={imageUrl ? 'pt-4' : ''}>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formattedDate}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="text-xs text-muted-foreground/80">Category: {category}</div>
      </CardFooter>
    </Card>
  );
};

export default ActivityCard;
