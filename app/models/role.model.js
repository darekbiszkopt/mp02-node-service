module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user', {
        username: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    })
}
