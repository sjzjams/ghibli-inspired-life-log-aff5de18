
import React from 'react';
import { Button } from '@/components/ui/button';
import { EmotionTracker } from '@/components/EmotionTracker';
import { ActivityCard } from '@/components/ActivityCard';
import { Link } from 'react-router-dom';

const Index = () => {
  // Sample recent activities - in a real app this would come from a database
  const recentActivities = [
    {
      id: 1,
      title: 'First Day at School',
      description: 'Excited to meet new friends and teachers!',
      date: '2023-09-01',
      imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      category: 'School'
    },
    {
      id: 2,
      title: 'Park Picnic',
      description: 'Had a wonderful day at the park with family, enjoying sandwiches and playing games.',
      date: '2023-09-03',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      category: 'Family'
    },
    {
      id: 3,
      title: 'Drawing Time',
      description: 'Created a colorful drawing of our family and our house.',
      date: '2023-09-05',
      category: 'Art'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary leading-tight">
          Little Life Journal
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Capture the magic of childhood moments in a beautiful Ghibli-inspired journal.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            className="ghibli-button"
            size="lg"
            asChild
          >
            <Link to="/journal">Write Today's Story</Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-ghibli-blue text-primary hover:bg-ghibli-blue/10"
            asChild
          >
            <Link to="/gallery">View Gallery</Link>
          </Button>
        </div>
      </section>

      {/* Emotion tracker */}
      <section className="mb-12">
        <EmotionTracker />
      </section>

      {/* Recent activities */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="ghibli-title">Recent Activities</h2>
          <Button variant="ghost" className="text-primary" asChild>
            <Link to="/journal">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              description={activity.description}
              date={activity.date}
              imageUrl={activity.imageUrl}
              category={activity.category}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
