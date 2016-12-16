import React, { Component } from 'react';
import { Button, Form, Segment, Image } from 'semantic-ui-react'
import './Login.css';
import avatar from './avatar.jpg';
import request from 'superagent';
import {browserHistory} from 'react-router';

var jwtDecode = require('jwt-decode');

class Login extends Component {

  componentDidMount() {
    console.log('Login')
    var jwtToken = localStorage.getItem('jwt');
    if(jwtToken)
    {
        var decoded = jwtDecode(jwtToken);
        console.log("email is "+ decoded.email);
        browserHistory.replace('/foo'); //Need to update this later
    }
  }

  buttonClicked(e) {
    e.preventDefault();
    var url = '/api/login/'+this.refs.email.value+'/'+this.refs.password.value;
    request
     .get(url)
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
         var message = JSON.stringify(res.body.message);
         console.log(message);
         if('success' === res.body.message)
         {
            localStorage.setItem('jwt',res.body.jwttoken);
            browserHistory.replace('/foo'); //Need to update this later
         }
        else
        {
             alert('Message' + message);
        }
            
       }
     });

    return false
  }
  render() {
    return (
      <div className="Login">
      <div className="alignToCenter">
        <Segment.Group raised>
            <Segment>
                <Image src={avatar} centered={true} size='large'/>
            </Segment>
            <Segment>
                <Form>
                <Form.Field>
                  <label>Email</label>
                  <input placeholder='Email' ref='email'/>
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input type="password" ref='password' />
                </Form.Field>
                <Button primary type='submit' onClick={this.buttonClicked.bind(this)} >Submit</Button>
              </Form>
            </Segment>
       </Segment.Group>
       </div>
      </div>
    );
  }
}

export default Login;
