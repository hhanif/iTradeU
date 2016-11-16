// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1855804927964663', // your App ID
        'clientSecret'    : '508c9bd67ca796899bbfc2903620d999', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 	'J6VPkjpbdcbKjaf6pdWoZIKNR',
        'consumerSecret'     : '80Xykn6Soiq5y8PDOTCJcdbzY2RqI44ekCiHGET6pPiSIbeEYb',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '985721047157-9heja8aemb382i78qe56uphfu3pp4ubs.apps.googleusercontent.com',
        'clientSecret'     : 'gTBIMcwTCfPrh8IIzwJpF_zw',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
