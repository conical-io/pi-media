module.exports = function(){
	var PsFc = this;
	PsFc.profiles = {
		'amplified':{
			name: 'Amplified',
			spotifyID: 'amplifiedspotifysplaylist',
			spotify: 'Amplified 2015',
			dropboxDir: '/Amplified/PrePost',
			dropboxLabel: 'PrePost',
			color: '#FF6161'
		},
		'church':{
			name: 'Church',
			spotifyID: 'Churchspotifysplaylist',
			spotify: 'Church 2015',
			dropboxDir: '/Church/PrePost',
			dropboxLabel: 'PrePost',
			color: '#000000'
		},
		'conf':{
			name: 'Conferencing',
			spotifyID: 'Conferencingspotifysplaylist',
			spotify: 'Conferencing 2015',
			dropboxDir: '/Conferencing/PrePost',
			dropboxLabel: 'PrePost',
			color: '#61FF9E'
		}

	}

	return {
		getProfiles: function(){
			return PsFc.profiles;
		},
		getProfile: function(prof){
			return PsFc.profiles[prof];
		}
	}
}