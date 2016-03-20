(function () {
    'use strict'
    angular
        .module("app")
        .directive("viewComment", viewComment);

    function viewComment() {
        //DDO
        var directive = {
            scope: {
                comment: '='
            },
            templateUrl: 'app/views/comment-row.tmpl.html',
            link: function (scope, elem, attr) {
                //console.log(scope);
                //console.log(elem);
                //console.log(attr);
                //elem.bind('mouseenter', function () {
                //    console.log("MouseEnter");
                //    elem.children().addClass("comment-row-hover");
                //});
                //elem.bind('mouseleave', function () {
                //    console.log("MouseLeave");
                //    elem.children().removeClass("comment-row-hover");
                //});
                //elem.bind('click', function () {
                //    console.log("Click");
                //    elem.children().css("background", "gray");
                //});
            }
        };

        return directive;
    }


})();