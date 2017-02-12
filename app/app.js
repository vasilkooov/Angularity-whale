'use script';

angular
    .module('whaleApp', ['ngRoute', 'ngMessages', 'angular-md5'])
    .config(Configure)
	.run(function($rootScope) {
		$rootScope.inClub = false;
	});
Configure.$inject = ['$routeProvider'];
function Configure($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'public/html/main/view/main.html',
		
	})
	.when('/login', {
		templateUrl: 'public/html/auth/view/login.html',
		controller: 'loginCtrl',
		controllerAs: 'vm'
	})
	.when('/signup', {
		templateUrl: 'public/html/auth/view/signup.html',
		controller: 'signupCtrl',
		controllerAs: 'vm'
	})
	.when('/search', {
		templateUrl: 'public/html/search/view/search.html',
		controller: 'searchCtrl',
		controllerAs: 'vm'
	})
	.otherwise({
		redirectTo: '/'
	});
}
