import React, { Component } from 'react';
import './App.css';
import './weather-icons/css/weather-icons.min.css';
import LeftPanel from './components/LeftPanel/LeftPanel';
import MiddlePanel from './components/MiddlePanel/MiddlePanel';
import RightPanel from './components/RightPanel/RightPanel';


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      backgroundImageUrl: '',
      nameEntered: false,
      numLinks: 5,
      numTodos: 5,
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
      ],
      todos: [
        {
          id: 0,
          name: 'thing 1',
          completed: false,
        },
        {
          id: 1,
          name: 'thing 2',
          completed: false,
        },
        {
          id: 2,
          name: 'thing 3',
          completed: false,
        },
        {
          id: 3,
          name: 'thing 4',
          completed: false,
        },
        {
          id: 4,
          name: 'thing 5',
          completed: false,
        },
      ]
    }
    this.addLink = this.addLink.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleNameEnter = this.handleNameEnter.bind(this);
    this.changeTodoCompleted = this.changeTodoCompleted.bind(this);
  }
  //will update in LandingPage but LinksMenu wont update?
  //was putting props into state and thus the child's state didnt update -> no render
  addLink(name, url) {
    
    let newObj = {id:this.state.numLinks, name:name, url:url};
    this.setState( (prevState) => {
      return {
        numLinks: prevState.numLinks + 1,
        links: [...prevState.links, newObj],
      }
    })
  }

  addTodo(todo) {
    
    let newObj = {id: this.state.numTodos, name:todo, completed:false};
    this.setState( (prevState) => {
      return {
        numTodos: prevState.numTodos + 1,
        todos: [...prevState.todos, newObj],
      }
    })
  }

  removeLink(id) {
    let ix = this.state.links.findIndex((elem) => {
      return elem.id === id;
    })
    this.setState((prevState) => {
      return {
        links: prevState.links.filter( (elem, i) => {
          return i !== ix;
        })
      }
    })
  }

  changeTodoCompleted(id) {
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map((todo) => {
          if(todo.id === id) {
            todo.completed = !todo.completed;
            return todo;
          } else {
            return todo;
          }
        })
      }
    })
  }

  removeTodo(id) {

    let ix = this.state.todos.findIndex((elem) => {
      return elem.id === id;
    })
    this.setState((prevState) => {
      return {
        todos: prevState.todos.filter( (elem, i) => {
          return i !== ix;
        })
      }
    })
  }

  handleNameInput(e) {
    this.setState({name:e.target.value});
  }

  handleNameEnter(e) {
    if(e.key === "Enter" && this.state.name.length > 0) {
      this.setState((prevState) => {
        return {
          nameEntered: !prevState.nameEntered
        }
      })
    }
  }



  componentDidMount() {
    let url = 'https://pixabay.com/api/?key=9385886-d89ec14d25ef4a913e3bbe0cf&q=inspiration&image_type=photo&min_width=600&min_height=600&colors=brown';
    fetch(url)
      .then(result => result.json())
      .then(data => {
         this.setState({backgroundImageUrl: data.hits[0].largeImageURL})
      })
      
  }
  
  render() {
    return (
      <div className="App">
        {this.state.backgroundImageUrl.length > 2 ? !this.state.nameEntered ? <FirstGreeting backgroundImage={this.state.backgroundImageUrl} name={this.state.name} handleNameInput={this.handleNameInput} handleNameEnter={this.handleNameEnter}/> :
           <LandingPage name={this.state.name} addLink={this.addLink} 
           removeLink={this.removeLink} links={this.state.links} 
           todos={this.state.todos} backgroundImage={this.state.backgroundImageUrl}
           removeTodo={this.removeTodo} addTodo={this.addTodo}
           changeTodoCompleted = {this.changeTodoCompleted}
           /> 
           : <span> Loading ... </span>}
      </div>
    );
  }
}





const FirstGreeting = (props) => {
  let FirstGreetingPageStyle = {
    background: `url(${props.backgroundImage}) no-repeat`,
    backgroundSize: '100% 100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div className="app_initial-greeting" style={FirstGreetingPageStyle}>
      <div className='app_initial-gretting-wrapper' onKeyUp={props.handleNameEnter}>
        <h1> Hello, what's your name? </h1>
        <input className="app_initial-greeting--input" onChange={props.handleNameInput} value={props.name} />
      </div>
    </div>
  );
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
      <LeftPanel links={props.links} addLink={props.addLink} removeLink={props.removeLink}/>
      <MiddlePanel name={props.name}/>
      <RightPanel todos={props.todos} removeTodo={props.removeTodo} addTodo={props.addTodo} changeTodoCompleted={props.changeTodoCompleted}/>
    </div>
  );
}



export default App;
