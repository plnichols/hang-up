(function(){
    
    'use strict';

    // Declare app level module
    angular.module('app', [
        'ui.router',
        'LocalStorageModule'
    ])


    // Define routing
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('main', {
                url: '/',
                views: {
                    'add': {
                        templateUrl: 'components/add/add.html',
                        controller: 'addController',
                        controllerAs: 'add'
                    },
                    'list': {
                        templateUrl: 'components/list/list.html',
                        controller: 'listController',
                        controllerAs: 'list'
                    }
                }
            });
    }])

    // Local storage settings
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setStorageCookie(0, '/')
            .setStorageCookieDomain('')
            .setNotify(true, true);
    }]);

})();


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
				deleted = null;

			if (noteIndex > 0) {
				deleted = data.splice(noteIndex, 1);
				localStorageService.set('notes', data);
			}

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


(function() {
    
    'use strict';

    angular.module('app')
        .controller('addController', ['$log', '$rootScope', 'notesService', addController]);

    function addController($log, $rootScope, notesService) {
        /*jshint validthis: true */
        var vm = this;

        vm.note = {};
        vm.addNote = addNote;


        ///////////////////////////


        function addNote() {
            var data = notesService.addNote(vm.note);
            
            $log.debug('[addController] Success: note added', data);
            $rootScope.$broadcast('notesUpdated');
            vm.note = {};
        }
    }

})();
(function(){
    
    'use strict';

    angular.module('app')
        .controller('listController', ['$rootScope', '$log', 'notesService', listController]);

    function listController($rootScope, $log, notesService) {
        /*jshint validthis: true */
        var vm = this;

        vm.notes = {};

        vm.deleteNote = function(id) {
            var data = notesService.deleteNote(id);

            if (data) {
                $log.debug('[listController] Success: Note deleted: ', data);
            } else {
                $log.debug('[listController] Error: Deletion failed');
            }
            
            refreshList();
        };

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
            $log.debug('[listController] Refresh list');
        }
    }

})();
(function(){
    
    'use strict';

    angular.module('app')
        .controller('editCtrl', ['$log', '$rootScope', '$stateParams', 'notesService', editCtrl]);

    function editCtrl($log, $rootScope, $stateParams, notesService) {
        /*jshint validthis: true */
        var vm = this;

        vm.note = {};
        vm.editNote = editNote;

        activate();


        ///////////////////////////


        function activate() {
            var data = notesService.getNote($stateParams.id);

            vm.note = data;
        }


        function editNote(id) {
            var data = notesService.editNote(vm.note, id);
            
            $log.debug('[editCtrl] Success: note edited');
            $rootScope.$broadcast('notesUpdated', data);
        }
    }

})();
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