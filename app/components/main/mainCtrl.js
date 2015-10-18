(function(){
    
    'use strict';

    angular.module('app')
        .controller('mainCtrl', ['$scope', '$log', 'notesService', 'CONSTANT', '$state', mainCtrl]);

    function mainCtrl($scope, $log, notesService, CONSTANT, $state) {
        var vm = this;

        vm.title = 'Notes';
        vm.notes = {};
        vm.state = $state;

        vm.edit = function(note) {
            console.log(note);
        };

        // get list of notes
        activate();

        // refresh list after note has been added
        $scope.$on('noteAdded', function(event, data) {
            activate();
        });


        ///////////////////////////


        function activate() {
            return notesService.getNotes()
                                .then(getNotesSuccess)
                                .catch(getNotesError);
        }

        function getNotesSuccess(data) {
            $log.debug('[mainCtrl] Success: getNotesSuccess');
            vm.notes = data;
        }

        function getNotesError(reason) {
            $log.debug('[mainCtrl] Error: getNotesError --> ' + reason);
        }
    }

})();