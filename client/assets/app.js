var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function ($routeProvider){
  $routeProvider
  //index partial #!/
  // .when('/', {
  //   templateUrl: 'partials/main.html',
  //   controller: 'newController'
  // })
  .when('/dashboard',{
    templateUrl: 'partials/dashboard.html',
    controller: 'dashboardController'
  })
  .when('/showtopic/:id',{
    templateUrl: 'partials/showtopic.html',
    controller: 'topicController'
  })
  //create new user #!/new
  .when('/new',{
    templateUrl: 'partials/new.html',
    controller: 'newController'
  })
  //edit a user #!/edit/:id
  .when('/user/:id',{
    templateUrl: 'partials/user.html',
    controller: 'userController'
  })
  //show a single user #!/show/:id
  .when('/show/:id',{
    templateUrl: 'partials/show.html',
    controller: 'editController'
  })
  //redirect to index partial
  .otherwise({
    redirectTo: '/new'
  });
});
