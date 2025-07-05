
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
      const enhancedPrompt = generateAdvancedPrompt(
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
        title: "Advanced Prompt Generated",
        description: "Your AI-optimized prompt is ready for use",
        variant: "default",
      });
    }, 1500);
  };

  const generateAdvancedPrompt = (subject: string, goal: string, tone: string, audience: string, constraints: any): string => {
    // Advanced prompt engineering framework
    const promptSections = [];
    
    // 1. Role and Context Setting
    const roleContext = getRoleContext(goal, audience);
    if (roleContext) {
      promptSections.push(`**Role & Context**: ${roleContext}`);
    }
    
    // 2. Primary Objective with Action Verb
    const actionVerb = getActionVerb(goal);
    const objectiveSection = `**Objective**: ${actionVerb} ${subject}`;
    promptSections.push(objectiveSection);
    
    // 3. Audience-Specific Requirements
    const audienceRequirements = getAudienceRequirements(audience);
    if (audienceRequirements) {
      promptSections.push(`**Target Audience**: ${audienceRequirements}`);
    }
    
    // 4. Tone and Style Guidelines
    const styleGuidelines = getStyleGuidelines(tone, goal);
    promptSections.push(`**Style & Tone**: ${styleGuidelines}`);
    
    // 5. Specific Constraints and Parameters
    const constraintsList = [];
    if (constraints.wordCount) {
      constraintsList.push(`Word count: approximately ${constraints.wordCount} words`);
    }
    if (constraints.hasForbiddenWords && constraints.forbiddenWords) {
      const forbiddenWords = constraints.forbiddenWords.split(',').map(w => w.trim()).filter(Boolean);
      if (forbiddenWords.length > 0) {
        constraintsList.push(`Avoid these terms: ${forbiddenWords.join(', ')}`);
      }
    }
    
    // Add goal-specific constraints
    const goalConstraints = getGoalSpecificConstraints(goal, audience);
    if (goalConstraints.length > 0) {
      constraintsList.push(...goalConstraints);
    }
    
    if (constraintsList.length > 0) {
      promptSections.push(`**Requirements**: ${constraintsList.join('; ')}`);
    }
    
    // 6. Output Format Specification
    const formatSpec = getOutputFormat(goal, audience);
    if (formatSpec) {
      promptSections.push(`**Format**: ${formatSpec}`);
    }
    
    // 7. Quality Enhancement Instructions
    const qualityInstructions = getQualityInstructions(goal, tone, audience);
    if (qualityInstructions) {
      promptSections.push(`**Quality Standards**: ${qualityInstructions}`);
    }
    
    // 8. Advanced Prompting Techniques
    const advancedTechniques = getAdvancedTechniques(goal, subject);
    if (advancedTechniques) {
      promptSections.push(`**Additional Instructions**: ${advancedTechniques}`);
    }
    
    // Combine all sections into a coherent prompt
    const finalPrompt = promptSections.join('\n\n');
    
    return finalPrompt;
  };

  const getRoleContext = (goal: string, audience: string): string => {
    const roleMap: {[key: string]: {[key: string]: string}} = {
      write: {
        professionals: "Act as an expert content strategist with deep industry knowledge",
        developers: "Act as a technical writer specializing in developer documentation",
        students: "Act as an educational content creator and learning specialist",
        marketers: "Act as a senior copywriter with conversion optimization expertise",
        general: "Act as a versatile content creator with broad audience appeal"
      },
      code: {
        developers: "Act as a senior software engineer with expertise in best practices",
        technical: "Act as a solutions architect explaining technical implementations",
        general: "Act as a coding mentor making programming accessible"
      },
      design_landing: {
        marketers: "Act as a conversion rate optimization specialist and UX designer",
        executives: "Act as a digital strategy consultant focused on business outcomes"
      },
      marketing: {
        marketers: "Act as a growth marketing expert with data-driven insights",
        creators: "Act as a brand strategist specializing in audience engagement"
      }
    };
    
    return roleMap[goal]?.[audience] || "";
  };

  const getActionVerb = (goal: string): string => {
    const actionMap: {[key: string]: string} = {
      write: "Create comprehensive and engaging content about",
      draw: "Generate detailed visual concept and description for",
      code: "Develop clean, efficient, and well-documented code for",
      explain: "Provide a clear, structured explanation of",
      brainstorm: "Generate innovative and creative ideas for",
      marketing: "Craft compelling and conversion-focused marketing content for",
      design_landing: "Design a high-converting landing page strategy for",
      analyze_data: "Conduct thorough analysis and provide actionable insights on",
      video_script: "Write an engaging and structured video script about",
      email_campaign: "Develop a strategic email campaign focused on",
      product_feature: "Design and specify a user-centered product feature for",
      technical_doc: "Create comprehensive technical documentation for",
      social_media: "Develop engaging social media content strategy for",
      business_strategy: "Formulate a strategic business plan for",
      educational: "Design structured educational content that teaches",
      research_summary: "Synthesize and summarize key research findings about"
    };
    
    return actionMap[goal] || "Create content about";
  };

  const getAudienceRequirements = (audience: string): string => {
    const audienceMap: {[key: string]: string} = {
      professionals: "Industry professionals seeking authoritative, actionable insights with appropriate technical depth",
      developers: "Software developers requiring technical accuracy, code examples, and implementation details",
      students: "Learners needing clear explanations, examples, and progressive skill building",
      kids: "Children requiring simple language, engaging examples, and age-appropriate content",
      marketers: "Marketing professionals focused on ROI, metrics, and campaign effectiveness",
      creators: "Content creators seeking engaging, shareable material that resonates with their audience",
      executives: "Decision-makers needing concise, strategic information with clear business impact",
      researchers: "Academic and industry researchers requiring rigorous methodology and evidence-based insights",
      technical: "Technically-minded non-developers who understand complex concepts but need clear explanations",
      general: "Diverse audience requiring accessible language while maintaining depth and value"
    };
    
    return audienceMap[audience] || "";
  };

  const getStyleGuidelines = (tone: string, goal: string): string => {
    const baseStyles: {[key: string]: string} = {
      professional: "Professional, authoritative, and credible",
      friendly: "Conversational, approachable, and warm",
      technical: "Precise, detailed, and technically accurate",
      creative: "Imaginative, innovative, and inspiring",
      persuasive: "Compelling, influential, and action-oriented",
      formal: "Academic, structured, and scholarly"
    };
    
    const goalModifiers: {[key: string]: string} = {
      marketing: "with strong calls-to-action and benefit-focused language",
      code: "with clear documentation and error handling considerations",
      educational: "with progressive learning structure and knowledge checks",
      research_summary: "with objective analysis and evidence-based conclusions"
    };
    
    let style = baseStyles[tone] || "balanced and engaging";
    if (goalModifiers[goal]) {
      style += ` ${goalModifiers[goal]}`;
    }
    
    return style;
  };

  const getGoalSpecificConstraints = (goal: string, audience: string): string[] => {
    const constraints: string[] = [];
    
    const goalConstraints: {[key: string]: string[]} = {
      code: ["Include comments explaining logic", "Consider edge cases and error handling", "Follow industry best practices"],
      marketing: ["Include clear value propositions", "Focus on benefits over features", "Include compelling calls-to-action"],
      design_landing: ["Optimize for conversion", "Include clear hierarchy", "Specify key visual elements"],
      video_script: ["Include scene descriptions", "Note timing and pacing", "Include engaging hooks"],
      technical_doc: ["Include step-by-step instructions", "Provide examples", "Cover troubleshooting"],
      educational: ["Include learning objectives", "Provide practice exercises", "Structure for progressive learning"],
      research_summary: ["Include methodology notes", "Highlight key findings", "Note limitations and implications"],
      email_campaign: ["Include subject line options", "Specify segmentation strategy", "Include A/B test suggestions"]
    };
    
    if (goalConstraints[goal]) {
      constraints.push(...goalConstraints[goal]);
    }
    
    return constraints;
  };

  const getOutputFormat = (goal: string, audience: string): string => {
    const formatMap: {[key: string]: string} = {
      write: "Well-structured article with clear headings, subheadings, and logical flow",
      code: "Clean code with comments, documentation, and usage examples",
      explain: "Structured explanation with introduction, main points, and conclusion",
      brainstorm: "Organized list of ideas with brief descriptions and potential applications",
      marketing: "Marketing copy with headlines, body text, and clear calls-to-action",
      design_landing: "Detailed wireframe description with sections, content blocks, and design specifications",
      video_script: "Script format with scene descriptions, dialogue, and production notes",
      technical_doc: "Technical documentation with sections, code blocks, and reference materials",
      educational: "Lesson plan format with objectives, content modules, and assessment suggestions"
    };
    
    return formatMap[goal] || "Clear, well-organized content with appropriate structure";
  };

  const getQualityInstructions = (goal: string, tone: string, audience: string): string => {
    const qualityElements = [];
    
    // Base quality standards
    qualityElements.push("Ensure accuracy and factual correctness");
    qualityElements.push("Use clear, concise language appropriate for the target audience");
    
    // Goal-specific quality standards
    if (goal === 'code') {
      qualityElements.push("Prioritize readability, maintainability, and security");
    } else if (goal === 'marketing') {
      qualityElements.push("Focus on compelling benefits and clear value propositions");
    } else if (goal === 'educational') {
      qualityElements.push("Ensure logical progression and knowledge retention");
    }
    
    // Audience-specific quality standards
    if (audience === 'professionals') {
      qualityElements.push("Include relevant industry insights and actionable recommendations");
    } else if (audience === 'students') {
      qualityElements.push("Provide examples and opportunities for application");
    }
    
    return qualityElements.join('; ');
  };

  const getAdvancedTechniques = (goal: string, subject: string): string => {
    const techniques = [];
    
    // Chain of thought prompting
    techniques.push("Think step-by-step through your approach before providing the final output");
    
    // Perspective taking
    if (goal === 'marketing' || goal === 'design_landing') {
      techniques.push("Consider the user's journey and pain points throughout");
    }
    
    // Iterative improvement
    techniques.push("Review your output for completeness and relevance before finalizing");
    
    // Context awareness
    techniques.push("Consider current trends and best practices relevant to the topic");
    
    return techniques.join('; ');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Your AI-optimized prompt is ready to use with ChatGPT, Midjourney, or any AI tool",
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
            {isGenerating ? 'Crafting AI-Optimized Prompt...' : (
              <>
                <Sparkles className="w-4 h-4 mr-2" /> Generate AI-Optimized Prompt
              </>
            )}
          </Button>
        </div>
        
        {generatedPrompt && (
          <div className="mt-6 space-y-4">
            <h3 className="text-sm text-chrome-light mb-2 font-orbitron">AI-Optimized Prompt</h3>
            <div className="bg-secondary border border-border rounded-md p-4 min-h-32 overflow-auto max-h-96 whitespace-pre-line">
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
                    Copy AI Prompt
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
