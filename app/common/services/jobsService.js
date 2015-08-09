(function(){
    
    'use strict';

    angular.module('app')
        .factory('jobsService', ['$http', '$log', '$q', jobsService]);

    function jobsService($http, $log, $q) {
        return {
            getJobs: getJobs,
            getJob: getJob
        }


        // get all jobs
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


        // get a single job by ID
        function getJob(job_id) {
            return $http.get('mocks/jobs.json', {
                            params: {id: job_id}
                        })
                        .then(sendJobData)
                        .catch(sendJobError);
        }

        function sendJobData(response) {
            var job;
            response.data.forEach(function(element){
                if(response.config.params.id == element.id) {
                    job = element;
                }
            });
            return job;
        }

        function sendJobError(response) {
            return $q.reject('Error retrieving job (' +  + '(HTTP status: (' + response.status + ')');
        }
    }

})();