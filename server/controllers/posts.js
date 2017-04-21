//require mongoose to use the schema
var mongoose = require('mongoose');
//use the schema
var User = mongoose.model('User')
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
console.log('friends controller');
//export db queries and actions
module.exports = {
  // find all return all
  // index: function(req,res){
  //   Topic.find({}).populate('_user').exec(function(err,topics){
  //     if(err){
  //       console.log(err)
  //     }else{
  //       res.json(topics)
  //     }
  //   })
  // },
  // indexposts: function(req,res){
  //   Post.find({_topic: req.params.id}).populate('_user').populate('comments').exec(function(err, posts){
  //     if(err){
  //       console.log('something went wrong finding the posts', err)
  //     }else{
  //       console.log('these are the posts', posts)
  //       res.json(posts)
  //     }
  //   })
  // },
  indexposts: function(req,res){
    Post.find({_topic: req.params.id}).populate('_user').populate([{path: 'comments', model: 'Comment', populate:[{path: '_user', model: "User"}]}]).exec(function(err, post){
      if(err){
        console.log('something went wrong', post)
      }else{
        res.json(post)
      }
    })
  },
  //create one using bpjson
  create: function(req,res){
    console.log('this is the req.body for creating a post', req.body)
    User.findOne({_id: req.body.user}, function(err, user){
      if(err){
        console.log('Couldnt find the user for the post', err)
      }else{
        Topic.findOne({_id: req.params.id}, function(err, topic){
          if(err){
            console.log('Couldnt find the topic for the post');
          }else{
            console.log('this is the topic', topic)
            var newpost = new Post({
              _user: req.body.user,
              _topic: req.params.id,
              post: req.body.post})
            user.posts.push(newpost._id);
            user.postcount += 1;
            console.log('this is the post array', topic)
            topic.posts.push(newpost._id);

            user.save(function(err, user){
              if(err){
                console.log('something went wrong saving the user for the post', err)
              }else{
                topic.save(function(err,topic){
                  if(err){
                    console.log('something went wrong the the topic for the post', err)
                  }else{
                    newpost.save(function(err, post){
                      if(err){
                        console.log('something went wrong saving the post', err)
                      }else{
                        res.json(post)
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
    },
    addlike: function(req, res){
      Post.findOne({_id: req.body.post}, function(err, post){
        if(err){
          console.log('something went wrong finding the post for the like', err)
        }else{
          if(req.body.user == post._user._id){
            res.json({error: "Cant add like your own post"})
          }else{
            post.upvote +=1
            post.save(function (err, savedpost){
              if(err){
                console.log('something went wrong saving the like', err)
              }else{
                res.json(savedpost)
              }
            })
          }
        }
      })
    },
    adddislike: function(req, res){
      Post.findOne({_id: req.body.post}, function(err, post){
        if(err){
          console.log('something went wrong finding the post for the like', err)
        }else{
          if(req.body.user == post._user._id){
            res.json({error: "Cant add like your own post"})
          }else{
            post.downvote +=1
            post.save(function (err, savedpost){
              if(err){
                console.log('something went wrong saving the like', err)
              }else{
                res.json(savedpost)
              }
            })
          }
        }
      })
    },
    // show one using id from url and return one
  // show: function(req, res){
  //   Topic.findOne({_id: req.params.id}).populate('_user').exec(function(err,topic){
  //     if(err){
  //       console.log(err);
  //     }else{
  //       res.json(topic)
  //     }
  //   })
  //
  // },
  // //delete one using id from url and return a message
  // deleted: function(req,res){
  //   User.remove({_id: req.params.id}, function(err){
  //     if(err){
  //       console.log('something went wrong deleting');
  //     }else{
  //       res.json({deleted: true});
  //     }
  //   });
  // },
  // //update one using id from url and BPjson data and then return the updated user
  // update: function(req,res){
  // Topic.findOne({_id: req.params.id}, function(err, topic){
  //   if (err){
  //     console.log('couldnt find the one to update', err);
  //   }else{
  //     User.findOne({_id: req.body._id}, function(err, user){
  //       if(err){
  //         console.log('couldnt find the user for the topic' err)
  //       }else{
  //         user.
  //       }
  //     })
  //     topic.save(function(err, updatedTopic){
  //       if(err){
  //         console.log('failed to save the update', err);
  //       }else{
  //         res.json(updatedTopic)
  //       }
  //     })
  //   }
  // })
  // }
}
