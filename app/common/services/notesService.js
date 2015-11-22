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
		};


		function uniqueId(string) {
			// http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
			var prefix = string || "0000";

			return (prefix + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-6);
		}


		function addNote(payload) {
			var data = localStorageService.get('notes') || [],
				time = new Date().getTime();

			payload.timestamp = time;
			payload.id = uniqueId(time);
			data.push(payload);
			localStorageService.set('notes', data);

			return payload;
		}


		function editNote(payload, id) {
			var data = localStorageService.get('notes') || [],
				noteIndex = findNoteIndex(id);

			data[noteIndex] = payload;
			localStorageService.set('notes', data);

			return payload;
		}


		function deleteNote(id) {
			var data = localStorageService.get('notes') || [],
				noteIndex = findNoteIndex(id),
				deleted = data.splice(noteIndex, 1);
				
			localStorageService.set('notes', data);

			return deleted;
		}


		function getAllNotes() {
			return localStorageService.get('notes') || [];
		}


		function getNote(id) {
			var note = _.find(localStorageService.get('notes'), function(n) {
				return n.id == id;
			});

			return note;
		}


		function findNoteIndex(id) {
			var index = _.findIndex(localStorageService.get('notes'), function(n) {
				return n.id == id;
			});

			return index;
		}

	}

})();

