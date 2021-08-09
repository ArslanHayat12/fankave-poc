const passport = require('passport');
const testimonialController = require('../controllers/testimonial')
const sharestorieservice = require('../services/testimonial')
module.exports = function (app) {

    app.get('/sharestories/twitter/login', passport.authenticate('twitter'))

    app.get('/sharestories/twitter-callback', passport.authenticate('twitter', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/sharestories/users?token=' + req.user.token + '&tokenSecret=' + req.user.tokenSecret)
    })

    app.post('/sharestories/tweet', sharestorieservice().uploadFile(), testimonialController.sendTweet)

    app.get("/ping", testimonialController.ping);

    app.get("/", testimonialController.initialRedirect);
    app.get("/sharestories", testimonialController.initialRedirect);
    app.get("/sharestories/get-token", testimonialController.getToken);
    app.get("/sharestories/get-linkedin-token", testimonialController.getLinkedInToken);

    app.get("/sharestories/users", testimonialController.userRedirect);

    app.get("/sharestories/users", testimonialController.userRedirect);

    app.get('/sharestories/linkedin/login', passport.authenticate('linkedin'));
    app.get('/sharestories/linkedin-callback', passport.authenticate('linkedin', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/sharestories/users?token=' + req.user.token + '&id=' + req.user.id)
    });

    app.post('/sharestories/share-on-linkedin', sharestorieservice().uploadFile(), testimonialController.sendTextMessageToLinkedIn)

};