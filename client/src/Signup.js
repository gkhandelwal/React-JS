import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import {browserHistory} from 'react-router';
import request from 'superagent';

import './Signup.css';

class Signup extends Component {

  componentDidMount() {
    this.buttonSignupClicked = this.buttonSignupClicked.bind(this);
    console.log('Signup')
    var jwtToken = localStorage.getItem('jwt');
    if(jwtToken)
        browserHistory.replace('/foo');
  }

  buttonSignupClicked(e) {
    e.preventDefault();
    var firstname = this.refs.firstname.value;
    var lastname = this.refs.lastname.value;
    var email = this.refs.email.value;
    var password = this.refs.password.value;
    request
   .post('/api/signup')
   .send({ firstname: firstname, lastname: lastname, email:email, password:password })
   .set('X-API-Key', 'foobar')
   .set('Accept', 'application/json')
   .end(function(err, res){
     if (err || !res.ok) {
       alert('Signup Failed');
     } else {
       var message = JSON.stringify(res.body.message);
       if('success'===res.body.message)
          browserHistory.replace('/');
       else
          alert('Signup Failed' + message);
     }
   });
    return false
  }

  render() {
    return (
      <div className="Signup">
      <div className="alignToCenter">
        <Segment.Group raised>
            <Segment>
                <Form>
                <Form.Field>
                  <label>First Name</label>
                  <input placeholder='First Name' ref='firstname'/>
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input placeholder='Last Name' ref='lastname'/>
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input placeholder='Email' ref='email'/>
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input type="password" ref='password'/>
                </Form.Field>
                <Button primary onClick={this.buttonSignupClicked.bind(this)} >Signup</Button>
              </Form>
            </Segment>
       </Segment.Group>
       </div>
      </div>
    );
  }
}

export default Signup;
