$(document).ready(function(){
	$.ajax({
		url: 'https://api.twitter.com/1.1/search/tweets.json?q=%23html5&count=25$result_type=recent',
		type: 'GET',
		dataType: 'jsonp',
		success: function(response){
			console.log(response);
		}
	});
	// $.ajax({
			// type: 'GET',
			// dataType: 'jsonp',
			// url: 'http://search.twitter.com/search.json',
			// data:{q: 'html5'},
			// success: function(data){
				// $.each(data.results, function(index, tweet){
					// $tweets = $(".tweet").first().clone();
					// //console.log(tweet);
					// $tweets.find('.img').attr('src', tweet.profile_image_url)
					// $tweets.find('.name').text(tweet.from_user_name);
					// $tweets.find('.handle').html(twttr.txt.autoLink("@"+tweet.from_user));
					// $tweets.find('.text').html(twttr.txt.autoLink(tweet.text));
					// $tweets.hide().appendTo('#results').delay(400).fadeIn();
				// });
			// }
		// });
});
