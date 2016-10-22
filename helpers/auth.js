// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '789230257883826', // facebook id
        'clientSecret'  : '95afa0444f573cf44307b2a5b26d4189', // facebook secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '576370484479-pkh6ri7o6096651co895fqp3a81dskb7.apps.googleusercontent.com', //google id
        'clientSecret'  : '4SceTNsIsMabfDY3X8-qmenN',// google secret
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
