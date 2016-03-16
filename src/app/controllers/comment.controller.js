(function () {

    'use strict'

    angular
        .module('app')
        .controller("CommentController", CommentController);

    CommentController.$inject = ['CommentService'];
    function CommentController(CommmentService) {
        var commentVm = this;

        commentVm.comments = [
            {
                ucomment: 'This is a comment with some text.',
                timestamp: 1458114803,
                poster: 'http://localhost:8000/profile_pics/default/profilealiengreen.jpg'
            },
            {
                ucomment: 'This is a comment with some text.And Some more  with some text.And Some more  with some text.',
                timestamp: 1452114803,
                poster: 'http://localhost:8000/profile_pics/default/profilealienred.jpg'
            },
            {
                ucomment: 'And Some more  with some text.',
                timestamp: 1458014403,
                poster: 'http://localhost:8000/profile_pics/default/profilealienblue.jpg'
            }
        ];

    }


})();