(function () {
    'use strict'

    angular.module('app')
        .controller("MovieController", MovieController);

    MovieController.$inject = ['MovieService'];

    function MovieController(MovieService) {
        var movieVm = this;
        movieVm.title = "Hello";
        movieVm.updating = false;
        movieVm.movieIndex = null;

        movieVm.oneAtATime = true;

        //movieVm.status = {
        //    isFirstOpen: true,
        //    isFirstDisabled: false
        //};



        init();

        function init() {
            MovieService
                .getMovies()
                .then(function (data) {
                    movieVm.movies = data;
                    movieVm.movieDetails = movieVm.movies[0];
                }, function (error) {
                    console.log(error);
                });
        }


        //shwdetails
        movieVm.showDetails = function (index) {
            console.log("Index: " + index);
            movieVm.movieDetails = movieVm.movies[index];
        }

        //Submit Button
        movieVm.submitMovie = function () {
            if (!movieVm.updating) {
                movieVm.createMovie();
            } else {
                movieVm.updateMovie();
            }
        }

        //Create a new movie
        movieVm.createMovie = function () {
            // var someDate = new Date(movieVm.newMovie.released);
            // movieVm.newMovie = someDate.getTime();
            console.log(JSON.stringify(movieVm.newMovie));
            if(!movieVm.newMovie.poster){
                movieVm.newMovie.poster = 'http://localhost:8000/noposter.jpg';
            }
            MovieService.createMovie(movieVm.newMovie)
                .then(function (data) {
                    //Create a Toast
                    console.log("Create" + data);
                    return MovieService.getMovies();
                })
                .then(function (data) {
                    movieVm.movies = data;
                })
                .catch(function (error) {
                    console.log("Create Error: " + error);
                })

        }

        //Update a movie
        movieVm.updateMovie = function () {
            MovieService.updateMovie(movieVm.newMovie)
                .then(function (data) {
                    //Create a Toast
                    console.log("Updated" + data);
                    return MovieService.getMovies();
                })
                .then(function (data) {
                    movieVm.movies = data;
                })
                .catch(function (error) {
                    console.log("Update Error: " + error);
                });
            movieVm.updating = false;
        }


        movieVm.deleteMovie = function ($index) {
            MovieService.deleteMovie(movieVm.data[$index].mid)
                .then(function (data) {
                    //Create a toast
                    console.log("Deleted");
                    return MovieService.getMovies();
                })
                .then(function (data) {
                    movieVm.movies = data;
                })
                .catch(function (error) {
                    console.log("Delete Error: " + error);
                })
        }

    }
})();