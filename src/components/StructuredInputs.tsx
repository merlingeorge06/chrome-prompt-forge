
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface StructuredInputsProps {
  subject: string;
  onSubjectChange: (value: string) => void;
  goal: string;
  onGoalChange: (value: string) => void;
  audience: string;
  onAudienceChange: (value: string) => void;
  constraints: {
    wordCount: number;
    hasForbiddenWords: boolean;
    forbiddenWords: string;
  };
  onConstraintsChange: (key: string, value: any) => void;
}

const StructuredInputs: React.FC<StructuredInputsProps> = ({
  subject,
  onSubjectChange,
  goal,
  onGoalChange,
  audience,
  onAudienceChange,
  constraints,
  onConstraintsChange
}) => {
  const goalOptions = [
    { label: "Write Content", value: "write" },
    { label: "Generate Art", value: "draw" },
    { label: "Create Code", value: "code" },
    { label: "Explain Concept", value: "explain" },
    { label: "Brainstorm Ideas", value: "brainstorm" },
    { label: "Create Marketing Copy", value: "marketing" },
    // 10 new goal options
    { label: "Design Landing Page", value: "design_landing" },
    { label: "Analyze Data", value: "analyze_data" },
    { label: "Create Video Script", value: "video_script" },
    { label: "Generate Email Campaign", value: "email_campaign" },
    { label: "Design Product Feature", value: "product_feature" },
    { label: "Write Technical Documentation", value: "technical_doc" },
    { label: "Create Social Media Post", value: "social_media" },
    { label: "Develop Business Strategy", value: "business_strategy" },
    { label: "Create Educational Content", value: "educational" },
    { label: "Write Research Summary", value: "research_summary" },
  ];

  const audienceOptions = [
    { label: "General Audience", value: "general" },
    { label: "Professionals", value: "professionals" },
    { label: "Developers", value: "developers" },
    { label: "Children", value: "kids" },
    { label: "Students", value: "students" },
    { label: "Marketers", value: "marketers" },
    { label: "Content Creators", value: "creators" },
    { label: "Executive Decision Makers", value: "executives" },
    { label: "Researchers", value: "researchers" },
    { label: "Technical Non-Developers", value: "technical" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="subject" className="text-sm text-chrome-light font-orbitron mb-2 block">Subject</Label>
        <Textarea 
          id="subject"
          placeholder="What is the prompt about?"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="bg-secondary border-border focus:border-primary min-h-[120px] w-full"
        />
      </div>

      <div>
        <Label htmlFor="goal" className="text-sm text-chrome-light font-orbitron mb-2 block">Goal</Label>
        <Select value={goal} onValueChange={onGoalChange}>
          <SelectTrigger id="goal" className="bg-secondary border-border focus:border-primary w-full">
            <SelectValue placeholder="What are you trying to achieve?" />
          </SelectTrigger>
          <SelectContent className="bg-secondary border-border max-h-[300px]">
            {goalOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="audience" className="text-sm text-chrome-light font-orbitron mb-2 block">Target Audience</Label>
        <Select value={audience} onValueChange={onAudienceChange}>
          <SelectTrigger id="audience" className="bg-secondary border-border focus:border-primary w-full">
            <SelectValue placeholder="Who is this for?" />
          </SelectTrigger>
          <SelectContent className="bg-secondary border-border">
            {audienceOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm text-chrome-light font-orbitron">Constraints</h3>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="wordCount" className="text-sm text-chrome-light">Word Count: {constraints.wordCount}</Label>
          </div>
          <Slider 
            id="wordCount"
            value={[constraints.wordCount]} 
            onValueChange={(value) => onConstraintsChange('wordCount', value[0])} 
            min={30}
            max={500} 
            step={10} 
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="forbidden-words" className="text-sm text-chrome-light">Forbidden Words</Label>
          <Switch 
            id="forbidden-words"
            checked={constraints.hasForbiddenWords}
            onCheckedChange={(checked) => onConstraintsChange('hasForbiddenWords', checked)}
          />
        </div>

        {constraints.hasForbiddenWords && (
          <Input 
            placeholder="Enter words to avoid (comma separated)"
            value={constraints.forbiddenWords}
            onChange={(e) => onConstraintsChange('forbiddenWords', e.target.value)}
            className="bg-secondary border-border focus:border-primary mt-2"
          />
        )}
      </div>
    </div>
  );
};

export default StructuredInputs;
