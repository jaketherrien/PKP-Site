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

//Controller for Admin page
.controller('AdminCtrl', ['$scope', '$http', '$firebaseArray', '$firebaseObject',
	function($scope, $http, $firebaseArray, $firebaseObject) {

	// reference to app
    var ref = new Firebase("http://pkpadmin.firebaseio.com");

    //reference to a value in the JSON in the Sky

    var announceRef = ref.child('announcements');
    var eventRef = ref.child('events');

    $scope.announce = $firebaseObject(announceRef);
    $scope.events = $firebaseObject(eventRef);

    $scope.newAnnounce = {};
    $scope.newEvent = {};

    $scope.addAnnounce = function() {
    	var newAnnounceInfo = {
                'description': $scope.newAnnounce.description

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




