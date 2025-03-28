
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface PhotoItem {
  id: number;
  url: string;
  title: string;
  date: string;
  category: string;
}

const API_URL = 'http://localhost:5000/api';

// API functions
const fetchPhotos = async (): Promise<PhotoItem[]> => {
  const response = await fetch(`${API_URL}/gallery`);
  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }
  return response.json();
};

const addPhoto = async (photo: Omit<PhotoItem, 'id'>): Promise<PhotoItem> => {
  const response = await fetch(`${API_URL}/gallery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(photo),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add photo');
  }
  
  return response.json();
};

const Gallery = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    url: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const queryClient = useQueryClient();
  
  // Fetch photos with React Query
  const { data: photos = [], isLoading, error } = useQuery({
    queryKey: ['photos'],
    queryFn: fetchPhotos
  });
  
  // Add photo mutation
  const addPhotoMutation = useMutation({
    mutationFn: addPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
      toast({
        title: "Photo added",
        description: "Your photo has been added to the gallery",
      });
      setIsAddPhotoOpen(false);
      resetPhotoForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add photo",
        variant: "destructive",
      });
    }
  });
  
  // Get unique categories for the filter dropdown
  const categories = ['all', ...new Set(photos.map(photo => photo.category).filter(Boolean))];

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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPhoto(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddPhoto = () => {
    if (!newPhoto.title || !newPhoto.url) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and image URL",
        variant: "destructive"
      });
      return;
    }
    
    addPhotoMutation.mutate(newPhoto);
  };
  
  const resetPhotoForm = () => {
    setNewPhoto({
      title: '',
      url: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Loading gallery...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Error loading gallery</p>
        <Button variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ['photos'] })}>
          Try Again
        </Button>
      </div>
    );
  }

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
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={isAddPhotoOpen} onOpenChange={setIsAddPhotoOpen}>
            <DialogTrigger asChild>
              <Button className="ghibli-button">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <div className="space-y-4 py-4">
                <h2 className="text-xl font-semibold">Add New Photo</h2>
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Photo title"
                    value={newPhoto.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="url" className="text-sm font-medium">Image URL</label>
                  <Input
                    id="url"
                    name="url"
                    placeholder="https://example.com/image.jpg"
                    value={newPhoto.url}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="e.g., Outdoors, Family"
                    value={newPhoto.category}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="date" className="text-sm font-medium">Date</label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newPhoto.date}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddPhotoOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="ghibli-button" 
                    onClick={handleAddPhoto}
                    disabled={addPhotoMutation.isPending}
                  >
                    {addPhotoMutation.isPending ? 'Adding...' : 'Add Photo'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <Image className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">No photos found</p>
          <p className="text-sm text-muted-foreground/80 mb-4">
            {searchQuery || categoryFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Add your first photo to get started'}
          </p>
          {searchQuery || categoryFilter !== 'all' ? (
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
            }}>
              Clear Filters
            </Button>
          ) : (
            <Button className="ghibli-button" onClick={() => setIsAddPhotoOpen(true)}>
              Add Your First Photo
            </Button>
          )}
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
