(function(){
	'use strict';
	var $ = require('jquery');
	require('angular');
	require('angular-route');
	require('angular-ui-router');
	require('angular-jwt');
	require('angular-inflector');
	require('angular-restmod');
	window.moment = require('moment')
	
	require('../modules/Media/Media.module');

	var app = angular.module('PiMediaApp', [
		'ui.router',
		'angular-jwt',
		'angularUtils.directives.dirPagination',
		'restmod',
		'PiMediaApp.Media'
	])
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			.state('Default', {
				url:''
			})
		;
	}])
	.run(['$rootScope', '$state', '$location', function($rootScope, $state, $location){
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			$(document).off("scroll");
			if(toState.name=='Default'){
				//this needs to know if the user is logged in
				event.preventDefault();
				$state.go('MediaMain');
				return false;
			}
		});
	}]);
}());	