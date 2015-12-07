// Script for Angular controllers

'use strict';

angular.module('MainApp', ['ngSanitize', 'ui.router','ui.bootstrap'])
.config(function($stateProvider,$urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/', //"root" directory
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
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

	// For any unmatched url, redirect to "home"
	$urlRouterProvider.otherwise('/');

})

//Controller for Home page
.controller('HomeCtrl', ['$scope','$http','$uibModal', function($scope, $http, $uibModal) {
 	$scope.eventDetail = function() {
			//show modal!
			var modalInstance = $uibModal.open({
			   templateUrl: 'partials/event-detail-modal.html',
			   controller: 'EventModalCtrl',
			   scope: $scope //pass in all our scope variables!
			});
 	}
}])

.controller('EventModalCtrl',['$scope','$http','$uibModalInstance', function($scope, $http, $uibModalInstance) {
  //when hit cancel, close
  $scope.cancel = function () {
     $uibModalInstance.dismiss('cancel');
  };
}])

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


