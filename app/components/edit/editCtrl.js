(function(){
    
    'use strict';

    angular.module('app')
        .controller('editCtrl', ['$log', '$stateParams', 'notesService', editCtrl]);

    function editCtrl($log, $stateParams, notesService) {
        var vm = this;

        vm.title = 'Edit note';
        vm.subtitle = 'Modify details of the selected note';
        vm.note = {};

        activate();


        ///////////////////////////


        function activate() {
            console.log('edit: ' + $stateParams.id);
            // return notesService.getNote($stateParams.id)
            //             .then(getNoteSuccess)
            //             .catch(getNoteError);
        }

        function getNoteSuccess(data) {
            $log.debug('[editCtrl] Success: getNoteSuccess');
            vm.note = data;
        }

        function getNoteError(reason) {
            $log.debug('[editCtrl] Error: getNoteError --> ' + reason);
        }
    }

})();