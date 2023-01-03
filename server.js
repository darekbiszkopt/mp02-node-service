createError = require('http-errors');
express = require('express');
path = require('path');
cookieParser = require('cookie-parser');
logger = require('morgan');
expressValidator = require('express-validator');
flash = require('express-flash');
session = require('express-session');
bodyParser = require('body-parser');
auth = require('./app/config/auth.config');

clientsRouter = require('./app/routes/client.js');
// var customersRouter = require('./app/routes/customers');

app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
        secret: auth.secret,
        saveUninitialized: true,
        cookie: {maxAge: 60000}
    })
)

app.use(flash());
app.use(expressValidator());

app.use('/client', clientsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
app.listen(5001, () => console.log(`Server running on port: http://localhost:5001`))
module.exports = app;
