(function () {

    angular
        .module('app')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$window', '$rootScope']
    function AuthService($window, $rootScope) {
        var self = this;

        //self.user = {
        //    fullname: '',
        //    email: '',
        //    profilePic: '',
        //    logonStatus: false
        //};

        self.user = 'null';
        $rootScope.logonStatus = false;

        self.parseJwt = parseJwt;
        self.saveJwt = saveJwt;
        self.getToken = getToken;
        self.isAuthed = isAuthed;
        self.isAdmin = isAdmin;
        self.logoutUser = logoutUser;
        self.setUser = setUser;
        self.getUser = getUser;
        self.getUserId = getUserId;
        self.resetUser = resetUser;

        //Parse Jwt
        function parseJwt(token) {
            //console.log("Token is:" + token);
            var tokenWithoutBearer = token.substring(7);
            //console.log("Sub Token is:" + tokenWithoutBearer);
            var base64Url = tokenWithoutBearer.split('.')[1];
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

        //Check wheater authorized
        function isAdmin() {
            if (isAuthed()) {
                var token = self.getToken();
                if (token) {
                    var params = self.parseJwt(token);
                    return params['sub'] == 'admin' ? true : false;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        //Sets user data
        function setUser(user) {
            //self.user.fullname = self.loggingInAs.fullname;
            //self.user.email = self.loggingInAs.email;
            //self.user.profilePic = self.loggingInAs.profilePic;
            self.user = user;
            $rootScope.logonStatus = true;
            $rootScope.adminStatus = isAdmin();

        }

        //Get user
        function getUser() {
            //console.log("Get user from authservice Got Called");
            return self.user;
        }

        //Get user
        function getUserId() {
            //console.log("Get user id from authservice Got Called");
            var params = self.parseJwt(getToken());
            return params['jti'];
        }

        //Resets user data
        function resetUser() {
            //self.user.fullname = '';
            //self.user.email = '';
            //self.user.profilePic = '';
            self.user = null;
            $rootScope.logonStatus = false;
            $rootScope.adminStatus = false;
        }

        //Logout user by deleteing the token locally
        function logoutUser() {
            resetUser();
            $window.localStorage.removeItem('jwtToken');
            $window.location.href = '#/user/login';
        }
    }


})();