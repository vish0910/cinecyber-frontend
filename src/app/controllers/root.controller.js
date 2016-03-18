(function(){
    'use strict'

    angular
        .module('app')
        .controller('RootController',
            function ($scope, $route, $routeParams, $location,$window, $rootScope, AuthService,
                      UserService) {
                var rootVm = this;
                //$scope.user = AuthService.user;
                //rootVm.user = AuthService.user;
                //$rootScope.logonStatus = AuthService.logonStatus;
                console.log("Root Controller called");
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if (next.access != undefined && !next.access.allowAnonymous && !AuthService.isAuthed()) {
                        console.log("Route change start: error You are not logged in!");

                        //$location.path("#/user/login");
                        //$location.path("#/movie-browse");
                        $window.location.href = '#/user/login';

                    }
                    else if (next.access != undefined && !next.access.allowUser  && !AuthService.isAdmin() && AuthService.isAuthed()) {
                        console.log("Route change start : error You are not Admin!");

                        //$location.path("#/user/profile");
                        $window.location.href = '#/user/profile';
                    }
                });

                rootVm.logoutUser = function () {
                    AuthService.logoutUser();
                        //.success(function (response) {
                        //    AuthService.resetUser();
                        //});
                    $location.path("#/user/login");
                    //$window.location.href = '#/user/profile';
                };

                $rootScope.$on("$locationChangeStart", function (event, next, current) {
                    for (var i in window.routes) {
                        if (next.indexOf(i) != -1) {
                            if (!window.routes[i].access.allowAnonymous && !AuthService.isAuthed()) {
                                console.log("error You are not logged in!");
                                $location.path("#/user/login");
                                //$window.location.href = '#/user/profile';
                            }
                            else if (!window.routes[i].access.allowUser && !AuthService.isAdmin() && AuthService.isAuthed()) {
                                console.log(" Locatoin change start error You are not Admin!");
                                $location.path("#/user/profile");
                            }
                        }
                    }
                });

                //rootVm.isAuthed = function () {
                //    var result = AuthService.isAuthed();
                //    console.log("IsAuther in root called"+result);
                //    return result
                //};




            });
})();