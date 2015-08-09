(function(){
    
    'use strict';

    angular.module('app')
        .controller('editJobCtrl', ['$log', '$stateParams', 'jobsService', editJobCtrl]);

    function editJobCtrl($log, $stateParams, jobsService) {
        var vm = this;
        vm.title = 'Selected Job';
        vm.job = {};

        activate();


        ///////////////////////////


        function activate() {
            return jobsService.getJob($stateParams.job_id)
                        .then(getJobSuccess)
                        .catch(getJobError);
        }

        function getJobSuccess(data) {
            $log.debug('[editJobCtrl] Success: getJobSuccess');
            vm.job = data;
        }

        function getJobError(reason) {
            $log.debug('[editJobCtrl] Error: getJobError --> ' + reason);
        }
    }

})();