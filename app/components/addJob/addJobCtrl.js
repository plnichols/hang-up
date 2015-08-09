(function() {
	
	'use strict';

	angular.module('app')
		.controller('addJobCtrl', [addJobCtrl]);

	function addJobCtrl() {
		var vm = this;

		vm.title = 'Add Job';
	}

})();