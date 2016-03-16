(function () {

    angular.module('app')
        .controller("ProfileController", ProfileController);

    ProfileController.$inject = ['UserService', 'AuthService'];

    function ProfileController(UserService, AuthService) {
        var profVm = this;

        init();

        function init() {
            console.log("Profile INit is callled");
            profVm.userid = AuthService.getUserId();
            UserService.getUserById(profVm.userid)
                .then(function (data) {
                    profVm.user = data;
                })
                .catch(function (error) {
                    console.log("Error occered in prof controller");
                });
        }

    }


})();