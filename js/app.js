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


	// Create a new instance of the Mandrill class from the mandrill
	// library. It takes one parameter, the API key
	var m = new mandrill.Mandrill('Fi1hgj6aNP06OJfjfPQZ2Q');

	// create a variable for the API call
	$scope.content = {
		"message": {
			"from_email":"jake.therrien13@gmail.com",
			"to":[{"email":"jake.therrien13@gmail.com"}],
			"subject":"New Rushee for Pi Kappa Phi",
			"text":"This is my first time using Mandrill!"
		}
	};

	$scope.updateContent = function() {
		console.log($scope.fromEmail)
		$scope.content.message.subject = "Rush Contact: " + $scope.name;
		$scope.content.message.from_email = $scope.fromEmail;
		$scope.content.message.text = "New rushee " + $scope.name + " from " + $scope.school + 
			" high school. His high school graduation year is " + $scope.gradYear + 
			". You can reach him at " + $scope.phone + ".";  
		$scope.sendTheMail();
	}

	// send the email
	$scope.sendTheMail = function() {
		m.messages.send($scope.content);
		console.log("email sent successfully!");
	};

}])

//Controller for Gallery page
.controller('GalleryCtrl', ['$scope', '$http', function($scope, $http) {

}])

//Controller for Philanthropy page
.controller('PhilanthropyCtrl', ['$scope', '$http', function($scope, $http) {

}])

//Controller for Admin page
.controller('AdminCtrl', ['$scope', '$http', '$firebaseArray', '$firebaseObject',
	function($scope, $http, $firebaseArray, $firebaseObject) {

	// reference to app
    var ref = new Firebase("http://pkpwebsite.firebaseio.com");

    //reference to a value in the JSON in the Sky

    var announceRef = ref.child('announcement');
    var eventsRef = ref.child('event');

    $scope.announce = $firebaseArray(announceRef);
    $scope.events = $firebaseArray(eventsRef);

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








