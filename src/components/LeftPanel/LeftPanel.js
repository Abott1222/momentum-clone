import React, { Component } from 'react';
import './LeftPanel.css';
import Button from '../Misc/Button';
var FontAwesome = require('react-fontawesome');




class LinksMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlVal: '',
            nameVal: '',
            //addTodo: this.props.addLink,
        }
        this.changeUrl = this.changeUrl.bind(this);
        this.changeName = this.changeName.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    changeUrl(e) {
        
        //e.preventDefault();
        this.setState({urlVal: e.target.value});
    }

    changeName(e) {
        
        //e.preventDefault();
        this.setState({nameVal: e.target.value});
    }

    handleKeyDown(e) {
        
        if(e.key==='Enter' && this.state.urlVal.length>=1 && this.state.nameVal.length>=1) {
            alert("we good!");
            this.props.addLink(this.state.nameVal, this.state.urlVal);
            this.props.changeInputVisability();
            this.setState({urlVal:'',nameVal:''});
        } else {
            if(this.state.urlVal.length<1) {

            }
        }
    }

    //<form className="hidden-form" onKeyPress={this.props.addLink}>
    render() {
        
        return (
            <div className={`links-menu ${this.props.className}`}>
                <Link added={false} faClass="chrome" link={{id:null, name:"Chrome Tab", url:'https://'}} />
                <Link added={false} faClass="th" link={{id:null, name:"Apps", url:'chrome://apps/'}} />
                <ul>
                    {this.props.links.map( (link, ix) => {
                        return (
                            <li key={link.id}>
                                <Link added={true} faClass="chevron-circle-right" link={link} removeLink={this.props.removeLink}/>
                            </li>
                        );
                    })}
                </ul>
                {
                    this.props.inputClicked ? 
                    <form className="hidden-form" onKeyDown={this.handleKeyDown}>
                        <input className="links-menu_input" onChange={this.changeName} value={this.state.nameVal} placeholder="Name" />
                        <input className="links-menu_input" onChange={this.changeUrl} value ={this.state.urlVal} placeholder="URL" />
                    </form> :
                        <input className="links-menu_input" 
                        onClick={this.props.handleInputClick} placeholder="New Link" />
                        
                }
                

            </div>
        );
    }
}



const Link = ({link, faClass, added, removeLink}) => {
    //make draggable
    return (
        <div className="link-container" >
            <div className="link-container_left">
                <FontAwesome name={faClass} />
                <a target="_blank" className='link' href={link.url}> {link.name} </a>
            </div>
            {
                added ? <FontAwesome className="hidden-icon"  name='times' onClick={() => removeLink(link.id)}/> : null
            }
        </div>
    )
}




class LeftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //links: links,
            menuVisibile: false,
            inputClicked:false,
            searchVal: '',
            //addLink: addLink,
            
        }
        this.handleLinksClick = this.handleLinksClick.bind(this);
        this.handleInputClick = this.handleInputClick.bind(this);
        this.handleAddLinkVisability = this.handleAddLinkVisability.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchEnter = this.handleSearchEnter.bind(this);
    }

    handleLinksClick(e) {
        this.setState((prevState) => {
            return {menuVisibile: !prevState.menuVisibile}
        })
    }

    handleInputClick(e) {
        
        
        if(this.state.menuVisibile) {
            this.setState( (prevState) => {
                if(prevState.inputClicked === false) {
                    return {inputClicked: !prevState.inputClicked}
                }
            })
        }
    }

    handleAddLinkVisability() {
        this.setState((prevState) => {
            return {
                inputClicked: !prevState.inputClicked
            }
        })
    }

    handleSearchInput(e) {
        this.setState({searchVal: e.target.value});
        
    }

    handleSearchEnter({key}) {
        let search = 'https://www.google.com/?q=';
        if(key === "Enter" && this.state.searchVal.length > 4) {
            let val = this.state.searchVal.split()
            search = search + this.state.searchVal;
            this.setState({searchVal: ''});
            this.openInNewTab(search);
        }
    }

    openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }


    render() {
        //{alert("hello")}
        //{alert(`hello: ${typeof this.state.addLink}`)}
        
        return (
            <div className="left-panel">
                <div>
                    <div className="left-panel__button-container">
                        <Button 
                        text="Links" className="left-panel__link-btn--topLeft"
                        onClick={this.handleLinksClick}/>
                        <div className='left-panel__search-wrapper' onKeyDown={this.handleSearchEnter}>
                            <FontAwesome className='left-panel__search-btn' name='search' />
                            <input className="left-panel__search-input" value={this.state.searchVal} onChange={this.handleSearchInput}/>
                        </div>
                    </div>
                    {
                      this.state.menuVisibile ? 
                        <LinksMenu 
                        className="menu-show" inputClicked={this.state.inputClicked} links={this.props.links}
                        handleInputClick={this.handleInputClick}
                        addLink={this.props.addLink}
                        removeLink={this.props.removeLink}
                        changeInputVisability={this.handleAddLinkVisability}
                        /> :
                        <LinksMenu className="menu-hidden" links={this.props.links}/>
                    }
                </div>
                <div className="left-panel_settings_wrapper">
                    <FontAwesome name='cog'  className="left-panel__btn--bottomLeft"/>
                </div>
            </div>
        );
    }
}

  export default LeftPanel;