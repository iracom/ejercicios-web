var WebSql = (function(){
	
	var webSql = null;
	
	function WebSql(nombreDB,versionDB,descriptionDB,sizeDB){
		this.size = sizeDB || 2*1024*1024;
		this.nombre = nombreDB || "terremotosDB";
		this.version = versionDB || '1.0';
		this.description = descriptionDB || '';
	}
	
	var errorCallback = function(tx,error){
		console.log(error);
	}
	
	WebSql.prototype.init = function(callback){
		try{
			webSql = openDatabase(this.nombre,this.version,this.description,this.size);
			if(webSql){
				webSql.transaction(function(tx){
					
					var crearTabla = "CREATE TABLE IF NOT EXISTS terremotos(" +
										"id STRING PRIMARY KEY," +
										"magnitude REAL," +
										"region TEXT," +
										"time INTEGER," +
										"location TEXT," +
										"depth INTEGER)";
					tx.executeSql(crearTabla,[],callback,errorCallback);
				})
			}
		}
		catch(e){
			
		}
	}
	
	WebSql.prototype.addTerremoto = function(terremoto){
		webSql.transaction(function(tx){
			var añadirTerremoto = 'INSERT OR IGNORE INTO terremotos (id,magnitude,region,time,location,depth) VALUES (?,?,?,?,?,?)'
			tx.executeSql(añadirTerremoto,[terremoto.id,terremoto.mag,terremoto.place,terremoto.time,terremoto.location,terremoto.depth]);
		});
	}
	
	WebSql.prototype.getTerremotoById = function(id,success,error){
		webSql.transaction(function(tx){
			var selectTerremoto = 'SELECT * FROM terremotos WHERE id=? AND magnitude>?';
			tx.executeSql(selectTerremoto,[id,localStorage.getItem('mag')],
							function(tx,results){
								if(results.rows.length > 0){
									success(results.rows.item(0));
								}
								else{
									success(null);
								}
							},error);
		})
	}
	
	WebSql.prototype.getTerremotoByPattern = function(pattern,success,error){
		webSql.transaction(function(tx){
			var patron = '%' + pattern + '%';
			var selectTerremoto = "SELECT * FROM terremotos WHERE region LIKE ? AND magnitude>?";
			tx.executeSql(selectTerremoto,[patron,localStorage.getItem('mag')],
							function(tx,results){
								for(var i=0;i<results.rows.length;i++){
									success(results.rows.item(i));
								}
							},function(tx,error){
								console.log(error);
							});
		})
	}
	
	WebSql.prototype.getTerremotoByMagnitude = function(mag,success,error){
		webSql.transaction(function(tx){
			var selectTerremoto = 'SELECT * FROM terremotos WHERE magnitude>=?';
			tx.executeSql(selectTerremoto,[mag],
							function(tx,results){
								if(results.rows.length > 0){
									success(results.rows.item(0));
								}
								else{
									success(null);
								}
							},error);
		})
	}
	
	WebSql.prototype.getXTerremotos = function(cantidad,success){
		webSql.transaction(function(tx){
			var selectTerremotos = 'SELECT * FROM terremotos LIMIT ?';
			tx.executeSql(selectTerremotos,[cantidad],
							function(tx,results){
								if(results.rows.length > 0){
									var terremotos = [];
									for(var i = 0; i<results.rows.length;i++){
										success(results.rows.item(i));
									}
									
								}
							},
							function(tx,error){
								error.log(error);
							})
		})
	}
	
	return WebSql;
	
})();
