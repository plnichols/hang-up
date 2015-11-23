(function() {
    
    'use strict';

    angular.module('app')
        .directive('noteItem', ['notesService', noteItemDirective]);

    function noteItemDirective(notesService) {
        return {
            restrict: 'EA',
            templateUrl: 'components/note/note.html',
            scope: {},
            controller: NoteController,
            controllerAs: 'vm',
            bindToController: {
                note: '=',
                delete: '&'
            }
        };
    }

    function NoteController() {
        var vm = this;

        vm.edit = function() {
            vm.status = 'edit mode';
        };
    }

})();