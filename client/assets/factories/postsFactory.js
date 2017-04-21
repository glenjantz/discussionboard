console.log('Topics Factory');
myApp.factory('postsFactory', ['$http', function($http) {
  var factory = {}; //sets factory object
  var posts = [];  //this array gets populated from the db
  var post = {};

  factory.postindex = function(topicid, callback){
    $http.get('/posts/'+topicid).then(function(returned_data){
      console.log('this is the postindex return', returned_data)
      if (typeof(callback) == 'function'){
        callback(returned_data.data);
      }
    })
  }

  factory.create = function(user,id,post,callback) {
    console.log('this is the post in the factory', post)
      var obj = {user: user._id, post: post.post}
      $http.post('/post/'+id, obj).then(function(returned_data){
        console.log('this is the returned data', returned_data.data);
          // factory.user = returned_data.data
        if (typeof(callback) == 'function'){

          callback(returned_data.data);
        }
      });
  }
  factory.addlike = function(user, post, callback){
    var obj = {user: user._id, post:post._id}
    $http.post('/postlike', obj).then(function(returned_data){
      console.log('this is the returned data', returned_data.data);
      if (typeof(callback) == 'function'){
        callback(returned_data.data);
      }
    })
  }
  factory.adddislike = function(user, post, callback){
    var obj = {user: user._id, post:post._id}
    $http.post('/postdislike', obj).then(function(returned_data){
      console.log('this is the returned data', returned_data.data);
      if (typeof(callback) == 'function'){
        callback(returned_data.data);
      }
    })
  }
  return factory;
}]);
