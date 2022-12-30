const db = require('../models')
const config = require('../config/auth.config.js');
const Role = db.role;
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then((user)=> {
            if(req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(()=> {
                        res.send({ message: 'User reqistered successfully!' })
                    });
                });
            } else {
                user.setRoles([1]).then(()=> res.send({ message: 'User registered successfully!' }));
            }
        });
}
