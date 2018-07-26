import React, { Component } from 'react';
import './Button.css';

const Button = ({text, className, onClick}) => {
    const buttonStyle = {
      fontWeight: '1000',
      letterSpacing: '.5px',
      background: 'transparent',
      fontFamily: 'Helvetica,Arial,san-serif',
      border: 'none',
      fontSize: '105%'
  
    }
    return (
      <button onClick={onClick} className={`btn ${className}`} style={buttonStyle}>{text}</button>
    )
  }

  export default Button;