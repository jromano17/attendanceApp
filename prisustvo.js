const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const Prisustvo = sequelize.define('prisustvo', {
        sedmica: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'sedmica'
        },
        predavanja: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'predavanja'
        },
        vjezbe: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'vjezbe'
        }
        })
        return Prisustvo;
};
