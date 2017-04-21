//require mongoose to use the schema
var mongoose = require('mongoose');
//use the schema
var User = mongoose.model('User')
var Topic = mongoose.model('Topic');
var Comment = mongoose.model('Comment');
var Post = mongoose.model('Post');
// console.log('***************************');
//export db queries and actions
module.exports = {
  //find all return all
  index: function(req,res){
    Topic.find({}).populate('_user').exec(function(err, topics){
      if(err){
        console.log('something went wrong finding the topics',err)
      }else{
        res.json(topics)
      }
    })
},

  // //create one using bpjson
  create: function(req,res){
    console.log(req.body)
    User.findOne({_id: req.body._user}, function(err, user){
      if(err){
        console.log('couldnt find the user')
      }else{
        var topic = new Topic({topic: req.body.topic,
           description: req.body.description,
           category: req.body.category,
           _user: req.body._user})
        user.topics.push(topic);
        user.topiccount += 1;
        topic.save(function(err){
          if(err){
            console.log('something went wrong with the topic save')
          }else{
            user.save(function(err){
              if(err){
                console.log('something went wrong saving the user after adding the topic')
              }else{
                res.json(topic);
              }
            })
          }
        })
      }

    })



    },
    // show one using id from url and return one
  show: function(req, res){
    Topic.findOne({_id: req.params.id}).populate('_user').exec(function(err,topic){
      if(err){
        console.log(err);
      }else{
        res.json(topic)
      }
    })

  },
  getposts: function(req, res){
    Topic.findOne({_id: req.params.id}).populate('posts').exec(function(err,topic){
      if(err){
        console.log('couldnt find the topic')
      }else{
        res.json(topic);
      }
    })
  }
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
