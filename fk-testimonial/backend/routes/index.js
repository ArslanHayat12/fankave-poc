const passport = require('passport');
const testimonialController = require('../controllers/testimonial')
const testimonialservice = require('../services/testimonial')
module.exports = function (app) {

    app.get('/testimonials/twitter/login', passport.authenticate('twitter'))

    app.get('/testimonials/twitter-callback', passport.authenticate('twitter', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/testimonials/users?token=' + req.user.token + '&tokenSecret=' + req.user.tokenSecret)
    })

    app.post('/testimonials/tweet', testimonialservice().uploadFile(), testimonialController.sendTweet)

    app.get("/ping", testimonialController.ping);

    app.get("/", testimonialController.initialRedirect);
    app.get("/testimonials", testimonialController.initialRedirect);
    app.get("/testimonials/get-token", testimonialController.getToken);
    app.get("/testimonials/get-linkedin-token", testimonialController.getLinkedInToken);

    app.get("/testimonials/users", testimonialController.userRedirect);

    app.get("/testimonials/users", testimonialController.userRedirect);

    app.get('/testimonials/linkedin/login', passport.authenticate('linkedin'));
    app.get('/testimonials/linkedin-callback', passport.authenticate('linkedin', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/testimonials/users?token=' + req.user.token + '&id=' + req.user.id)
    });

    app.post('/testimonials/share-on-linkedin', testimonialservice().uploadFile(), testimonialController.sendTextMessageToLinkedIn)

};