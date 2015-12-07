'use strict';

angular.module('MainApp', ['ngSanitize', 'ui.router', 'firebase'])
.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/', //"root" directory
			templateUrl: 'partials/home.html'
		})

		.state('about', {
			url: '/about',
			templateUrl: 'partials/about.html',
			controller:'AboutCtrl'
		})

		.state('recruit', {
			url: '/recruit',
			templateUrl: 'partials/recruit.html',
			controller: 'RecruitCtrl'
		})

		.state('gallery', {
			url: '/gallery',
			templateUrl: 'partials/gallery.html',
			controller: 'GalleryCtrl'
		})

		.state('philanthropy', {
			url: '/philanthropy',
			templateUrl: 'partials/philanthropy.html',
			controller: 'PhilanthropyCtrl'
		})

		.state('contact', {
			url: '/contact',
			templateUrl: 'partials/contact.html'
		})

		.state('admin', {
			url: '/admin',
			templateUrl: 'partials/admin.html'
		})

		$urlRouterProvider.otherwise('/');
})


//Controller for About page
.controller('AboutCtrl', ['$scope', '$http', function($scope, $http) {

}])

//Controller for Recruit page
.controller('RecruitCtrl', ['$scope', '$http', function($scope, $http) {

}])

//Controller for Gallery page
.controller('GalleryCtrl', ['$scope', '$http', function($scope, $http) {

}])

//Controller for Philanthropy page
.controller('PhilanthropyCtrl', ['$scope', '$http', function($scope, $http) {

}])


//Controller for Index
.controller('IndexCtrl', ['$scope', '$http', '$firebaseAuth', '$state', function($scope, $http, $firebaseAuth, $state) {

  var ref = new Firebase("http://pkpwebsite.firebaseio.com");

  var Auth = $firebaseAuth(ref);

  $scope.signIn = function() {
    var promise = Auth.$authWithPassword({
      'email': $scope.admin.email,
      'password': $scope.admin.password
    });
    return promise;
  }

  //Make LogOut function available to views
  $scope.logOut = function() {
    Auth.$unauth(); //"unauthorize" to log out
  };

  //Any time auth status updates, set the userId so we know
  Auth.$onAuth(function(authData) {
    if(authData) { //if we are authorized
      $scope.userId = authData.uid;
      console.log('logged in')

      // $scope.changeState = function () {
      //   $state.go('admin');
      // };

    } else {
      $scope.userId = undefined;
    }
  });

  //Test if already logged in (when page load)
  var authData = Auth.$getAuth(); //get if we're authorized
  if(authData) {
    $scope.userId = authData.uid;
  }
  
}])

//Controller for Admin page
.controller('AdminCtrl', ['$scope', '$http', '$firebaseArray', '$firebaseObject',
	function($scope, $http, $firebaseArray, $firebaseObject) {

	// reference to app
    var ref = new Firebase("http://pkpwebsite.firebaseio.com");

    //reference to a value in the JSON in the Sky

    var announceRef = ref.child('announcement');
    var eventsRef = ref.child('event');
    var officerRef = ref.child('officer');

    $scope.announce = $firebaseArray(announceRef);
    $scope.events = $firebaseArray(eventsRef);
    $scope.officers = $firebaseArray(officerRef);

    $scope.newAnnounce = {};
    $scope.newEvent = {};

    $scope.addAnnounce = function() {
    	var newAnnounceInfo = {
        'description': $scope.newAnnounce.description,
        'date': $scope.newAnnounce.date

        }
    	$scope.announce.$save();
    }

     $scope.addEvent = function() {
    	var newEventInfo = {
        'title': $scope.newEvent.title,
    		'location': $scope.newEvent.location,
    		'date': $scope.newEvent.date,
    		'time': $scope.newEvent.time, 
    		'description': $scope.newEvent.description
    	}
    	$scope.events.$save();
    }

}])





