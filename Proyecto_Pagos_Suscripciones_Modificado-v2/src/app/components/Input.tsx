import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-foreground/90">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl bg-input-background text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all ${className}`}
          {...props}
        />
        {error && (
          <span className="text-sm text-destructive">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
