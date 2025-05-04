
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Zap, Monitor, Link } from "lucide-react";
import ToneSelector from './ToneSelector';
import { useToast } from "@/hooks/use-toast";

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [complexity, setComplexity] = useState([50]);
  const [creativity, setCreativity] = useState([50]);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a base prompt to enhance",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const enhancedPrompt = enhancePrompt(prompt, selectedTone, complexity[0], creativity[0]);
      setGeneratedPrompt(enhancedPrompt);
      setIsGenerating(false);
      
      toast({
        title: "Prompt Generated",
        description: "Your enhanced prompt is ready",
        variant: "default",
      });
    }, 1500);
  };

  const enhancePrompt = (basePrompt: string, tone: string, complexity: number, creativity: number): string => {
    // In a real app, this would call an API
    // This is just a simulation
    const toneModifiers = {
      professional: "using professional language and industry terminology",
      friendly: "using a warm, approachable, and conversational tone",
      technical: "with technical precision and detailed specifications",
      creative: "with imaginative and original phrasing",
      persuasive: "using compelling arguments and persuasive language",
      formal: "with formal language, proper structure, and academic precision",
    };
    
    const selectedModifier = toneModifiers[tone as keyof typeof toneModifiers];
    const complexityStr = complexity < 33 ? "simple" : complexity < 66 ? "moderately complex" : "sophisticated";
    const creativityStr = creativity < 33 ? "straightforward" : creativity < 66 ? "somewhat creative" : "highly creative";
    
    return `${basePrompt} ${selectedModifier}, with ${complexityStr} structure and ${creativityStr} elements.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied to clipboard",
      description: "The generated prompt has been copied to your clipboard",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-lg p-6">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary">
          <TabsTrigger value="generate" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Zap className="w-4 h-4 mr-2" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Monitor className="w-4 h-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-6">
          <div>
            <h3 className="text-sm text-chrome-light mb-2 font-orbitron">Base Prompt</h3>
            <Textarea 
              placeholder="Enter your base prompt here to enhance..." 
              className="bg-secondary border-border focus:border-primary h-32"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <ToneSelector
            selectedTone={selectedTone}
            onToneChange={setSelectedTone}
          />
          
          <div>
            <h3 className="text-sm text-chrome-light mb-2 font-orbitron">Complexity</h3>
            <Slider 
              value={complexity} 
              onValueChange={setComplexity} 
              max={100} 
              step={1} 
              className="my-6"
            />
          </div>
          
          <div>
            <h3 className="text-sm text-chrome-light mb-2 font-orbitron">Creativity</h3>
            <Slider 
              value={creativity} 
              onValueChange={setCreativity} 
              max={100} 
              step={1}
              className="my-6"
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            className="w-full bg-primary hover:bg-primary/90 red-glow hover:animate-pulse-glow"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Enhanced Prompt'}
          </Button>
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-chrome-light mb-2 font-orbitron">Enhanced Prompt</h3>
              <div className="bg-secondary border border-border rounded-md p-4 min-h-32">
                {generatedPrompt ? generatedPrompt : "Your enhanced prompt will appear here..."}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="border-primary text-chrome-light hover:bg-primary hover:text-white"
                disabled={!generatedPrompt}
              >
                <Link className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptGenerator;
