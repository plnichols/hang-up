(function(){
    
    'use strict';

    angular.module('app')
        .factory('jobsService', ['$http', '$log', '$q', jobsService]);

    function jobsService($http, $log, $q) {
        return {
            getJobs: getJobs
        }

        function getJobs() {
            return $http.get('mocks/jobs.json')
                        .then(sendJobsData)
                        .catch(sendJobsError);
        }

        function sendJobsData(response) {
            return response.data;
        }

        function sendJobsError(response) {
            return $q.reject('Error retrieving jobs (HTTP status: ' + response.status + ')');
        }
    }

})();