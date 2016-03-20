(function () {

    angular.module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['$window', 'UserService', 'AuthService'];
    function UserController($window, UserService, AuthService) {
        var userVm = this;
        userVm.message = '';
        userVm.user = AuthService.user;

        userVm.createUser = createUser;
        userVm.loginUser = loginUser;
        //userVm.getUsers = getUsers;
        //userVm.getUserById = getUserById;
        userVm.updateUser = updateUser;
        userVm.deleteUser = deleteUser;
        userVm.isAuthed = isAuthed;
        userVm.logoutUser = logoutUser;


        function loginUser() {
            console.log("Sending from controller:" + userVm.userCredentials);
            UserService.loginUser(userVm.userCredentials)
                .then(function (data) {
                    console.log("Login Successful!" + data);

                    var token = data.token;
                    if (token) {
                        console.log('JWT:', token);
                        AuthService.saveJwt(token);
                    }
                    return UserService.getUserById(data.uid);
                })
                .then(function (data) {
                    AuthService.setUser(data);
                    //Also save it on the controller
                    userVm.user = data;
                    $window.location.href = '#/user/profile';
                })
                .catch(function (error) {
                    console.log("Catch in User controller LoginUser(): " + error);
                    //console.log(error);
                    userVm.message = 'Invalid Credentials. Try Again, or...';
                });
        }

        function logoutUser() {
            //auth.logout && auth.logout()
            AuthService.logout();
        }

        function isAuthed() {
            return AuthService.isAuthed ? AuthService.isAuthed() : false
        }


        //Create a new user
        function createUser(isValid) {
            if (isValid) {
                if (userVm.newUser.userpassword === userVm.newUser.verifypassword) {
                    UserService.createUser(userVm.newUser)
                        .then(function (data) {
                            console.log("Registration Successful!" + data);
                            userVm.statusMessage = "Registration Successful!";
                            userVm.userDetails = data;
                            userVm.newUser = null;
                            $window.location.href = '#/user/login';
                        }, function (error) {
                            userVm.message = "User Account already exists! ";
                            console.log(error);
                        });
                } else {
                    userVm.message = "Password not verified ";
                    userVm.newUser.userpassword = null;
                    userVm.newUser.verifypassword = null;
                }
            }
        }

        //Update an user
        function updateUser() {
            UserService.updateUser(userVm.userDetails.uid, userVm.userDetails)
                .then(function (data) {
                    userVm.userDetails = data;
                    console.log("Updated the user");
                }, function (error) {
                    console.log(error);
                });
            userVm.updating = false;
        }

        function deleteUser() {
            UserService.deleteUser(userVm.userDetails.uid)
                .then(function (data) {
                    //Create a toast
                    console.log("Deleted the user!");
                }, function (error) {
                    console.log(error);
                });
        }

    }
})();