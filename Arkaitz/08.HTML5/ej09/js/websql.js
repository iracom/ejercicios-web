var TwitterDB = {};

TwitterDB = (function(){
    var db = null;

    // Constructor
    function TwitterDB(config) {
        if(Modernizr.websqldatabase) {
            this.name = (config && config.name) || "default";
            this.version = (config && config.version) || "1.0";
            this.desc = (config && config.desc) || "Description";
            this.size = (config && config.size) || 2 * 1024 * 1024;
        } else {
            showStatus('Web SQL Databases not supported');
        }
    }

    var showStatus = function(status) {
        console.log(status);
    };

    var showError = function(tx, error) {
        console.log('[ERROR] ', error);
    };

    TwitterDB.prototype.init = function(callback, error) {
        showStatus('[DB] Initialising DB');

        try {
            if (window.openDatabase) {
                db = openDatabase(this.name, this.version, this.desc, this.size);
                if (db) {
                    db.transaction(function(tx) {
                        var tweetsTable = "CREATE TABLE IF NOT EXISTS tweets (" +
                                                "id INTEGER PRIMARY KEY," + 
                                                "text TEXT," + 
                                                "user_id INTEGER," +
                                                "created_at INTEGER," +
                                                "FOREIGN KEY(user_id) REFERENCES users(id)"+
                                            ")";

                        var usersTable = "CREATE TABLE IF NOT EXISTS users (" +
                                                "id INTEGER PRIMARY KEY," +
                                                "name TEXT," +
                                                "location TEXT," +
                                                "created_at INTEGER" +
                                            ")";

                        tx.executeSql(tweetsTable, [], null, error || showStatus);
                        tx.executeSql(usersTable, [], callback, error || showStatus);
                    });
                } else {
                    showStatus('Error occurred trying to open DB.');
                }
            } else {
                showStatus('Web SQL Databases not supported');
            }
        } catch (e) {
            showStatus('Error occurred during DB init, Web SQL Database supported?');
        }
    }

    TwitterDB.prototype.addTweet = function(tweet, success) {
        db.transaction(function (tx) {
            // Insert user
            var time = (new Date(Date.parse(tweet.user.created_at))).getTime();
            tx.executeSql('INSERT OR IGNORE INTO users (id, name, location, created_at) VALUES (?, ?, ?, ?)',
                          [tweet.user.id, tweet.user.name, tweet.user.location, time / 1000],
                          null,
                          showError);

            // Insert tweet
            var time = (new Date(Date.parse(tweet.created_at))).getTime();
            tx.executeSql('INSERT OR IGNORE INTO tweets (id, text, user_id, created_at) VALUES (?, ?, ?, ?)',
                          [tweet.id, tweet.text, tweet.user.id, time / 1000],
                          success,
                          showError);
        });
    }

    TwitterDB.prototype.getTweet = function(id, success, error) {
        db.transaction(function (tx) {
            // Get tweet
            tx.executeSql('SELECT * FROM tweets WHERE id = ?', [id],
                          function(tx, results) {
                            if(results.rows.length > 0)
                                success(results.rows.item(0));
                            else
                                success(null);
                          }, error);
        });
    }

    TwitterDB.prototype.removeTweet = function(id, success, error) {
        db.transaction(function (tx) {

            // Get Tweet
            this.getTweet(id, function(tx, tweet) {
                if(tweet) {
                    // Delete tweet
                    tx.executeSql('DELETE FROM tweets WHERE id = ?',
                                  [tweet.id],
                                  success,
                                  error);
                }
            });
        });
    }

    return TwitterDB;
})();