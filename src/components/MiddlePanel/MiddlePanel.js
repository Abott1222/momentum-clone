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
      nameEntered: false,
      timer: null,
      dateObj: new Date(),
      timeHour: null,
      timeMinute: null,
      timeSecond: null,
      focus: '',
      focusEntered: false,
    }
    this.handleNameInput = this.handleNameInput.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleFocusEntered = this.handleFocusEntered.bind(this);
  }

  handleFocusChange(e) {
    this.setState({focus:e.target.value});
  }

  handleFocusEntered(e) {
    if(e.key === "Enter") {
      this.setState((prevState) => {
        return {
          focusEntered: !prevState.focusEntered,
        }
      })
    }
  }

  updateTime() {
    let {timeHour, timeMinute, timeSecond} = this.state;
    timeSecond++;
    if(timeSecond > 59) {
      timeSecond = 0;
      timeMinute++
      if(timeMinute > 59) {
        timeMinute = 0;
        timeHour++;
        if(timeHour > 60) {
          timeHour = 0;
        }
      }
    }

    this.setState({
      timeSecond: timeSecond,
      timeMinute: timeMinute,
      timeHour:timeHour,
    });

    
  }

  //ComponentWillMount use now considered bad practice
  componentDidMount() {
    const {dateObj} = this.state;
    this.setState({
      dateObj: new Date(),
      timeHour:  dateObj.getHours(),
      timeMinute: dateObj.getMinutes(),
      timeSecond: dateObj.getSeconds(),
      timer: setInterval(this.updateTime, 1000),
    })
  }

  componentWillUnMount() {
    clearInterval(this.state.timer);
  }

  handleNameInput(e) {
    this.setState({name: e.target.value})
  }

  render() {
    let {timeHour, timeMinute, timeSecond} = this.state;
    return (
      <div className="middle-panel__container">
        <Greeting name={this.props.name} hour={timeHour} minute={timeMinute}/>
        <Focus 
          handleFocusChange={this.handleFocusChange} 
          focus={this.state.focus}
          focusEntered={this.state.focusEntered}
          handleFocusEntered={this.handleFocusEntered}
        />
        <Quote className="quote"/>
      </div>
    );
  }
}




class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      militaryTime: true
    }
    this.handleSwitchTime = this.handleSwitchTime.bind(this);
  }

  handleSwitchTime() {
    this.setState((prevState) => {
      return {
        militaryTime: !prevState.militaryTime,
      }
    })
  }

  render() {
    const {hour, minute} = this.props;
      let timeOfDay = hour >= 18 ? "Evening" : 
      hour >= 12 ? "Afternoon":
        "Morning";
      let amOrPM = hour > 12 ? 'PM' : 'AM';

      //convert 1:1 to 1:10
      let m = minute < 10 ? "0" + minute : minute;
    return (
      <div className='greeting'>
          {
            this.state.militaryTime ? 
              <h1 className="greeting-time" onClick={this.handleSwitchTime}> {hour}:{m} </h1> :
                <h1 className="greeting-time" onClick={this.handleSwitchTime}> {hour % 12}:{m} <span id="amOrPM">{amOrPM}</span> </h1>
          }
          <h3 className="greeting-name" > Good {timeOfDay}, {this.props.name}. </h3>
      </div>
    );
  }
}

const Focus = (props) => {
  return (
    <div className="focus" onKeyUp={props.handleFocusEntered}>
      {
        !props.focusEntered ?
          <div>
            <h4 className="focus__title"> What is your main focus for today? </h4>
            <input onChange={props.handleFocusChange} value={props.focus} className="focus__input" /> 
          </div> :
            <div>
              <h5 className="focus__day"> TODAY </h5>
              <div className="focus__content">
                {
                  props.completed ? 
                    <FontAwesome className="hidden-box" name="check-square" /> :
                      <FontAwesome className="hidden-box" name="square" />

                }
                <h4 className="focus__content-text"> {props.focus} </h4>
                <FontAwesome className="hidden-x"  name='times' onClick={() => alert("clicked!")}/>
              </div>
            </div>
      }
    </div>
  );
}

const Quote = () => {
  return (
    <div className="quote">
      <p> Stay hungry, stay foolish </p>
    </div>
  );
}



  export default MiddlePanel;