//require mongoose to use the schema
var mongoose = require('mongoose');
//use the schema
var User = mongoose.model('User')
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
var Comments = mongoose.model('Comment')
console.log('comment controller');
//export db queries and actions
module.exports = {
 create: function(req,res){
   User.findOne({_id: req.body.user}, function(err, user){
     if(err){
       console.log('couldnt find the user for the comment', err)
     }else{
      Post.findOne({_id: req.body.post}, function(err, post){
        if(err){
          console.log('couldnt find the post for the comment', err)
        }else{
          var newComment = new Comments({
            _user: req.body.user,
            _topic: req.params.id,
            _post: req.body.post,
            comment: req.body.comment
          })
          user.commentcount +=1;
          user.comments.push(newComment);
          post.comments.push(newComment);
          user.save(function(err, saveduser){
            if(err){
              console.log('something went wrong saving the comment to the user', err)
            }else{
              post.save(function(err,savedpost){
                if(err){
                  console.log('something went wrong saving the comment to the post', err)
                }else{
                  newComment.save(function(err,savedcomment){
                    if(err){
                      console.log('something went wrong saving the comment', err)
                    }else{
                      res.json(savedcomment);
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
}
