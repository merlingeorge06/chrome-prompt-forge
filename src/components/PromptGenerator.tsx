
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link, Sparkles, Copy, CheckCircle } from "lucide-react";
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
      const enhancedPrompt = generateStructuredPrompt(
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
        title: "Prompt Generated",
        description: "Your enhanced prompt is ready",
        variant: "default",
      });
    }, 1500);
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
      // 10 new goal options
      design_landing: "design an effective landing page for",
      analyze_data: "analyze the data related to",
      video_script: "create an engaging video script about",
      email_campaign: "develop an email campaign focused on",
      product_feature: "design a product feature that addresses",
      technical_doc: "write technical documentation for",
      social_media: "create engaging social media content about",
      business_strategy: "develop a business strategy for",
      educational: "create educational content explaining",
      research_summary: "summarize research findings about",
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
      executives: "for decision-makers who need concise, actionable information",
      researchers: "for researchers with deep subject matter expertise",
      technical: "for technically-minded non-developers who understand complex concepts",
    };
    
    // Tone settings
    const toneModifiers: {[key: string]: string} = {
      professional: "using professional and authoritative language",
      friendly: "in a friendly, conversational tone",
      technical: "with technical precision and detailed specifications",
      creative: "using creative and imaginative language",
      persuasive: "with persuasive and compelling arguments",
      formal: "in a formal, academic style with proper citations and references",
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
    } else if (goal === 'design_landing' && audience === 'marketers') {
      structuredPrompt += "Focus on conversion optimization and clear call-to-action elements.";
    } else if (goal === 'video_script' && audience === 'creators') {
      structuredPrompt += "Include engaging hooks and visual scene descriptions.";
    } else if (goal === 'technical_doc' && audience === 'developers') {
      structuredPrompt += "Include code examples and clear implementation steps.";
    } else if (goal === 'research_summary' && audience === 'researchers') {
      structuredPrompt += "Include methodology considerations and potential limitations of the findings.";
    } else if (goal === 'business_strategy' && audience === 'executives') {
      structuredPrompt += "Include ROI considerations, implementation timelines, and resource requirements.";
    } else if (goal === 'analyze_data' && (audience === 'professionals' || audience === 'researchers')) {
      structuredPrompt += "Include statistical significance, relevant correlations, and actionable insights.";
    } else if (goal === 'educational' && audience === 'students') {
      structuredPrompt += "Structure content with clear learning objectives and include review questions.";
    } else if (goal === 'social_media' && audience === 'creators') {
      structuredPrompt += "Optimize for engagement with short, punchy statements and attention-grabbing hooks.";
    } else if (goal === 'email_campaign' && audience === 'marketers') {
      structuredPrompt += "Include subject line suggestions, clear CTAs, and segmentation strategy.";
    }
    
    // Add intelligence-enhancing instructions
    structuredPrompt += " Provide your response with clear structure, using appropriate formatting like headings, lists, or bullet points where relevant. If appropriate, include thought-provoking questions or considerations that might not be immediately obvious.";
    
    // Add quality and depth instructions based on the selected goal
    if (goal === 'write' || goal === 'explain' || goal === 'educational') {
      structuredPrompt += " Balance depth with clarity, avoiding both oversimplification and unnecessary complexity.";
    } else if (goal === 'code' || goal === 'technical_doc') {
      structuredPrompt += " Prioritize readability, maintainability, and security in any technical solutions.";
    } else if (goal === 'marketing' || goal === 'social_media' || goal === 'email_campaign') {
      structuredPrompt += " Ensure all messages align with current marketing best practices while standing out from common approaches.";
    } else if (goal === 'research_summary' || goal === 'analyze_data') {
      structuredPrompt += " Present information objectively while highlighting meaningful patterns and implications.";
    }
    
    // Clean up formatting
    structuredPrompt = structuredPrompt.replace(/\s+/g, ' ').trim();
    structuredPrompt = structuredPrompt.charAt(0).toUpperCase() + structuredPrompt.slice(1);
    
    return structuredPrompt;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The generated prompt has been copied to your clipboard",
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
            {isGenerating ? 'Generating...' : (
              <>
                <Sparkles className="w-4 h-4 mr-2" /> Generate Enhanced Prompt
              </>
            )}
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
                {isCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy to Clipboard
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
