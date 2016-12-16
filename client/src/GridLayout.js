import React, { Component } from 'react';
import _ from 'lodash'
import { Grid, Card, Image, Container, Button, Header, Embed, Modal, Label, Popup, Icon, Form ,Dimmer, Loader, Segment} from 'semantic-ui-react'
import request from 'superagent';
import Tweet from 'react-tweet'
var jwtDecode = require('jwt-decode');


/* twitter Layout */
class TwitterLayout extends Component {
constructor(props) {
    super(props);
     this.state = {
      indices:Array(100).fill(0)
    };
    this.handlePreviousItemClick= this.handlePreviousItemClick.bind(this);
    this.handleNextItemClick= this.handleNextItemClick.bind(this);
    this.generateDOM=this.generateDOM.bind(this);
    this.removeItems=this.removeItems.bind(this);
  }

  handlePreviousItemClick(value) {
    const indices = this.state.indices;
    if(indices[value]===0) {
      indices[value] = this.props.content[value].result.statuses.length - 1;
    } else {
      indices[value] -= 1;
    }
    // update state
    this.setState({
        indices,
    });
    return false
  }


  handleNextItemClick(value) {
    const indices = this.state.indices;
    if(indices[value]===this.props.content[value].result.statuses.length -1 ) {
      indices[value] = 0;
    } else {
      indices[value] += 1;
    }
    // update state
    this.setState({
        indices,
    });
    return false
  }

   removeItems(i) {
    var jwtToken = localStorage.getItem('jwt');
    var decoded = jwtDecode(jwtToken);
    var email = decoded.email;

    var url = "/api/removeTwitter";

    var self = this;
    if (url !== "") {
      request
          .put(url)
          .send({ email:email, title:self.props.content[i].title})
          .end(function(err, res) {
           if (err || !res.ok) {
             console.log('Oh no! error', err);
           } else {
             console.log("Success");
             self.props.twitterCallBack();
           }
      });
    }
  }

  generateDOM() {
        var self=this;
        if (this.props.content[0] && this.props.content[0].result && this.props.content[0].result.statuses[0]) {
          return (
            _.times(this.props.count, (i) => (
                <Grid.Column mobile={16} tablet={8} computer={5} key={i}>
                  <Popup
                   trigger={<Label as='a' color='red' ribbon>{this.props.content[i].title}</Label>}
                   flowing
                   on='click'>
                  <Modal trigger={<Button color='black' circular icon='remove' />} basic size='small'>
                    <Header icon={'archive'} content={'Confirm deletion'} />
                    <Modal.Content>
                      <p>{'Are you sure you want to delete the selected Twitter widget'}</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button basic color={'red'} inverted>
                        <Icon name={'remove'} /> No
                      </Button>
                      <Button color={'green'} inverted onClick={self.removeItems.bind(self, i)}>
                        <Icon name={'checkmark'} /> Yes
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  </Popup>
                  <Container text>
                    <Card href={this.props.content[i].url}>
                      <Tweet data={this.props.content[i].result.statuses[this.state.indices[i]]} />
                      <Button.Group>
                          var index = i.toString()
                          <Button value={i} labelPosition='left' icon='left chevron' content='Previous' onClick={(e)=>self.handlePreviousItemClick(i)}/>
                          <Button value={i} labelPosition='right' icon='right chevron' content='Next' onClick={(e)=>self.handleNextItemClick(i)}/>
                      </Button.Group>
                    </Card>
                  </Container>
                </Grid.Column>
              )
            )
          )
        }
        return ( <div />)
   }
  render() {
       return (
          <Grid columns={3} divided>{this.generateDOM()}</Grid>
        )
    }
}



class GridLayout  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],

      remove: false,
      notesModal : false,
      notesIndex : 0,
      data : 0,
      flag : 0,
      dummyDelete:0

    };
    this.handleNotes = this.handleNotes.bind(this);
    this.handleAddNotes = this.handleAddNotes.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.removeItems = this.removeItems.bind(this);
    this.twitterCallBack = this.twitterCallBack.bind(this);
  }

handleNotes(value){
      console.log("I:"+ value);
      this.setState({
        notesModal : true,
          notesIndex : value,
      });
}

handleAddNotes(e){
      var self = this;
      //e.preventDefault();
      var jwtToken = localStorage.getItem('jwt');
      var decoded = jwtDecode(jwtToken);
      var email = decoded.email;
      request
        .put('/api/submitSticky')
        .send({ email:email, title:self.state.content[this.state.notesIndex].title, content:self.refs.notes.value})
         .end(function(err, res) {
           if (err || !res.ok) {
             console.log('Oh no! error', err);
           } else {
            console.log(res);
            self.setState({
                notesModal : false
            });
           }
        });
}

    handleClose(){
  this.setState({
    notesModal : false
  });
}


  twitterCallBack()
    {
        this.setState({dummyDelete: 1});
    }


  removeItems(i) {
    var jwtToken = localStorage.getItem('jwt');
    var decoded = jwtDecode(jwtToken);
    var email = decoded.email;

    var url = "";
    console.log("Inside Remove item");

    if (this.props.tab === 'Twitter') {
      url = '/api/removeTwitter'
    } else if (this.props.tab === 'Bookmark') {
      url = '/api/removeBookmark'
    } else if (this.props.tab === 'Notes') {
      url = '/api/removeSticky'
    } else if (this.props.tab === 'Videos') {
      url = '/api/removeVideo'
    }
    var self = this
    if (url !== "") {
      request
          .put(url)
          .send({ email:email, title:self.state.content[i].title})
          .end(function(err, res) {
           if (err || !res.ok) {
             console.log('Oh no! error', err);
           } else {
             console.log("Success");
             self.setState({dummyDelete: 1});
           }
      });
    }
  }

  isUpdate() {
    var self = this;
    //this.setState({ data : null });
    var jwtToken = localStorage.getItem('jwt');
    var decoded = jwtDecode(jwtToken);
    var email = decoded.email;
    var url = "";
    if (this.props.tab === 'Twitter') {
      url = '/api/twitter/' + email
    } else if (this.props.tab === 'Bookmark') {
      url = '/api/bookmark/' + email
    } else if (this.props.tab === 'Notes') {
      url = '/api/stickynotes/' + email
    } else if (this.props.tab === 'Videos') {
      url = '/api/video/' + email
    }
    if (url !== "") {
      request
        .get(url)
        .set('Accept', 'application/json')
        .end(function(err, res) {
         if (err || !res.ok) {
           console.log('Oh no! error', err);
         } else {
             var arr = [];
             var libraries = res.body.content;
             if(self.state.flag === 0){
                 self.setState({
                     data : 1,
                     flag : 1
                 });
             }
             var searchString = self.props.searchText;
             //console.log("Lib:"+res.body.content[].content);
             console.log("Search:"+searchString);
             if(searchString.length > 0){
                console.log("Value:"+searchString);

                for(var iterator=0; iterator < libraries.length; iterator++ ){
                  console.log("Incremented: " + libraries[iterator].title);
                    var re = new RegExp(searchString,'ig');
                  if(libraries[iterator].title.trim().match(re)){
                     arr.push(libraries[iterator]);

                   }
                }
                    if(arr.length !== self.state.content.length){
                        self.setState({
                        content: arr
                        });
                        }

             }
                    else
                    {
                        if (res.body.content.length !== self.state.content.length) {

                        self.setState({
                        content: res.body.content,
                        });
                        console.log("Res:"+res.body.content);
                      }
                    }

            }
      });
    }
  }


  trimDescription(text, i, size) {
    var moreText = '...'
    if (text.length > size) {
      text = text.substring(0, size) + moreText
    }
    return text
  }

  generateDOM() {
      if (this.props.tab === 'Twitter') {
        // no-op
      } else if (this.props.tab === 'Bookmark') {
          var self = this;
        return(
          _.times(this.state.content.length, (i) => (
            <Grid.Column mobile={16} tablet={8} computer={5} key={i}>
              <Popup
               trigger={<Label as='a' color='red' ribbon>{this.state.content[i].title}</Label>}
               flowing
               on='click'>
                 <Modal trigger={<Button color='black' circular icon='remove' />} basic size='small'>
                  <Header icon={'archive'} content={'Confirm deletion'} />
                  <Modal.Content>
                    <p>{'Are you sure you want to delete the selected ' + this.props.tab + ' widget'}</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color={'red'} inverted>
                      <Icon name={'remove'} /> No
                    </Button>
                    <Button color={'green'} inverted onClick={self
              .removeItems.bind(self, i)}>
                      <Icon name={'checkmark'} /> Yes
                    </Button>
                  </Modal.Actions>
                 </Modal>
              </Popup>
              <Container text>
                <Card href={this.state.content[i].url}>
                  <Card.Content>
                    <Grid columns={2}>
                      <Grid.Column>
                        <Header as='h4'>{this.state.content[i].ogtitle}</Header>
                      </Grid.Column>
                      <Grid.Column>
                        <Image size='small' src={this.state.content[i].image} />
                      </Grid.Column>
                    </Grid>
                    <Card.Description>
                      {this.trimDescription(this.state.content[i].description, i, 200)}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Container>
              </Grid.Column>
          ))
        )
      } else if (this.props.tab === 'Notes') {
          var self = this;
        return (
          _.times(this.state.content.length, (i) => (
            <Grid.Column mobile={16} tablet={8} computer={5} key={i}>
              <Popup
               trigger={<Label as='a' color='red' ribbon>{this.state.content[i].title}</Label>}
               flowing
               on='click'>
                 <Modal trigger={<Button color='black' circular icon='remove' />} basic size='small'>
                  <Header icon={'archive'} content={'Confirm deletion'} />
                  <Modal.Content>
                    <p>{'Are you sure you want to delete the selected ' + this.props.tab + ' widget'}</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color={'red'} inverted>
                      <Icon name={'remove'} /> No
                    </Button>
                    <Button color={'green'} inverted onClick={self.removeItems.bind(self, i)}>
                      <Icon name={'checkmark'} /> Yes
                    </Button>
                  </Modal.Actions>
                 </Modal>
              </Popup>
              <Container text>
                <Card value={i} onClick={(e)=>this.handleNotes(i)}>
                  <Card.Content>
                    <Card.Description>
                      {this.trimDescription(this.state.content[i].content, i, 350)}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Container>
              </Grid.Column>
          ))

        )
      } else if (this.props.tab === 'Videos') {
          var self = this;
        return (
          _.times(this.state.content.length, (i) => (
            <Grid.Column mobile={16} tablet={8} computer={5} key={i}>
              <Popup
               trigger={<Label as='a' color='red' ribbon>{this.state.content[i].title}</Label>}
               flowing
               on='click'>
                 <Modal trigger={<Button color='black' circular icon='remove' />} basic size='small'>
                  <Header icon={'archive'} content={'Confirm deletion'} />
                  <Modal.Content>
                    <p>{'Are you sure you want to delete the selected ' + this.props.tab + ' widget'}</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color={'red'} inverted>
                      <Icon name={'remove'} /> No
                    </Button>
                    <Button color={'green'} inverted onClick={self.removeItems.bind(self, i)}>
                      <Icon name={'checkmark'} /> Yes
                    </Button>
                  </Modal.Actions>
                 </Modal>
              </Popup>
              <Embed
                id={this.state.content[i].id}
                placeholder={this.state.content[i].placeholder}
                source={this.state.content[i].type}
              />
            </Grid.Column>
          ))
        )
      } else {
        console.log('Default : Possible error');
        return (
          <div>
          </div>
        )
      }
  }

  render() {

  this.isUpdate();
if(this.state.data === 1){


    if (this.props.tab === 'Twitter') {
      return <TwitterLayout content={this.state.content} count={this.state.content.length} twitterCallBack={this.twitterCallBack} />;
    } else {
        if (this.props.tab === 'Notes')
        {   console.log(this.state.content);
            return (
              <div>
              <Grid columns={3} divided>{this.generateDOM()}</Grid>
                    <Modal open={this.state.notesModal} size="large">
                         <Modal.Header>Notes</Modal.Header>
                         <Modal.Content >

                         <Form onSubmit={this.handleAddNotes.bind(this)}>
                         <Form.Field>
                            <label><h2>{this.state.content[this.state.notesIndex].title}</h2></label>
                         </Form.Field>
                         <Form.Field>
                            <label>Content</label>

                            <textarea defaultValue={this.state.content[this.state.notesIndex].content} rows="9" name='ncontent' ref='notes'></textarea>

                         </Form.Field>
                         <Button positive type='submit' >Update</Button>
                         <Button negative type='button' onClick={this.handleClose.bind(this)}>Cancel</Button>
                         </Form>

                         </Modal.Content>
                      </Modal>
              </div>
            );
        }
        return (
          <div>
            <Grid divided>{this.generateDOM()}</Grid>
          </div>
        );
    }
  }
      return(
            <div>
            <Segment>
              <Dimmer active>
                <Loader indeterminate>Preparing Files</Loader>
              </Dimmer>

              <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>
  </div>
      );
}

}

module.exports = GridLayout;
