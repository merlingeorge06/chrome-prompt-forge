
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Zap, Monitor, Link } from "lucide-react";
import ToneSelector from './ToneSelector';
import StructuredInputs from './StructuredInputs';
import { useToast } from "@/hooks/use-toast";

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [complexity, setComplexity] = useState([50]);
  const [creativity, setCreativity] = useState([50]);
  const [activeTab, setActiveTab] = useState("standard");
  
  // Structured inputs state
  const [subject, setSubject] = useState('');
  const [goal, setGoal] = useState('');
  const [audience, setAudience] = useState('');
  const [constraints, setConstraints] = useState({
    wordCount: 150,
    hasForbiddenWords: false,
    forbiddenWords: '',
  });
  
  const { toast } = useToast();

  const handleConstraintsChange = (key: string, value: any) => {
    setConstraints(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleGenerate = () => {
    if (activeTab === "standard" && !prompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a base prompt to enhance",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === "structured" && !subject.trim()) {
      toast({
        title: "Subject Required",
        description: "Please enter what your prompt is about",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      let enhancedPrompt;
      
      if (activeTab === "standard") {
        enhancedPrompt = enhancePrompt(prompt, selectedTone, complexity[0], creativity[0]);
      } else {
        enhancedPrompt = generateStructuredPrompt(subject, goal, selectedTone, audience, constraints);
      }
      
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
    // Enhanced algorithm with more sophisticated prompt engineering
    const toneModifiers = {
      professional: {
        style: "using professional language and industry terminology",
        phrases: [
          "Deliver a comprehensive analysis", 
          "Provide a well-structured outline", 
          "Present an expert perspective on"
        ]
      },
      friendly: {
        style: "using a warm, approachable, and conversational tone",
        phrases: [
          "Let's chat about", 
          "I'd love to help you understand", 
          "Here's a friendly take on"
        ]
      },
      technical: {
        style: "with technical precision and detailed specifications",
        phrases: [
          "Technical specifications include", 
          "The system architecture consists of", 
          "Implementation details require"
        ]
      },
      creative: {
        style: "with imaginative and original phrasing",
        phrases: [
          "Envision a world where", 
          "Picture this scenario:", 
          "Imagine the possibilities of"
        ]
      },
      persuasive: {
        style: "using compelling arguments and persuasive language",
        phrases: [
          "You can't afford to miss", 
          "Consider the significant advantages of", 
          "The undeniable benefits include"
        ]
      },
      formal: {
        style: "with formal language, proper structure, and academic precision",
        phrases: [
          "In accordance with established protocols", 
          "It is hereby noted that", 
          "As evidenced by scholarly research"
        ]
      },
    };
    
    const selectedModifier = toneModifiers[tone as keyof typeof toneModifiers];
    
    // Complexity level affects sentence structure and vocabulary
    const complexityLevels = {
      low: {
        structure: "using simple, direct sentences",
        context: "with just the essential information",
        vocabLevel: "accessible"
      },
      medium: {
        structure: "using a mix of simple and compound sentences",
        context: "with moderate background information and context",
        vocabLevel: "intermediate"
      },
      high: {
        structure: "using varied sentence structures including complex and compound-complex sentences",
        context: "with comprehensive contextual information and nuanced details",
        vocabLevel: "advanced"
      }
    };
    
    const complexityLevel = complexity < 33 ? complexityLevels.low : 
                           complexity < 66 ? complexityLevels.medium : 
                           complexityLevels.high;
    
    // Creativity affects how innovative and unconventional the prompt is
    const creativityLevels = {
      conservative: {
        approach: "using conventional methods and established frameworks",
        perspective: "from a traditional viewpoint"
      },
      balanced: {
        approach: "balancing innovative ideas with proven techniques",
        perspective: "considering both conventional and novel perspectives"
      },
      innovative: {
        approach: "exploring unconventional approaches and novel techniques",
        perspective: "from unique and unexpected angles"
      }
    };
    
    const creativityLevel = creativity < 33 ? creativityLevels.conservative : 
                           creativity < 66 ? creativityLevels.balanced : 
                           creativityLevels.innovative;
    
    // Select a random phrase from the tone's phrases
    const randomPhraseIndex = Math.floor(Math.random() * selectedModifier.phrases.length);
    const tonalPhrase = selectedModifier.phrases[randomPhraseIndex];
    
    // Construct the enhanced prompt with all parameters
    let enhancedPrompt = `${tonalPhrase} ${basePrompt}, ${selectedModifier.style}, ${complexityLevel.structure} ${creativityLevel.approach}. Provide ${complexityLevel.context} ${creativityLevel.perspective}, using ${complexityLevel.vocabLevel} vocabulary.`;
    
    // Clean up any awkward phrasing or double spaces
    enhancedPrompt = enhancedPrompt.replace(/\s+/g, ' ').trim();
    enhancedPrompt = enhancedPrompt.charAt(0).toUpperCase() + enhancedPrompt.slice(1);
    
    return enhancedPrompt;
  };

  const generateStructuredPrompt = (subject: string, goal: string, tone: string, audience: string, constraints: any): string => {
    // Create a more structured prompt based on the components
    
    // Goal phrases based on selected goal
    const goalPhrases: {[key: string]: string} = {
      write: "write a detailed and engaging piece about",
      draw: "create a visual representation of",
      code: "generate code that implements",
      explain: "provide a clear explanation of",
      brainstorm: "generate creative ideas for",
      marketing: "create compelling marketing copy about",
    };
    
    // Audience-specific language
    const audienceAdaptations: {[key: string]: string} = {
      general: "for a broad audience with varied backgrounds",
      professionals: "for professionals in the field, using appropriate industry terminology",
      developers: "for software developers with technical understanding",
      kids: "for children, using simple language and engaging examples",
      students: "for students looking to learn and understand the subject",
      marketers: "for marketing professionals focused on campaign effectiveness",
      creators: "for content creators looking to engage their audience",
    };
    
    // Tone settings (reusing the same tone structure we had before)
    const toneModifiers: {[key: string]: string} = {
      professional: "using professional and authoritative language",
      friendly: "in a friendly, conversational tone",
      technical: "with technical precision and detailed specifications",
      creative: "using creative and imaginative language",
      persuasive: "with persuasive and compelling arguments",
      formal: "in a formal, academic style",
    };
    
    // Construct the prompt components
    const goalPhrase = goal ? goalPhrases[goal] || "create content about" : "create content about";
    const audiencePhrase = audience ? audienceAdaptations[audience] || "for a general audience" : "for a general audience";
    const tonePhrase = toneModifiers[tone] || "using a balanced, neutral tone";
    
    // Add constraints if specified
    let constraintsPhrase = "";
    if (constraints.wordCount) {
      constraintsPhrase += `Keep the response around ${constraints.wordCount} words. `;
    }
    
    if (constraints.hasForbiddenWords && constraints.forbiddenWords) {
      const wordsToAvoid = constraints.forbiddenWords.split(',').map((word: string) => word.trim()).filter(Boolean);
      if (wordsToAvoid.length > 0) {
        constraintsPhrase += `Avoid using these specific words: ${wordsToAvoid.join(', ')}. `;
      }
    }
    
    // Construct the final structured prompt
    let structuredPrompt = `I need you to ${goalPhrase} ${subject}, ${tonePhrase}, ${audiencePhrase}. ${constraintsPhrase}`;
    
    // Enhance with additional context based on audience and goal combination
    if (goal === 'write' && audience === 'professionals') {
      structuredPrompt += "Include relevant industry statistics and actionable insights.";
    } else if (goal === 'explain' && audience === 'kids') {
      structuredPrompt += "Use simple metaphors and engaging examples that children can easily understand.";
    } else if (goal === 'code' && audience === 'developers') {
      structuredPrompt += "Include comments explaining the logic and any potential edge cases.";
    } else if (goal === 'marketing' && (audience === 'marketers' || audience === 'creators')) {
      structuredPrompt += "Focus on unique value propositions and compelling calls to action.";
    }
    
    // Clean up formatting
    structuredPrompt = structuredPrompt.replace(/\s+/g, ' ').trim();
    structuredPrompt = structuredPrompt.charAt(0).toUpperCase() + structuredPrompt.slice(1);
    
    return structuredPrompt;
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
      <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary">
          <TabsTrigger value="standard" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Zap className="w-4 h-4 mr-2" />
            Standard
          </TabsTrigger>
          <TabsTrigger value="structured" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Monitor className="w-4 h-4 mr-2" />
            Structured
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="standard" className="space-y-6">
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
        </TabsContent>
        
        <TabsContent value="structured" className="space-y-6">
          <StructuredInputs 
            subject={subject}
            onSubjectChange={setSubject}
            goal={goal}
            onGoalChange={setGoal}
            audience={audience}
            onAudienceChange={setAudience}
            constraints={constraints}
            onConstraintsChange={handleConstraintsChange}
          />
          
          <ToneSelector
            selectedTone={selectedTone}
            onToneChange={setSelectedTone}
          />
        </TabsContent>
        
        <div className="mt-6">
          <Button 
            onClick={handleGenerate} 
            className="w-full bg-primary hover:bg-primary/90 red-glow hover:animate-pulse-glow"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Enhanced Prompt'}
          </Button>
        </div>
        
        {generatedPrompt && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm text-chrome-light mb-2 font-orbitron">Enhanced Prompt</h3>
            <div className="bg-secondary border border-border rounded-md p-4 min-h-32 overflow-auto max-h-60">
              {generatedPrompt}
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="border-primary text-chrome-light hover:bg-primary hover:text-white"
              >
                <Link className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
            </div>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default PromptGenerator;
