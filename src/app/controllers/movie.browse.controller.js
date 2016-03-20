(function () {
    'use strict'
    angular
        .module("app")
        .controller("MovieBrowseController", MovieBrowseController)

    MovieBrowseController.$inject = ['MovieService'];

    function MovieBrowseController(MovieService) {
        var browseVm = this;
        browseVm.welcome = "Welcome!";
        browseVm.sort = {
            by: 'title',
            reverse: false
        };

        init();

        function init() {
            MovieService
                .getMovies()
                .then(function (data) {
                    browseVm.movies = data;
                    browseVm.totalMovies = browseVm.movies.length;
                    //console.log(browseVm.movies);
                }, function (error) {
                    //console.log("Error Function of getMovie() in MovieController was accessed");
                    //console.log(error);
                });
        };

        browseVm.totalMovies = 13;
        browseVm.currentPage = 1;
        browseVm.maxSize = 3;
        console.log("MovieBrowseController Initialized");

    }

})();