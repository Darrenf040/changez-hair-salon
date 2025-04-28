import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const getButtonClasses = (variant: ButtonProps['variant'] = 'default', fullWidth?: boolean) => {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const widthClass = fullWidth ? "w-full" : "";
  
  const variantClasses = {
    default: "bg-primary text-white",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
  };

  return `${baseClasses} ${variantClasses[variant || 'default']} ${widthClass}`.trim();
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = 'default', fullWidth, ...props }, ref) => {
    return (
      <button
        className={`${getButtonClasses(variant, fullWidth)} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps }; 