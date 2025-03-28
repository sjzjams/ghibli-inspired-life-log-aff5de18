
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GhibliMilestoneCard } from '@/components/GhibliMilestoneCard';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, PlusCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

interface Milestone {
  id: number;
  title: string;
  date: string;
  description: string;
  importance: 'normal' | 'major';
}

const Milestones = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample milestone data
  const initialMilestones: Milestone[] = [
    {
      id: 1,
      title: 'First Steps',
      date: '2022-06-15',
      description: 'Took first steps on their own today! Walked from the sofa to the coffee table without falling.',
      importance: 'major'
    },
    {
      id: 2,
      title: 'First Word',
      date: '2022-04-10',
      description: 'Said "mama" clearly for the first time while pointing to mommy.',
      importance: 'major'
    },
    {
      id: 3,
      title: 'First Swim Lesson',
      date: '2023-07-22',
      description: 'Started swim classes at the local pool. Was a bit nervous at first but ended up loving it!',
      importance: 'normal'
    },
    {
      id: 4,
      title: 'Learned to Ride a Bike',
      date: '2023-09-05',
      description: 'Finally got the hang of riding without training wheels after practicing all summer.',
      importance: 'major'
    },
    {
      id: 5,
      title: 'First Day of Preschool',
      date: '2023-08-30',
      description: 'Started preschool today. Was a bit shy at first but made two new friends by pickup time.',
      importance: 'normal'
    },
    {
      id: 6,
      title: 'Lost First Tooth',
      date: '2023-09-12',
      description: 'Lost bottom front tooth while eating an apple at lunch. Very excited for the tooth fairy to visit!',
      importance: 'normal'
    }
  ];

  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    importance: 'normal' as 'normal' | 'major',
  });

  // Filter milestones based on search
  const filteredMilestones = milestones.filter(milestone => 
    milestone.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    milestone.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort milestones by date (newest first)
  const sortedMilestones = [...filteredMilestones].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewMilestone(prev => ({ ...prev, [name]: value }));
  };

  const handleImportanceChange = (checked: boolean) => {
    setNewMilestone(prev => ({ 
      ...prev, 
      importance: checked ? 'major' : 'normal' 
    }));
  };

  const handleAddMilestone = () => {
    if (!newMilestone.title || !newMilestone.date || !newMilestone.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const milestone = {
      id: milestones.length + 1,
      ...newMilestone
    };

    setMilestones([milestone, ...milestones]);
    setNewMilestone({
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      importance: 'normal',
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Milestone added",
      description: "Your milestone has been saved successfully",
    });
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="ghibli-title">Growth Milestones</h1>
          <p className="text-muted-foreground">
            Track special achievements and important moments
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search milestones..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="ghibli-button">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Record New Milestone</DialogTitle>
                <DialogDescription>
                  Save important moments and achievements
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Milestone Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., First Steps, Lost a Tooth"
                    value={newMilestone.title}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        className="pl-9"
                        value={newMilestone.date}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell us more about this milestone..."
                    rows={4}
                    value={newMilestone.description}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="importance" 
                    checked={newMilestone.importance === 'major'}
                    onCheckedChange={handleImportanceChange}
                  />
                  <Label htmlFor="importance">Mark as major milestone</Label>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="ghibli-button" onClick={handleAddMilestone}>
                  Save Milestone
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {sortedMilestones.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No milestones found</p>
          <Button className="ghibli-button" onClick={() => setIsDialogOpen(true)}>
            Record Your First Milestone
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedMilestones.map((milestone) => (
            <GhibliMilestoneCard
              key={milestone.id}
              title={milestone.title}
              date={milestone.date}
              description={milestone.description}
              importance={milestone.importance}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Milestones;
