import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

    const variants = {
      primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35',
      secondary: 'bg-accent text-accent-foreground hover:bg-accent/80',
      outline: 'border-2 border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
      ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground'
    };

    const sizes = {
      sm: 'px-4 py-2 gap-2 text-sm',
      md: 'px-6 py-3 gap-2 text-base',
      lg: 'px-8 py-4 gap-3 text-lg'
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
