import React, { Component } from 'react';
import { Icon, Input, Menu, Segment, Image} from 'semantic-ui-react'
import logo from './logo.jpg';

class LoginLayout extends Component {
state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="header">
        <Segment inverted>
        <Menu inverted pointing secondary>
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
          <Menu.Menu position='right'>
            <Menu.Item>
                <Button>Login</Button>
            </Menu.Item>
            <Menu.Item>
                    <Button primary>Sign up</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        </Segment>
      <main>
          {this.props.children}
      </main>
      </div>
    )
  }
}

export default LoginLayout;
