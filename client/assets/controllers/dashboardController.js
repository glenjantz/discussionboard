myApp.controller('dashboardController', ['$scope','usersFactory','topicsFactory', '$location', function($scope, usersFactory,topicsFactory, $location) {
  // $scope.users = [];  //friends to show
  $scope.newTopic = {};  //don't need this line for ng model
  $scope.categories = ['html','javascript','python','swift','ruby'];
  $scope.user = {};
  $scope.topics = [];
  $scope.filter = function(){
    $scope.filtername = $scope.filterme
  }
// tells the factory to get friends
  var index = function () {
      usersFactory.index(function(data, data2) {
          console.log(data);
          $scope.users = data;
          if(data2 == undefined){
            $location.url('/new')
          }else{
            $scope.user = data2
          }

      })
  }
  // invokes index for friends
  index();
  var index2 = function () {
      topicsFactory.index(function(data) {
          console.log(data);
          $scope.topics = data;
          console.log('these are the topics', $scope.topics)
      })
  }

  index2();
  //tells factory to add this user
  $scope.create = function() {
    $scope.newTopic._user = $scope.user._id;
      topicsFactory.create($scope.newTopic, function(data) {
          // $scope.friends.push(data); //this is no longer needed since we redirect it was used to temporarily update the friend array after creation
          $scope.newTopic = {};  //clear form fields
          index2();
          // $location.url('/dashboard')  //redirect to main page
      });
  }
  $scope.filter = function(){
    $scope.filterme = $scope.filterit;
  }
  //tells factory to delete this user and then deletes from the scope
  // $scope.delete = function(id, user){
  //   usersFactory.deletethis(id, function(data){
  //     //this line deletes the friend from the temp array friends but he is already out of the db
  //     $scope.users.splice($scope.users.indexOf(user),1)
  //   });
  // }
}]);
