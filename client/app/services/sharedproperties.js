'use strict';

/**
 * @ngdoc service
 * @name pickMeAmovieApp.sharedProperties
 * @description
 * # sharedProperties
 * Service in the pickMeAmovieApp.
 */
angular.module('autoInterviewApp')
  .service('sharedProperties', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var _user = null;
    //var _minRating = 1;
    //var _maxRating = 10;

    this.getUser = function () {
        return _user;
    };

    this.setUser = function(value) {
        _user= value;
    };

});
