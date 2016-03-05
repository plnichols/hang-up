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
                        controller: 'addController',
                        controllerAs: 'add'
                    },
                    'list': {
                        templateUrl: 'components/list/list.html',
                        controller: 'listController',
                        controllerAs: 'list'
                    },
                    'footer': {
                        controller: 'footerController',
                        controllerAs: 'footer'
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

