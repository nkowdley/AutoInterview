'use strict';

angular.module('autoInterviewApp')
  .controller('NavbarCtrl', function ($scope) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    },
    {
    	'title': 'Logout',
    	'state':'logout'
    }];

    $scope.isCollapsed = true;
  });
