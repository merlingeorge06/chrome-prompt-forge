
import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="py-6 border-t border-border mt-16">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Logo size="sm" />
        </div>
        <div className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} GenPrompt. All rights reserved.
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-chrome-light hover:text-primary transition-colors">Terms</a>
          <a href="#" className="text-chrome-light hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="text-chrome-light hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
