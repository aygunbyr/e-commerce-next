import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const defaultClasses =
    'min-w-content inline-flex items-center justify-center gap-1 rounded bg-primary-dark py-1 px-2 text-primary-light transition-all duration-200 xl:hover:shadow xl:hover:shadow-primary xl:hover:bg-secondary';
  const disabledButtonStyle =
    'border border-primary bg-transparent px-2 text-primary hover:xl:bg-transparent xl:hover:shadow-none';

  const combinedClasses = twMerge(defaultClasses, className);
  const disabledClasses = twMerge(combinedClasses, disabledButtonStyle);

  return (
    <button
      aria-label={props['aria-label']}
      className={props.disabled ? disabledClasses : combinedClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
