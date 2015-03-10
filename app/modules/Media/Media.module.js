var app = angular.module('PiMediaApp.Media', [])

.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('MediaMain', {
			url:'/media',
			views:{
				'main-view':{
					templateUrl: './modules/Media/Media.tmpl.html',
					controller: 'MediaController as MediaCtrl'
				},
				'pm-content@MediaMain':{
					controller: 'NowPlayingController as NowPlayingCtrl',
					templateUrl: './modules/Media/NowPlaying/NowPlaying.tmpl.html'
				}
			}
		})
		.state('MediaMain.Profiles', {
			url:'/profiles',
			views:{
				'pm-content@MediaMain':{
					controller: 'ProfilesController as ProfilesCtrl',
					templateUrl: './modules/Media/Profiles/Profiles.tmpl.html'
				}
			}
		})
		.state('MediaMain.Schedule', {
			url:'/schedule',
			views:{
				'pm-content@MediaMain':{
					controller: 'ScheduleController as ScheduleCtrl',
					templateUrl: './modules/Media/Schedule/Schedule.tmpl.html'
				}
			}
		})
		.state('MediaMain.Settings', {
			url:'/settings',
			views:{
				'pm-content@MediaMain':{
					controller: 'SettingsController as SettingsCtrl',
					templateUrl: './modules/Media/Settings/Settings.tmpl.html'
				}
			}
		})
		.state('MediaMain.About', {
			url:'/about',
			views:{
				'pm-content@MediaMain':{
					controller: 'AboutController as AboutCtrl',
					templateUrl: './modules/Media/About/About.tmpl.html'
				}
			}
		})
	;
}]);
var MediaController = require('./Media.controller');
var NowPlayingController = require('./NowPlaying/NowPlaying.controller');
var ProfilesController = require('./Profiles/Profiles.controller');
var ScheduleController = require('./Schedule/Schedule.controller');
var SettingsController = require('./Settings/Settings.controller');
var AboutController = require('./About/About.controller');
var ProfileFactory = require('./Services/Profile.service');
var ScheduleFactory = require('./Services/Schedule.service');
app
.factory('ProfileFactory', ['$http', ProfileFactory])
.factory('ScheduleFactory', ['$http', ScheduleFactory])
.controller('MediaController', ['$scope', '$state', MediaController])
.controller('NowPlayingController', [NowPlayingController])
.controller('ProfilesController', ['ProfileFactory', ProfilesController])
.controller('ScheduleController', ['$scope', 'ProfileFactory', 'ScheduleFactory', ScheduleController])
.controller('SettingsController', [SettingsController])
.controller('AboutController', [AboutController])
