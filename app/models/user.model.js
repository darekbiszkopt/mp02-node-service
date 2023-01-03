module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    })
}
