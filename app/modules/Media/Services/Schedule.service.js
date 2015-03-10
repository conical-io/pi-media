module.exports = function(){
	var ScFc = this;
	ScFc.schedule = {
		wednesday:{
			'09:00':{
				profile: 'church'
			}
		}
	}

	return {
		getSchedule: function(){
			return ScFc.schedule;
		},
		addEvent: function(ev){
			/*
				{
					day: 'day',
					time: 'time',
					profile: 'profile'
				}
			*/
			if(typeof ScFc.schedule[ev.day]=='undefined'){
				ScFc.schedule[ev.day] = {}
			}
			ScFc.schedule[ev.day][ev.time] = {
				profile: ev.profile
			}
			console.log(ScFc.schedule)
			return ScFc.schedule;
		}
	}
}