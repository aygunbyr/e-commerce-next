import React from 'react';
import { twMerge } from 'tailwind-merge';

// Define the Button component with TypeScript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Additional props can be defined here if needed
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  // Define default classes
  const defaultClasses =
    'min-w-content inline-flex items-center justify-center gap-1 rounded bg-primary-dark p-1 text-primary-light transition-all duration-200 xl:hover:shadow-md xl:hover:shadow-primary';

  // Merge default classes with the ones passed as props using twMerge
  const combinedClasses = twMerge(defaultClasses, className);

  return (
    <button
      aria-label={props['aria-label']}
      className={combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
