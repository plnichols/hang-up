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
                        controller: 'addCtrl',
                        controllerAs: 'add'
                    },
                    'list': {
                        templateUrl: 'components/main/main.html',
                        controller: 'mainCtrl',
                        controllerAs: 'main'
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


(function() {
    
    'use strict';

    angular.module('app')
        .controller('addCtrl', ['$log', '$rootScope', 'notesService', addCtrl]);

    function addCtrl($log, $rootScope, notesService) {
        /*jshint validthis: true */
        var vm = this;

        vm.note = {};
        vm.addNote = addNote;


        ///////////////////////////


        function addNote() {
            var data = notesService.addNote(vm.note);
            
            $log.debug('[addCtrl] Success: note added', data);
            $rootScope.$broadcast('notesUpdated');
            vm.note = {};
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
(function(){
    
    'use strict';

    angular.module('app')
        .controller('mainCtrl', ['$rootScope', '$log', 'notesService', mainCtrl]);

    function mainCtrl($rootScope, $log, notesService) {
        /*jshint validthis: true */
        var vm = this;

        vm.notes = {};

        vm.delete = function(timestamp) {
            var data = notesService.deleteNote(timestamp);

            $log.debug('[mainCtrl] Success: Note deleted: ', data);
            refreshList();
        };

        // get list of notes
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
            $log.debug('[mainCtrl] Refresh list');
        }
    }

})();
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