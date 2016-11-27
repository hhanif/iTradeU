var path = require('path');
var jsonQuery = require('json-query');


var Item = require('./models/item');

module.exports = function(app, passport) {

  app.get('/user',function(req,res){
    res.json({user:req.user});
  });

// Object routes===============================================================

//Rendes createOjbect View
app.get('/createItem',function(req,res){
  res.render('../app/views/createItem.ejs');
});

//Store object
app.post('/createItem',function(req,res){

    var newItem   = new Item();
    newItem.title= req.body.title;
    newItem.user_id= req.user;
    newItem.description = req.body.description;
    newItem.match.keyword1.original = req.body.keyword1;
    newItem.match.keyword2.original = req.body.keyword2;
    newItem.match.keyword3.original = req.body.keyword3;

    newItem.save(function (err){
    if (err){
        console.log(err);
}else{
    console.log('we fucked');}
});
    console.log(newItem.title);
    res.redirect('/home');

});
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('../app/views/index.ejs');
    });

    // PROFILE SECTION =========================

    app.get('/items', isLoggedIn, function(req, res) {
      Item.find().where('user_id', req.user).exec(function(err, item) {
        if(err) {
            console.log(err);
            res.status('400').send({error: err});
        } else{
            console.log('Found:', item);
            res.json({items: item});
        }
      });
    });

    app.get('/profile', function(req, res) {
        res.render('../app/views/profile.ejs',{user:req.user});
    });


    ////////////////////////////////////////////////////////////
////////////////// /MATCHING ITEMS ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

/////////////get list of items and query them
    app.post('/match', function(req, res) {

      var jsonMatches;
      Item.find().where().exec(function(err, item) {
        if(err) {
            console.log(err);
            res.status('400').send({error: err});
        } else {
          wantMeList = jsonQuery(
            ':wmatch({match.keyword1.original}):|:wmatch({match.keyword2.original})|:wmatch({match.keyword3.original})',
             {data: item, locals: {

                       // narrows list of all items to items whose keywords fit title
                       wmatch: function(input, value){
                         var matchItemArray = [];
                         //check if each item isn't user's own, and one if its keyword matches users item
                         for (i=0; i <= value.length-1; i++){
                           if (value[i] === req.body.title) {
                             //console.log('Match found:', input[i]);
                             matchItemArray.push(input[i]);
                           };
                         };
                         console.log('\n',{itemsWhoseKeywordsFit: matchItemArray});
                         return matchItemArray;
                       }

             }}).value;
          iWantList = jsonQuery(':imatch({title})', {data: wantMeList, locals:{

                        //check if titles of the items left match any of my keywords
                        imatch: function(input, value){
                          var matchItemArray = [];
                          //check if each item isn't user's own, and matches a keyword of given
                          for (i=0; i <= value.length-1; i++){
                            if (input[i].user_id != req.body.user_id & value[i] === req.body.match.keyword1.original | value[i] === req.body.match.keyword2.original | value[i] === req.body.match.keyword3.original) {
                              matchItemArray.push(input[i]);
                            };
                          };
                          console.log('\n',{itemsWhoseTitlesMatchMyKeywords: matchItemArray});
                          return matchItemArray;
                        }

          }}).value;
          console.log('\n!!!!MATCHED ITEMS!!!!:\n', iWantList)
          res.json({matcheditems : iWantList});
          }
        });
      });


    //HOME PAGE ===================================
    app.get('/home', isLoggedIn, function(req, res) {
         res.sendFile(path.join(__dirname, '../public','/index.html'));
    });


    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('../app/views/login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('../app/views/signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            res.render('../app/views/connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/home', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/home',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/home');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/home');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/home');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/home');
        });
    });

};

///////////////////////////////////////////////////////////////////////////////////////

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
