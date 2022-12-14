'use strict';

const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())

var mySqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Uzi2115',
    database: 'bank',
    port: 3308
})

mySqlConnection.connect((err) => {
    if (!err) {
        console.log('Db connection succeded.')
    } else {
        console.log('Db connection failed. \n Error: ' + JSON.stringify(err, undefined, 2))
    }
})

app.listen(5001, () => console.log(`Server running on port: http://localhost:5001`))


// Get all clients
app.get('/clients', (req, res) => {
    mySqlConnection.query('SELECT * from clients', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
            console.log(rows)
        } else {
            console.log(err)
        }
    })
})

// Get an client
app.get('/clients/:id', (req, res) => {
    mySqlConnection.query('SELECT * from clients WHERE client_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            res.send(rows)
        } else {
            console.log(err)
        }
    })
})

// Delete an client
app.delete('/clients/:id', (req, res) => {
    mySqlConnection.query('DELETE * from clients WHERE client_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Deleted succesfully')
        } else {
            console.log(err)
        }
    })
})

// Insert an client
app.post('/clients', (req, res) => {
    let client = res.body;
    var sql = 'SET @'


    mySqlConnection.query('DELETE * from clients WHERE client_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send('Deleted succesfully')
        } else {
            console.log(err)
        }
    })
})
