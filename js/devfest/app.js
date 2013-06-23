
/* ROUTE Provider */
angular.module('devfest', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/homepage', {templateUrl: 'partials/homepage.html',   controller: EmptyCtrl}).
      when('/sessions', {templateUrl: 'partials/sessions.html', controller: SessionsCtrl}).
      when('/speakers', {templateUrl: 'partials/speakers.html', controller: SessionsCtrl}).
      when('/agenda', {templateUrl: 'partials/agenda.html', controller: AgendaCtrl}).
      when('/sponsors', {templateUrl: 'partials/sponsors.html', controller: SponsorsCtrl}).
      when('/contacts', {templateUrl: 'partials/contacts.html', controller: EmptyCtrl}).
      when('/credits', {templateUrl: 'partials/credits.html', controller: EmptyCtrl}).
      when('/presse', {templateUrl: 'partials/presse.html', controller: EmptyCtrl}).
      otherwise({redirectTo: '/homepage'});
}]);

/* Root controller */
RootCtrl.DEFAULT = null;
RootCtrl.ACTIVE = 'active';

function RootCtrl($scope) {
  $scope.navItems = [ {'label' : 'Accueil', 'url' : '/homepage', 'style': {'class' : 'active'} }, 
                      {'label' : 'Sessions', 'url' : '/sessions', 'style': {} },
                      {'label' : 'Speakers', 'url' : '/speakers', 'style': {} },
                      {'label' : 'Agenda', 'url' : '/agenda', 'style': {} },
                      {'label' : 'Sponsors', 'url' : '/sponsors', 'style': {} },
                      {'label' : 'Pratique', 'url' : '/contacts', 'style': {} },
                      {'label' : 'Presse', 'url' : '/presse', 'style': {}} ];
  $scope.selected = $scope.navItems[0];
  
  $scope.select = function( item ) {
    if( $scope.selected )
        $scope.selected.style.class = RootCtrl.DEFAULT;
    $scope.selected = item;
    $scope.selected.style.class = RootCtrl.ACTIVE;
  };

}
//RootCtrl.$inject = ['$scope'];

/* Sessions controller */
function SessionsCtrl($scope, $rootScope, $routeParams, $http) {
	$http.get('json/sessions.json').success(function(data) {
    	$scope.sessions = data.sessions;
    	$scope.speakers = data.speakers;
  	});
   $rootScope.sponsorpage = false;
}

//SessionsCtrl.$inject = ['$scope', '$rootScope', '$routeParams' '$http'];

function SessionDetailCtrl($scope, $rootScope) {
	var speakerId = $scope.session.speaker;
	$scope.speaker = getSpeaker($scope, speakerId);
   $rootScope.sponsorpage = false;
}

//SessionDetailCtrl.$inject = ['$scope', '$rootScope'];

function getSpeaker(scope, speakerId) {
 	for (var i=0; i<scope.speakers.length; i++) {
 		if (scope.speakers[i].id == speakerId) {
 			return scope.speakers[i];
 		}
 	}
};

/* Agenda controller */
function AgendaCtrl($scope, $rootScope) {
  $rootScope.sponsorpage = false;
}
//AgendaCtrl.$inject = ['$scope', '$rootScope'];


/* Sponsors controller */
function SponsorsCtrl($scope, $rootScope) {
	$rootScope.sponsorpage = true;
}
//SponsorsCtrl.$inject = ['$scope', '$rootScope'];


/* Empty controller */
function EmptyCtrl($scope, $rootScope) {
  // Always nothing to do
  $rootScope.sponsorpage = false;
}
//EmptyCtrl.$inject = ['$scope', '$rootScope'];
