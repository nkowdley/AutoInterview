'use strict';
(function() {

function MainController($scope, $http, Upload) {
  /*
  var self = this;
  this.awesomeThings = [];

  $http.get('/api/things').then(function(response) {
    self.awesomeThings = response.data;
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    $http.post('/api/things', { name: self.newThing });
    self.newThing = '';
  };

  this.deleteThing = function(thing) {
    $http.delete('/api/things/' + thing._id);
  };
  */
  var self = this;
console.log('poop');
  this.upload = function (file) {
    console.log("Gooble gork");
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
