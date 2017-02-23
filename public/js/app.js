'use script';

angular
    .module('whaleApp', ['ngRoute', 'ngMessages', 'angular-md5'])
    .config(Configure)
	.run(function($rootScope) {
		// vremenno = true
		$rootScope.inClub = true;

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

angular
	.module('whaleApp')
	.controller('loginCtrl', LoginController);
	
LoginController.$inject = ['$location','md5', '$rootScope', 'storageSvc'];

function LoginController($location, md5, $rootScope, storageSvc) {

	var vm = this;
	vm.data = {};

	vm.login = function () {

		var loggedUser = vm.users.filter(function (value) {
			return value.email == vm.data.email
		});

		if (loggedUser.length > 0 && loggedUser[0].password == md5.createHash(vm.data.password)) {
			$rootScope.inClub = true;
			vm.loginForm.$setPristine();
			$location.path("/search");
			return;
		}

		vm.loginForm.email.$setValidity("authError",false);
	};


	init();

	function init() {
		vm.users = storageSvc.getLocal('users') || [];
	}
}
angular
	.module('whaleApp')
	.controller('signupCtrl', SignupController);

SignupController.$inject = ['storageSvc', 'md5', '$location', '$rootScope'];
function SignupController(storageSvc, md5, $location, $rootScope) {

	var vm = this;
	vm.data = {};
	vm.users = [];

	vm.signup = function() {
		var user = angular.copy(vm.data);
		
		user.password = md5.createHash(user.password);
		delete user.passConf;
		
		vm.users.push(user);
		storageSvc.setLocal('users', vm.users);
		
		$rootScope.inClub = true;
		
		/// redirect to ...
		$location.path("/search");
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

SearchController.$inject = ['$rootScope', '$location', 'storageSvc', '$http'];

function SearchController($rootScope, $location, storageSvc, $http) {

	var vm = this;
	vm.list = [];
	vm.name = '';
	init();

	function init() {
		if($rootScope.inClub === false){
			$location.path("/login");
		}

		vm.list = storageSvc.getLocal('items');
console.log(vm.list);
		if (vm.list === null) {
			$http.get('app/assets/items.json').then(function(response) {
		        vm.list = response.data;
		        storageSvc.setLocal('items', vm.list);
		    }, function (err) {
		    	console.error(err);
		    });
		}

	}

}


