console.log('Friends Factory');
myApp.factory('usersFactory', ['$http', function($http) {
  var factory = {}; //sets factory object
  var users = [];  //this array gets populated from the db
  var user = {};
  factory.user;
  //index populates the friends array from the db then sends to the controller
  factory.index = function(callback) {

      $http.get('/users').then(function(returned_data){
        console.log('this is the returned data from factory index', returned_data.data);
        users = returned_data.data;
        callback(users, factory.user);
      });
  }
  factory.getUser = function(callback){
    if (typeof(callback) == 'function'){
      callback(factory.user);
    }

  }
  //show finds the single user in the db and returns it to the controller
  factory.show = function(id, callback) {
      $http.get('/users/'+id).then(function(returned_data){
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
  }
  //adds a single user to the db and then returns it to the controller this callback does nothing with the data passed
  factory.create = function(newuser, callback) {
      $http.post('/users', newuser).then(function(returned_data){
        console.log('this is the returned data', returned_data.data);
          factory.user = returned_data.data
        if (typeof(callback) == 'function'){

          callback(returned_data.data);
        }
      });
  }
  //finds one user with the id and updates the specified fields and returns the user to the controller this callback does nothing with the returned data
  factory.update = function(updateuser, id, callback) {
    console.log('this is my friend', updateuser);
    $http.put('/users/' + id,{fname: updateuser.fname, lname: updateuser.lname, bday: updateuser.bday}).then(function(returned_data) {
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
    });
  }
  //deletes one user from the db with the matching id
  factory.deletethis = function(id, callback) {
    $http.delete('/users/'+ id).then(function(returned_data){
      if (typeof(callback) == 'function'){
        callback();
      }
    });

  }
  factory.logout = function(callback){
  factory.user = {};
  if (typeof(callback) == 'function'){
    callback(factory.user);
  }
}
  return factory;
}]);
