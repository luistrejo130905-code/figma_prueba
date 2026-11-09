import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

    const variants = {
      primary: 'bg-primary text-primary-foreground border border-primary hover:opacity-90',
      secondary: 'bg-accent text-accent-foreground border border-border hover:bg-muted',
      outline: 'border-2 border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground',
      ghost: 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground'
    };

    const sizes = {
      sm: 'px-3 py-1.5 gap-1.5 text-xs',
      md: 'px-5 py-2.5 gap-2 text-sm',
      lg: 'px-6 py-3 gap-2.5 text-base'
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
