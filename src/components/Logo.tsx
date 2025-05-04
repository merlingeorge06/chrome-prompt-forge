
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className={`font-orbitron font-bold ${sizeClasses[size]} ${className}`}>
      <span className="chrome-text">Gen</span>
      <span className="text-primary">Prompt</span>
    </div>
  );
};

export default Logo;
