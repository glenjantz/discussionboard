console.log('Topics Factory');
myApp.factory('topicsFactory', ['$http', function($http) {
  var factory = {}; //sets factory object
  var topics = [];  //this array gets populated from the db
  var topic = {};
  // factory.user = {};
  //index populates the friends array from the db then sends to the controller
  factory.index = function(callback) {
      $http.get('/topics').then(function(returned_data){
        console.log('this is the returned data from factory index', returned_data.data);
        topics = returned_data.data;
        callback(topics);
      });
  }

  // show finds the single user in the db and returns it to the controller
  factory.show = function(id, callback) {
      $http.get('/topics/'+id).then(function(returned_data){
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
  }
  factory.postindex = function(id, callback){
    $http.get('/topicposts/'+id).then(function(returned_data){
      if (typeof(callback) == 'function'){
        callback(returned_data.data);
      }
    })
  }
  //adds a single user to the db and then returns it to the controller this callback does nothing with the data passed
  factory.create = function(newtopic, callback) {
      $http.post('/topics', newtopic).then(function(returned_data){
        console.log('this is the returned data', returned_data.data);
          // factory.user = returned_data.data
        if (typeof(callback) == 'function'){

          callback(returned_data.data);
        }
      });
  }
  // finds one user with the id and updates the specified fields and returns the user to the controller this callback does nothing with the returned data
  // factory.update = function(user, id, callback) {
  //   console.log('this is the user posting', user);
  //   $http.put('/topics/' + id,user).then(function(returned_data) {
  //       console.log(returned_data.data);
  //       if (typeof(callback) == 'function'){
  //         callback(returned_data.data);
  //       }
  //   });
  // }
  //deletes one user from the db with the matching id
  // factory.deletethis = function(id, callback) {
  //   $http.delete('/users/'+ id).then(function(returned_data){
  //     if (typeof(callback) == 'function'){
  //       callback();
  //     }
  //   });
  //
  // }
  return factory;
}]);
