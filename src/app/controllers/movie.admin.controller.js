(function () {
    'use strict'

    angular.module('app')
        .controller("MovieController", MovieController);

    MovieController.$inject = ['MovieService'];

    function MovieController(MovieService) {
        var movieVm = this;
        movieVm.title = "Hello";
        movieVm.updating = false;
        movieVm.movieDisplayed = null;
        movieVm.isMovieDetailsOpen = true;
        movieVm.isAddUpdateMovieOpen = false;

        movieVm.oneAtATime = true;


        init();

        function init() {
            MovieService
                .getMovies()
                .then(function (data) {
                    movieVm.movies = data;
                    movieVm.showDetails(movieVm.movies[0]);
                }, function (error) {
                    console.log(error);
                });
        }


        //show details
        movieVm.showDetails = function (movie) {
            //console.log("Index: " + index);
            //movieVm.movieDisplayed = index;
            movieVm.movieDetails = movie;
            movieVm.isMovieDetailsOpen = true;
        }

        //Submit Button
        movieVm.submitMovie = function (isValid) {
            console.log("Is Valid:" + isValid);
            if (isValid) {
                if (!movieVm.updating) {
                    movieVm.createMovie();
                } else {
                    movieVm.updateMovie();
                }
            }
        }

        //Create a new movie
        movieVm.createMovie = function () {
            movieVm.newMovie.runtime = movieVm.runtimeFormRange + ' min';
            movieVm.newMovie.released = movieVm.releasedFormDate;
            console.log(JSON.stringify(movieVm.newMovie));
            if (!movieVm.newMovie.poster) {
                movieVm.newMovie.poster = 'http://localhost:8000/noposter.jpg';
            }
            MovieService.createMovie(movieVm.newMovie)
                .then(function (data) {
                    movieVm.newMovie = null;
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
            movieVm.newMovie.runtime = movieVm.runtimeFormRange + ' min';
            movieVm.newMovie.released = movieVm.releasedFormDate;
            MovieService.updateMovie(movieVm.newMovie.mid, movieVm.newMovie)
                .then(function (data) {
                    movieVm.updating = false;
                    return MovieService.getMovies();
                })
                .then(function (data) {
                    movieVm.movies = data;
                })
                .catch(function (error) {
                    console.log("Update Error: " + error);
                });
            movieVm.cancelAddUpdate();
        }


        movieVm.deleteMovie = function (mid) {
            console.log("Delete Movie called");
            MovieService.deleteMovie(mid)
                .then(function (data) {
                    return MovieService.getMovies();
                })
                .then(function (data) {
                    movieVm.movies = data;
                    movieVm.movieDetails = movieVm.movies[0];
                })
                .catch(function (error) {
                    console.log("Delete Error: " + error);
                });
        }

        movieVm.editMovie = function (movie) {
            console.log("Edit Movie called");
            movieVm.updating = true;
            movieVm.newMovie = movie;
            //create date that is displayable
            movieVm.releasedFormDate = new Date(movieVm.movieDetails.released);
            //create runtime that is displayble
            movieVm.runtimeFormRange = parseInt((movieVm.movieDetails.runtime).substring(0, (movieVm.movieDetails.runtime).length - 4));
            console.log(movieVm.releasedFormDate);
            //open movie updater
            movieVm.isAddUpdateMovieOpen = true;
        }

        //Cancel Button is clicked.
        movieVm.cancelAddUpdate = function () {
            movieVm.newMovie = null;
            movieVm.releasedFormDate = null;
            movieVm.runtimeFormRange = null;
            movieVm.updating = false;
            movieVm.isMovieDetailsOpen = true;
        }

    }
})();