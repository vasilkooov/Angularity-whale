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


