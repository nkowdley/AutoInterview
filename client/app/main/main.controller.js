'use strict';
(function() {

function MainController($scope, $http, Upload) {

  var self = this;
 
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
}

angular.module('autoInterviewApp')
  .controller('MainController', MainController);

})();
