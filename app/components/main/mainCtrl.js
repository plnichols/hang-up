(function(){
    
    'use strict';

    angular.module('app')
        .controller('mainCtrl', ['$log', 'jobsService', mainCtrl]);

    function mainCtrl($log, jobsService) {
        var vm = this;
        vm.title = 'Job Notes';
        vm.jobs = {};

        activate();


        ///////////////////////////


        function activate() {
            return jobsService.getJobs()
                        .then(getJobsSuccess)
                        .catch(getJobsError);
        }

        function getJobsSuccess(data) {
            $log.debug('[mainCtrl] Success: getJobsSuccess');
            vm.jobs = data;
        }

        function getJobsError(reason) {
            $log.debug('[mainCtrl] Error: getJobsError --> ' + reason);
        }
    }

})();