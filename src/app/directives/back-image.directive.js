(function () {
    'use strict'
    angular
        .module("app")
        .directive('backImage', backImage);

        function backImage() {
            //var directive = {
            //    link: function (scope, elem, attrs) {
            //        var url = attrs.backImage;
            //        console.log(attrs);
            //        elem.css({
            //            'background-image': 'url(' + url + ') 50% 50%',
            //            'background-size': 'cover'
            //        });
            //    }
            //};
            //console.log("Directive")
            //return directive;
            return function(scope, element, attrs){
                attrs.$observe('backImage', function(value) {
                    element.css({
                        'background-image': 'url("' + value +'")',
                    });
                });
            };
        };
})();
