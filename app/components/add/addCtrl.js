(function() {
    
    'use strict';

    angular.module('app')
        .controller('addCtrl', ['$log', '$rootScope', 'notesService', addCtrl]);

    function addCtrl($log, $rootScope, notesService) {
        var vm = this;

        vm.note = {};
        vm.addNote = addNote;


        ///////////////////////////


        function addNote() {
            var data = notesService.addNote(vm.note);
            
            $log.debug('[addCtrl] Success: note added', data);
            $rootScope.$broadcast('notesUpdated');
        }
    }

})();