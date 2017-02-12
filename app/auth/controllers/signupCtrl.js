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
