var express = require('express');
var router = express.Router();
var mySqlConnection  = require('../lib/db');
const cors = require("cors");

/////
//// CLIENT REST
// Get all clients
router.get('/', cors(), (req, res) => {
    mySqlConnection.query('SELECT * from client', (err, rows, fields) => {
        if (!err) {
            // console.log(rows)
            res.send(rows)
        } else {
            // console.log(err)
        }
    })
})

module.exports = router;
