(function(){
    
    'use strict';

    // Declare app level module
    angular.module('app', [
        'ui.router',
        'LocalStorageModule'
    ])


    // Define routing
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('main', {
                url: '/',
                views: {
                    'add': {
                        templateUrl: 'components/add/add.html',
                        controller: 'addCtrl',
                        controllerAs: 'add'
                    },
                    'list': {
                        templateUrl: 'components/main/main.html',
                        controller: 'mainCtrl',
                        controllerAs: 'main'
                    }
                }
            });
    }])

    // Local storage settings
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setStorageCookie(0, '/')
            .setStorageCookieDomain('')
            .setNotify(true, true);
    }]);

})();

