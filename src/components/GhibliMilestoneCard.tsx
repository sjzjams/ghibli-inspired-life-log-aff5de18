
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Star } from 'lucide-react';

interface MilestoneProps {
  title: string;
  date: string;
  description: string;
  importance: 'normal' | 'major';
}

export const GhibliMilestoneCard: React.FC<MilestoneProps> = ({
  title,
  date,
  description,
  importance = 'normal',
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric', 
    year: 'numeric'
  });
  
  return (
    <Card className={`ghibli-card relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
      importance === 'major' ? 'border-ghibli-orange border-2' : ''
    }`}>
      {importance === 'major' && (
        <div className="absolute top-0 right-0 p-2">
          <Star className="h-5 w-5 text-ghibli-orange fill-ghibli-orange" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl pr-6">{title}</CardTitle>
        <CardDescription>{formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default GhibliMilestoneCard;
