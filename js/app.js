// Script for Angular controllers

'use strict';

// reference to app
var ref = new Firebase("http://pkpwebsite.firebaseio.com");

angular.module('MainApp', ['ngSanitize', 'ui.router','ui.bootstrap','firebase'])
.config(function($stateProvider,$urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/', //"root" directory
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		})

		.state('recruit', {
			url: '/recruit',
			templateUrl: 'partials/recruit.html',
			controller: 'RecruitCtrl'
		})

		.state('philanthropy', {
			url: '/philanthropy',
			templateUrl: 'partials/philanthropy.html'
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
.controller('HomeCtrl', ['$scope','$http','$uibModal','$firebaseArray', '$firebaseObject', 
		function($scope, $http, $uibModal,$firebaseArray, $firebaseObject) {

    //reference to a value in the JSON in the Sky
    var announceRef = ref.child('announcement');
    var eventsRef = ref.child('event');

    $scope.announce = $firebaseArray(announceRef);
    $scope.events = $firebaseArray(eventsRef);
    $scope.eventIndex = ""

 	$scope.eventDetail = function(index) {
 			$scope.eventIndex = index
			//show modal!
			var modalInstance = $uibModal.open({
			   templateUrl: 'partials/event-detail-modal.html',
			   controller: 'EventModalCtrl',
			   scope: $scope //pass in all our scope variables!
			});
 	}
}])

.controller('EventModalCtrl',['$scope','$http','$uibModalInstance', '$firebaseArray', function($scope, $http, $uibModalInstance, $firebaseArray) {
  
  // Selected event	
  $scope.event = $scope.events[$scope.eventIndex];

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

//Controller for Recruit page
.controller('RecruitCtrl', ['$scope', '$http', '$firebaseArray', function($scope, $http, $firebaseArray) {

	// Create a new instance of the Mandrill class from the mandrill
	// library. It takes one parameter, the API key
	var m = new mandrill.Mandrill('Fi1hgj6aNP06OJfjfPQZ2Q');

	// create a variable for the API call
	$scope.content = {
		"message": {
			"from_email":"jake.therrien13@gmail.com",
			"to":[{"email":"webmaster.pkp.uw@gmail.com"}],
			"subject":"New Rushee for Pi Kappa Phi",
			"text":"Interested in rushing Pi Kapps?"
		}
	};

	$scope.updateContent = function() {
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

	// var ref = new Firebase("http://pkpwebsite.firebaseio.com");
	var recruitRef = ref.child('recruit');
	$scope.recruit = $firebaseArray(recruitRef);

	// adds the recruits to a recruit database in firebase
	$scope.addRecruit = function() {
		$scope.recruit.$add({
			name: $scope.name,
			email: $scope.fromEmail,
			phonenumber: $scope.phone
		})
	};
}])

.controller('IndexCtrl', ['$scope','$state','$http','$uibModal', '$firebaseAuth', 
	function($scope, $state, $http, $uibModal, $firebaseAuth) {

	// Current router state
	$scope.$state = $state;

	var Auth = $firebaseAuth(ref);

	// Open up log-in modal for Admin
	$scope.loginModal = function() {
		//show modal!
		var modalInstance = $uibModal.open({
		   templateUrl: 'partials/log-in-modal.html',
		   controller: 'AdminCtrl',
		   scope: $scope //pass in all our scope variables!
		});
	}

	//Make LogOut function available to views
	$scope.signOut = function() {
		var user = Auth.userId;
		Auth.$unauth(); //"unauthorize" to log out
		window.alert(user+" has logged out");
	};

	//Any time auth status updates, set the userId so we know
  	Auth.$onAuth(function(authData) {
    	if(authData) { //if we are authorized
      		$scope.userId = authData.uid;
    	} else {
      		$scope.userId = undefined;
    	}
  	});

}])


//Controller for Admin page
.controller('AdminCtrl', ['$scope', '$http', '$firebaseArray', '$firebaseAuth','$state','$uibModal',
  function($scope, $http, $firebaseArray, $firebaseAuth, $state, $uibModal) {

	var Auth = $firebaseAuth(ref);

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
    		templateUrl: 'partials/admin-event-detail.html',
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

	$scope.signIn = function() {
	    var promise = Auth.$authWithPassword({
	      'email': $scope.admin.email,
	      'password': $scope.admin.password
	    });
    	return promise;
  	}

  	$scope.goToAdmin = function() {
  		$state.go('admin');
  	}

	//Make LogOut function available to views
	$scope.logOut = function() {
		Auth.$unauth(); //"unauthorize" to log out
	};

  	//Any time auth status updates, set the userId so we know
  	Auth.$onAuth(function(authData) {
    	if(authData) { //if we are authorized
      		$scope.userId = authData.uid;
    	} else {
      	$scope.userId = undefined;
    	}
  	});


}])

.controller('AnnounceModalCtrl',['$scope','$http','$uibModalInstance', '$firebaseArray', '$firebaseObject', function($scope, $http, $uibModalInstance, $firebaseArray, $firebaseObject) {
  //when hit cancel, close
  $scope.cancel = function () {
     $uibModalInstance.dismiss('cancel');
  };

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

.controller('ConfirmModalCtrl',['$scope','$http','$uibModalInstance', '$firebaseArray', '$firebaseObject', 
	function($scope, $http, $uibModalInstance, $firebaseArray, $firebaseObject) {
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

.controller('EditModalCtrl',['$scope','$http','$uibModalInstance', '$firebaseArray', '$firebaseObject', 
	function($scope, $http, $uibModalInstance, $firebaseArray, $firebaseObject) {

	// List of positions
  	$scope.positions = ['President', 'Vice President', 'Treasurer', 'Secretary', 'Historian', 'Warden', 'Chaplain']

	var officer = $scope.officers.$getRecord($scope.officerIndex);
	$scope.officer = officer;


 	// FIX UP THIS PART OF THE CODE
 	$scope.editOne = function() {
		officer.position = $scope.position;
		officer.name = $scope.name;
		officer.year = $scope.year;

		$scope.officers.$save(officer).then(function() {
			$scope.cancel();
		});
	}

	//when hit cancel, close
	$scope.cancel = function () {
 	    $uibModalInstance.dismiss('cancel');
	};
}])



