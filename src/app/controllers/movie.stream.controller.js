(function () {
    'use strict'
    angular
        .module("app")
        .controller("MovieStreamController", MovieStreamController)

    MovieStreamController.$inject = ['$routeParams','MovieService'];

    function MovieStreamController($routeParams,MovieService) {
        var streamVm = this;
        streamVm.welcome = "Welcome!";

        init();

        function init() {
            console.log($routeParams);
            MovieService
                .getMovieById($routeParams.mid)
                .then(function (data) {
                    streamVm.movie = data;
                    console.log(streamVm.movie);
                }, function (error) {
                    console.log(error);
                });
        };

        console.log("MovieStreamController Initialized");

    }


})();