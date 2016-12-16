var express = require('express');
var router = express.Router();
var ogs = require('open-graph-scraper');

var UserInformation = require('../models/user');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Twit = require('twit');

/* database config */
var dbName = '5117umn';
mongoose.Promise = global.Promise;
var connectionString = 'mongodb://gaurav:gaurav@ds053080.mlab.com:53080/' + dbName;
mongoose.connect(connectionString);

// JWT config
var jwtSecret = 'gauravumn$5117';

/* for TWIT API */
var T = new Twit({
  consumer_key:         '5tscyA0kqI5t1s7xRfccwPEpr',
  consumer_secret:      'ymv8VMtaht1MKfHkLsSnEc2uXjgtkGgRGQTOvHcaxzm7FMeKIq',
  access_token:         '783446960120274944-XCOjAurUTkNShTkjsp3BSBzZJht4ECl',
  access_token_secret:  '6fg3oj662Vu0BVr66qlTObVd0DwbjNIMEXvTUj56cVkhK',
});


/* for twitter api */
router.get('/twitter/:email', function(req, res, next) {
  var count = 0;
  UserInformation.findOne({email:req.params.email},function(err, results) {
   if (err) {
    return res.send({message: 'Invalid username or password'});
  }
  var twitterInformation = results.twitter;
  var array = [];
  twitterInformation.forEach(function(value){
        T.get('search/tweets', { q: value.tweets, count: 10 }, function(err, data, response) {
          if(err){
            res.send({message : 'error'});
          }else{
              count = count + 1;
              var results = {result:data, title:value.title,hashtag:value.hashtag,user:value.user};
              console.log("result " + JSON.stringify(value.tweets));
              array.push(results);
              if(count==twitterInformation.length)
                res.send({message : 'success', content :array});
          }
      });
  });
  });
});


/* for bookmark api */
router.get('/bookmark/:email', function(req, res, next) {
  UserInformation.findOne({email:req.params.email},function(err, results) {
   if (err) {
    return res.send({message: 'Invalid username or password'});
  }
  res.send({message : 'success', content :results.bookmarks});
  });
});

/* for video api */
router.get('/video/:email', function(req, res, next) {
  UserInformation.findOne({email:req.params.email},function(err, results) {
   if (err) {
    return res.send({message: 'Invalid username or password'});
  }
  res.send({message : 'success', content :results.video});
  });
});

/* for stickynotes api */
router.get('/stickynotes/:email', function(req, res, next) {
  console.log('fetching notes for ' + req.params.email);
  UserInformation.findOne({email:req.params.email},function(err, results) {
   if (err) {
    return res.send({message: 'Invalid username or password'});
  }
  res.send({message : 'success', content :results.stickynotes});
  });
});

router.get('/login/:email/:password', function (req, res) {
 UserInformation.findOne({email:req.params.email},function(err, results) {
   if (err) {
    return res.send({message: 'Invalid username or password'});
  }
  if(results && results.password==req.params.password) {
      var tokenUser = {"email":req.params.email,"password":req.params.password};
	  var token = jwt.sign(tokenUser, jwtSecret, {expiresIn : 60*60*24});
      res.send({message: 'success', jwttoken: token});
    } else {
      res.send({message: 'Invalid username or password'});
    }
  });
});

router.post('/signup', function (req, res) {
    console.log(req.body.email);
    if((req.body.email && req.body.email.trim()) && (req.body.password && req.body.password.trim()) && (req.body.firstname && req.body.firstname.trim()) && (req.body.lastname && req.body.lastname.trim())) {
   var objectUser = {"email":req.body.email,"password":req.body.password,"firstname":req.body.firstname,"lastname":req.body.lastname,"stickynotes":{"title":"Welcome", "content":"Hello"}};
   var result = new UserInformation(objectUser);
   UserInformation.findOne({email:req.body.email},function(err, results) {
     if (err) {
       return res.send(err);
     }
     if(results) {
       res.send({message: 'Username already exists!!'});
     } else {
       // create JWT token
       var tokenUser = {"email":req.body.email,"password":req.body.password};
	   var token = jwt.sign(tokenUser, jwtSecret, {expiresIn : 60*60*24});
       result.save(function(err) {
        if (err)
        {
          return res.send({message: 'Invalid Email or password'});
        }
        res.send({message: 'success', jwttoken: token});
      });
    }
  });
    } else {
        res.send({message: 'Invalid Email or password'});
    }
});


router.put('/submitTwitter', function (req, res) {
    if((req.body.title && req.body.title.trim()) && (req.body.hashtag && req.body.hashtag.trim())) {
       var user = req.body.user ? req.body.user : '';
       var tweets = req.body.user ? req.body.hashtag + ' OR ' + user : req.body.hashtag;
       var objectUser = {"title":req.body.title,"hashtag":req.body.hashtag,"user":user,"tweets":tweets};

       UserInformation.update({email:req.body.email,"twitter.title":req.body.title},{ "$set": {"twitter.$": objectUser } }, function(err, response) {
         if (err) {
           return res.send({message: 'error'});
         }
         else {
            if(response.nModified==0 && response.n==0)
            {
                    UserInformation.update({email:req.body.email},{ $addToSet: {'twitter': objectUser } }, function(err, results) {
                     if (err) {
                       return res.send({message: 'error'});
                     }
                     else {
                        res.send({message : 'success'});
                    }
                  });
            }
            else
                res.send({message : 'success'});
        }
      });
      }
      else
      {
            res.send({message: 'Fields Cannot be Empty'});
      }
});



router.put('/removeTwitter', function (req, res) {
    if((req.body.title && req.body.title.trim()) && (req.body.email && req.body.email.trim())) {
       UserInformation.update({email:req.body.email},{ $pull: {'twitter': {'title':req.body.title}}}, { multi: true }, function(err, results) {
         if (err) {
           return res.send({message: 'error'});
         }
         else {
            res.send({message : 'success'});
        }
      });
      }
      else
      {
            res.send({message: 'Fields Cannot be Empty'});
      }
});

router.put('/submitBookmark', function (req, res) {
     if((req.body.title && req.body.title.trim()) && (req.body.url && req.body.url.trim())) {
         
        var options = {'url': req.body.url};  
         
        ogs(options, function (err, result){
           if(err){
               console.log(err);
               return res.send({message: 'error'});
         }else{     
       console.log("results are here", result.data);
         
       var objectUser = {"url":req.body.url,"title":req.body.title,"ogtitle":result.data.ogTitle,"description":result.data.ogDescription,"image":result.data.ogImage.url};
             
       UserInformation.update({email:req.body.email,"bookmarks.title":req.body.title},{ "$set": {"bookmarks.$": objectUser }}, function(err, response) {
         if (err) {
           return res.send({message: 'error'});
         }
         else {
            if(response.nModified==0 && response.n==0)
            {
                    UserInformation.update({email:req.body.email},{ $addToSet: {'bookmarks': objectUser } }, function(err, results) {
                     if (err) {
                       return res.send({message: 'error'});
                     }
                     else {
                        res.send({message : 'success'});
                    }
                  });
            }
            else{
             res.send({message : 'success'});   
             }
           }
        });
      }
    });
     }
      else
      {
            res.send({message: 'Fields Cannot be Empty'});
      }
});


router.put('/removeBookmark', function (req, res) {
    if((req.body.title && req.body.title.trim()) && (req.body.email && req.body.email.trim())) {
       UserInformation.update({email:req.body.email},{ $pull: {'bookmarks': {'title':req.body.title}}}, { multi: true }, function(err, results) {
         if (err) {
           return res.send({message: 'error'});
         }
         else {
            res.send({message : 'success'});
        }
      });
      }
      else
      {
            res.send({message: 'Fields Cannot be Empty'});
      }
});

router.put('/submitSticky', function (req, res) {
   if((req.body.title && req.body.title.trim()) && (req.body.content && req.body.content.trim())) {
       var objectUser = {"content":req.body.content,"title":req.body.title};
       UserInformation.update({email:req.body.email,"stickynotes.title":req.body.title},{ "$set": {"stickynotes.$": objectUser } }, function(err, response) {
         if (err) {
           return res.send({message: 'error'});
         }
         else {
            if(response.nModified==0 && response.n==0)
            {
                    UserInformation.update({email:req.body.email},{ $addToSet: {'stickynotes': objectUser } }, function(err, results) {
                     if (err) {
                       return res.send({message: 'error'});
                     }
                     else {
                        res.send({message : 'success'});
                    }
                  });
            }
            else
                res.send({message : 'success'});
        }
      });
      }
      else
      {
            res.send({message: 'Fields Cannot be Empty'});
      }
});




router.put('/removeSticky', function (req, res) {
    if((req.body.title && req.body.title.trim()) && (req.body.email && req.body.email.trim())) {
       UserInformation.update({email:req.body.email},{ $pull: {'stickynotes': {'title':req.body.title}}}, { multi: true }, function(err, results) {
         if (err) {
           return res.send({message: 'error'});
         }
         else {
            res.send({message : 'success'});
        }
      });
      }
      else
      {
            res.send({message: 'Fields Cannot be Empty'});
      }
});

router.put('/submitVideo', function (req, res) {
    if((req.body.title && req.body.title.trim()) && (req.body.url && req.body.url.trim())) {
        var id = '';
        var placeholder = '';
        var isVimeo = /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/.test(req.body.url);
        var type = 'youtube';
        if(isVimeo)
        {
            type='vimeo';
        }
        if(type=='youtube')
        {
            var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = req.body.url.match(regExp);
            if (match && match[2].length == 11) {
                id = match[2];
                placeholder = 'http://img.youtube.com/vi/' + id +'/0.jpg';
            } else {
                //error
            }
        }
        else
        {
            var r = /(videos|video|channels|\.com)\/([\d]+)/,
            id = req.body.url.match(r)[2];
            placeholder = 'https://i.vimeocdn.com/video/'+ id +'_640.jpg';
        }
       console.log(id);
       var objectUser = {"url":req.body.url,"title":req.body.title, "type":type, "id" : id, "placeholder" : placeholder};
       UserInformation.update({email:req.body.email,"video.title":req.body.title},{ "$set": {"video.$": objectUser } }, function(err, response) {
         if (err) {
           return res.send({message: 'error'});
         }
         else {
            if(response.nModified==0 && response.n==0)
            {
                    UserInformation.update({email:req.body.email},{ $addToSet: {'video': objectUser } }, function(err, results) {
                     if (err) {
                       return res.send({message: 'error'});
                     }
                     else {
                        res.send({message : 'success'});
                    }
                  });
            }
            else
                res.send({message : 'success'});
        }
      });
      }
      else
      {
            res.send({message: 'Fields Cannot be Empty'});
      }
});


router.put('/removeVideo', function (req, res) {
    if((req.body.title && req.body.title.trim()) && (req.body.email && req.body.email.trim())) {
       UserInformation.update({email:req.body.email},{ $pull: {'video': {'title':req.body.title}}}, { multi: true }, function(err, results) {
         if (err) {
           return res.send({message: 'error'});
         }
         else {
            res.send({message : 'success'});
        }
      });
      }
      else
      {
            res.send({message: 'Fields Cannot be Empty'});
      }
});


module.exports = router;
