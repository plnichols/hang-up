(function(){
    
    'use strict';

    angular.module('app')
        .controller('footerController', [footerController]);

    function footerController() {
        /*jshint validthis: true */
        var vm = this;

        vm.date = new Date();

    }

})();