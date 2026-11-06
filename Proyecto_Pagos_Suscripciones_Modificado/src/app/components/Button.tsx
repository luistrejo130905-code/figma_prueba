import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30',
      secondary: 'bg-accent text-accent-foreground hover:bg-accent/80',
      outline: 'border-2 border-border bg-transparent hover:bg-accent',
      ghost: 'bg-transparent hover:bg-accent'
    };

    const sizes = {
      sm: 'px-4 py-2 gap-2',
      md: 'px-6 py-3 gap-2',
      lg: 'px-8 py-4 gap-3'
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
