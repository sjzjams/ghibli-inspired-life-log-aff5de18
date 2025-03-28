
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, Calendar, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhotoItem {
  id: number;
  url: string;
  title: string;
  date: string;
  category: string;
}

const Gallery = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  
  // Sample photo data - in a real app this would come from a database
  const photos: PhotoItem[] = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      title: 'Playing in the park',
      date: '2023-09-01',
      category: 'Outdoors'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      title: 'Morning hike',
      date: '2023-09-05',
      category: 'Adventure'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      title: 'School project',
      date: '2023-09-08',
      category: 'School'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      title: 'Zoo trip',
      date: '2023-09-12',
      category: 'Outdoors'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      title: 'Birthday party',
      date: '2023-09-15',
      category: 'Celebration'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      title: 'Arts and crafts',
      date: '2023-09-18',
      category: 'Art'
    },
  ];

  // Get unique categories for the filter dropdown
  const categories = ['all', ...new Set(photos.map(photo => photo.category))];

  // Filter photos based on search query and category
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || photo.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="ghibli-title">Photo Gallery</h1>
          <p className="text-muted-foreground">
            A collection of special moments and memories
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search photos..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button className="ghibli-button">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
        </div>
      </section>

      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <Image className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">No photos found</p>
          <p className="text-sm text-muted-foreground/80 mb-4">
            Try adjusting your search or filters
          </p>
          <Button variant="outline" onClick={() => {
            setSearchQuery('');
            setCategoryFilter('all');
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <Dialog key={photo.id}>
              <DialogTrigger asChild>
                <Card className="ghibli-card overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-lg">{photo.title}</h3>
                  </CardContent>
                  <CardFooter className="flex justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(photo.date)}</span>
                    </div>
                    <span>{photo.category}</span>
                  </CardFooter>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[80vw] md:max-w-[700px] p-1">
                <div className="relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-lg">
                    <h2 className="text-xl font-semibold">{photo.title}</h2>
                    <div className="flex justify-between text-sm mt-1">
                      <span>{formatDate(photo.date)}</span>
                      <span>{photo.category}</span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
