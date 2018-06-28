import React, { Component } from 'react';
import './App.css';
import LeftPanel from './components/LeftPanel/LeftPanel';
import MiddlePanel from './components/MiddlePanel/MiddlePanel';
import RightPanel from './components/RightPanel/RightPanel';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      backgroundImageUrl: '',
      numLinks: 5,
      links: [
        {
          id: 0,
          name: 'Google',
          url: 'https://www.google.com'
        },
        {
          id: 1,
          name: 'Zillow',
          url: 'https://www.zillow.com'
        },
        {
          id: 2,
          name: 'CodePen',
          url: 'https://www.codepen.io'
        },
        {
          id: 3,
          name: 'Twitter',
          url: 'https://www.twitter.com'
        },
        {
          id: 4,
          name: 'Reddit',
          url: 'https://www.reddit.com'
        },
      ]
    }
    this.addLink = this.addLink.bind(this);
  }
  //will update in LandingPage but LinksMenu wont update?
  addLink(name, url) {
    //alert(`Got it... name:${name}... url:${url}`);
    let newObj = {id:this.state.numLinks, name:name, url:url};
    this.setState( (prevState) => {
      return {
        numLinks: prevState.numLinks + 1,
        links: [...prevState.links, newObj],
      }
    })
    
    
  }

  componentDidMount() {
    let url = 'https://pixabay.com/api/?key=9385886-d89ec14d25ef4a913e3bbe0cf&q=inspiration&image_type=photo&min_width=600&min_height=600&colors=blue,grey'
    fetch(url)
      .then(result => result.json())
      .then(data => {
         this.setState({backgroundImageUrl: data.hits[0].largeImageURL})
      })
  }
  
  render() {
    return (
      <div className="App">
        {this.state.backgroundImageUrl.length > 2 ? <LandingPage addLink={this.addLink} links={this.state.links} backgroundImage={this.state.backgroundImageUrl}/> : <span> Loading ... </span>}
      </div>
    );
  }
}


const LandingPage = (props) => {
  let LandingPageStyle = {
    background: `url(${props.backgroundImage}) no-repeat`,
    backgroundSize: '100% 100%',
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between'
  };


  return (
    <div className="landing-page" style={LandingPageStyle}>
      <LeftPanel links={props.links} addLink={props.addLink}/>
      <MiddlePanel />
      <RightPanel />
    </div>
  );
}



export default App;
