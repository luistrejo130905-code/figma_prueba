import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'bg-card rounded-2xl shadow-sm border border-border/50';
    const hoverStyles = hover ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5' : '';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
