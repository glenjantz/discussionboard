myApp.controller('topicController', ['$scope','commentsFactory','topicsFactory','usersFactory','postsFactory', '$routeParams','$location', function($scope,commentsFactory,topicsFactory,usersFactory,postsFactory, $routeParams, $location) {

  $scope.user = {};
  $scope.topic = {};
  $scope.posts = [];
  $scope.newComment = {};

  var getUser = function (){
    usersFactory.getUser(function(data){
      console.log('this is the logged in user', data)
      if(data == undefined){
        $location.url('/new')
      }else{
        $scope.user = data;
      }

    })
  }
  getUser();



  var getTopic = function (){
    topicsFactory.show($routeParams.id,function(data){
      $scope.topic = data;
    })
  }
  getTopic()
  // var postindex = function (){
  //   topicsFactory.postindex($routeParams.id,function(data){
  //     console.log('postindex', data.posts)
  //     $scope.posts = data.posts;
  //   })
  // }
  // postindex();
  var postindex2 = function(){
    postsFactory.postindex($routeParams.id, function(data){
      console.log('coming from the topic controller here is the data', data)
      $scope.posts = data;
      console.log($scope.posts)
    })
  }
  postindex2()

  $scope.post = function(){
    postsFactory.create($scope.user,$routeParams.id,$scope.newPost, function(data){
      console.log('this is the returned data for creating a post', data)
      // $scope.posts.push(data)
      postindex2()
    })
  }
  $scope.addcomment = function(thispost){
    console.log('this is the new comment', $scope.newComment)
    commentsFactory.create($scope.user,$routeParams.id,thispost,$scope.newComment, function(data){
      postindex2()
    })
  }
  $scope.addlike = function(thispost){
    postsFactory.addlike($scope.user,thispost,function(data){
      postindex2()
    })
  }
  $scope.adddislike = function(thispost){
    postsFactory.adddislike($scope.user,thispost,function(data){
      postindex2()
    })
  }
  $scope.logout = function(){
    usersFactory.logout(function(data){
      $scope.currentuser = data;
      $location.url('/new')
    })
  }


}]);
