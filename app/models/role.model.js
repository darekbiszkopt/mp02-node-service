module.exports = (sequelize, Sequelize) => {
    return sequelize.define('users', {
        username: {
            type: Sequelize.INT,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    })
}
