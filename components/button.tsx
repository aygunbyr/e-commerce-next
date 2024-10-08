import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const defaultClasses =
    'min-w-content inline-flex items-center justify-center gap-1 rounded bg-primary-dark py-0.5 px-2 text-gray-100 transition-all duration-200 xl:hover:shadow xl:hover:shadow-primary xl:hover:bg-secondary xl:hover:border-secondary border border-primary';
  const disabledButtonStyle =
    'bg-transparent text-primary hover:xl:bg-transparent xl:hover:shadow-none xl:hover:border-primary';

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
