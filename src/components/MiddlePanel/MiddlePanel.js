import React, { Component } from 'react';
import './MiddlePanel.css';
import Button from '../Misc/Button';
var FontAwesome = require('react-fontawesome');


class MiddlePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mainFocus: '',
      nameEntered: false
    }
    this.handleNameInput = this.handleNameInput.bind(this);
  }

  handleNameInput(e) {
    this.setState({name: e.target.value})
  }

  render() {
    return (
      <div className="middle-panel__container">
        <Greeting name={this.props.name} />
      </div>
    );
  }
}


const Greeting = (props) => {
  return (
    <h1> Hello {props.name}! Welcome back! </h1>
  );
}



  export default MiddlePanel;