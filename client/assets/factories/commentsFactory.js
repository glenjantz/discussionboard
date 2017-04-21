console.log('comments Factory');
myApp.factory('commentsFactory', ['$http', function($http) {
  var factory = {}; //sets factory object
  var comments = [];  //this array gets populated from the db
  var comment = {};
  factory.create = function(user,topicid, post,comment, callback){
    var obj = {user: user._id, post: post._id, comment: comment.comment}
    $http.post('/comment/'+topicid,obj).then(function(returned_data){
      console.log('this is the create comment return', returned_data)
      if (typeof(callback) == 'function'){
        callback(returned_data.data);
      }
    })
  }

  return factory;
}]);
