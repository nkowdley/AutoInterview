'use strict';
(function() {

function ApplyController($scope, $http, Upload, NgTableParams,$resource) {

  var self = this;
  this.jobs = {};
  //this.tableParams = new ngTableParams({}, {dataset: this.jobs});
 
  this.upload = function (file) {
        Upload.upload({
            url: '/acceptResume',
            headers: {'Content-Type': 'multipart/form-data'},
            method: 'POST',
            data: {'resume': file}
        }).then(function (resp) {
            console.log('Success');
        }, function (resp) {
            console.log('Error');
        });
    };

    var Api = $resource('/getJobs');
    this.tableParams = new NgTableParams({
      page: 1, // show first page
      count: 10, // count per page
      sorting: {
        jobname: 'asc'
      }
    }, {
      filterDelay: 300,
      getData: function(params) {
        // ajax request to api
        return Api.get(params.url()).$promise.then(function(data) {
          params.total(data.jobs.length);
          return data.jobs;
        });
      }
    });
}

angular.module('autoInterviewApp')
  .controller('ApplyController', ApplyController);

})();