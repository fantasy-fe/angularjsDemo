'use strict';

// Declare app level module which depends on filters, and services
angular.module('bootstrapVariablesEditor', [
	'bootstrapVariablesEditor.filters', 
	'bootstrapVariablesEditor.services', 
	'bootstrapVariablesEditor.directives']).
  config([
  	'$locationProvider',
  	'$routeProvider',
  	 function($locationProvider,$routeProvider) {
    	$locationProvider.hashPrefix('!');
    	//$routeProvider.when('/intro', {templateUrl: 'partials/intro.html', controller: IntroCtrl});
    	$routeProvider.when('/editor', 
    		{
    			templateUrl: '/angularjsDemo/Scripts/magic/html/partials/editor.html',
    			controller: LessCtrl
    		});

    	$routeProvider.when('/create-website-pikock', 
    		{
    		    templateUrl: '/angularjsDemo/Scripts/magic/html/partials/create-website-pikock.html',
    			controller: PageCtrl
    		});

    	$routeProvider.otherwise({
    		redirectTo: '/editor'
    	});
  }]);
