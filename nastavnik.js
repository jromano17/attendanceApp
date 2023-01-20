const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Nastavnik = sequelize.define('nastavnik', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'username'
        },
        password_hash: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'password_hash'
        }
    })
    return Nastavnik;
};
