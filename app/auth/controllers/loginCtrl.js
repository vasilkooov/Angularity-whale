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