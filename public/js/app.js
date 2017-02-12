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
	.when('/search', {
		templateUrl: 'public/html/auth/view/search.html',
		controller: 'searchCtrl',
		controllerAs: 'vm'
	})
	.otherwise({
		redirectTo: '/'
	});
}

angular
	.module('whaleApp')
	.controller('loginCtrl', LoginController);

LoginController.$inject = ['$scope', '$location'];
function LoginController($scope, $location) {
	
}

angular
	.module('whaleApp')
	.controller('signupCtrl', SignupController);

SignupController.$inject = ['storageSvc', 'md5'];
function SignupController(storageSvc, md5) {

	var vm = this;
	vm.data = {};
	vm.users = [];
	
	vm.signup = function() {
		var user = angular.copy(vm.data);

		
		user.password = md5.createHash(user.password);
		delete user.passConf;
		
		vm.users.push(user);
		storageSvc.setLocal('users', vm.users);

		/// redirect to ...


	};

	init();

	function init() {
		vm.users = storageSvc.getLocal('users') || [];
	}
}

angular
    .module('whaleApp')
    .directive('pwdDir', pwdDir);

function pwdDir() {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {

            var me = attrs.ngModel;
            var matchTo = attrs.pwdDir;

            scope.$watchGroup([me, matchTo], function(value) {
                ctrl.$setValidity('pwdmatch', value[0] === value[1]);
            });

        }
    };
}
angular
    .module('whaleApp')
    .service('storageSvc', storageSvc);

function storageSvc() {

    var self = this;

    self.getLocal = function(key) {
        var item = localStorage.getItem(key);
        return (item ? JSON.parse(item) : null);
    };

    self.setLocal = function(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
        return self;
    };

}

angular
    .module('whaleApp')
    .controller('mainCtrl', MainController);

MainController.$inject = ['$rootScope', '$location'];
function MainController($rootScope, $location) {

    var vm = this;

    vm.location = $location.path();

    init();

    function init() {
        $rootScope.$on('$routeChangeSuccess', function() {
            vm.location = $location.path();
        });
    }
};

angular
	.module('whaleApp')
	.controller('searchCtrl', SearchController);

SearchController.$inject = ['$window', 'loginSrv'];

function SearchController($window, loginSrv) {
	/* jshint validthis:true */
	var vm = this;
	vm.validateUser = function () {
		loginSrv.validateLogin(vm.username, vm.password).then(function (data) {
			if (data.isValidUser) {
				$window.location.href = '/index.html';
			}
			else
				alert('Login incorrect');
		});
	}
}