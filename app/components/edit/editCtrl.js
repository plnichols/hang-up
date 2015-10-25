(function(){
    
    'use strict';

    angular.module('app')
        .controller('editCtrl', ['$log', '$rootScope', '$stateParams', 'notesService', editCtrl]);

    function editCtrl($log, $rootScope, $stateParams, notesService) {
        var vm = this;

        vm.note = {};
        vm.editNote = editNote;

        activate();


        ///////////////////////////


        function activate() {
            var data = notesService.getNote($stateParams.id);

            vm.note = data;
        }


        function editNote(timestamp) {
            var data = notesService.editNote(vm.note, timestamp);
            
            $log.debug('[editCtrl] Success: note edited');
            $rootScope.$broadcast('notesUpdated', data);
        }
    }

})();