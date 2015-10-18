(function(){
    
    'use strict';

    // Declare app level module
    angular.module('app', [
        'ui.router'
    ])


    // Define routing
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'components/main/main.html',
                controller: 'mainCtrl',
                controllerAs: 'main'
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

    // Define config and constant
    .constant('CONSTANT', {
        config: {
            firebase: {
                url: "https://INSERT-YOUR-ACCOUNT-DOMAIN.firebaseio.com/"
            }
        }
    })

})();

