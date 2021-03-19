const db = require('./database.js')
db.sequelize.sync({force:true}).then(function(){
    napuniBazu();
    console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
});


function napuniBazu()
{
    return new Promise(function (resolve, reject){
        db.tip.create({
            naziv: 'Vjezbe'
        }).then (object =>{ 
        db.dan.create({
            naziv: 'Ponedjeljak'
        }).then (object => {
            db.dan.create({
                naziv: 'Utorak'
            }).then (object => {
                db.dan.create({
                    naziv: 'Srijeda'
                }).then (object => {
                db.student.create({
                    ime: 'Amra Dadic',
                    index: '18197'
                }).then (object => {
                    db.student.create({
                        ime: 'Neko Nekic',
                        index: '18078'
                    }).then (object => {
                        db.predmet.create({
                            naziv: 'WT'
                        }).then (object => {
                            db.predmet.create({
                                naziv: 'RMA'
                            }).then (object => {
                                db.grupa.create({
                                    naziv: 'Grupa 1',
                                    predmetId: 1
                                }).then (object => {
                                    db.grupa.create({
                                        naziv: 'Grupa 2',
                                        predmetId: 2
                                    }).then (object => {
                                    db.aktivnost.create({
                                        naziv: 'RMApredavanje',
                                        pocetak: 12,
                                        kraj: 13,
                                        predmetId: 2,
                                        grupaId: 1,
                                        danId: 1,
                                        tipId: 1
                                    });})});});});});});
        });});});});})
}