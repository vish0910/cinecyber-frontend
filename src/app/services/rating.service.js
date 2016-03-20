(function () {


    angular.module('app')
        .service('RatingService', RatingService);


    RatingService.$inject = ['$http', '$q', 'CONFIG']

    function RatingService($http, $q, CONFIG) {
        var self = this;

        //Available API
        self.getRatingsByMid = getRatingsByMid;
        self.getRatingsByUid = getRatingsByUid;
        self.getRatingByCid = getRatingByCid;
        self.createRating = createRating;
        self.deleteRating = deleteRating;
        // Get Ratings by Mid
        function getRatingsByMid(mid) {
            return $http.get(CONFIG.API_END_POINT + '/api/ratings?mid='+mid)
                .then(successFn, errorFn);
        }

        // Get Ratings by Uid
        function getRatingsByUid(uid) {
            return $http.get(CONFIG.API_END_POINT + '/api/ratings?uid='+uid)
                .then(successFn, errorFn);
        }

        // Get Ratings by Cid
        function getRatingByCid(cid) {
            return $http.get(CONFIG.API_END_POINT + '/api/ratings/'+cid)
                .then(successFn, errorFn);
        }

        //Create A Rating
        function createRating(rating, mid, uid) {
            console.log("Create Rating called in service");
            return $http.put(CONFIG.API_END_POINT + '/api/ratings?mid='+mid+'&uid='+uid, rating)
                .then(successFn, errorFn);
        }


        //Delete a Rating
        function deleteRating(cid) {
            return $http.delete(CONFIG.API_END_POINT + '/api/ratings/' + cid)
                .then(successFn, errorFn);
        }

        //Success and Error Callbacks

        function successFn(response) {
            console.log("SuccessFn of Rating Service Accessed");
            return response.data;
        }

        function errorFn(errorResponse) {
            console.log("ErrorFn of Rating Service Accessed");
            console.log(errorResponse.status);
            return $q.reject(errorResponse.status);
        }

    }
})();