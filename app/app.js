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
            })
            .state('main.edit', {
                url: 'edit/:id',
                templateUrl: 'components/edit/edit.html',
                controller: 'editCtrl',
                controllerAs: 'edit'
            })
            .state('main.add', {
                url: 'add/',
                templateUrl: 'components/add/add.html',
                controller: 'addCtrl',
                controllerAs: 'add'
            })
    }])

    // Local storage settings
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setStorageCookie(0, '/')
            .setStorageCookieDomain('')
            .setNotify(true, true);
    }])

    // Define config and constant
    // .constant('CONSTANT', {
    //     config: {
    //         firebase: {
    //             url: "https://INSERT-YOUR-ACCOUNT-DOMAIN.firebaseio.com/"
    //         }
    //     }
    // })

})();

