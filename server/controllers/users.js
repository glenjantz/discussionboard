//require mongoose to use the schema
var mongoose = require('mongoose');
//use the schema
var User = mongoose.model('User');
console.log('friends controller');
//export db queries and actions
module.exports = {
  //find all return all
  index: function(req,res){
    User.find({}, function(err, users){
      if(err){
        console.log('something went wrong finding the friends', err);
      }else{
        res.json(users);
      }
    });
  },
  //create one using bpjson
  create: function(req,res){
    console.log(req.body)
    User.findOne({name: req.body.name}, function(err, existinguser){
      if(err){
        res.json(err)
      }else{
        if(existinguser == undefined){
          User.create(req.body, function(err, user){
            if(err){
              res.json(err)
            }else{
              res.json(user);
            }
          })
        }
        else{
          res.json(existinguser);
        }
      }
    })
    },
    //show one using id from url and return one
  show: function(req, res){
    User.findOne({_id: req.params.id}, function(err, user){
      if(err){
        console.log('something went wrong finding the person');
      }else{
        res.json(user);
      }
    });
  },
  //delete one using id from url and return a message
  deleted: function(req,res){
    User.remove({_id: req.params.id}, function(err){
      if(err){
        console.log('something went wrong deleting');
      }else{
        res.json({deleted: true});
      }
    });
  },
  //update one using id from url and BPjson data and then return the updated user
  update: function(req,res){
  User.findOne({_id: req.params.id}, function(err, user){
    if (err){
      console.log('couldnt find the one to update');
    }else{
      console.log('made it here')
      user.fname = req.body.fname;
      user.lname = req.body.lname;
      user.bday = req.body.bday;
      user.save(function(err, updatedUser){
        if(err){
          console.log('failed to save the update', err);
        }else{
          res.json(updatedUser)
        }
      })
    }
  })
  }
}
