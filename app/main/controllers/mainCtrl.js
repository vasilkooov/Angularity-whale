
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
