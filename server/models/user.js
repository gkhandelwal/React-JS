var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var twitterSchema = new Schema({
    tweets: String,
    title: String,
    hashtag: String,
    user: String
},{ _id : false });

var bookmarkSchema = new Schema({
    url: String,
    title: String,
    ogtitle: String,
    image: String,
    description: String
},{ _id : false });

var videoSchema = new Schema({
    url: String,
    title: String,
    id: String,
    placeholder: String,
    type: String
},{ _id : false });

var stickyNotesSchema = new Schema({
    title: String,
    content: String
},{ _id : false });

var userSchema = new Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String,
  twitter: [twitterSchema],
  bookmarks: [bookmarkSchema],
  video: [videoSchema],
  stickynotes: [stickyNotesSchema]

});


module.exports = mongoose.model('users', userSchema);
