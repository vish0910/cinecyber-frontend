(function() {
  'use strict';

  angular
    .module('app')
    .constant('CONFIG', {
      API_END_POINT: 'http://localhost:8080/cinecyber'
    });
})();