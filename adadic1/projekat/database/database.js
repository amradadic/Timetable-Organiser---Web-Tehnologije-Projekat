const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2018197","root","root",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.predmet = sequelize.import(__dirname+'/modeli/predmet.js');
db.grupa = sequelize.import(__dirname+'/modeli/grupa.js');
db.aktivnost = sequelize.import(__dirname+'/modeli/aktivnost.js');
db.dan = sequelize.import(__dirname+'/modeli/dan.js');
db.tip = sequelize.import(__dirname+'/modeli/tip.js');
db.student = sequelize.import(__dirname+'/modeli/student.js');


//relacije
// predmet 1-n grupa
db.predmet.hasMany(db.grupa, {foreignKey:{allowNull:false}});
db.grupa.belongsTo(db.predmet);

// aktivnost n-1 predmet
db.aktivnost.belongsTo(db.predmet);
db.predmet.hasMany(db.aktivnost,{foreignKey:{allowNull:false}});

// aktivnost n-0 grupa
db.aktivnost.belongsTo(db.grupa);
db.grupa.hasMany(db.aktivnost);

//aktivnost n-1 dan
db.aktivnost.belongsTo(db.dan);
db.dan.hasMany(db.aktivnost, {foreignKey:{allowNull:false}});

//aktivnost n-1 tip
db.aktivnost.belongsTo(db.tip);
db.tip.hasMany(db.aktivnost, {foreignKey:{allowNull:false}});

//student n-m grupa
db.student_grupa = db.student.belongsToMany(db.grupa,{as:'grupa',through:'pomocna_tabela',foreignKey:'studentId'});
db.grupa.belongsToMany(db.student,{as:'student',through:'pomocna_tabela',foreignKey:'grupaId'});

module.exports=db;