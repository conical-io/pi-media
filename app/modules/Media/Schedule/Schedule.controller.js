module.exports = function($scope){
	$ = require('jquery');
	sched=this;
	sched.fixDayTitles = false;
	sched.days = [
		{
			name: 'Monday',
			key: 'monday',
			weekend: false
		},
		{
			name: 'Tuesday',
			key: 'tuesday',
			weekend: false
		},
		{
			name: 'Wednesday',
			key: 'wednesday',
			weekend: false
		},
		{
			name: 'Thursday',
			key: 'thursday',
			weekend: false
		},
		{
			name: 'Friday',
			key: 'friday',
			weekend: false
		},
		{
			name: 'Saturday',
			key: 'saturday',
			weekend: true
		},
		{
			name: 'Sunday',
			key: 'sunday',
			weekend: true
		}
	]
	sched.hours = [];


	sched.schedule = {
		monday:{
			'06:00':{
				profile: 'Conferencing',
			}
		},
		tuesday:{
			'06:00':{
				profile: 'Conferencing',
			}
		},
		wednesday:{
			'06:00':{
				profile: 'Conferencing',
			},
			'18:45':{
				profile: 'Church',
			},
			'22:00':{
				profile: 'Conferencing',
			}
		},
		thursday:{
			'06:00':{
				profile: 'Conferencing',
			}
		},
		friday:{
			'06:00':{
				profile: 'Conferencing',
			},
			'18:45':{
				profile: 'Amplified',
			}
		},
		saturday:{
			'06:00':{
				profile: 'Conferencing',
			}
		},
		sunday:{
			'08:00':{
				profile: 'Church',
			}
		}
	}

	sched.sortDay = function(obj){
	    var keys = [];
	    var sorted_obj = {};
		var count = 0;
		for(var key in obj){
	        if(obj.hasOwnProperty(key)){
	            keys.push(key);
	        }
	    }
	    keys.sort();
	    
	    angular.forEach(keys, function(i, key){
	    	count++;
	    	sorted_obj[count] = obj[i];
	    	sorted_obj[count].startTime= i;
	    	sorted_obj[count].position= count;
	    });
	    return {
	    		items: sorted_obj,
	    		count: count
	    	}
	};



	sched.buildHours = function(){
		var times = 0;
		var newMom = moment().hour(0).minute(0);
		while(times<96){
			var newTime = {
				label: newMom.format('HH:mm')
			}
			sched.hours.push(newTime);
			times++;
			newMom.add(900, 'seconds');
		}
	}
	
	sched.formatSchedule = function(){
		angular.forEach(sched.schedule, function(day, dayKey) {
			//the day object contains all the events, first we need to make sure they're in the correct order
			var sortedDay = sched.sortDay(day);
			angular.forEach(sortedDay.items, function(profile, profileKey){
				if(profile.position==1){
					//if its the first event of the day, it has to start at 00:00
					profile.startTime = '00:00';
				}
				if(profile.position==sortedDay.count){
					//if its the last event of the day, it has to end at 24:00
					profile.endTime = '24:00'
				}else{
					profile.endTime = sortedDay.items[profile.position+1].startTime;
				}
				var diff = moment(profile.endTime, 'HH:mm').diff(moment(profile.startTime, 'HH:mm'), 'seconds');
				var intervals = diff/900; //how many 15 minute sections
				profile.intervals = intervals;
				profile.height = intervals*30;
				console.log(profile);
			});
		});
	}


	sched.buildHours();
	sched.formatSchedule();



	sched.addEvent = function(when){
		console.log(when);
	}


	//some jquery stuff
	$(document).scroll(function() {
		console.log('scrolling')
		var originalFixState = sched.fixDayTitles;
		var st = $(document).scrollTop();
		if(st>140){
			sched.fixDayTitles = true;
		}else{
			sched.fixDayTitles = false;
		}
		if(originalFixState!=sched.fixDayTitles){
			$scope.$apply();
		}
	});

	



}