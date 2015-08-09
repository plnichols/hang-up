(function(){
    
    'use strict';

    // Declare app level module
    var app = angular.module('app', ['ui.router']);


    // Define routing
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        // $routeProvider
        //     .when('/',{
        //         templateUrl: 'main/main.html',
        //         controller: 'mainCtrl',
        //         controllerAs: 'main'
        //     })
        //     .otherwise({redirectTo: '/'});

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'components/main/main.html',
                controller: 'mainCtrl',
                controllerAs: 'main'
            })
            .state('addjob', {
                url: '/addjob',
                templateUrl: 'components/addJob/addJob.html',
                controller: 'addJobCtrl',
                controllerAs: 'addjob'
            })
    }]);

})();

