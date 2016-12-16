import React, { Component } from 'react';
import { Icon, Input, Menu, Segment, Image, Button} from 'semantic-ui-react'
import logo from './logo.jpg';
import {browserHistory} from 'react-router';
var jwtDecode = require('jwt-decode');

class LogoutMainLayout extends Component {
constructor(props) {
    super(props);
    this.state = { activeItem: "Notes", toAdd : false, email:"", searchText:''};
    this.closeAdd = this.closeAdd.bind(this);
    this.addClicked=this.addClicked.bind(this);
  }

  handleItemClick = (e, { name }) => { this.setState({ activeItem: name }) }
  handleSearch = (e) => this.setState({ searchText: e.target.value })

  buttonClicked(e, { name }) {
    e.preventDefault();
    // remove jwt token
    if(localStorage.getItem('jwt')) {
        console.log("removed jwt");
        localStorage.removeItem('jwt');
    }
    this.props.handleLogoutClick();
    browserHistory.replace('/');
    return false
  }

  addClicked() {
    var token=localStorage.getItem('jwt');
    var decoded = jwtDecode(token);
    var email= decoded.email;
    this.setState({
        toAdd : true,
        email : email
    });
  }

  closeAdd() {
      console.log("Closed");
      this.setState({
          toAdd : false
      });
  }

  render() {
    const { activeItem } = this.state;
    const childrenNew = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       addClicked: this.addClicked,
        closeAdd: this.closeAdd,
        toAdd : this.state.toAdd,
        email:this.state.email,
        searchText: this.state.searchText,
        activeItem: this.state.activeItem
     })
    );

    var jwtToken = localStorage.getItem('jwt');
    var decoded = jwtDecode(jwtToken);
    var email = "Welcome " + decoded.email;

    return (
      <div className="header">
        <Segment inverted>
        <Menu inverted pointing secondary stackable>
          <Menu.Item header><Image src={logo} size='tiny'/> </Menu.Item>
          <Menu.Item name='Twitter' active={activeItem === 'Twitter'} onClick={this.handleItemClick}>
            <Icon color='blue' name='twitter' />
            Twitter
          </Menu.Item>
          <Menu.Item name='Bookmark' active={activeItem === 'Bookmark'} onClick={this.handleItemClick}>
            <Icon color="green" name='bookmark' />
            Bookmark
          </Menu.Item>
          <Menu.Item name='Notes' active={activeItem === 'Notes'} onClick={this.handleItemClick}>
            <Icon color='yellow' name='sticky note' />
            Sticky Notes
          </Menu.Item>
          <Menu.Item name='Videos' active={activeItem === 'Videos'} onClick={this.handleItemClick}>
            <Icon color='red' name='video camera' />
            Videos
          </Menu.Item>
          <Menu.Item position='right'>
             <Input icon='search' placeholder='Search...' onClick={this.handleSearch.bind(this)} />
          </Menu.Item>
          <Menu.Item position='right' header>{email}</Menu.Item>
          <Menu.Item position='right' name='Add' active={activeItem === 'Add'} onClick={this.addClicked.bind(this)}>
            <Icon color='olive' name='plus' />
          </Menu.Item>
          <Menu.Item position='right' name='Logout' active={activeItem === 'Logout'} onClick={this.buttonClicked.bind(this)}>
              Logout
          </Menu.Item>
        </Menu>
        </Segment>
      <main>
          {childrenNew}
      </main>
      </div>
    )
  }
}

class LoginMainLayout extends Component {
constructor(props) {
    super(props);
    this.state = { activeItem: 'home' }
    this.buttonSignupClicked = this.buttonSignupClicked.bind(this);
    this.buttonLoginClicked = this.buttonLoginClicked.bind(this);
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name})

  buttonSignupClicked(e) {
    browserHistory.replace('/signup');
    e.preventDefault();
    return false
  }

  buttonLoginClicked(e) {
    browserHistory.replace('/');
    e.preventDefault();
    return false
  }

  render() {
    const { activeItem } = this.state.activeItem

    return (
      <div className="header">
        <Segment inverted>
        <Menu inverted pointing secondary stackable>
          <Menu.Item header><Image src={logo} size='tiny'/> </Menu.Item>
          <Menu.Item name='Twitter' active={activeItem === 'Twitter'} onClick={this.handleItemClick}>
            <Icon color='blue' name='twitter' />
            Twitter
          </Menu.Item>
          <Menu.Item name='Bookmark' active={activeItem === 'Bookmark'} onClick={this.handleItemClick}>
            <Icon color="green" name='bookmark' />
            Bookmark
          </Menu.Item>
          <Menu.Item name='Notes' active={activeItem === 'Notes'} onClick={this.handleItemClick}>
            <Icon color='yellow' name='sticky note' />
            Sticky Notes
          </Menu.Item>
          <Menu.Item name='Videos' active={activeItem === 'Videos'} onClick={this.handleItemClick}>
            <Icon color='red' name='video camera' />
            Videos
          </Menu.Item>
          <Menu.Item position='right'>
            <Button onClick={this.buttonLoginClicked.bind(this)}>Login</Button>
          </Menu.Item>
          <Menu.Item position='right'>
            <Button primary onClick={this.buttonSignupClicked.bind(this)}>Sign up</Button>
          </Menu.Item>
        </Menu>
        </Segment>
      <main>
          {this.props.children}
      </main>
      </div>
    )
  }
}


class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.jwtfunction = this.jwtfunction.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  jwtfunction() {
    let jwt = localStorage.getItem('jwt');
      if (jwt) {
        this.setState({isLoggedIn: true});
      } else {
        this.setState({isLoggedIn: false});
      }
   }

  render() {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      return <LogoutMainLayout children={this.props.children} handleLogoutClick={this.handleLogoutClick} />;
    }
    return <LoginMainLayout children={this.props.children} handleLoginClick={this.handleLoginClick} />;
  }
}

export default MainLayout;
