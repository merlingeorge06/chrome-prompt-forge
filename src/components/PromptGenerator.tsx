
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
    // Clean and prepare the user input
    let enhancedPrompt = userInput.trim();
    
    // Add context and clarity based on goal
    if (goal) {
      const goalEnhancements = {
        write: "Write detailed, engaging content about",
        draw: "Create a detailed visual representation of",
        code: "Generate clean, well-documented code for",
        explain: "Provide a comprehensive explanation of",
        brainstorm: "Generate creative and innovative ideas for",
        marketing: "Create compelling marketing content for",
        design_landing: "Design an effective landing page for",
        analyze_data: "Analyze and provide insights about",
        video_script: "Write an engaging video script about",
        email_campaign: "Create an email campaign focused on",
        product_feature: "Design a user-friendly product feature for",
        technical_doc: "Write comprehensive technical documentation for",
        social_media: "Create engaging social media content about",
        business_strategy: "Develop a strategic business approach for",
        educational: "Create educational content that teaches",
        research_summary: "Summarize key research findings about"
      };
      
      const goalPrefix = goalEnhancements[goal as keyof typeof goalEnhancements];
      if (goalPrefix) {
        enhancedPrompt = `${goalPrefix} ${enhancedPrompt}`;
      }
    }
    
    // Enhance based on tone
    const toneEnhancements = {
      professional: "in a professional, authoritative manner",
      friendly: "in a conversational, approachable style",
      technical: "with technical precision and detailed explanations",
      creative: "with creativity and innovative thinking",
      persuasive: "in a compelling, persuasive way",
      formal: "using formal, academic language"
    };
    
    const toneAddition = toneEnhancements[tone as keyof typeof toneEnhancements];
    if (toneAddition) {
      enhancedPrompt += `, ${toneAddition}`;
    }
    
    // Add audience-specific refinements
    if (audience && audience !== 'general') {
      const audienceEnhancements = {
        professionals: "tailored for industry professionals with expertise in the field",
        developers: "designed for software developers with technical implementation details",
        students: "explained clearly for learners with examples and step-by-step guidance",
        kids: "simplified for children with age-appropriate language and fun examples",
        marketers: "focused on marketing professionals with ROI and conversion insights",
        creators: "aimed at content creators with engagement and audience growth tips",
        executives: "structured for decision-makers with strategic business insights",
        researchers: "detailed for researchers with methodology and evidence-based approach",
        technical: "explained for technically-minded individuals with clear technical context"
      };
      
      const audienceAddition = audienceEnhancements[audience as keyof typeof audienceEnhancements];
      if (audienceAddition) {
        enhancedPrompt += `. Make it ${audienceAddition}`;
      }
    }
    
    // Add constraints
    const constraintsList = [];
    
    if (constraints.wordCount) {
      constraintsList.push(`Keep it around ${constraints.wordCount} words`);
    }
    
    if (constraints.hasForbiddenWords && constraints.forbiddenWords) {
      const forbiddenWords = constraints.forbiddenWords.split(',').map((w: string) => w.trim()).filter(Boolean);
      if (forbiddenWords.length > 0) {
        constraintsList.push(`avoid using these terms: ${forbiddenWords.join(', ')}`);
      }
    }
    
    // Add goal-specific quality instructions
    const qualityInstructions = {
      write: "Ensure the content is well-structured, engaging, and informative",
      code: "Include comments, follow best practices, and ensure the code is maintainable",
      marketing: "Focus on benefits, include clear calls-to-action, and emphasize value propositions",
      design_landing: "Prioritize conversion optimization and user experience",
      video_script: "Include engaging hooks, clear transitions, and strong conclusions",
      educational: "Structure content progressively and include practical examples",
      technical_doc: "Provide step-by-step instructions and troubleshooting information"
    };
    
    const qualityAddition = qualityInstructions[goal as keyof typeof qualityInstructions];
    if (qualityAddition) {
      constraintsList.push(qualityAddition);
    }
    
    if (constraintsList.length > 0) {
      enhancedPrompt += `. ${constraintsList.join(', ')}`;
    }
    
    // Final polish - ensure it ends properly
    if (!enhancedPrompt.endsWith('.') && !enhancedPrompt.endsWith('!') && !enhancedPrompt.endsWith('?')) {
      enhancedPrompt += '.';
    }
    
    return enhancedPrompt;
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
