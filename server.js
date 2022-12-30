const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {origin: 'http://localhost:5001'};

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, response, next) {
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Max-Age", 600);
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

const db = require('.app/models');
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Database with { force: true }')
    initial();
})

// simple route
app.get('/', (req, res) => res.json({message: 'Welcome to Server Application'}));

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))

function initial() {
    Role.create({
        id: 1,
        name: 'ROLE_USER'
    });
    Role.create({
        id: 2,
        name: 'ROLE_AGENT'
    });
    Role.create({
        id: 3,
        name: 'ROLE_ADMIN'
    });
}
