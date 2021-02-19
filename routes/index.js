var express = require('express');
var router = express.Router();
var express = require('express');
var bnet = require('battlenet-api')();
var BnetStrategy = require('passport-bnet').Strategy;
/* GET home page. */
var OAuth2Strategy = require('passport-oauth2')
var InternalOAuthError = require('passport-oauth2').InternalOAuthError
var passport = require('passport');
var BNET_ID = '733ce0100e254d4383453d09dc0469d9';
var BNET_SECRET = 'JBPSu8X09REIBEj0V7xXm38e0FEmEyhH';

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.use(
  new BnetStrategy(
    { clientID: BNET_ID,
      clientSecret: BNET_SECRET,
      region: 'us',
      scope: "wow.profile sc2.profile",
      callbackURL: "http://localhost:3000" },
    function(accessToken, refreshToken, profile, done) {
        console.log(accessToken,profile)
      process.nextTick(function () {
        return done(null, profile);
      });
    })
);
router.get('/auth/bnet/callback',
        passport.authenticate('bnet', { failureRedirect: '/' }),
        function(req, res){
          res.redirect('/');
        });
router.get('/', function(req, res) {
  if(req.isAuthenticated()) {
    var output = '<h1>Express OAuth Test</h1>' + req.user.id + '<br>';
    if(req.user.battletag) {
      output += req.user.battletag + '<br>';
    }
    output += '<a href="/logout">Logout</a>';
    res.send(output);
  } else {
    res.send('<h1>Express OAuth Test</h1>' +
             '<a href="/auth/bnet">Login with Bnet</a>');
  }
});
router.get('/index', function(req, res, next) {
  console.log(bnet.wow.character.achievements({origin: 'us', realm: 'amanthul', name: 'charni'}, callback));
  res.sendFile('index.html');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
router.get('/index', function (req, res) {
res.render('index', { title: 'Express' });
});

// router.post('/encounters', function (req, res) {

// });

// router.post('/achievements', function (req, res) {
 
// });


// router.post('/pvpStatistics', function (req, res) {

// });
module.exports = router;
