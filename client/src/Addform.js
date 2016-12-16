import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import './MainLayout.js'
import GridLayout from './GridLayout.js'
import request from 'superagent';

class AddForm extends Component{
  constructor(props) {
    super(props);
   this.state = {
      open: false ,
      close:true,
      addtype:"",
      addtitle:"",
      addtags:"",
      addcontent:""
    };
    this.closeButton = this.closeButton.bind(this);
  }

  buttonClicked(e) {
    this.setState({open:true});
    e.preventDefault();
  }

  closeButton() {
    this.props.closeAdd();
    this.setState({open:false});
  }

  handleSubmit(e){
    e.preventDefault();
    var self = this;
      if(this.props.activeItem==="Twitter"){
        request
          .put('/api/submitTwitter')
          .send({ email:this.props.email, title:this.refs.ttitle.value, hashtag:this.refs.thtag.value, user:this.refs.tuser.value})
          .end(function(err, res) {
           if (err || !res.ok) {
             console.log('Oh no! error', err);
           } else {
            console.log(res.body.message);   
            var message = JSON.stringify(res.body.message);
            if('Fields Cannot be Empty'===res.body.message){
              alert('Addition Failed ' + message);       
            }else{
            console.log(res);
            self.closeButton();
            }            
           }
        });
      } else if(this.props.activeItem==="Bookmark") {
      request
        .put('/api/submitBookmark')
        .send({ email:this.props.email, title:this.refs.btitle.value, url:this.refs.burl.value})
         .end(function(err, res) {
           if (err || !res.ok) {
             console.log('Oh no! error', err);
           } else {
            console.log(res.body.message);   
            var message = JSON.stringify(res.body.message);
            if('Fields Cannot be Empty'===res.body.message){
              alert('Addition Failed ' + message);       
            }else{
            console.log(res);
            self.closeButton();
           }
          }
        });
      } else if(this.props.activeItem==="Notes") {
        request
        .put('/api/submitSticky')
        .send({ email:this.props.email, title:this.refs.ntitle.value, content:this.refs.ncontent.value})
         .end(function(err, res) {
           if (err || !res.ok) {
             console.log('Oh no! error', err);
           } else {
            console.log(res.body.message);   
            var message = JSON.stringify(res.body.message);
            if('Fields Cannot be Empty'===res.body.message){
              alert('Addition Failed ' + message);       
            }else{
            console.log(res);
            self.closeButton();
           }
          }
        });
      } else if(this.props.activeItem==="Videos") {
        request
        .put('/api/submitVideo')
        .send({ email:this.props.email, title:this.refs.vtitle.value, url:this.refs.vurl.value})
         .end(function(err, res) {
           if (err || !res.ok) {
             console.log('Oh no! error', err);
           } else {
            console.log(res.body.message);   
            var message = JSON.stringify(res.body.message);
            if('Fields Cannot be Empty'===res.body.message){
              alert('Addition Failed ' + message);       
            }else{
            console.log(res);
            self.closeButton();
           }
           }
        });
      }
    }
    selectOption = (e,{value}) => {
      this.setState({addtype:value})
    }

  render() {
    var conArr=[];

    if(this.props.activeItem==="Twitter"){
      conArr.push(
            <div key='2'>
            <Form.Field>
            <label>Twitter Title</label>
            <input placeholder='Title' name='ttitle' ref='ttitle'/>
            </Form.Field>
            <Form.Field>
            <label>Hashtag</label>
            <input placeholder='Hashtag' name='thtag' ref='thtag'/>
            </Form.Field>
            <Form.Field>
            <label>User</label>
            <input placeholder='User' name='tuser' ref='tuser'/>
            </Form.Field><br/>
          </div>);
    } else if (this.props.activeItem==="Bookmark") {
       conArr.push(
           <div key='2'>
           <Form.Field>
            <label>Bookmark Title</label>
            <input placeholder='Bookmark title' name='bktitle' ref='btitle' />
            </Form.Field>
            <Form.Field>
            <label>Bookmark URL</label>
            <input placeholder='Bookmark URL' name='burl' ref='burl' />
            </Form.Field><br/>
          </div>);
   } else if (this.props.activeItem==="Notes") {
       conArr.push(
           <div key='2'>
            <Form.Field>
            <label>Title</label>
            <input placeholder='Title' name='ntitle' ref='ntitle'/>
            </Form.Field>
            <Form.Field>
            <label>Content</label>
            <textarea rows="4" name='ncontent' ref='ncontent'></textarea>  
            </Form.Field><br/>
          </div>);
   } else if (this.props.activeItem==="Videos") {
       conArr.push(
           <div key='2'>
           <Form.Field>
            <label>Video Title</label>
            <input placeholder='Title' name='vtitle' ref='vtitle'/>
            </Form.Field>
            <Form.Field>
            <label>Video URL</label>
            <input placeholder='Video URL' name='vurl' ref='vurl' />
            </Form.Field><br/>
          </div>);
    }
 return(
     <div key='1'>
      <GridLayout 
          tab={this.props.activeItem}
          data={0}
          searchText={this.props.searchText}           
           />

      <Modal open={this.props.toAdd} size="large">
       <Modal.Header>Add New {this.props.activeItem} Item</Modal.Header>
        <Modal.Content >
        <Form onSubmit={this.handleSubmit.bind(this)}>
         {conArr}
        <Button positive type='submit' >Submit</Button>
        <Button negative type='button' onClick={this.props.closeAdd}>Cancel</Button>
       </Form>
      </Modal.Content>
     </Modal>
    </div>
    );
  }
}

export default AddForm;
