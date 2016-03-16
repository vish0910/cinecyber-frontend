(function () {

    angular
        .module('app')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$window']
    function AuthService($window) {
        var self = this;

        self.user = {
            fullname: '',
            email: '',
            profilePic: '',
            logonStatus: false
        };

        self.parseJwt = parseJwt;
        self.saveJwt = saveJwt;
        self.getToken = getToken;
        self.isAuthed = isAuthed;
        self.logoutUser = logoutUser;
        self.setUser= setUser;
        self.resetUser= resetUser;

        //Parse Jwt
        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }

        //Save Jwt. Save it on local storage on client
        function saveJwt(token) {
            $window.localStorage['jwtToken'] = token;
        }

        //Get token from local storage
        function getToken() {
            return $window.localStorage['jwtToken'];
        }

        //Check wheater authorized
        function isAuthed() {
            var token = self.getToken();
            if (token) {
                var params = self.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        }

        //Sets user data
        function setUser(user){
            self.user.fullname = self.loggingInAs.fullname;
            self.user.email = self.loggingInAs.email;
            self.user.profilePic = self.loggingInAs.profilePic;
            self.logonStatus = true;
        }

        //Resets user data
        function resetUser(){
            self.user.fullname = '';
            self.user.email = '';
            self.user.profilePic = '';
            self.user.logonStatus = false;
        }

        //Logout user by deleteing the token locally
        function logoutUser(){
            resetUser();
            $window.localStorage.removeItem('jwtToken');
        }
    }


})();