'use script';

angular
    .module('whaleApp', ['ngRoute', 'ngMessages', 'angular-md5'])
    .config(Configure);

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
	.otherwise({
		redirectTo: '/'
	});
}
