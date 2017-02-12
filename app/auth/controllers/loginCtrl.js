angular
	.module('whaleApp')
	.controller('loginCtrl', LoginController);

LoginController.$inject = ['$scope', '$location'];
function LoginController($scope, $location) {
	$scope.submit = function() {
		var uEmail = $scope.uEmail;
		var uPassword = $scope.uPassword;
		if($scope.uEmail == 'a@gmail' && $scope.uPassword == '1231') {
			$location.path('/dashboard');
		}
	};
}
