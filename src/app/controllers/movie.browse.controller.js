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
                    console.log(browseVm.movies);
                }, function (error) {
                    console.log(error);
                });
        };

        browseVm.totalMovies = 13;
        browseVm.currentPage = 1;
        browseVm.maxSize = 3;
        //browseVm.movies = [{
        //    title: 'Star Wars: The Force Awakens',
        //    myear: '2015',
        //    plot: 'Three decades after the defeat of the Galactic Empire, a new threat arises. The First Order attempts to rule the galaxy and only a ragtag group of heroes can stop them, along with the help of the Resistance.',
        //    imdbRating: 8.4,
        //    metascore: 81,
        //    genre: "Action, Adventure, Fantasy",
        //    poster: "http://localhost:8000/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE%40._V1_SX300.jpg",
        //}, {
        //    title: 'The Dark Knight',
        //    myear: '2008',
        //    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
        //    imdbRating: 9.0,
        //    metascore: 82,
        //    genre: "Action, Crime, Drama",
        //    poster: "http://localhost:8000/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw%40%40._V1_SX300.jpg",
        //}, {
        //    title: 'The Avengers',
        //    myear: '2012',
        //    plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.",
        //    imdbRating: 7.4,
        //    metascore: 70,
        //    genre: "Action, Sci-Fi, Thriller",
        //    poster: "http://localhost:8000/MV5BMTk2NTI1MTU4N15BMl5BanBnXkFtZTcwODg0OTY0Nw%40%40._V1_SX300.jpg",
        //    imdbID: "tt0848228"
        //}];




        console.log("MovieBrowseController Initialized");

    }


})();