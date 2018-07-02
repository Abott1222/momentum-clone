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
    }
    this.handleNameInput = this.handleNameInput.bind(this);
    this.updateTime = this.updateTime.bind(this);
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
    return (
      <div className='greeting'>
        <div className='time'>
          {
            this.state.militaryTime ? 
              <h1 onClick={this.handleSwitchTime}> {hour}:{minute} </h1> :
                <h1 onClick={this.handleSwitchTime}> {hour % 12}:{minute} <span id="amOrPM">{amOrPM}</span> </h1>
          }
          <h2> Good {timeOfDay}, {this.props.name}. </h2>
        </div>
      </div>
    );
  }
}



  export default MiddlePanel;