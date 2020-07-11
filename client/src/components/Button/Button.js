import React from 'react';
import { cn } from '@bem-react/classname';

import './Button.css';

const cnButton = cn('Button');

const Button = ({ children, className, disabled, ...restProps }) => {
  return (
    <button {...restProps} disabled={disabled} className={cnButton({ disabled }, [className])}>
      {children}
    </button>
  );
};

export default Button;
