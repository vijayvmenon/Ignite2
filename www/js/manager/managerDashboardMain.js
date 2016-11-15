angular.module('ignite2.managerDashboard', ['LocalStorageModule','nvd3','isteven-omni-bar','angular-svg-round-progressbar','fmp-card','nvd3ChartDirectives','n3-pie-chart','frapontillo.gage','countTo'])


.controller(function($watch,$scope,$rootScope,$interval){
	$interval.cancel($rootScope.supOverrideInterval);
console.log(platform);	
$watch('platform',function(){
	console.log('reached here');
});
});


