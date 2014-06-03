var iniSettings = {};
iniSettings = (function(){
	
	var default_settings = localStorage.getItem('DEFAULT_SETTINGS') || JSON.stringify({'autoRefresh' : 'off',
																		'time' : '0',
																		'mag': '0'
																		});
	
	localStorage.setItem('DEFAULT_SETTINGS',default_settings);
	
	var settings = localStorage.getItem('SETTINGS') || default_settings;
	
	localStorage.setItem('SETTINGS',settings);
	
	console.log(JSON.parse(settings));
	
})();
