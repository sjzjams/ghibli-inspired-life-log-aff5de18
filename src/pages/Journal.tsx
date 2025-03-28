
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ActivityCard } from '@/components/ActivityCard';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Search } from 'lucide-react';

const Journal = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample journal entries - in a real app this would come from a database
  const initialEntries = [
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
    },
    {
      id: 4,
      title: 'Visited Grandma',
      description: 'Went to visit grandma who baked delicious cookies for us.',
      date: '2023-09-08',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      category: 'Family'
    },
    {
      id: 5,
      title: 'Swimming Lessons',
      description: 'Started taking swimming lessons at the local pool. Made progress with floating!',
      date: '2023-09-10',
      category: 'Sports'
    },
    {
      id: 6,
      title: 'Made a New Friend',
      description: 'Met Emma at the playground and we played on the swings together.',
      date: '2023-09-12',
      category: 'Friends'
    }
  ];

  const [entries, setEntries] = useState(initialEntries);
  const [newEntry, setNewEntry] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEntry = () => {
    if (!newEntry.title || !newEntry.description) {
      toast({
        title: "Missing information",
        description: "Please fill in title and description",
        variant: "destructive"
      });
      return;
    }

    const entry = {
      id: entries.length + 1,
      ...newEntry,
      date: new Date().toISOString().split('T')[0]
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      title: '',
      description: '',
      category: '',
      imageUrl: ''
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Journal entry added",
      description: "Your memory has been saved successfully",
    });
  };

  // Filter entries based on search query
  const filteredEntries = searchQuery
    ? entries.filter(entry => 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : entries;

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="ghibli-title">Journal Entries</h1>
          <p className="text-muted-foreground">
            Document special moments and daily adventures
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search entries..."
              className="pl-9 w-full sm:w-[200px] md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="ghibli-button">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Journal Entry</DialogTitle>
                <DialogDescription>
                  Record today's special moments and memories
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="What happened today?"
                    value={newEntry.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell us more about this memory..."
                    rows={4}
                    value={newEntry.description}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category (optional)</Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="e.g., School, Family, Friends"
                    value={newEntry.category}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL (optional)</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={newEntry.imageUrl}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="ghibli-button" onClick={handleAddEntry}>
                  Save Entry
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No journal entries found</p>
          <Button className="ghibli-button" onClick={() => setIsDialogOpen(true)}>
            Create Your First Entry
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => (
            <ActivityCard
              key={entry.id}
              title={entry.title}
              description={entry.description}
              date={entry.date}
              imageUrl={entry.imageUrl}
              category={entry.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;
