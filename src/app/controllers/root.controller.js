(function(){
    'use strict'

    angular
        .module('app')
        .controller('RootController',
            function ($scope, $route, $routeParams, $location, $rootScope, AuthService,
                      UserService) {
                var rootVm = this;
                //$scope.user = AuthService.user;
                rootVm.user = AuthService.user;
                $scope.$on('$routeChangeStart', function (e, next, current) {
                    if (next.access != undefined && !next.access.allowAnonymous && !rootVm.user.isLogged) {
                        $location.path("#/user/login");
                    }
                });

                $scope.logout = function () {
                    AuthService.logoutUser();
                        //.success(function (response) {
                        //    AuthService.resetUser();
                        //});
                };

                $rootScope.$on("$locationChangeStart", function (event, next, current) {
                    for (var i in window.routes) {
                        if (next.indexOf(i) != -1) {
                            if (!window.routes[i].access.allowAnonymous && !AuthService.user.isLogged) {
                                console.log("error", 'You are not logged in!', '');
                                $location.path("#/user/login");
                            }
                        }
                    }
                });
            });
})();