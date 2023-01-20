const Sequelize = require("sequelize");


module.exports = function(sequelize,DataTypes){
    const Predmet = sequelize.define('predmet', {
        naziv_predmeta: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'naziv_predmeta'
        },
        broj_predavanja_sedmicno: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'broj_predavanja_sedmicno'
        },
        broj_vjezbi_sedmicno: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'broj_vjezbi_sedmicno'
        }
        })
        return Predmet;
};
