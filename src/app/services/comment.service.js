(function () {


    angular.module('app')
        .service('CommentService', CommentService);


    CommentService.$inject = ['$http', '$q', 'CONFIG']

    function CommentService($http, $q, CONFIG) {
        var self = this;

        //Available API
        self.getCommentsByMid = getCommentsByMid;
        self.getCommentsByUid = getCommentsByUid;
        self.getCommentByCid = getCommentByCid;
        self.createComment = createComment;
        self.deleteComment = deleteComment;
        // Get Comments by Mid
        function getCommentsByMid(mid) {
            return $http.get(CONFIG.API_END_POINT + '/api/comments?mid='+mid)
                .then(successFn, errorFn);
        }

        // Get Comments by Uid
        function getCommentsByUid(uid) {
            return $http.get(CONFIG.API_END_POINT + '/api/comments?uid='+uid)
                .then(successFn, errorFn);
        }

        // Get Comments by Cid
        function getCommentByCid(cid) {
            return $http.get(CONFIG.API_END_POINT + '/api/comments/'+cid)
                .then(successFn, errorFn);
        }

        //Create A Comment
        function createComment(comment, mid, uid) {
            return $http.post(CONFIG.API_END_POINT + '/api/comments?mid='+mid+'&uid='+uid, comment)
                .then(successFn, errorFn);
        }


        //Delete a Comment
        function deleteComment(cid) {
            return $http.delete(CONFIG.API_END_POINT + '/api/comments/' + cid)
                .then(successFn, errorFn);
        }

        //Success and Error Callbacks

        function successFn(response) {
            //console.log("SucessFn of Comment Service Accessed");
            return response.data;
        }

        function errorFn(errorResponse) {
            //console.log("ErrorFn of Comment Service Accessed");
            //console.log(errorResponse.status);
            return $q.reject(errorResponse.status);
        }

    }
})();