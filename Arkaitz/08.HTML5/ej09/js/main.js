$(document).ready(function(){
    var twitterdb = new TwitterDB({
        name : "twitter",
        version : "1.0"
    });

    var getTweets = function() {
        console.log('[DB] Database opened');
        console.log('[DB] Getting tweets from Twitter API');

        $.getJSON(
            "data/search.json",
            function(tweets) {
                console.log('[AJAX]: ' + tweets.statuses.length + ' tweets received successfuly');
                $.each(tweets.statuses, function(idx, tweet) {
                    if(idx === tweets.statuses.length-1)
                        twitterdb.addTweet(tweet, loaded);
                    else
                        twitterdb.addTweet(tweet, null);
                });
            }
        );
    }

    var loaded = function() {
        twitterdb.getTweet(428450260784922624, function(tweet) {
            console.log(tweet);
        });
    }

    twitterdb.init(getTweets);
});