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
                controllerAs: 'movieVm'
            })
            .when('/movies', {
                templateUrl: '/app/views/movie.browse.tmpl.html',
                controller: 'MovieBrowseController',
                controllerAs: 'browseVm'
            })
            .when('/movies/:mid', {
                templateUrl: '/app/views/movie.stream.tmpl.html',
                controller: 'MovieStreamController',
                controllerAs: 'streamVm'
            })
            .otherwise({
                redirectTo: '/movies'
            });
    }

})();
