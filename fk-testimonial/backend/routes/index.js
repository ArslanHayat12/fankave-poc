const passport = require('passport');
const testimonialController = require('../controllers/testimonial')
const testimonialService = require('../services/testimonial')
module.exports = function (app) {

    app.get('/v1/api/twitter/login', passport.authenticate('twitter'))

    app.get('/v1/api/twitter-callback', passport.authenticate('twitter', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/v1/api/users?token=' + req.user.token + '&tokenSecret=' + req.user.tokenSecret)
    })

    app.post('/v1/api/tweet', testimonialService().uploadFile(), testimonialController.sendTweet)

    app.get("/ping", testimonialController.ping);

    app.get("/", testimonialController.initialRedirect);
    app.get("/testimonials", testimonialController.initialRedirect);
    app.get("/sharestories", testimonialController.initialRedirect);
    app.get("/v1/api/get-token", testimonialController.getToken);
    app.get("/v1/api/get-linkedin-token", testimonialController.getLinkedInToken);

    app.get("/v1/api/users", testimonialController.userRedirect);

    app.get('/v1/api/linkedin/login', passport.authenticate('linkedin'));
    app.get('/v1/api/linkedin-callback', passport.authenticate('linkedin', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/v1/api/users?token=' + req.user.token + '&id=' + req.user.id)
    });
    app.post('/v1/api/share-on-linkedin', testimonialService().uploadFile(), testimonialController.sendTextMessageToLinkedIn)
    app.post('/v1/api/transcription', testimonialController.getTranscription)
    
};