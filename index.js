'use strict';

const mysql = require('mysql');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const clientValidator = require('./app/validators/client.validators');
const accountValidator = require('./app/validators/account.validators');
const bankValidator = require('./app/validators/bank.validators');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.use(function (req, response, next) {
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Max-Age", 600 );
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

var mySqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Uzi2115',
    database: 'bank',
    port: 3308,
    multipleStatements: true
})

mySqlConnection.connect((err) => {
    if (!err) {
        console.log('Db connection succeded.')
    } else {
        console.log('Db connection failed. \n Error: ' + JSON.stringify(err, undefined, 2))
    }
})

module.exports = mySqlConnection

app.listen(5001, () => console.log(`Server running on port: http://localhost:5001`))

/////
/////
/////
//// CLIENT REST
// Get all clients
app.get('/client', cors(), (req, res) => {
    mySqlConnection.query('SELECT * from client', (err, rows, fields) => {
        if (!err) {
            // console.log(rows)
            res.send(rows)
        } else {
            // console.log(err)
        }
    })
})

// Get an client
app.get('/client/:id', cors(), (req, res) => {
    mySqlConnection.query('SELECT * from client WHERE client_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows)
        } else {
            console.log(err)
        }
    })
})

// Delete an client
app.post('/client/delete', cors(), (req, res) => {
    mySqlConnection.query('DELETE from client WHERE client_id = ?', [+req.body.client_id], (err, rows, fields) => {
        if (!err) {
            console.log(req.body.id)
            res.send('Deleted succesfully')
        } else {
            console.log(err)
        }
    })
})

// Insert an client
app.post('/client', cors(), (req, res) => {
    const client = req.body;

    if (clientValidator.isClientValid(client)) {
        const insertSql = 'INSERT INTO client (`pesel`, `first_name`, `surname`, `addresss`, `can_get_loan`)' +
            ' values(?,?,?,?,?)';

        mySqlConnection.query(insertSql, [client.pesel, client.first_name, client.surname, client.addresss, client.can_get_loan],
            (err, rows) => {
                if (!err) {
                    res.send(rows)
                } else {
                    console.log(err)
                }
            })
    } else {
        res.send(clientValidator.clientInvalidResponse(client))
    }
})

// Update an client
app.post('/client/update', cors(), (req, res) => {
    const client = req.body;

    if (clientValidator.isClientValid(client)) {

        const updateSql = 'UPDATE client SET pesel = ? , first_name = ? , surname = ? , addresss =  ? , can_get_loan= ? WHERE client_id = ?';

        mySqlConnection.query(updateSql, [client.pesel, client.first_name, client.surname, client.addresss, JSON.parse(client.can_get_loan.toLowerCase()), client.client_id],
            (err, rows, fields) => {
                if (!err) {
                    res.send(rows)
                } else {
                    console.log(err)
                }
            })
    } else {
        res.send(clientValidator.clientInvalidResponse(client))
    }
})

////////
////////
////////
////////
//// BANK REST
// Get all banks
app.get('/bank', cors(), (req, res) => {
    mySqlConnection.query('SELECT * from bank', (err, rows, fields) => {
        if (!err) {
            // console.log(rows)
            res.send(rows)
        } else {
            // console.log(err)
        }
    })
})

// Get an bank
app.get('/bank/:id', cors(), (req, res) => {
    mySqlConnection.query('SELECT * from bank WHERE bank_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows)
        } else {
            console.log(err)
        }
    })
})

// Delete an bank
app.post('/bank/delete', cors(), (req, res) => {
    mySqlConnection.query('DELETE from bank WHERE bank_id = ?', [+req.body.bank_id], (err, rows, fields) => {
        if (!err) {
            console.log(req.body.id)
            res.send('Deleted succesfully')
        } else {
            console.log(err)
        }
    })
})

// Insert an bank
app.post('/bank', cors(), (req, res) => {
    const bank = req.body;
    if (bankValidator.isBankValid(bank)) {
        const insertSql = 'INSERT INTO bank (`name`, `address`) values(?,?)';
        mySqlConnection.query(insertSql, [bank.name, bank.address],
            (err) => {
                if (!err) {
                    req.res.send([])
                }
            })
    } else {
        res.send(bankValidator.bankInvalidResponse(bank))
    }
})

// Update an bank
app.post('/bank/update', cors(), (req, res) => {
    const bank = req.body;

    if (bankValidator.isBankValid(bank)) {
        const updateSql = 'UPDATE bank SET name = ? , address = ? WHERE bank_id = ?';
        mySqlConnection.query(updateSql, [bank.name, bank.address, bank.bank_id],
            (err) => {
                if (!err) {
                    req.res.send([])
                }
            })
    } else {
        res.send(bankValidator.bankInvalidResponse(bank))
    }
})

//////
//////
//////
// ////
//// ACCOUNT REST
// Get all account
app.get('/account', cors(), (req, res) => {
    mySqlConnection.query('SELECT * from account', (err, rows, fields) => {
        if (!err) {
            // console.log(rows)
            res.send(rows)
        } else {
            // console.log(err)
        }
    })
})

// Get an account
app.get('/account/:id', cors(), (req, res) => {
    mySqlConnection.query('SELECT * from account WHERE account_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows)
        } else {
            console.log(err)
        }
    })
})

// Delete an bank
app.post('/account/delete', cors(), (req, res) => {
    mySqlConnection.query('DELETE from account WHERE account_id = ?', [+req.body.account_id], (err, rows, fields) => {
        if (!err) {
            console.log(req.body.account_id)
            res.send('Deleted succesfully')
        } else {
            console.log(err)
        }
    })
})

// Insert an account
app.post('/account', (req, res) => {
    const account = req.body;
    if (accountValidator.isAccountValid(account)) {
        const insertSql = 'INSERT INTO account (`account_number`, `creation_date`, `bonuses`, `client_id`, `bank_id`) values(?,?,?,?,?)';

        mySqlConnection.query(insertSql, [account.account_number, account.creation_date, account.bonuses, account.client_id, account.bank_id],
            (err) => {
                if (!err) {
                    res.send([])
                }
            })
    } else {
        res.send(accountValidator.accountInvalidResponse(account))
    }
})

// Update an account
app.post('/account/update', cors(), (req, res) => {
    const account = req.body;
    if (accountValidator.isAccountValid(account)) {
        const updateSql = 'UPDATE account SET account_number = ? , creation_date = ?, bonuses = ?, client_id = ?, ' +
            'bank_id = ? WHERE account_id = ?';

        mySqlConnection.query(updateSql, [account.account_number, account.creation_date, JSON.parse(account.bonuses.toLowerCase()), account.client_id, account.bank_id, account.account_id],
            (err) => {
                if (!err) {
                    res.send([])
                }
            })
    } else {
        res.send(accountValidator.accountInvalidResponse(account))
    }
})



//////
//////
//////
// ////
//// USER REST
// Get all users
app.get('/auth', cors(), (req, res) => {
    mySqlConnection.query('SELECT * from user', (err, rows) => {
        if (!err) {
            // console.log(rows)
            res.send(rows)
        } else {
            // console.log(err)
        }
    })
})

// LOGIN
app.post('/auth/sign-in', (req, res) => {
    const user = req.body
    if(!!user.username) {
        mySqlConnection.query('SELECT * from user WHERE username = ?', [req.body.username], (err, rows) => {
            if (!err) {
                console.log(rows)
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    }
})

// Delete an user
app.post('/auth/delete', cors(), (req, res) => {
    mySqlConnection.query('DELETE from user WHERE username = ?', [req.body.username], (err) => {
        if (!err) {
            res.send('Deleted succesfully')
        } else {
            console.log(err)
        }
    })
})

// Insert an user
app.post('/auth/sign-up', cors(), (req, res) => {
    const user = req.body;
    // if (accountValidator.isAccountValid(user)) {

    console.log(req)
    console.log(user)
        const insertSql = 'INSERT INTO user (`password`, `username`, `email`, `role`) values(?,?,?,?)';

        mySqlConnection.query(insertSql, [user.password, user.username, user.email, user.role],
            (err) => {
                if (!err) {
                    res.send([])
                }
            })
    // } else {
    //     res.send(accountValidator.accountInvalidResponse(account))
    // }
})

// Update an user
app.post('/auth/update', cors(), (req, res) => {
    const account = req.body;
    if (accountValidator.isAccountValid(account)) {
        const updateSql = 'UPDATE account SET account_number = ? , creation_date = ?, bonuses = ?, client_id = ?, ' +
            'bank_id = ? WHERE account_id = ?';

        mySqlConnection.query(updateSql, [account.account_number, account.creation_date, JSON.parse(account.bonuses.toLowerCase()), account.client_id, account.bank_id, account.account_id],
            (err) => {
                if (!err) {
                    res.send([])
                }
            })
    } else {
        res.send(accountValidator.accountInvalidResponse(account))
    }
})

