(function(){
    
    'use strict';

    angular.module('app')
        .controller('mainCtrl', ['$rootScope', '$log', 'notesService', mainCtrl]);

    function mainCtrl($rootScope, $log, notesService) {
        /*jshint validthis: true */
        var vm = this;

        vm.notes = {};

        vm.delete = function(timestamp) {
            var data = notesService.deleteNote(timestamp);

            $log.debug('[mainCtrl] Success: Note deleted: ', data);
            refreshList();
        };

        // get list of notes
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
            $log.debug('[mainCtrl] Refresh list');
        }
    }

})();