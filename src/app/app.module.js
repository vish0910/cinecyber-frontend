(function () {
    'use strict';
    //angular
    //    .module('app', ['ui.bootstrap']);


    angular
        .module('app', ['ui.bootstrap', 'ngRoute'])
        .config(moduleConfig);

    moduleConfig.$inject = ['$routeProvider'];
    function moduleConfig($routeProvider) {
        $routeProvider
            .when('/movie-admin', {
                templateUrl: '/app/views/movie.admin.tmpl.html',
                controller: 'MovieController',
                controllerAs: 'movieVm',
                access: {allowAnonymous:false}
            })
            .when('/movie-browse', {
                templateUrl: '/app/views/movie.browse.tmpl.html',
                controller: 'MovieBrowseController',
                controllerAs: 'browseVm',
                access: {allowAnonymous:true}
            })
            .when('/movies/:mid', {
                templateUrl: '/app/views/movie.stream.tmpl.html',
                controller: 'MovieStreamController',
                controllerAs: 'streamVm',
                access: {allowAnonymous:false}
            })
            .when('/user/login', {
                templateUrl: '/app/views/user.login.tmpl.html',
                controller: 'UserController',
                controllerAs: 'userVm',
                access: {allowAnonymous:true}
            })
            .when('/user/register', {
                templateUrl: '/app/views/user.register.tmpl.html',
                controller: 'UserController',
                controllerAs: 'userVm',
                access: {allowAnonymous:true}
            })
            .when('/user/profile', {
                templateUrl: '/app/views/user.profile.tmpl.html',
                controller: 'UserController',
                controllerAs: 'userVm',
                access: {allowAnonymous:false}
            })
            .otherwise({
                redirectTo: '/user/login',
            });
    }

})();
