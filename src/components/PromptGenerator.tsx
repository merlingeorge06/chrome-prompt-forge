import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, CheckCircle } from "lucide-react";
import ToneSelector from './ToneSelector';
import StructuredInputs from './StructuredInputs';
import { useToast } from "@/hooks/use-toast";

const PromptGenerator = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [isCopied, setIsCopied] = useState(false);
  
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
    if (!subject.trim()) {
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
      const enhancedPrompt = enhanceUserInput(
        subject, 
        goal, 
        selectedTone, 
        audience, 
        constraints
      );
      
      setGeneratedPrompt(enhancedPrompt);
      setIsGenerating(false);
      setIsCopied(false);
      
      toast({
        title: "Enhanced Prompt Generated",
        description: "Your refined prompt is ready for AI tools",
        variant: "default",
      });
    }, 1500);
  };

  const enhanceUserInput = (userInput: string, goal: string, tone: string, audience: string, constraints: any): string => {
    let words = userInput.trim().split(/\s+/);
    
    // Apply tone-based word refinements
    words = words.map(word => {
      const lowerWord = word.toLowerCase();
      
      // Tone-based word enhancements
      if (tone === 'professional') {
        const professionalReplacements: { [key: string]: string } = {
          'good': 'excellent',
          'bad': 'suboptimal',
          'big': 'substantial',
          'small': 'concise',
          'nice': 'exceptional',
          'cool': 'innovative',
          'awesome': 'outstanding',
          'great': 'superior',
          'ok': 'acceptable',
          'okay': 'adequate'
        };
        return professionalReplacements[lowerWord] || word;
      }
      
      if (tone === 'creative') {
        const creativeReplacements: { [key: string]: string } = {
          'good': 'magnificent',
          'nice': 'delightful',
          'big': 'enormous',
          'small': 'tiny',
          'make': 'craft',
          'create': 'bring to life',
          'show': 'reveal',
          'tell': 'narrate'
        };
        return creativeReplacements[lowerWord] || word;
      }
      
      if (tone === 'technical') {
        const technicalReplacements: { [key: string]: string } = {
          'make': 'implement',
          'create': 'develop',
          'fix': 'optimize',
          'change': 'modify',
          'improve': 'enhance',
          'check': 'validate',
          'test': 'verify'
        };
        return technicalReplacements[lowerWord] || word;
      }
      
      if (tone === 'persuasive') {
        const persuasiveReplacements: { [key: string]: string } = {
          'good': 'outstanding',
          'help': 'empower',
          'show': 'demonstrate',
          'make': 'deliver',
          'get': 'achieve',
          'nice': 'remarkable'
        };
        return persuasiveReplacements[lowerWord] || word;
      }
      
      return word;
    });
    
    // Apply goal-based enhancements
    if (goal) {
      const goalPrefixes: { [key: string]: string } = {
        'write': 'Compose compelling',
        'draw': 'Illustrate detailed',
        'code': 'Develop robust',
        'explain': 'Elaborate comprehensively on',
        'brainstorm': 'Generate innovative concepts for',
        'marketing': 'Craft persuasive marketing content about',
        'design_landing': 'Design a conversion-focused landing page featuring',
        'analyze_data': 'Conduct thorough analysis of',
        'video_script': 'Script an engaging video about',
        'email_campaign': 'Design an effective email campaign focusing on',
        'product_feature': 'Conceptualize an intuitive product feature for',
        'technical_doc': 'Document comprehensive technical specifications for',
        'social_media': 'Create viral social media content about',
        'business_strategy': 'Formulate strategic business approach for',
        'educational': 'Develop educational curriculum covering',
        'research_summary': 'Synthesize research findings regarding'
      };
      
      const prefix = goalPrefixes[goal];
      if (prefix) {
        words = [prefix, ...words];
      }
    }
    
    // Apply audience-specific refinements
    if (audience && audience !== 'general') {
      const audienceModifiers: { [key: string]: string[] } = {
        'professionals': ['with industry expertise', 'for experienced practitioners'],
        'developers': ['with technical implementation details', 'including code examples'],
        'students': ['with clear explanations', 'including step-by-step guidance'],
        'kids': ['using simple language', 'with fun examples'],
        'marketers': ['focusing on ROI', 'emphasizing conversion potential'],
        'creators': ['highlighting engagement strategies', 'with audience growth tips'],
        'executives': ['with strategic insights', 'focusing on business impact'],
        'researchers': ['with evidence-based approach', 'including methodology'],
        'technical': ['with detailed technical context', 'explaining implementation']
      };
      
      const modifiers = audienceModifiers[audience];
      if (modifiers) {
        words.push(...modifiers[0].split(' '));
      }
    }
    
    // Apply constraints
    let result = words.join(' ');
    
    // Word count constraint - trim or expand as needed
    const currentWordCount = result.split(/\s+/).length;
    if (constraints.wordCount && currentWordCount > constraints.wordCount * 1.2) {
      // If significantly over, trim while keeping core meaning
      const wordsArray = result.split(/\s+/);
      result = wordsArray.slice(0, Math.floor(constraints.wordCount * 1.1)).join(' ');
    } else if (constraints.wordCount && currentWordCount < constraints.wordCount * 0.8) {
      // If significantly under, add descriptive words
      const enhancementWords = {
        'professional': ['comprehensive', 'detailed', 'thorough'],
        'creative': ['imaginative', 'artistic', 'inspired'],
        'technical': ['precise', 'systematic', 'methodical'],
        'friendly': ['approachable', 'engaging', 'welcoming'],
        'persuasive': ['compelling', 'convincing', 'impactful'],
        'formal': ['structured', 'authoritative', 'rigorous']
      };
      
      const additionalWords = enhancementWords[tone as keyof typeof enhancementWords] || ['detailed', 'comprehensive'];
      result = result + ' ' + additionalWords.join(' ');
    }
    
    // Remove forbidden words
    if (constraints.hasForbiddenWords && constraints.forbiddenWords) {
      const forbiddenWords = constraints.forbiddenWords.split(',').map((w: string) => w.trim().toLowerCase()).filter(Boolean);
      forbiddenWords.forEach(forbiddenWord => {
        const regex = new RegExp(`\\b${forbiddenWord}\\b`, 'gi');
        result = result.replace(regex, '');
      });
      // Clean up extra spaces
      result = result.replace(/\s+/g, ' ').trim();
    }
    
    // Final cleanup and polish
    result = result.replace(/\s+/g, ' ').trim();
    
    // Ensure proper capitalization
    if (result) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    
    return result;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Your enhanced prompt is ready to use with ChatGPT, Midjourney, or any AI tool",
    });
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-lg p-6">
      <div className="space-y-6">
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
        
        <div className="mt-6">
          <Button 
            onClick={handleGenerate} 
            className="w-full bg-primary hover:bg-primary/90 red-glow hover:animate-pulse-glow"
            disabled={isGenerating}
          >
            {isGenerating ? 'Enhancing Your Prompt...' : (
              <>
                <Sparkles className="w-4 h-4 mr-2" /> Enhance My Prompt
              </>
            )}
          </Button>
        </div>
        
        {generatedPrompt && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm text-chrome-light mb-2 font-orbitron">Enhanced AI Prompt</h3>
            <div className="bg-secondary border border-border rounded-md p-4 min-h-32 overflow-auto max-h-96">
              {generatedPrompt}
            </div>
            
            <div className="flex justify-end">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="border-primary text-chrome-light hover:bg-primary hover:text-white"
              >
                {isCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Enhanced Prompt
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptGenerator;
