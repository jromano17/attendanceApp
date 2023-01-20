const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define('student', {
        ime: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'ime'
        },
        index: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'index'
        }
        })
        return Student;
};
