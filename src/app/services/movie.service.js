(function () {


    angular.module('app')
        .service('MovieService', MovieService);


    MovieService.$inject = ['$http', '$q', 'CONFIG']

    function MovieService($http, $q, CONFIG) {
        var self = this;

        //Available API
        self.getMovies = getMovies;
        self.getMovieById = getMovieById;
        self.createMovie = createMovie;
        self.updateMovie = updateMovie;
        self.deleteMovie = deleteMovie;
        // Get All Movies
        function getMovies() {
            return $http.get(CONFIG.API_END_POINT + '/movies')
                .then(successFn, errorFn);
        }

        // Get Movie By Id
        function getMovieById(mid) {
            console.log("MovieService: "+ CONFIG.API_END_POINT + '/movies/' + mid);
            return $http.get(CONFIG.API_END_POINT + '/movies/' + mid)
                .then(successFn, errorFn);
        }

        //Post A Movie
        function createMovie(movie) {
            return $http.post(CONFIG.API_END_POINT + '/movies', movie)
                .then(successFn, errorFn);
        }

        //Update a movie
        function updateMovie(mid, data) {
            return $http.put(CONFIG.API_END_POINT + '/movies/' + mid, movie)
                .then(successFn, errorFn);
        }

        //Delete a Movie
        function deleteMovie(mid) {
            return $http.delete(CONFIG.API_END_POINT + '/movies/' + mid)
                .then(successFn, errorFn);
        }

        //Success and Error Callbacks

        function successFn(response) {
            return response.data;
        }

        function errorFn(errorResponse) {
            console.log(errorResponse.status);
            $q.reject(errorResponse.status);
        }

    }
})();