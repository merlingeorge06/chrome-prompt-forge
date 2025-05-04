
import React from 'react';
import Logo from '../components/Logo';
import PromptGenerator from '../components/PromptGenerator';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Hexagon, Code, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col tech-grid-bg">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex justify-between items-center py-4">
          <Logo />
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-chrome-light hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-chrome-light hover:text-primary transition-colors">How It Works</a>
          </nav>
          <Button className="bg-primary hover:bg-primary/90 red-glow">Get Started</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 chrome-text">
          Craft Perfect Prompts<br />
          <span className="text-primary">Engineered for Results</span>
        </h1>
        <p className="text-chrome-light text-lg md:text-xl max-w-2xl mb-12">
          GenPrompt uses advanced algorithms to transform your basic ideas into powerful, 
          precisely-tuned prompts that deliver exceptional AI outputs.
        </p>
        
        {/* Main Generator */}
        <PromptGenerator />
      </section>

      {/* Features Section */}
      <section id="features" className="container py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center chrome-text">Powerful Features</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel rounded-lg p-6 hover:border-primary transition-all duration-300 tech-border">
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <Zap className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 chrome-text">Tone Adjustment</h3>
            <p className="text-muted-foreground">
              Fine-tune your prompts with multiple tone options to match your specific needs and audience.
            </p>
          </div>
          
          <div className="glass-panel rounded-lg p-6 hover:border-primary transition-all duration-300 tech-border">
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <Hexagon className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 chrome-text">Complexity Control</h3>
            <p className="text-muted-foreground">
              Adjust the complexity level of your prompts from simple instructions to sophisticated queries.
            </p>
          </div>
          
          <div className="glass-panel rounded-lg p-6 hover:border-primary transition-all duration-300 tech-border">
            <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <Code className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2 chrome-text">Instant Preview</h3>
            <p className="text-muted-foreground">
              See your enhanced prompts in real-time and copy them directly to your clipboard.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-secondary/50 py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center chrome-text">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            <div className="flex flex-col items-center text-center z-10">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-6 red-glow">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 chrome-text">Enter Your Idea</h3>
              <p className="text-muted-foreground">
                Start with a basic idea or concept for what you want to create.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center z-10">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-6 red-glow">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 chrome-text">Customize Parameters</h3>
              <p className="text-muted-foreground">
                Adjust tone, complexity, and creativity levels to suit your needs.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center z-10">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center mb-6 red-glow">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 chrome-text">Get Enhanced Prompt</h3>
              <p className="text-muted-foreground">
                Receive your perfectly crafted prompt, ready to use with any AI tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24 flex flex-col items-center text-center">
        <div className="glass-panel rounded-lg p-8 max-w-3xl w-full tech-border">
          <h2 className="text-3xl font-bold mb-4 chrome-text">Ready to Optimize Your AI Results?</h2>
          <p className="text-chrome-light mb-8">
            Start generating powerful, tailored prompts for free. No limits, no subscription required.
          </p>
          <Button className="bg-primary hover:bg-primary/90 red-glow text-lg py-6 px-8">
            Get Started Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
