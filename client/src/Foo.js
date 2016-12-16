import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react'
import {browserHistory} from 'react-router';

class Foo extends Component {

  componentDidMount() {
    console.log('FOO')
    var jwtToken = localStorage.getItem('jwt');
    if(!jwtToken)
        browserHistory.replace('/');
  }

  render() {
    return (
      <div className="Foo">
        <Grid columns={3} divided>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment>1</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>1</Segment>
              <Segment>2</Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>1</Segment>
              <Segment>2</Segment>
              <Segment>3</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Foo;
