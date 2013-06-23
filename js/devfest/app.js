
/* ROUTE Provider */
angular.module('devfest', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/homepage', {templateUrl: 'partials/homepage.html',   controller: EmptyCtrl}).
      when('/sessions', {templateUrl: 'partials/sessions.html', controller: SessionsCtrl}).
      when('/speakers', {templateUrl: 'partials/speakers.html', controller: SessionsCtrl}).
      when('/agenda', {templateUrl: 'partials/agenda.html', controller: AgendaCtrl}).
      when('/sponsors', {templateUrl: 'partials/sponsors.html', controller: EmptyCtrl}).
      when('/contacts', {templateUrl: 'partials/contacts.html', controller: EmptyCtrl}).
      when('/credits', {templateUrl: 'partials/credits.html', controller: EmptyCtrl}).
      when('/presse', {templateUrl: 'partials/presse.html', controller: EmptyCtrl}).
      when('/cfp', {templateUrl: 'partials/cfp.html', controller: EmptyCtrl}).
      otherwise({redirectTo: '/homepage'});
}]);

/* Navigation controller (manage navigation bar) */
NavigationCtrl.DEFAULT = null;
NavigationCtrl.ACTIVE = 'active';

function NavigationCtrl($scope, $rootScope, $location) {
  $scope.navItems = [ {'label' : 'Accueil', 'url' : '/homepage', 'style': {} }, 
                      {'label' : 'Sessions', 'url' : '/sessions', 'style': {} },
                      {'label' : 'Speakers', 'url' : '/speakers', 'style': {} },
                      {'label' : 'Agenda', 'url' : '/agenda', 'style': {} },
                      {'label' : 'Sponsors', 'url' : '/sponsors', 'style': {} },
                      {'label' : 'Pratique', 'url' : '/contacts', 'style': {} },
                      {'label' : 'Presse', 'url' : '/presse', 'style': {}} ];
  
  $scope.selected = getLocationItem($scope.navItems, $location.path());

  $scope.select = function( item ) {
    // Select the navigation item for the selected page
    if( $scope.selected )
        $scope.selected.style.class = NavigationCtrl.DEFAULT;
    $scope.selected = item;
    $scope.selected.style.class = NavigationCtrl.ACTIVE;
    // Hide the sponsor div in the sponsor page
    if (item.url == '/sponsors') {
        $rootScope.sponsorpage = true;
    } else {
        $rootScope.sponsorpage = false;
    }
  };
  
  // Select the current page to the navigation bar
  $scope.select($scope.selected );
}
//NavigationCtrl.$inject = ['$scope', '$rootScope', '$location'];

function getLocationItem(navItems, location) {
  for (var i = 0; i < navItems.length; i++) {
    if (location == navItems[i].url) {
      return navItems[i];
    }
  }
  return navItems[0];
}

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
function AgendaCtrl($scope) {
  
}
//AgendaCtrl.$inject = ['$scope'];


/* Empty controller */
function EmptyCtrl($scope) {
  // Always nothing to do
}
//EmptyCtrl.$inject = ['$scope'];
