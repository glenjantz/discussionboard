myApp.controller('newController', ['$scope','usersFactory', '$location', function($scope, usersFactory, $location) {
  $scope.users = [];  //friends to show
  $scope.newUser = {};  //don't need this line for ng model

  $scope.user = {};
//tells the factory to get friends
  var index = function () {
      usersFactory.index(function(data, data2) {
          console.log(data);
          $scope.users = data;
          $scope.user = data2
      })
  }
  //invokes index for friends
  index();

  //tells factory to add this user
  $scope.create = function() {
      usersFactory.create($scope.newUser, function(data) {
          // $scope.friends.push(data); //this is no longer needed since we redirect it was used to temporarily update the friend array after creation
          $scope.newUser = {};  //clear form fields
          $location.url('/dashboard')  //redirect to main page
      });
  }
  //tells factory to delete this user and then deletes from the scope
  $scope.delete = function(id, user){
    usersFactory.deletethis(id, function(data){
      //this line deletes the friend from the temp array friends but he is already out of the db
      $scope.users.splice($scope.users.indexOf(user),1)
    });
  }
}]);
