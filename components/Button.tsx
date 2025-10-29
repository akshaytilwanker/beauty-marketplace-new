import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants: Record<'primary' | 'secondary' | 'outline' | 'ghost', string> = {
    primary: 'bg-rose-500 hover:bg-rose-600 text-white focus:ring-rose-500',
    secondary: 'bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500',
    outline: 'border border-rose-500 text-rose-500 hover:bg-rose-50 focus:ring-rose-500',
    ghost: 'text-rose-500 hover:bg-rose-50 focus:ring-rose-500',
  };
  
  const sizes: Record<'small' | 'medium' | 'large', string> = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2.5 text-base',
    large: 'px-6 py-3 text-lg',
  };

  const variantClass = variants[variant];
  const sizeClass = sizes[size];

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass}`}
      {...props}
    >
      {children}
    </button>
  );
}