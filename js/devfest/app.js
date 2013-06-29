
/** 
 * Application 
 */
var devfestApp = angular.module('devfest', []);


/** 
 *ROUTE Provider 
 */
devfestApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/homepage', {templateUrl: 'partials/homepage.html',   controller: 'EmptyCtrl'}).
      //when('/sessions', {templateUrl: 'partials/sessions.html', controller: 'SessionsCtrl'}).
      when('/speakers', {templateUrl: 'partials/speakers.html', controller: 'SessionsCtrl'}).
      //when('/agenda', {templateUrl: 'partials/agenda.html', controller: 'AgendaCtrl'}).
      when('/sponsors', {templateUrl: 'partials/sponsors.html', controller: 'EmptyCtrl'}).
      when('/contacts', {templateUrl: 'partials/contacts.html', controller: 'EmptyCtrl'}).
      when('/credits', {templateUrl: 'partials/credits.html', controller: 'EmptyCtrl'}).
      when('/presse', {templateUrl: 'partials/presse.html', controller: 'EmptyCtrl'}).
      when('/cfp', {templateUrl: 'partials/cfp.html', controller: 'EmptyCtrl'}).
      when('/subscribe', {templateUrl: 'partials/subscribe.html', controller: 'NavigationCtrl'}).
      //when('/afterparty', {templateUrl: 'partials/afterparty.html', controller: 'EmptyCtrl'}).
      otherwise({redirectTo: '/homepage'});
}]);

/** 
 * Navigation controller (manage navigation bar) 
 */
devfestApp.controller('NavigationCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
  
  var DEFAULT = null;
  var ACTIVE = 'active';
  
  function getLocationItem(navItems, location) {
    for (var i = 0; i < navItems.length; i++) {
      if (location == navItems[i].url) {
        return navItems[i];
      }
    }
    return navItems[0];
  }

  // Url of the sponsor document
  $rootScope.urlPartenariat = "https://docs.google.com/file/d/0Bx5mRU2mXdx0ZkdUWFlRWFFRcWs/edit?usp=sharing";
  
  // Manage the navigation
  $rootScope.navItems = [ {'label' : 'Accueil', 'url' : '/homepage', 'style': {} }, 
                      {'label' : 'Inscription', 'url' : '/subscribe', 'style': {} }, 
                      //{'label' : 'Sessions', 'url' : '/sessions', 'style': {} },
                      {'label' : 'Speakers', 'url' : '/speakers', 'style': {} },
                      //{'label' : 'Agenda', 'url' : '/agenda', 'style': {} },
                      {'label' : 'Sponsors', 'url' : '/sponsors', 'style': {} },
                      {'label' : 'Pratique', 'url' : '/contacts', 'style': {} },
                      //{'label' : 'After Party', 'url' : '/afterparty', 'style': {} },
                      {'label' : 'Presse', 'url' : '/presse', 'style': {}} ];
  
  $rootScope.selected = getLocationItem($rootScope.navItems, $location.path());

  $rootScope.select = function( item ) {
    // Select the navigation item for the selected page
    if( $rootScope.selected )
        $rootScope.selected.style.class = DEFAULT;
    $rootScope.selected = item;
    $rootScope.selected.style.class = ACTIVE;
    // Hide the sponsor div in the sponsor page
    if (item.url == '/sponsors') {
        $rootScope.sponsorpage = true;
    } else {
        $rootScope.sponsorpage = false;
    }
  };
  
  // Select the current page to the navigation bar
  $rootScope.select($rootScope.selected );
}]);


/** 
 * Sessions controller 
 */
devfestApp.controller('SessionsCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
	$http.get('json/sessions.json').success(function(data) {
    	$scope.sessions = data.sessions;
    	$scope.speakers = data.speakers;
  	});
}]);

/** 
 * Sessions Detail controller 
 */
devfestApp.controller('SessionDetailCtrl',['$scope', function ($scope) {
  
  function getSpeaker(scope, speakerId) {
   	for (var i=0; i<scope.speakers.length; i++) {
   		if (scope.speakers[i].id == speakerId) {
   			return scope.speakers[i];
   		}
   	}
  };
  
  var speakerId = $scope.session.speaker;
  $scope.speaker = getSpeaker($scope, speakerId);

}]);

/** 
 * Agenda controller 
 */
devfestApp.controller('AgendaCtrl',['$scope', function ($scope) {
  
}]);

/** 
 * Empty controller 
 */
devfestApp.controller('EmptyCtrl', ['$scope', function ($scope) {
  // Always nothing to do
}]);

