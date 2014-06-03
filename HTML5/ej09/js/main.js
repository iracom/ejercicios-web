$(document).ready(function(){
	var bd = new BD('tweetbd','1.0','Base de datos para Tweets',2*1024*1024);
	
	var success = function() {
		$.getJSON("data/search.json", function(tweets) {
			bd.addTweets(tweets.statuses);
			loaded();
		});		
	}
	
	var loaded = function() {
		bd.removeTweet(428450260784922624,mostrarTweet);
		obtenerTweetFecha("Wed Jan 29 08:32:46 +0000 2014");
	}
	
	var mostrarTweet = function(tweet){
		console.log (tweet);
	}
	
	var obtenerTweetFecha = function(fecha){
		bd.getTweet(fecha,escribirTweets);
	}
	
	var escribirTweets = function(tweets){
		//console.log(tweets.length);
		for(var i=0;i<tweets.length;i++){
			console.log(tweets.item(i));
		}
	}
	
	bd.init(success);
	
})

