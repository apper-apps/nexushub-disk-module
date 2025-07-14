import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-black font-semibold btn-glow",
    secondary: "bg-gradient-to-r from-secondary to-primary text-white btn-glow",
    outline: "border border-primary text-primary hover:bg-primary hover:text-black",
    ghost: "text-primary hover:bg-primary/10",
    danger: "bg-gradient-to-r from-error to-red-500 text-white btn-glow"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    xl: "px-8 py-4 text-lg rounded-xl"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;