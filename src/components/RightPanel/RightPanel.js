import React, { Component } from 'react';

import Button from '../Misc/Button';
import './RightPanel.css';

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
      }
      this.geolocationSuccess = this.geolocationSuccess.bind(this);
    }
    
    geolocationSuccess(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      alert(`lat ${latitude} long ${longitude}`)
      let url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
      fetch(url, {mode: 'cors'})
        .then(result => result.json())
        .then(data => {
          this.setState({
            temp: data.main.temp,
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
      }
    }
    
    geolocationError() {
      alert('error!');
    }

    componentDidMount() {
      this.getGeolocation();
      
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
          <Button className="right-panel__btn" text="Todo" />
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

  export default RightPanel;