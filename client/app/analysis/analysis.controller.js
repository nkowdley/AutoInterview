'use strict';
(function() {

function AnalysisController($scope, $http, Upload, NgTableParams,$resource,$stateParams,sharedProperties) {

var self = this;
$scope.user = sharedProperties.getUser();
console.log($scope.user);

//fetchScores();

//$scope.fetchScores = function(){
      $http.get("/getScores")
        .success(function(response) {
          $scope.data = response;
          console.log($scope.data);
      });
  //

}

angular.module('autoInterviewApp')
  .controller('AnalysisController', AnalysisController);

})();
