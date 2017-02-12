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