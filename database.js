const Sequelize = require("sequelize");
const sequelize = new Sequelize('wt22', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });

const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
/*db.nastavnik = sequelize.import(__dirname+'/nastavnik.js');
db.predmet = sequelize.import(__dirname+'/predmet.js');
db.prisustvo = sequelize.import(__dirname+'/prisustvo.js');
db.student = sequelize.import(__dirname+'/student.js');
*/

const createNastavnikModel = require('./nastavnik.js');
const createPredmetkModel = require('./predmet.js');
const createPrisustvokModel = require('./prisustvo.js');
const createStudentModel = require('./student.js');

db.nastavnik = createNastavnikModel(sequelize,Sequelize);
db.predmet = createPredmetkModel(sequelize,Sequelize);
db.prisustvo = createPrisustvokModel(sequelize,Sequelize);
db.student = createStudentModel(sequelize,Sequelize);


//relacije
db.nastavnik.hasMany(db.predmet,{as:'predmeti'});
db.predmet.hasMany(db.prisustvo,{as:'prisustva'});
db.student.hasMany(db.prisustvo,{as:'prisustva'});

module.exports=db;
