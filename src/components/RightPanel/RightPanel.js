import React, { Component } from 'react';

import Button from '../Misc/Button';
import './RightPanel.css';
var FontAwesome = require('react-fontawesome');

  const mapWeatherToIcon = {
    "clear sky": 'wi-day-sunny',
    "few clouds": 'wi-day-cloudy',
    "clouds": 'wi-day-cloudy',
    "scattered clouds": 'wi-day-cloudy',
    "broken clouds": 'wi-day-cloudy',
    "shower rain": 'wi-day-rain',
    "rain": 'wi-day-rain',
    "moderate rain": 'wi-day-rain',
    "thunderstorm": 'wi-day-thunderstorm',
    "snow": 'wi-day-snow',
    "mist":'wi-day-haze',
  };

  class RightPanel extends React.Component {
    constructor(props) {
      super(props);
      this.state ={
        weatherDesc: '',
        temp: null,
        city: '',
        iconUrl: '',
        weatherRecieved: false,
        todoListVisible: false,
      }
      this.geolocationSuccess = this.geolocationSuccess.bind(this);
      this.changeTodoListVisibility = this.changeTodoListVisibility.bind(this);
    }
    
    geolocationSuccess(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      
      let url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
      fetch(url, {mode: 'cors'})
        .then(result => result.json())
        .then(data => {
          let temp = data.main.temp * 1.8 + 32;
          this.setState({
            temp: temp,
            weatherDesc: data.weather[0].description,
            city: data.name,
            iconUrl: data.weather[0].icon,
            weatherRecieved: true,
          })
        })

    }
    getGeolocation() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.geolocationSuccess, this.geolocationError);
      } else {
        /* geolocation not supported in browser */
        alert("geoloc not allowed!");
      }
    }
    
    geolocationError() {
      alert('error!');
    }

    componentDidMount() {
      this.getGeolocation();
      
    }

    changeTodoListVisibility() {
      this.setState((prevState)=> {
        return { 
          todoListVisible: !prevState.todoListVisible,
        }
      })
    }

    render() {
      return (
        <div className="right-panel__container">

        {this.state.weatherRecieved ?
          <WeatherWidgit 
          src={this.state.iconUrl} 
          temp={this.state.temp}
          description={this.state.weatherDesc}
          city={this.state.city}
          />:
          <React.Fragment>
            <p> Loading... </p>
          </React.Fragment>
        }
        <div>
          {
            this.state.todoListVisible ? 
              <TodoListMenu
              todos={this.props.todos} removeTodo={this.props.removeTodo} addTodo={this.props.addTodo}
              changeTodoCompleted={this.props.changeTodoCompleted}
              /> :
                null
          }
          
          <Button className="right-panel__btn" text="Todo" onClick={this.changeTodoListVisibility}/>
        </div>
      </div>
      );
    }
  }

  const WeatherWidgit = (props) => {
    function mapWeatherStateToIcon(description) {
      return mapWeatherToIcon[description];
    };

    let iconClass = mapWeatherStateToIcon(props.description);
    return (

      <div className="right-panel__weather-container">
        <div className="right-panel__top-row">
          <i className={`wi ${iconClass} weather-icon`}></i>
          <span className="weather-temp">{Math.round(props.temp)}&#xb0;</span>
        </div>
        <h5>{props.city}</h5>
      </div>
    );
  }



  

  class TodoListMenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        todoInput: '',
        inputVisibile: false,
      }
      this.handleTodoInput = this.handleTodoInput.bind(this);
      this.handleEnterInput = this.handleEnterInput.bind(this);
      this.handleNewTodoButtonClick = this.handleNewTodoButtonClick.bind(this);
    }

    handleTodoInput(e) {
      const val = e.target.value
      this.setState((prevState)=> {
        return {
          todoInput: val,
        }
      })
    }

    handleNewTodoButtonClick() {
      this.setState({inputVisibile: true });
    }

    handleEnterInput(e) {
      const {todoInput} = this.state;
      let prevListLength = this.props.todos.length;
      if(e.key === "Enter") {
        this.props.addTodo(todoInput);
        this.setState((prevState)=> {
          return {
            todoInput: '',
            //simple housekeeping
            //besides resetting input we need to reset the visibility so that once the last todo is deleted we are back where we started in terms of state
            inputVisibile: prevListLength === 0? !prevState.inputVisibile : prevState.inputVisibile,
          }
        })
      }
    }
    render() {
      //pass in prop name either hidden or not...
      return (
        <div className={`todo-list-menu ${this.props.className}`}>
          <div className="todo-list-menu_top-row">
            <h4> {this.props.todos.length} TO DO </h4>
          </div>
          {
            this.props.todos.length > 0 ?

                <ul className="todo-list-todos">
                  {this.props.todos.map( (todo, ix) => {
                          return (
                              <li key={todo.id}>
                                  <Todo faClass="chevron-circle-right" todo={todo} removeTodo={this.props.removeTodo}
                                  changeTodoCompleted = {this.props.changeTodoCompleted}
                                  />
                              </li>
                          );
                  })}
                  <div onKeyDown={this.handleEnterInput}>
                    <input className="todo-list-menu_input" placeholder="New Todo" value={this.state.todoInput}
                    onChange={this.handleTodoInput}
                    />
                  </div>
                </ul> : 
                //no todos yet section
                <div>
                  <div className="todo-list-todos__empty">
                    <h4> No todos yet </h4>
                    <h5> Add a todo to get started </h5>
                    <span className={"todo-list-todos__empty-btn" + (this.state.inputVisibile ? " hidden" : '') } onClick={this.handleNewTodoButtonClick}> New Todo </span>
                  </div>
                    <div onKeyDown={this.handleEnterInput} className={this.state.inputVisibile ? '' : "hidden"}>
                      <input className="todo-list-menu_input" placeholder="New Todo" value={this.state.todoInput}
                      onChange={this.handleTodoInput}
                      />
                    </div>
                </div>
          }
          
          
          
        </div>
      );
    }
  }

  /*
 {
          id: 0,
          name: 'Thing1',
          completed: false,
        },
  */
  const Todo = ({todo, removeTodo, changeTodoCompleted}) => {
    return (
      <div className="todo-container">
        <div className="todo-container_left">
          {
            !todo.completed ?
              <div className="todo-container_content">
                <div className="todo-container_content--left">
                  <FontAwesome className="todo-box" name="square" onClick={() => changeTodoCompleted(todo.id)}/>
                  <h4 className="todo-content"> {todo.name} </h4>
                </div>
                <FontAwesome className="todo-hidden-x"  name='times' onClick={() => removeTodo(todo.id)}/>
              </div> 
                :
                  <div className="todo-container_content">
                    <div className="todo-container_content--left">
                      <FontAwesome className="todo-box" name="check-square" onClick={() => changeTodoCompleted(todo.id)}/>
                      <h4 className="todo-content completed"> {todo.name} </h4>
                    </div>
                    <FontAwesome className="todo-hidden-x"  name='times' onClick={() => removeTodo(todo.id)}/>
                  </div>
          }
        </div>
      </div>
    );
  }




  export default RightPanel;