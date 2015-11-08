'use strict';
(function() {

function ApplyController($scope, $http, Upload, NgTableParams,$resource) {

  var self = this;
  this.jobs = {};
  this.button = {};
  this.button.applied = false;
  this.user = {};
  this.user.job = '';
  this.user.company = '';
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

    this.applyForJob = function(user_name, user_company, user_job){
      $http({
        method: 'POST',
        url: '/applyJob',
        data: {name: user_name, company: user_company, jobname: user_job} 
      }).then(function (resp) {
            console.log('Success');
            self.applied(user_job,user_company);
        }, function (resp) {
            console.log('Error');
        });  
    };

    this.applied = function(job,company) {
      this.button.applied = true;
      this.user.job = job;
      this.user.company = company;
    };
}

angular.module('autoInterviewApp')
  .controller('ApplyController', ApplyController);

})();
