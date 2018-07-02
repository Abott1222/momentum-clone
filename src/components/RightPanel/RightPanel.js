import React, { Component } from 'react';

import Button from '../Misc/Button';
import './RightPanel.css';

const RightPanel = (props) => {
  
    return (
      <div className="right-panel__container">
        <div className="right-panel__weather-container">
          <Button className="right-panel__btn" text="Weather" />
        </div>
      </div>
    );
  }

  export default RightPanel;