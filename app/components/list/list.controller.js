(function(){
    
    'use strict';

    angular.module('app')
        .controller('listController', ['$rootScope', '$log', 'notesService', listController]);

    function listController($rootScope, $log, notesService) {
        /*jshint validthis: true */
        var vm = this;

        vm.notes = {};

        vm.deleteNote = function(id) {
            var data = notesService.deleteNote(id);

            if (data) {
                $log.debug('[listController] Success: Note deleted: ', data);
            } else {
                $log.debug('[listController] Error: Deletion failed');
            }
            
            refreshList();
        };

        activate();

        // refresh list after note has been added/edited
        $rootScope.$on('notesUpdated', function(event) {
            refreshList();
        });


        ///////////////////////////


        function activate() {
            vm.notes = notesService.getAllNotes();
        }


        function refreshList() {
            vm.notes = notesService.getAllNotes();
            $log.debug('[listController] Refresh list');
        }
    }

})();