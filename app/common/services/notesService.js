(function(){
    
    'use strict';

    angular.module('app')
        .factory('notesService', ['$http', '$log', '$q', 'CONSTANT', notesService]);

    function notesService($http, $log, $q, CONSTANT) {
        return {
            addNote: addNote,
            getNotes: getNotes,
            getNote: getNote,
            deleteNote: deleteNote
        }


        // add note
        function addNote(payload) {
            var firebaseNotes = new Firebase(CONSTANT.config.firebase.url + "/notes");
            var deferred = $q.defer();

            firebaseNotes.push(payload, function addNoteCallback(error) {
                if (error) {
                    deferred.reject(error);
                    $log.info('Error creating new note (' + error + ')');
                } else {
                    deferred.resolve(payload);
                }
            });

            return deferred.promise;
        }



        // delete a note
        function deleteNote() {
            var firebaseNotes = new Firebase(CONSTANT.config.firebase.url + "/notes");
            var deferred = $q.defer();

            // Attach an asynchronous callback to read the data at our posts reference
            // firebaseNotes.on("value", function(snapshot) {
            //     deferred.resolve(snapshot.val());
            // }, function (error) {
            //     deferred.reject('Error retrieving notes (' + error + ')');
            // });

            return deferred.promise;
        }



        // get all notes
        function getNotes() {
            var firebaseNotes = new Firebase(CONSTANT.config.firebase.url + "/notes");
            var deferred = $q.defer();

            // Attach an asynchronous callback to read the data at our posts reference
            firebaseNotes.on("value", function(snapshot) {
                deferred.resolve(snapshot.val());
            }, function (error) {
                deferred.reject('Error retrieving notes (' + error + ')');
            });

            return deferred.promise;
        }



        // get a single note by ID
        function getNote(note_id) {
            return $http.get('mocks/notes.json', {
                            params: {id: note_id}
                        })
                        .then(sendNoteData)
                        .catch(sendNoteError);
        }

        function sendNoteData(response) {
            var note;
            response.data.forEach(function(element){
                if(response.config.params.id == element.id) {
                    note = element;
                }
            });
            return note;
        }

        function sendNoteError(response) {
            return $q.reject('Error retrieving note (' +  + '(HTTP status: (' + response.status + ')');
        }
    }

})();