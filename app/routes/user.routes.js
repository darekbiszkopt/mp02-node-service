const { authJwt } = require('../middleware/authJwt');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
    app.use(function (req, response, next) {
        response.setHeader("Content-Type", "application/json");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Max-Age", 600);
        response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        next();
    });
}

app.get('/user/test/all',controller.allAccess);

app.get('/user/test/user', [authJwt.verifyToken], controller.userBoard);

// app.get('/user/test/user', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

// app.get('/user/test/user', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
