const passport = require('passport');
const testimonialController = require('../controllers/testimonial')
const testimonialservice = require('../services/testimonial')
module.exports = function (app) {

    app.get('/api/twitter/login', passport.authenticate('twitter'))

    app.get('/api/twitter-callback', passport.authenticate('twitter', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/api/users?token=' + req.user.token + '&tokenSecret=' + req.user.tokenSecret)
    })

    app.post('/api/tweet', testimonialservice().uploadFile(), testimonialController.sendTweet)

    app.get("/ping", testimonialController.ping);

    app.get("/", testimonialController.initialRedirect);
    app.get("/testimonials", testimonialController.initialRedirect);
    app.get("/api/get-token", testimonialController.getToken);
    app.get("/api/get-linkedin-token", testimonialController.getLinkedInToken);

    app.get("/api/users", testimonialController.userRedirect);

    app.get('/api/linkedin/login', passport.authenticate('linkedin'));
    app.get('/api/linkedin-callback', passport.authenticate('linkedin', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/api/users?token=' + req.user.token + '&id=' + req.user.id)
    });

    app.post('/api/share-on-linkedin', testimonialservice().uploadFile(), testimonialController.sendTextMessageToLinkedIn)

};