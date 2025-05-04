
import React from 'react';
import { Button } from "@/components/ui/button";

const tones = [
  { name: 'Professional', value: 'professional' },
  { name: 'Friendly', value: 'friendly' },
  { name: 'Technical', value: 'technical' },
  { name: 'Creative', value: 'creative' },
  { name: 'Persuasive', value: 'persuasive' },
  { name: 'Formal', value: 'formal' },
];

interface ToneSelectorProps {
  selectedTone: string;
  onToneChange: (tone: string) => void;
}

const ToneSelector = ({ selectedTone, onToneChange }: ToneSelectorProps) => {
  return (
    <div className="w-full">
      <h3 className="text-sm text-chrome-light mb-2 font-orbitron">Tone Selection</h3>
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <Button 
            key={tone.value} 
            variant={selectedTone === tone.value ? "default" : "outline"}
            size="sm"
            className={`
              border border-border hover:border-primary transition-colors
              ${selectedTone === tone.value ? 'bg-primary text-white red-glow' : 'bg-secondary text-chrome'}
            `}
            onClick={() => onToneChange(tone.value)}
          >
            {tone.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
