var iniSettings = (function(){
	
	var default_settings = localStorage.getItem('DEFAULT_SETTINGS') || JSON.stringify({'autoRefresh' : 'off',
																		'time' : '0',
																		'mag': '0'
																		});
	
	localStorage.setItem('DEFAULT_SETTINGS',default_settings);
	
	var settings = localStorage.getItem('SETTINGS') || default_settings;
	
	localStorage.setItem('SETTINGS',settings);
	
	return {
		getSettings: function(){
			return JSON.parse(settings);
		},
		setSettings: function(mySettings){
			localStorage.setItem('SETTINGS',JSON.stringify(mySettings));
		},
		getDefaults: function(){
			return JSON.parse(default_settings);
		}
	}
	
})();
