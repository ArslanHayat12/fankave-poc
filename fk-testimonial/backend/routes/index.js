const passport = require('passport');
const testimonialController = require('../controllers/testimonial')
const testimonialService = require('../services/testimonial')
module.exports = function (app) {

    app.get('/testimonial-poc/twitter/login', passport.authenticate('twitter'))

    app.get('/testimonial-poc/twitter-callback', passport.authenticate('twitter', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/testimonial-poc/users?token=' + req.user.token + '&tokenSecret=' + req.user.tokenSecret)
    })

    app.post('/testimonial-poc/tweet', testimonialService().uploadFile(), testimonialController.sendTweet)

    app.get("/ping", testimonialController.ping);

    app.get("/", testimonialController.initialRedirect);
    app.get("/testimonial-poc", testimonialController.initialRedirect);

    app.get("/testimonial-poc/*", testimonialController.addStaticFile);
    app.get("/testimonial-poc/users", testimonialController.userRedirect);

    app.get("/testimonial-poc/users", testimonialController.userRedirect);

    app.get('/testimonial-poc/linkedin/login', passport.authenticate('linkedin'));
    app.get('/testimonial-poc/linkedin-callback', passport.authenticate('linkedin', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/testimonial-poc/users?token=' + req.user.token + '&id=' + req.user.id)
    });

    app.post('/testimonial-poc/share-on-linkedin', testimonialService().uploadFile(), testimonialController.sendTextMessageToLinkedIn)

};