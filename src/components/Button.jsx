import React from 'react';
import { Link } from 'react-router-dom';

const STYLES = ['bg-inherit text-white ', 'bg-transparent border-white text-white'];
const SIZES = ['py-2 px-5 text-lg', 'py-3 px-6 text-xl'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to='/register' className='btn-mobile'>
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize} rounded`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
