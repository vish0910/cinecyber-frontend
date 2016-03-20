(function () {
    'use strict'
    angular
        .module("app")
        .controller("MovieStreamController", MovieStreamController)

    MovieStreamController.$inject = ['$routeParams', '$window', 'MovieService', 'CommentService', 'AuthService', 'RatingService'];

    function MovieStreamController($routeParams, $window, MovieService, CommentService, AuthService, RatingService) {
        var streamVm = this;
        streamVm.welcome = "Welcome!";
        streamVm.newComment = {ucomment: ''};
        streamVm.ccrating = {avgRating: 0, votes: 0};
        //streamVm.newRating= { urating: 0};

        //streamVm.comments = [
        //    {
        //        ucomment: 'This is a comment with some text.',
        //        timestamp: 1458114803,
        //        poster: 'http://localhost:8000/profile_pics/default/profilealiengreen.jpg'
        //    },
        //    {
        //        ucomment: 'This is a comment with some text.And Some more  with some text.And Some more  with some text.',
        //        timestamp: 1452114803,
        //        poster: 'http://localhost:8000/profile_pics/default/profilealienred.jpg'
        //    },
        //    {
        //        ucomment: 'And Some more  with some text.',
        //        timestamp: 1458014403,
        //        poster: 'http://localhost:8000/profile_pics/default/profilealienblue.jpg'
        //    }
        //];

        init();

        function init() {
            console.log($routeParams);
            streamVm.mid = $routeParams.mid;

            MovieService
                .getMovieById($routeParams.mid)
                .then(function (data) {
                    streamVm.movie = data;
                    console.log(streamVm.movie);
                    return CommentService.getCommentsByMid(streamVm.mid);
                })
                .then(function (data) {
                    streamVm.comments = data;
                    console.log(data);
                    return RatingService.getRatingsByMid(streamVm.mid);
                })
                .then(function (data) {
                    streamVm.ratings = data;
                    displayAvgRatingUser(AuthService.getUserId());
                    //calculateAvgRating();
                    //displayUserRating(AuthService.getUserId());
                    console.log(data);
                })
                .catch(function (error) {
                    $window.location.href = '#/user/login';
                    console.log("catch in stream init called:" + error);
                });
        };

        console.log("MovieStreamController Initialized");

        streamVm.createComment = function (isValid) {
            console.log("Comment Accessed!" + isValid);
            if (isValid) {
                //add timestamp
                streamVm.newComment.timestamp = new Date();
                if (AuthService.isAuthed()) {
                    var uid = AuthService.getUserId();
                    CommentService.createComment(streamVm.newComment, streamVm.mid, uid)
                        .then(function (data) {
                            streamVm.newComment = null;
                            return CommentService.getCommentsByMid(streamVm.mid);
                        })
                        .then(function (data) {
                            streamVm.comments = data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
                else {
                    $window.location.href = '#/user/login';
                }
            }
        }

        //Create Rating
        streamVm.createRating = function () {
            console.log("Rating Accessed!");
            if (AuthService.isAuthed()) {
                var uid = AuthService.getUserId();

                RatingService.createRating(streamVm.newRating, streamVm.mid, uid)
                    .then(function (data) {
                        streamVm.newRating.urating = data.urating;
                        return RatingService.getRatingsByMid(streamVm.mid);
                    })
                    .then(function (data) {
                        streamVm.ratings = data;
                        displayAvgRatingUser(uid);
                        //displayUserRating(uid);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            else {
                $window.location.href = '#/user/login';
            }
        }

        //Display User rating and avg
        function displayAvgRatingUser(uid) {
            var sum = 0;
            streamVm.newRating = {urating: 0};
            streamVm.ccrating.votes = streamVm.ratings.length;
            for (var i = 0; i < streamVm.ccrating.votes; i++) {

                sum += streamVm.ratings[i].urating;
                if (streamVm.ratings[i].user.uid == uid) {
                    streamVm.newRating['urating'] = streamVm.ratings[i].urating;
                    streamVm.userRatedTitle = true;
                }
            }
            streamVm.ccrating.avgRating = sum / streamVm.ccrating.votes;
        }

        streamVm.ratingChanged = function () {
            console.log("Slider manipulated");
            streamVm.createRating();

        }


    }
})();