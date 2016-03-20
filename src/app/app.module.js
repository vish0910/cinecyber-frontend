(function () {
    'use strict';
    //angular
    //    .module('app', ['ui.bootstrap']);


    angular
        .module('app', ['ui.bootstrap', 'ngRoute', 'ngMessages'])
        .config(moduleConfig);

    moduleConfig.$inject = ['$routeProvider'];
    function moduleConfig($routeProvider) {
        $routeProvider
            .when('/movie-admin', {
                templateUrl: '/app/views/movie.admin.tmpl.html',
                controller: 'MovieController',
                controllerAs: 'movieVm',
                access: {allowAnonymous:false , allowUser:false}
            })
            .when('/movie-browse', {
                templateUrl: '/app/views/movie.browse.tmpl.html',
                controller: 'MovieBrowseController',
                controllerAs: 'browseVm',
                access: {allowAnonymous:true , allowUser:true}
            })
            .when('/movies/:mid', {
                templateUrl: '/app/views/movie.stream.tmpl.html',
                controller: 'MovieStreamController',
                controllerAs: 'streamVm',
                access: {allowAnonymous:false , allowUser:true}
            })
            .when('/user/login', {
                templateUrl: '/app/views/user.login.tmpl.html',
                controller: 'UserController',
                controllerAs: 'userVm',
                access: {allowAnonymous:true , allowUser:true}
            })
            .when('/user/register', {
                templateUrl: '/app/views/user.register.tmpl.html',
                controller: 'UserController',
                controllerAs: 'userVm',
                access: {allowAnonymous:true , allowUser:true}
            })
            .when('/user/profile', {
                templateUrl: '/app/views/user.profile.tmpl.html',
                controller: 'ProfileController',
                controllerAs: 'userVm',
                access: {allowAnonymous:false, allowUser:true}
            })
            .when('/movie-top10', {
                templateUrl: '/app/views/top10.tmpl.html',
                controller: 'MovieBrowseController',
                controllerAs: 'browseVm',
                access: {allowAnonymous:true, allowUser:true}
            })
            .otherwise({
                redirectTo: '/movie-browse',
            });
    }

})();
