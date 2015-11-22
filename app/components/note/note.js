(function() {
    
    'use strict';

    angular.module('app')
        .directive('note', ['$log', 'notesService', note]);

    function note($log, notesService) {
        return {
            link: link,
            templateUrl: 'components/note/note.html',
            restrict: 'EA'
        };

        function link(scope, element, attrs) {
          console.log('directive');
        }
    }

})();