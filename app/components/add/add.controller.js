(function() {
    
    'use strict';

    angular.module('app')
        .controller('addController', ['$log', '$rootScope', 'notesService', addController]);

    function addController($log, $rootScope, notesService) {
        /*jshint validthis: true */
        var vm = this;

        vm.note = {};
        vm.addNote = addNote;


        ///////////////////////////


        function addNote() {
            var data = notesService.addNote(vm.note);
            
            $log.debug('[addController] Success: note added', data);
            $rootScope.$broadcast('notesUpdated');
            vm.note = {};
        }
    }

})();