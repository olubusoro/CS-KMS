import React from 'react';

const Button = ({label, onClick, type = "button", className = ""}) => {
  return (
      <button
          onClick={onClick}
          type={type}
          className={className}
      >
          {label}
   </button>
  );
}

export default Button;
