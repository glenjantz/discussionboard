console.log("future routes");
////require the friends controller
var users = require('../controllers/users');
var topics = require('../controllers/topics');
var posts = require('../controllers/posts');
var comments = require('../controllers/comments');
//have routes call the properc friends db methods
module.exports = function(app){
  //this line doesn't need to exist
  app.get('/', function(req, res) {
    res.render('index')
  });
  //retrieve all friends
  app.get('/users', users.index);
  app.get('/topics', topics.index);
  app.get('/topics/:id', topics.show);
  app.get('/topicposts/:id', topics.getposts);
  app.get('/posts/:id', posts.indexposts);
  //show one friend by id
  app.get('/users/:id', users.show)
  //create one friends
  app.post('/users', users.create);
  app.post('/topics', topics.create);
  app.post('/post/:id', posts.create);
  app.post('/postlike', posts.addlike);
  app.post('/postdislike', posts.adddislike);
  app.post('/comment/:id', comments.create);
  // app.post('/comment/:id', comments.create);


  //update one friend by id
  // app.put('/topics/:id', topics.update);
  // app.put('/users/:id', users.update);

  //delete one friend by id
  // app.delete('/users/:id', users.deleted)
};
