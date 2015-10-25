(function(){
    
    'use strict';

    angular.module('app')
        .factory('notesService', ['$log', 'localStorageService', notesService]);

    function notesService($log, localStorageService) {
        return {
            addNote: addNote,
            editNote: editNote,
            getNote: getNote,
            deleteNote: deleteNote,
            getAllNotes: getAllNotes
        }


        function addNote(payload) {
            var data = localStorageService.get('notes') || [];

            payload.timestamp = new Date().getTime();
            data.push(payload);
            localStorageService.set('notes', data);

            return payload;
        }


        function editNote(payload, timestamp) {
            var data = localStorageService.get('notes') || [],
                noteIndex = getNoteIndex(timestamp);

            data[noteIndex] = payload;
            localStorageService.set('notes', data);

            return payload;
        }


        function deleteNote(timestamp) {
            var data = localStorageService.get('notes') || [],
                noteIndex = getNoteIndex(timestamp),
                deleted = data.splice(noteIndex, 1);
                
            localStorageService.set('notes', data);

            return deleted;
        }


        function getAllNotes() {
            return localStorageService.get('notes') || [];
        }


        function getNote(timestamp) {
            var note = _.find(localStorageService.get('notes'), function(n) {
                return n.timestamp == timestamp;
            });

            return note;
        }


        function getNoteIndex(timestamp) {
            var index = _.findIndex(localStorageService.get('notes'), function(n) {
                return n.timestamp == timestamp;
            });

            return index;
        }

    }

})();

