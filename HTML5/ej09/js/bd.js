var BD;

BD = (function() {

	var bd = null;

	function BD(nombreBD, versionBD, descripcionBD, espacioBD) {
		this.espacio = espacioBD || 2 * 1024 * 1024;
		this.descripcion = descripcionBD || '';
		this.nombre = nombreBD || "default";
		this.version = versionBD || "1.0";
	}
	
	BD.prototype.init = function(success, error) {
		bd = openDatabase(this.nombre, this.version, this.descripcion, this.espacio);
		
		crearTabla('users',['id','nombre','imagen'],function(){});
		crearTabla('tweets',['id','texto','usuario','fecha'], success, error);
	};
	
	var crearTabla = function(nombreT, campos, success, error) {
		var sentenciaSQL = 'CREATE TABLE IF NOT EXISTS ' + nombreT + '(';
		for (var i = 0; i < campos.length - 1; i++) {
			if(i == 0) {
				sentenciaSQL += campos[i] + ' INTEGER PRIMARY KEY,';
			} else {
				sentenciaSQL += campos[i] + ',';
			}
			
		}
		sentenciaSQL += campos[campos.length - 1] + ')';
		bd.transaction(function(tx){
			tx.executeSql(sentenciaSQL, [], success);
		});
	}
	
	BD.prototype.addTweets = function(tweets) {
		$.each(tweets, function(idx, tweet){
			bd.transaction(function(tx){
				tx.executeSql('INSERT OR IGNORE INTO USERS VALUES (?,?,?)',[tweet.user.id,tweet.user.name,tweet.user.profile_image_url]);
				var time = (new Date(Date.parse(tweet.created_at))).getTime();
				tx.executeSql('INSERT OR IGNORE INTO TWEETS VALUES (?,?,?,?)',[tweet.id,tweet.text,tweet.user.id,time/1000]);
			});
		});
	}
	
	BD.prototype.removeTweet = function(id,success){
		bd.transaction(function(tx){
			tx.executeSql('SELECT * FROM tweets WHERE id=?',[id],
			function(tx,results){
				success(results.rows.item(0));
			});
			tx.executeSql('DELETE FROM TWEETS WHERE id=?',[id]
			,function(tx,results){
				
			}
			,function(tx,error){
				console.log(error);
			});
		});
	}
	
	BD.prototype.updateTweet = function(tweet){
		bd.transaction(function(tx){
			tx.executeSql('UPDATE tweets SET texto=?, usuario=?, fecha=? WHERE id=?',[tweet.texto,tweet.usuario,tweet.fecha,tweet.id],function(tx,results){
				console.log('Tweet Actualizado');
			});
		});
	}
	
	BD.prototype.getTweet = function(fecha,escribirTweets){
		bd.transaction(function(tx){
			var miFecha = (new Date(Date.parse(fecha))).getTime();
			tx.executeSql('SELECT T.id,T.texto,T.usuario,U.nombre FROM tweets AS T CROSS JOIN users AS U WHERE T.usuario=U.id AND T.fecha>?',[miFecha/1000],function(tx,results){
				escribirTweets(results.rows);
			}, function(tx,error){
				console.log(error);
			});
		});
	}
	
	return BD;
})();

