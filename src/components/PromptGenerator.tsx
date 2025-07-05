
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
    // Extract the core concept from user input
    const coreIdea = userInput.trim();
    
    // Build enhanced sentence based on goal
    let enhancedSentence = '';
    
    switch (goal) {
      case 'write':
        enhancedSentence = `Create compelling written content that explores ${coreIdea}`;
        break;
      case 'draw':
        enhancedSentence = `Generate a detailed visual illustration depicting ${coreIdea}`;
        break;
      case 'code':
        enhancedSentence = `Develop robust and efficient code that implements ${coreIdea}`;
        break;
      case 'explain':
        enhancedSentence = `Provide a comprehensive explanation of ${coreIdea}`;
        break;
      case 'brainstorm':
        enhancedSentence = `Generate innovative and creative ideas related to ${coreIdea}`;
        break;
      case 'marketing':
        enhancedSentence = `Craft persuasive marketing content that highlights ${coreIdea}`;
        break;
      case 'design_landing':
        enhancedSentence = `Design a conversion-focused landing page centered around ${coreIdea}`;
        break;
      case 'analyze_data':
        enhancedSentence = `Conduct thorough data analysis to uncover insights about ${coreIdea}`;
        break;
      case 'video_script':
        enhancedSentence = `Write an engaging video script that presents ${coreIdea}`;
        break;
      case 'email_campaign':
        enhancedSentence = `Design an effective email campaign strategy focusing on ${coreIdea}`;
        break;
      case 'product_feature':
        enhancedSentence = `Conceptualize an intuitive product feature that addresses ${coreIdea}`;
        break;
      case 'technical_doc':
        enhancedSentence = `Create comprehensive technical documentation covering ${coreIdea}`;
        break;
      case 'social_media':
        enhancedSentence = `Develop viral social media content that showcases ${coreIdea}`;
        break;
      case 'business_strategy':
        enhancedSentence = `Formulate a strategic business approach to capitalize on ${coreIdea}`;
        break;
      case 'educational':
        enhancedSentence = `Develop educational curriculum that teaches ${coreIdea}`;
        break;
      case 'research_summary':
        enhancedSentence = `Synthesize research findings and present key insights about ${coreIdea}`;
        break;
      default:
        enhancedSentence = `Create high-quality content that effectively addresses ${coreIdea}`;
    }
    
    // Apply tone-based enhancements to the sentence structure
    switch (tone) {
      case 'professional':
        enhancedSentence = enhancedSentence.replace('Create', 'Deliver professional-grade');
        enhancedSentence = enhancedSentence.replace('Generate', 'Produce sophisticated');
        enhancedSentence = enhancedSentence.replace('Develop', 'Engineer comprehensive');
        break;
      case 'creative':
        enhancedSentence = enhancedSentence.replace('Create', 'Craft imaginative');
        enhancedSentence = enhancedSentence.replace('Generate', 'Bring to life artistic');
        enhancedSentence = enhancedSentence.replace('Develop', 'Innovate creative solutions for');
        break;
      case 'technical':
        enhancedSentence = enhancedSentence.replace('Create', 'Implement systematic');
        enhancedSentence = enhancedSentence.replace('Generate', 'Engineer precise');
        enhancedSentence = enhancedSentence.replace('Develop', 'Architect technical solutions for');
        break;
      case 'friendly':
        enhancedSentence = enhancedSentence.replace('Create', 'Build approachable');
        enhancedSentence = enhancedSentence.replace('Generate', 'Develop engaging');
        enhancedSentence = enhancedSentence.replace('Develop', 'Create welcoming solutions for');
        break;
      case 'persuasive':
        enhancedSentence = enhancedSentence.replace('Create', 'Craft compelling');
        enhancedSentence = enhancedSentence.replace('Generate', 'Produce convincing');
        enhancedSentence = enhancedSentence.replace('Develop', 'Build impactful solutions for');
        break;
      case 'formal':
        enhancedSentence = enhancedSentence.replace('Create', 'Establish authoritative');
        enhancedSentence = enhancedSentence.replace('Generate', 'Produce structured');
        enhancedSentence = enhancedSentence.replace('Develop', 'Construct rigorous solutions for');
        break;
    }
    
    // Add audience-specific context
    if (audience && audience !== 'general') {
      const audienceEnhancements = {
        'professionals': ', ensuring industry-standard quality and expertise',
        'developers': ', with clear technical implementation and code examples',
        'students': ', using accessible language and step-by-step guidance',
        'kids': ', with fun, simple explanations and engaging examples',
        'marketers': ', emphasizing ROI and conversion optimization strategies',
        'creators': ', focusing on audience engagement and growth techniques',
        'executives': ', highlighting strategic business impact and key metrics',
        'researchers': ', incorporating evidence-based methodology and analysis',
        'technical': ', providing detailed technical specifications and context'
      };
      
      enhancedSentence += audienceEnhancements[audience as keyof typeof audienceEnhancements] || '';
    }
    
    // Apply word count constraint by adjusting sentence complexity
    const currentWordCount = enhancedSentence.split(/\s+/).length;
    
    if (constraints.wordCount && currentWordCount < constraints.wordCount * 0.7) {
      // Expand the sentence with additional descriptive elements
      const expansions = {
        'professional': ', incorporating best practices and industry standards',
        'creative': ', with innovative approaches and artistic flair',
        'technical': ', following systematic methodology and precise specifications',
        'friendly': ', maintaining an approachable and conversational style',
        'persuasive': ', using compelling arguments and strong call-to-action elements',
        'formal': ', adhering to established protocols and authoritative standards'
      };
      
      enhancedSentence += expansions[tone as keyof typeof expansions] || ', with attention to detail and quality';
    } else if (constraints.wordCount && currentWordCount > constraints.wordCount * 1.2) {
      // Simplify the sentence to meet word count
      enhancedSentence = enhancedSentence.replace(/,.*?and/, ' and');
      enhancedSentence = enhancedSentence.replace(/that.*?addresses/, 'addressing');
    }
    
    // Remove forbidden words if specified
    if (constraints.hasForbiddenWords && constraints.forbiddenWords) {
      const forbiddenWords = constraints.forbiddenWords.split(',').map((w: string) => w.trim().toLowerCase()).filter(Boolean);
      forbiddenWords.forEach(forbiddenWord => {
        const regex = new RegExp(`\\b${forbiddenWord}\\b`, 'gi');
        enhancedSentence = enhancedSentence.replace(regex, '[alternative term]');
      });
    }
    
    // Final polish and ensure proper sentence structure
    enhancedSentence = enhancedSentence.trim();
    if (!enhancedSentence.endsWith('.')) {
      enhancedSentence += '.';
    }
    
    return enhancedSentence;
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
