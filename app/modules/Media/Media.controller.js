module.exports = function($scope, $state){
	self = this;
	self.currentPageTitle = '';
	self.currentPageIcon = '';
	self.menu = [
		{
			name: 'Now Playing',
			sref: 'MediaMain',
			icon: 'fa fa-play'
		},
		{
			name: 'Profiles',
			sref: 'MediaMain.Profiles',
			icon: 'fa fa-dot-circle-o'
		},
		{
			name: 'Schedule',
			sref: 'MediaMain.Schedule',
			icon: 'fa fa-clock-o'
		},
		{
			name: 'Settings',
			sref: 'MediaMain.Settings',
			icon: 'fa fa-sliders'
		},
		{
			name: 'About',
			sref: 'MediaMain.About',
			icon: 'fa fa-info'
		}
	]
	self.isMenuItemActive = function(item){
		if($state.current.name==item.sref){
			return true;
		}
	}
	self.updatePageInfo = function(returnValue){
		angular.forEach(self.menu, function(v, k) {
			if($state.current.name==v.sref){
				self.currentPageTitle = v.name;
				self.currentPageIcon = v.icon;
			}
		});
	}	
	
	$scope.$watch(function(){
		self.updatePageInfo();

	})
}