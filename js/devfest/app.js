
/* ROUTE Provider */
angular.module('devfest', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/homepage', {templateUrl: 'partials/homepage.html',   controller: HomepageCtrl}).
      when('/sessions', {templateUrl: 'partials/sessions.html', controller: SessionsCtrl}).
      when('/speakers', {templateUrl: 'partials/speakers.html', controller: SessionsCtrl}).
      when('/agenda', {templateUrl: 'partials/agenda.html', controller: AgendaCtrl}).
      when('/sponsors', {templateUrl: 'partials/sponsors.html', controller: SponsorsCtrl}).
      when('/contacts', {templateUrl: 'partials/contacts.html', controller: ContactsCtrl}).
      otherwise({redirectTo: '/homepage'});
}]);

/* Homepage controller */
function HomepageCtrl($scope, $routeParams) {

}
//HomepageCtrl.$inject = ['$scope', '$routeParams'];


/* Sessions controller */
function SessionsCtrl($scope, $routeParams, $http) {
	$http.get('json/sessions.json').success(function(data) {
    	$scope.sessions = data.sessions;
    	$scope.speakers = data.speakers;
  	});
}

//SessionsCtrl.$inject = ['$scope', '$routeParams' '$http'];

function SessionDetailCtrl($scope) {
	var speakerId = $scope.session.speaker;
	$scope.speaker = getSpeaker($scope, speakerId);
}

//SessionDetailCtrl.$inject = ['$scope'];

function getSpeaker(scope, speakerId) {
 	for (var i=0; i<scope.speakers.length; i++) {
 		if (scope.speakers[i].id == speakerId) {
 			return scope.speakers[i];
 		}
 	}
};

/* Agenda controller */
function AgendaCtrl($scope, $routeParams) {

}
//AgendaCtrl.$inject = ['$scope', '$routeParams'];


/* Sponsors controller */
function SponsorsCtrl($scope, $routeParams) {
	$scope.sponsorpage = true;
}
//SponsorsCtrl.$inject = ['$scope', '$routeParams'];


/* Contacts controller */
function ContactsCtrl($scope, $routeParams) {

}
//ContactsCtrl.$inject = ['$scope', '$routeParams'];