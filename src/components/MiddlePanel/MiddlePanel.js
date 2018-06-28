import React, { Component } from 'react';

import Button from '../Misc/Button';

const MiddlePanel = (props) => {
    const PanelStyle = {
      flexGrow: '2',
    }
  
    return (
      <div >
        <Button text="Main focus" />
      </div>
    );
  }

  export default MiddlePanel;