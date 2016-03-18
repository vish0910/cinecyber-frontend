(function () {

    angular
        .module('app')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$q', 'CONFIG', 'AuthService'];
    function UserService($http, $q, CONFIG, AuthService) {
        var self = this;


        //User Service API
        self.createUser = createUser;
        self.loginUser = loginUser;
        self.getUsers = getUsers;
        self.getUserById = getUserById;
        self.updateUser = updateUser;
        self.deleteUser = deleteUser;


        function createUser(user) {
            return $http.post(CONFIG.API_END_POINT + '/users/register', user)
                .then(successFn, errorFn);
        }

        function loginUser(user) {
            console.log("Login in as:" + user);
            self.loggingInAs = user;
            return $http.post(CONFIG.API_END_POINT + '/users/login', user)
                .then(successLogonFn, errorFn);
        }

        function getUsers() {
            return $http.get(CONFIG.API_END_POINT + '/api/users')
                .then(successFn, errorFn);
        }

        function getUserById(uid) {
            return $http.get(CONFIG.API_END_POINT + '/users/' + uid)
                .then(successFn, errorFn);
        }

        function updateUser(uid, user) {
            return $http.put(CONFIG.API_END_POINT + '/api/users/' + uid, user)
                .then(successFn, errorFn);
        }

        function deleteUser(uid) {
            return $http.delete(CONFIG.API_END_POINT + '/api/users/' + uid)
                .then(successFn, errorFn);
        }

        function successLogonFn(response) {
            console.log("Accessed Service SuccessLogonFn:" + JSON.stringify(response));

            var token = response.data.token;
            if (token) {
                console.log('JWT:', token);
                AuthService.saveJwt(token);
                self.loggingInAs =
                AuthService.setUser(self.loggingInAs);
            }

            return response.data;
        }

        function successFn(response) {
            console.log("Accessed Service SuccessFn:" + JSON.stringify(response));
            return response.data;
        }

        function errorFn(errorResponse) {
            console.log("error occured:" + errorResponse.data);
            return $q.reject(errorResponse.status);
        }

    }
})();