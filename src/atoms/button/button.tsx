// src/atoms/button/button.tsx

import React from 'react';
import { ButtonProps } from './button.type';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded font-semibold transition-all duration-200 ease-in-out';
  const variants = {
    primary:
      'bg-[#3251D0] text-white hover:bg-[#2a46b0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3251D0]',
    secondary:
      'bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300',
    danger:
      'bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black',
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;