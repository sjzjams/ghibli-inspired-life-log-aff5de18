
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Emotion = 'happy' | 'calm' | 'sad' | 'excited' | 'tired';

interface EmotionOption {
  value: Emotion;
  label: string;
  emoji: string;
  color: string;
}

const emotionOptions: EmotionOption[] = [
  { value: 'happy', label: 'Happy', emoji: '😊', color: 'bg-ghibli-yellow' },
  { value: 'calm', label: 'Calm', emoji: '😌', color: 'bg-ghibli-blue' },
  { value: 'sad', label: 'Sad', emoji: '😢', color: 'bg-ghibli-lavender' },
  { value: 'excited', label: 'Excited', emoji: '🤩', color: 'bg-ghibli-orange' },
  { value: 'tired', label: 'Tired', emoji: '😴', color: 'bg-ghibli-cream' },
];

export const EmotionTracker = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    // Here you would typically save this to a database or state management
    console.log(`Emotion selected: ${emotion}`);
  };

  return (
    <Card className="ghibli-card">
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
        <CardDescription>
          Track your daily emotions to see patterns over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center gap-3">
          {emotionOptions.map((emotion) => (
            <Button
              key={emotion.value}
              variant="outline"
              className={`flex flex-col h-auto py-3 px-4 transition-all ${
                selectedEmotion === emotion.value
                  ? `${emotion.color} border-2 border-primary/50 scale-110`
                  : 'hover:scale-105'
              }`}
              onClick={() => handleEmotionSelect(emotion.value)}
            >
              <span className="text-2xl mb-1">{emotion.emoji}</span>
              <span className="text-sm font-medium">{emotion.label}</span>
            </Button>
          ))}
        </div>
        
        {selectedEmotion && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              You're feeling {emotionOptions.find(e => e.value === selectedEmotion)?.label.toLowerCase()} today.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmotionTracker;
