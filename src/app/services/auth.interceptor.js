(function () {
    angular
        .module('app')
        //.config(interceptorConfig);
        .factory('AuthInterceptor', AuthInterceptor)
        .config([
            "$routeProvider",
            "$httpProvider",
            function ($routeProvider, $httpProvider) {
                $httpProvider.defaults.headers.common['Access-Control-Expose-Headers'] = 'Authorization';
                $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization';

            }
        ])
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });

    //interceptorConfig.$inject = ['$httpProvider'];
    //function interceptorConfig($httpProvider) {
    //    $httpProvider.interceptors.push('AuthInterceptor');
    //}
    AuthInterceptor.$inject = ['$window', '$q', 'CONFIG', 'AuthService'];
    function AuthInterceptor($window, $q, CONFIG, AuthService) {
        return {
            // automatically attach Authorization header
            request: function (config) {
                console.log("Request interceptor accesed");
                var token = $window.localStorage['jwtToken'];
                if (config.url.indexOf(CONFIG.API_END_POINT) === 0 && token) {
                    config.headers['Access-Control-Allow-Headers'] = 'Authorization';
                    config.headers["Authorization"] = token;

                    console.log("header added in request");
                }
                console.log(config);
                return config;
            },

            // If a token was sent back, save it
            response: function (res) {
                console.log("Response Interceptor accessed");
                if (res.config.url.indexOf(CONFIG.API_END_POINT) === 0 && res.config.headers.Authorization) {
                    console.log("Interceptor response:" + JSON.stringify(res));
                    //console.log("JWT:"+res.config.headers.Authorization)
                    AuthService.saveJwt(res.config.headers.Authorization);
                }
                return res;
            },

            responseError: function (response) {
                // do stuff or
                console.log("Hi resonseerror");
                console.log(response);
                if (response.status === -1) {
                    console.log("HELLO 401");
                }

                return $q.reject(response);
            }
        }
    }
})();