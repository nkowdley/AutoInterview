'use strict';

angular.module('autoInterviewApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
    	url: '/login',
   		templateUrl: 'app/partials/login.html',
    	data: {
      		login: true
    	}
  	  })
      .state('signup', {
    	url: '/signup',
   		templateUrl: 'app/partials/signup.html',
    	data: {
      		public: true
    	}
  	  })
  	  .state('apply', {
    	url: '/apply',
   		templateUrl: 'app/apply/apply.html',
    	controller: 'ApplyController',
        controllerAs: 'apply'
  	  })
      .state('analysis', {
        url: '/analysis',
        templateUrl: 'app/analysis/analysis.html', 
        params: { myParam: null},
        controller: 'RegistrationCrl',    
    });
  });
