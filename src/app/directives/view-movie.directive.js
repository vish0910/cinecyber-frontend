(function () {
    'use strict'
    angular
        .module("app")
        .directive("viewMovie", viewMovie);

    function viewMovie() {
        //var localMovie = movie;
        //DDO
        var directive = {
            controller: function () {
                var viewMovieVm = this;
                viewMovieVm.imdbClicked = function ($event, message) {
                    console.log(message);
                    $event.stopPropagation();

                };
                viewMovieVm.openStream = function (mid) {

                }

            },
            controllerAs: 'viewMovieVm',
            scope: {
                movie: '='
            },
            templateUrl: 'app/views/movie-row.tmpl.html',
            link: function (scope, elem, attr) {
                elem.bind('mouseenter', function () {
                    //console.log("MouseEnter");
                    elem.children().addClass("movie-row-hover");
                });
                elem.bind('mouseleave', function () {
                    //console.log("MouseLeave");
                    elem.children().removeClass("movie-row-hover");
                });
                //elem.bind('click', function () {
                //    console.log("Click");
                //    //elem.children().css("background", "gray");
                //});
            }
        };

        return directive;
    }


})();