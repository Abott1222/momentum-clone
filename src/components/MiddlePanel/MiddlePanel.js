import React, { Component } from 'react';
import './MiddlePanel.css';
import Button from '../Misc/Button';
var FontAwesome = require('react-fontawesome');


class MiddlePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameEntered: false,
      timer: null,
      dateObj: new Date(),
      timeHour: null,
      timeMinute: null,
      timeSecond: null,
      focus: '',
      focusEntered: false,
      focusCompleted: false,
      quote: '',
      quoteAuthor: '',
      quoteEntered: false,
    }
    this.handleNameInput = this.handleNameInput.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
    this.handleFocusEntered = this.handleFocusEntered.bind(this);
    this.changeFocusCompletion = this.changeFocusCompletion.bind(this);
    this.handleCancelFocus = this.handleCancelFocus.bind(this);
  }

  changeFocusCompletion() {
    this.setState( (prevState) => {
      return {
        focusCompleted: !prevState.focusCompleted
      }
    })
  }

  handleCancelFocus() {
    this.setState((prevState) => {
      return {
        focusEntered: !prevState.focusEntered,
        focus: '',
        focusCompleted: false,
      }
    })
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

  updateTime(time) {
    let {timeHour, timeMinute, timeSecond} = this.state;
    timeSecond = timeSecond + time;
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
      timer: setInterval(() => this.updateTime(1), 1000),
    })
    let quoteUrl = 'https://quote-api.glitch.me/pull/1';
    fetch(quoteUrl, {mode: 'cors'})
    .then(result => result.json())
    .then(data => {
        let resp = data[0];
        
        this.setState({
          quote: resp.body,
          quoteAuthor: resp.author,
          quoteEntered: true,
          
        })
    })
  }

  componentWillUnMount() {
    clearInterval(this.state.timer);
  }

  handleNameInput(e) {
    this.setState({name: e.target.value})
  }

  render() {
    let {timeHour, timeMinute} = this.state;
    return (
      
      <div className="middle-panel__container">
        {
          this.state.quoteEntered ?
          <React.Fragment>
            <Greeting name={this.props.name} hour={timeHour} minute={timeMinute}/>
            <Focus 
              handleFocusChange={this.handleFocusChange} 
              focus={this.state.focus}
              focusEntered={this.state.focusEntered}
              focusCompleted={this.state.focusCompleted}
              handleFocusEntered={this.handleFocusEntered}
              changeFocusCompletion={this.changeFocusCompletion}
              handleCancelFocus={this.handleCancelFocus}
            />
            <Quote quote={this.state.quote} quoteAuthor={this.state.quoteAuthor} className="quote"/>
          </React.Fragment>
          : 
          <React.Fragment>
            <Greeting name={this.props.name} hour={timeHour} minute={timeMinute}/>
            <Focus 
              handleFocusChange={this.handleFocusChange} 
              focus={this.state.focus}
              focusEntered={this.state.focusEntered}
              focusCompleted={this.state.focusCompleted}
              handleFocusEntered={this.handleFocusEntered}
              changeFocusCompletion={this.changeFocusCompletion}
              handleCancelFocus={this.handleCancelFocus}
            />
            <Quote quote="loading..." className="quote"/>
          </React.Fragment>
        }
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
          <div className="enter-focus">
            <h4 className="focus__title"> What is your main focus for today? </h4>
            <input onChange={props.handleFocusChange} value={props.focus} className="focus__input" /> 
          </div> :
            <div>
              <h5 className="focus__day"> TODAY </h5>
              {
                  props.focusCompleted ?
                    <div className="focus__content">
                        <FontAwesome className="box" name="check-square" onClick={props.changeFocusCompletion}/>
                        <h4 className="focus__content-text completed"> {props.focus} </h4>
                        <FontAwesome className="x"  name='plus' onClick={props.handleCancelFocus}/>
                    </div>
                        :
                            <div className="focus__content">
                                <FontAwesome className="hidden-box" name="square" onClick={props.changeFocusCompletion}/>
                                <h4 className="focus__content-text"> {props.focus} </h4>
                                <FontAwesome className="hidden-x"  name='times' onClick={props.handleCancelFocus}/>
                            </div>
              }
            </div>
      }
    </div>
  );
}

const Quote = (props) => {
  return (
    <div className="quote">
      <p className="quote-text"> {props.quote} </p>
      <p className="quote__author-hidden"> {props.quoteAuthor} </p>
    </div>
  );
}



  export default MiddlePanel;