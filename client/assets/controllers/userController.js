
myApp.controller('userController', ['$scope','usersFactory', '$routeParams', '$location', function($scope, usersFactory, $routeParams, $location) {
//used to show one friend
  $scope.currentuser = {};
  $scope.user= {};

  var getUser = function (){
    usersFactory.getUser(function(data){
      if(data == undefined){
        $location.url('/newelse')
      }else{
        $scope.currentuser = data;
      }

    })
  }
  getUser();
  //automatically runs to show one specific user
   usersFactory.show($routeParams.id, function(returnedData){
     $scope.user = returnedData;
     console.log('this is the edit index', $scope.user);
   });

   $scope.logout = function (){
      usersFactory.logout(function(data){
        $scope.currentuser = data;
        $location.url('/new')
      })
  }


}]);
