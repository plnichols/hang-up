(function() {
    
    'use strict';

    angular.module('app')
        .controller('addCtrl', ['notesService', '$log', '$rootScope', 'CONSTANT', addCtrl]);

    function addCtrl(notesService, $log, $rootScope, CONSTANT) {
        var vm = this;

        vm.title = 'Add a note';
        vm.subtitle = 'Details of the new job search note';
        vm.note = {};
        vm.addNote = addNote;


        ///////////////////////////


        function addNote() {
            return notesService.addNote(vm.note)
                                .then(addNoteSuccess)
                                .catch(addNoteError);
        }

        function addNoteSuccess(data) {
            $rootScope.$broadcast('noteAdded', data);
            $log.debug('[addCtrl] Success: addNoteSuccess');
        }

        function addNoteError(reason) {
            $log.debug('[addCtrl] Error: addNoteError --> ' + reason);
        }
    }

})();