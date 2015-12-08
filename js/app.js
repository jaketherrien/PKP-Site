// Script for Angular controllers

'use strict';

angular.module('MainApp', ['ngSanitize', 'ui.router','ui.bootstrap','firebase'])
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

		.state('admin', {
			url: '/admin',
			templateUrl: 'partials/admin.html'
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

.controller('EventModalCtrl',['$scope','$http','$uibModalInstance', '$firebaseArray', function($scope, $http, $uibModalInstance, $firebaseArray) {
  //when hit cancel, close
  $scope.cancel = function () {
     $uibModalInstance.dismiss('cancel');
  };

  var ref = new Firebase("http://pkpwebsite.firebaseio.com");
  var eventRef = ref.child('event');
  $scope.events = $firebaseArray(eventRef);

  $scope.addEvent = function() {
		$scope.events.$add({
			date: $scope.date,
			title: $scope.title,
			location: $scope.location,
			time:$scope.time,
			description:$scope.description
		})
	}
}])

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
.controller('AdminCtrl', ['$scope', '$http', '$firebaseArray', '$firebaseObject', '$uibModal',
	function($scope, $http, $firebaseArray, $firebaseObject, $uibModal) {

	// reference to app
    var ref = new Firebase("http://pkpwebsite.firebaseio.com");

    //reference to a value in the JSON in the Sky

    var announceRef = ref.child('announcement');
    var eventsRef = ref.child('event');
    var officerRef = ref.child('officer');
    var recruitRef = ref.child('recruit');

    $scope.announce = $firebaseArray(announceRef);
    $scope.events = $firebaseArray(eventsRef);
    $scope.officers = $firebaseArray(officerRef);
    $scope.newRecruits = $firebaseArray(recruitRef);

     $scope.addEvent = function() {
    	 var modalInstance = $uibModal.open({
    		templateUrl: 'partials/event-detail-modal.html',
    		controller: 'EventModalCtrl',
    		scope: $scope
    	});
    }

    $scope.addNewAnnounce = function() {
    	var modalInstance = $uibModal.open({
    		templateUrl: 'partials/announce-new-modal.html',
    		controller: 'AnnounceModalCtrl',
    		scope: $scope
    	});
    }	

    $scope.confirmation = function() {
    	var modalInstance = $uibModal.open({
    		templateUrl: 'partials/confirmation-modal.html',
    		controller: 'ConfirmModalCtrl',
    		scope: $scope
    	});
    }	
    // How to pass the index through to the modal to read?
    $scope.edit = function(index) {
      $scope.officerIndex = index;
    	var modalInstance = $uibModal.open({
    		templateUrl: 'partials/edit-modal.html',
    		controller: 'EditModalCtrl',
    		scope: $scope
    	});
    }
}])

.controller('AnnounceModalCtrl',['$scope','$http','$uibModalInstance', '$firebaseArray', '$firebaseObject', function($scope, $http, $uibModalInstance, $firebaseArray, $firebaseObject) {
  //when hit cancel, close
  $scope.cancel = function () {
     $uibModalInstance.dismiss('cancel');
  };

  var ref = new Firebase("http://pkpwebsite.firebaseio.com");
  var announceRef = ref.child('announcement');
  $scope.announce = $firebaseArray(announceRef);

  $scope.addAnnounce = function() {
		$scope.announce.$add({
			description:$scope.description,
			title: $scope.title,
			time:Firebase.ServerValue.TIMESTAMP
		})
	}
}])

.controller('ConfirmModalCtrl',['$scope','$http','$uibModalInstance', '$firebaseArray', '$firebaseObject', function($scope, $http, $uibModalInstance, $firebaseArray, $firebaseObject) {
  //when hit cancel, close
  $scope.cancel = function () {
     $uibModalInstance.dismiss('cancel');
  };

  var ref = new Firebase("http://pkpwebsite.firebaseio.com");
  var recruitRef = ref.child('recruit');

  $scope.removeAll = function() {
		recruitRef.remove();
	}
}])

.controller('EditModalCtrl',['$scope','$http','$uibModalInstance', '$firebaseArray', '$firebaseObject', function($scope, $http, $uibModalInstance, $firebaseArray, $firebaseObject) {
  //when hit cancel, close
  $scope.cancel = function () {
     $uibModalInstance.dismiss('cancel');
  };

  $scope.positions = ['President', 'Vice President', 'Treasurer', 'Secretary', 'Historian', 'Warden', 'Chaplain']

  var ref = new Firebase("http://pkpwebsite.firebaseio.com");
  var officerRef = ref.child('officer');
  $scope.officers = $firebaseArray.officerRef;


  // FIX UP THIS PART OF THE CODE
  $scope.editOne = function() {
		$scope.officers($scope.officerIndex).$update({
			position:$scope.position,
			name: $scope.name,
			year:$scope.year
		})
	}
}])








