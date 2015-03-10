module.exports = function($scope){
	$ = require('jquery');
	sched=this;
	sched.fixDayTitles = false;
	sched.scheduleDisplay = {};
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
		wednesday:{
			'09:00':{
				profile: 'Church'
			}
		},
		monday:{
			'09:00':{
				profile: 'Amplfied'
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

	sched.getTopHeight = function(startTime, endTime){
		var durationDiff = moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'seconds');
		var durationIntervals = durationDiff/900; //how many 15 minute sections
		
		var startDiff = moment(startTime, 'HH:mm').diff(moment('00:00', 'HH:mm'), 'seconds');
		var startIntervals = startDiff/900;

		var intervals = durationIntervals;
		var height = durationIntervals*30;
		var top = startIntervals*30;
		return {
			height: height,
			top: top
		}
	}


	sched.getEventsOn = function(day){
		var day = angular.copy(sched.schedule[day]);
		var daySorted = sched.sortDay(day);
		return daySorted.count;
	}
	sched.previousDay = function(day){
		var previousDay = '';
		switch(day) {
		    case 'monday':
		    	previousDay = 'sunday';
		    	break;
		    case 'tuesday':
		    	previousDay = 'monday';
		    	break;
		    case 'wednesday':
		    	previousDay = 'tuesday';
		    	break;
		    case 'thursday':
		    	previousDay = 'wednesday';
		    	break;
		    case 'friday':
		    	previousDay = 'thursday';
		    	break;
		    case 'saturday':
		    	previousDay = 'friday';
		    	break;
		    case 'sunday':
		    	previousDay = 'saturday';
		    	break;
		    default:
		        previousDay = 'monday'
		    	break;
		}
		return previousDay;
	}

	sched.getPreviousEvent = function(dayKey, profile){
		console.log('begin looking for last date from ' + dayKey);
		var previousDay = sched.previousDay(dayKey);
		var eventsOnPreviousDay = sched.getEventsOn(previousDay);
		var count = 0;
		while(eventsOnPreviousDay==0 && count<7){
			previousDay = sched.previousDay(previousDay);
			eventsOnPreviousDay = sched.getEventsOn(previousDay);
			count++;
		}

		if(eventsOnPreviousDay>0){
			var prevDayTmp = angular.copy(sched.schedule[previousDay]);
			var prevDaySorted = sched.sortDay(prevDayTmp);
			var lastEvent = prevDaySorted.items[prevDaySorted.count];
			var newFirstEvent = angular.copy(lastEvent);
				newFirstEvent.startTime= '00:00'
				newFirstEvent.top = 0;
				newFirstEvent.continued = true;
				newFirstEvent.desc = 'continued';
				if(!profile){
					newFirstEvent.endTime='24:00';
				}else{
					newFirstEvent.endTime= profile.startTime;
				}
			
			var topHeight = sched.getTopHeight(newFirstEvent.startTime, newFirstEvent.endTime);
			newFirstEvent.height = topHeight.height;
			newFirstEvent.top = topHeight.top;
			newFirstEvent.autoFill = true;

			console.log(newFirstEvent);
			return newFirstEvent;


		}else{
			return false;
		}
	}

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
		
		var tmpSchedule = angular.copy(sched.schedule);
		console.log(tmpSchedule);

		angular.forEach(sched.days, function(weekDay, weekDayKey) {
			//the day object contains all the events, first we need to make sure they're in the correct order
			var day = angular.copy(sched.schedule[weekDay.key]);
			



			if(typeof day!='undefined'){
				var sortedDay = sched.sortDay(day);
				angular.forEach(sortedDay.items, function(profile, profileKey){
					if(profile.position==1 && profile.startTime!='00:00'){
						//if its the first event of the day, it has to start at 00:00
					//	profile.startTime = '00:00';
						var newFirstEvent = sched.getPreviousEvent(weekDay.key, profile);
						tmpSchedule[weekDay.key]['autoFill'] = newFirstEvent;
					}
					
					if(profile.position==sortedDay.count){
						//if its the last event of the day, it has to end at 24:00
						profile.endTime = '24:00'
					}else{
						profile.endTime = sortedDay.items[profile.position+1].startTime;
					}
					var topHeight = sched.getTopHeight(profile.startTime, profile.endTime);
					profile.height = topHeight.height;
					profile.top = topHeight.top;
					profile.desc = moment(profile.startTime, 'HH:mm').format('H:mma');
					tmpSchedule[weekDay.key][profile.startTime] = profile;



				});
			}else{
				console.log('no events on ' + weekDay.key);
				tmpSchedule[weekDay.key] = {};
				var autoFillEvent = sched.getPreviousEvent(weekDay.key, false);
				if(autoFillEvent){
					tmpSchedule[weekDay.key]['autoFill'] = autoFillEvent;
				}
			}
		});
		console.log(tmpSchedule);
		sched.scheduleDisplay = tmpSchedule;
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