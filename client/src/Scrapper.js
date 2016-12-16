import React, { Component } from 'react';
import request from 'superagent';
import { Grid, Segment } from 'semantic-ui-react'

class Scrapper extends Component {
   constructor(props) {
      super(props);
		this.state = {
        url: "" ,
        ogTitle:"",
        ogType:"",
        ogDescription:"",
        ogImageurl:""
      };
    }

componentDidMount(){

 var self = this;
  request
   .get('/api/url')
   .set('Accept', 'application/json')
   .end(function(err, res) {
     if (err || !res.ok) {
       console.log('Oh no! error', err);
     } else {
      self.setState({
        url:res.body.data.ogUrl,
        ogTitle:res.body.data.ogTitle,
        ogType:res.body.data.ogType,
        ogDescription:res.body.data.ogDescription,
        ogImageurl:res.body.data.ogImage.url
      });


     }
   });
}

 render() {
    var style = {
      width:"250px",
      height:"250px"
    };
      return (

    <div className="Foo">

    <Grid columns={3} divided>

     <Grid.Row stretched>
      <Grid.Column>
        <Segment>
          <h3><a href={this.state.url}>URL-{this.state.url}</a> </h3>
          <h3>Title-{this.state.ogTitle}</h3>
          <img src={this.state.ogImageurl} alt="Test" style={style}/>
        </Segment>
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

export default Scrapper;
