'use strict';
(function() {

function MainController($scope, $http, Upload, NgTableParams,$resource,$state,sharedProperties) {

  var self = this;
  this.jobs = {};
  this.button = {};
  this.button.applied = false;
  this.applications = [];
  //this.tableParams = new ngTableParams({}, {dataset: this.jobs});
 
  this.upload = function (file) {
        Upload.upload({
            url: '/acceptResume',
            headers: {'Content-Type': 'multipart/form-data'},
            method: 'POST',
            data: {'resume': file}
        }).then(function (resp) {
            console.log('Success');
            self.applied();
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
      getData: function(params) {
        // ajax request to api
        return Api.get(params.url()).$promise.then(function(data) {
          params.total(data.jobs.length);
          for(var i = 0; i < data.jobs.length;i++){
            for(var j = 0; j < data.jobs[i].applicants.length;j++){
              var objects = {"name":data.jobs[i].applicants[j].name,
                             "score":data.jobs[i].applicants[j].score,
                             "title":data.jobs[i].jobname,
                             "company":data.jobs[i].company,
                             "details":data.jobs[i].jobdetails};

              self.applications.push(objects);
            }
            //console.log(self.applications[0].name);
          }
          return self.applications;
        });
      }
    });

    this.applied = function() {
      this.button.applied = true; 
    };

    this.changeState = function(data){
      sharedProperties.setUser(data);
    };

     /*$http.get('/getJobs').then(function(response) {
      self.jobs = response.data;
      console.log(self.jobs);
      console.log(self.jobs[0].jobname);
      self.tableParams.reload();
    });*/


    
}

angular.module('autoInterviewApp')
  .controller('MainController', MainController);

})();
