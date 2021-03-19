const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }))
const port = 3000;
const url = require('url');
const bodyParser = require('body-parser');
const fs = require('fs');
const { json } = require('express');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const db = require('./database/database');
const { Op } = require("sequelize");


//PRVI ZADATAK - radi 4tog zadatka je ovdje i kod drugog zadatka tj rute
app.use(express.static('css'));
app.use("/css", express.static(__dirname + '/css'));

app.get("/iscrtaj.js", function (req, res) {
    res.sendFile(__dirname + "/htmljs/iscrtaj.js");
});
app.get("/unosRasporeda.js", function (req, res) {
    res.sendFile(__dirname + "/htmljs/unosRasporeda.js");
});
app.get("/planiranjeNastavnik.html", function (req, res) {
    res.sendFile(__dirname + "/htmljs/planiranjeNastavnik.html");
});
app.get("/aktivnost.html", function (req, res) {
    res.sendFile(__dirname + "/htmljs/aktivnost.html");
});
app.get("/podaciStudent.html", function (req, res) {
    res.sendFile(__dirname + "/htmljs/podaciStudent.html");
});
app.get("/spirala2rasporedi.html", function (req, res) {
    res.sendFile(__dirname + "/htmljs/spirala2rasporedi.html");
});
app.get("/spirala2rasporedi.js", function (req, res) {
    res.sendFile(__dirname + "/htmljs/spirala2rasporedi.js");
});
app.get("/unosRasporeda.html", function (req, res) {
    res.sendFile(__dirname + "/htmljs/unosRasporeda.html");
});
app.get("/studenti.js", function (req, res) {
    res.sendFile(__dirname + "/htmljs/studenti.js");
});
app.get("/studenti.html", function (req, res) {
    res.sendFile(__dirname + "/htmljs/studenti.html");
});






app.listen(port);




//DRUGI ZADATAK SPIRALA 3

app.get('/v1/predmeti', function (req, res) {
    fs.readFile('predmeti.txt', function(err, data){
        if(err) throw err;
 
        var redovi = data.toString().split('\n'); //prvo splitamo po redovima
        var predmeti = []; //sad ubacuhemo predmete u ovo
        for(var i = 0; i < redovi.length; i++){
            if(redovi[i] != ""){ //u slucaju da je prazan red da ne ubacujemo nista u niz
             var jedanPredmet = {naziv:redovi[i]};
             predmeti.push(jedanPredmet);
                 }
            }
           // res.writeHead(200,{'Content-Type' : 'application'});
           // res.write(JSON.stringify(predmeti));
            res.json(predmeti);
            //res.end(); 
    });
 });
 
 app.get('/v1/aktivnosti', function (req, res) {
     fs.readFile('aktivnosti.txt', function(err, data){
         if(err) throw err;
 
         var text=data.toString();
         var parsiraniRedovi=text.split("\n");
         var niz = [];
         for(var i = 0; i < parsiraniRedovi.length; i++){
             var parsiraneKolone=parsiraniRedovi[i].split(",");
 
             if(parsiraneKolone.length != 1 || parsiraneKolone != 0){
                 var parsiraniJSONObjekat={naziv:parsiraneKolone[0],tip:parsiraneKolone[1],pocetak:parseFloat(parsiraneKolone[2]),kraj:parseFloat(parsiraneKolone[3]),dan:parsiraneKolone[4]};
                 niz.push(parsiraniJSONObjekat);
             }
 
         }   
         res.writeHead(200, {'Content-Type': 'application/json'});
         res.write(JSON.stringify(niz));
         res.end();
         
     });
  });
 
  app.get('/v1/predmet/:naziv/aktivnost/', function (req, res) {
     const zaPrezrazivanje = req.params.naziv;
 // sa ili bez dvotacke
 
 
 
     console.log(zaPrezrazivanje);
     fs.readFile('aktivnosti.txt', function(err, data){
         if(err) throw err;
 
         var text=data.toString();
         ///znaci logika je da splitamo po redovima i onda po zarezima za pravljenje jsona i to sve gurnemo u niz 
         var parsiraniRedovi=text.split("\n");
         var niz = [];
 
         for(var i = 0; i < parsiraniRedovi.length; i++){
         
             var parsiraneKolone=parsiraniRedovi[i].split(",");
             var parsiraniJSONObjekat={naziv:parsiraneKolone[0],tip:parsiraneKolone[1],pocetak:parseFloat(parsiraneKolone[2]),kraj:parseFloat(parsiraneKolone[3]),dan:parsiraneKolone[4]};
             if(parsiraneKolone[0] == zaPrezrazivanje){
                 niz.push(parsiraniJSONObjekat);
             }
             
         }   
         res.writeHead(200, {'Content-Type': 'application/json'});
         res.write(JSON.stringify(niz));
         res.end();
         
     });
  });
 
 
  app.post('/v1/predmet', function (req, res) {
     fs.readFile('predmeti.txt', function(err, data){
         if(err) throw err;
 
         var redovi = data.toString().split('\n'); //prvo splitamo po redovima
         var predmeti = []; //sad ubacuhemo predmete u ovo
         for(var i = 0; i < redovi.length; i++){
             if(redovi[i] != ""){ 
              var jedanPredmet = {naziv:redovi[i]};
              predmeti.push(jedanPredmet);
             }
             }
 
             //u predmeti imam sve predmete
             let tijelo = req.body;
             let noviPredmet = "\n" + tijelo['naziv'];
             let provjer = 0;
             for(var i = 0; i < predmeti.length; i++){
                 if(predmeti[i].naziv == tijelo['naziv'] ){
                     provjer = 1;
                 }
             }
             if(provjer == 0){
                 if(fs.readFileSync("predmeti.txt").length ==1 || fs.readFileSync("predmeti.txt").length==0){
                     let noviPredmet =  tijelo['naziv'];
                     fs.appendFile('predmeti.txt', noviPredmet, function(err){
                         if(err) throw err;
                         res.json({message:"Uspješno dodan predmet!"});
                     });
                 }
                 else{
                     let noviPredmet = "\n" + tijelo['naziv'];
                     fs.appendFile('predmeti.txt', noviPredmet, function(err){
                         if(err) throw err;
                         res.json({message:"Uspješno dodan predmet!"});
                     });
                 }
                 
             }
             else{
                 res.json({message:"Naziv predmeta postoji!"});
             }
        
     }); 
 });
 
 
 
 app.post('/v1/aktivnost', function (req, res) {
     let tijelo = req.body;
     
     tijelo['pocetak'] = parseFloat(tijelo['pocetak']);
     tijelo['kraj'] = parseFloat(tijelo['kraj']);
 
 
 let data = fs.readFileSync('aktivnosti.txt', 'utf8');
     var validno = 1;
         var redovi = data.toString().split('\n'); //prvo splitamo po redovima
        var aktivnosti = []; //sad ubacuhemo predmete u ovo
        console.log("tu sam 1")
        for(var i = 0; i < redovi.length; i++){
           
             var jednaAKtivnost = redovi[i].split(",");
            
             console.log("tu sam 1")
                 if(jednaAKtivnost[4] == tijelo['dan']){
                     
                     if(Number(tijelo['pocetak']) > Number(jednaAKtivnost[2]) && Number(tijelo['kraj']) < Number(jednaAKtivnost[3])) validno = 0;
                     if(Number(tijelo['pocetak']) > Number(jednaAKtivnost[2]) && Number(tijelo['pocetak']) < Number(jednaAKtivnost[3])) validno = 0;
                     if(Number(tijelo['pocetak']) < Number(jednaAKtivnost[2]) &&  Number(tijelo['kraj']) > Number(jednaAKtivnost[3])) validno = 0;
                     if(Number(tijelo['pocetak']) < Number(jednaAKtivnost[2]) &&  Number(tijelo['kraj']) > Number(jednaAKtivnost[3])) validno = 0;
                     if(Number(tijelo['pocetak']) ==  Number(jednaAKtivnost[2]) || Number(tijelo['kraj']) ==  Number(jednaAKtivnost[3])) validno = 0;
                 }
             
 
                 }
  
     if(tijelo['pocetak'] < 8 || tijelo['pocetak'] > 20  || tijelo['kraj'] < 8 || tijelo['kraj'] > 20 ||  tijelo['pocetak'] > tijelo['kraj'] || tijelo['kraj'] * 2 != parseInt(tijelo['kraj'] * 2) || tijelo['pocetak'] * 2 != parseInt(tijelo['pocetak'] * 2) ){
 
         res.json({message: "Aktivnost nije validna!"});
     }
     else if(validno == 0){
         res.json({message: "Aktivnost nije validna!"});
     }
     else{
 
         if(fs.readFileSync("aktivnosti.txt").length ==1 || fs.readFileSync("aktivnosti.txt").length==0){
             let novaLinija = tijelo['naziv']+","+tijelo['tip']+","+tijelo['pocetak']+","+tijelo['kraj']+","+tijelo['dan'];    
             fs.appendFile('aktivnosti.txt', novaLinija, function(err){
                 if(err) throw err;
                 res.json({message:"Uspješno dodana aktivnost!"});
             });
         }else{
             let novaLinija = "\n" + tijelo['naziv']+","+tijelo['tip']+","+tijelo['pocetak']+","+tijelo['kraj']+","+tijelo['dan'];    
             fs.appendFile('aktivnosti.txt', novaLinija, function(err){
                 if(err) throw err;
                 res.json({message:"Uspješno dodana aktivnost!"});
             });
         }
 
         
     }
     
 });
 
 
 app.delete('/v1/aktivnost/:naziv', function (req, res) { 
         var nazivPredmeta = req.params.naziv;
         var izbrisan = 0;
         var regularExpression = new RegExp("^(?:[\t ]*(?:\r?\n|\r))+");
 
         fs.readFile('aktivnosti.txt', function(err, data){
             if(err) throw err;
     
         var redovi = data.toString().split('\n');
         for(var i = 0; i < redovi.length; i++){
             console.log(redovi[i]);
             var kolone  = redovi[i].split(',');
 
             for( var j = 0; j < kolone.length; j++){
                 if(kolone[0] == nazivPredmeta){
                     izbrisan = 1;
                     console.log("tu sam");
                     var sinhroniPodaci = fs.readFileSync('aktivnosti.txt', 'utf-8');
                     var fajlZaPrepisivanje = sinhroniPodaci.replace(redovi[i],'');
                     var bezPraznihR = fajlZaPrepisivanje.replace(/(^[ \t]*\n)/gm, "" );
                     fs.writeFileSync('aktivnosti.txt', bezPraznihR, 'utf-8');                }
 
             }
             
             }
 
             if(izbrisan){
                 res.json({message:"Uspješno obrisana aktivnost!"});
         
             }else{
                 res.json({message:"Greška - aktivnost nije obrisana!"});
         
             }
             
         });
     });
 
 app.delete('/v1/predmet/:naziv', function (req, res) { 
 console.log("amra");
     var nazivPredmeta = req.params.naziv;
     console.log(nazivPredmeta);
     var izbrisan = 0;
     var regularExpression = new RegExp("/(\r\n|\n|\r)/gm");
 
     fs.readFile('predmeti.txt', function(err, data){
         if(err) throw err;
 
     var redovi = data.toString().split('\n');
     for(var i = 0; i < redovi.length; i++){
         console.log(redovi[i]);
         if(redovi[i] == nazivPredmeta){
             izbrisan = 1;
             console.log("tu sam");
             var sinhroniPodaci = fs.readFileSync('predmeti.txt', 'utf-8');
             var fajlZaPrepisivanje = sinhroniPodaci.replace(nazivPredmeta,'');
             var bezPraznihR = fajlZaPrepisivanje.replace(/(^[ \t]*\n)/gm, "" );
             fs.writeFileSync('predmeti.txt', bezPraznihR, 'utf-8');        }
     }
     if(izbrisan){
         res.json({message:"Uspješno obrisan premdet!"});
 
     }else{
         res.json({message:"Greška - predmet nije obrisan!"});
 
     }
         
     });
 });
 
 
 app.delete('/v1/all', function (req, res) { 
  var izbrisanPodaci  = 0;
  var izbrisanAktivnosti  = 0;
     fs.readFile('predmeti.txt', function(err, data){
         if(err) throw err;
 
     var regularExpression = new RegExp("^(?:[\t ]*(?:\r?\n|\r))+");
 
     var redovi = data.toString().split('\n');
     for(var i = 0; i < redovi.length; i++){
         izbrisanPodaci = 1; console.log("pod " + izbrisanPodaci);
         var sinhroniPodaci = fs.readFileSync('predmeti.txt', 'utf-8');
         var fajlZaPrepisivanje = sinhroniPodaci.replace(redovi[i],"");
         var bezPraznihR = fajlZaPrepisivanje.replace(/(^[ \t]*\n)/gm, "" );
         fs.writeFileSync('predmeti.txt', bezPraznihR, 'utf-8');
         
     }
         
     });
     console.log("tu sam");
 
     fs.readFile('aktivnosti.txt', function(err, data){
         if(err) throw err;
 
     var redovi = data.toString().split('\n');
     for(var i = 0; i < redovi.length; i++){
         izbrisanAktivnosti = 1; console.log("akti " + izbrisanAktivnosti);
         var sinhroniPodaci = fs.readFileSync('aktivnosti.txt', 'utf-8');
         var fajlZaPrepisivanje = sinhroniPodaci.replace(redovi[i],"");
         var bezPraznihR = fajlZaPrepisivanje.replace(/(^[ \t]*\n)/gm, "" );
         fs.writeFileSync('aktivnosti.txt', bezPraznihR, 'utf-8');
     }
     
 
     
         res.json({message:"Uspješno obrisan sadržaj datoteka!"});
 
     
         
 
 
         
     });
 
     
 });
 ///////spirala 4 rute
 
 //tabela student
 app.get('/v2/student', function(req,res){
     db.student.findAll({attributes: ['ime','index']}).then(function(student){
         res.json(student);
     })
  });
  app.get('/v2/student/:id', function(req,res){
     var id = req.params.id;
   db.student.findOne({attributes: ['ime','index'], where: {id:id}} ).then(function(tip){
       res.json(tip);
   })
 });
  app.post('/v2/student', async function(req,res){
      try{
        let tijelo = req.body;
        let postojiStudnet = await db.student.findOne({
            where:{
                index:tijelo['index']
            }
        });
        if(!postojiStudnet){
            const student = await db.student.create({
                ime : tijelo['ime'],
                index : tijelo['index']
            });
            res.status(200).send({
                message:'Student je kreiran'
            });
    
        }
        else{
            
            res.status(500).send({
                message: 'Postoji student sa istim indeskom'
            });
        }
      }catch(err){
          console.log(err);
      }

 
  });
 
  app.delete('/v2/student/:id', function(req,res){
     const id = req.params.id;
     db.student.destroy({
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno obrisan student"
             });
         }else{
             res.send({
                 message:"Student nije obrisan"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
  
   });
 
   app.put('/v2/student/:id', function(req,res){
     const id = req.params.id;
     db.student.update(req.body,{
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno updateovan student"
             });
         }else{
             res.send({
                 message:"Student nije updateovan"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
   });
 
 
 
 
 // tabela tip
   app.get('/v2/tip', function(req,res){
     db.tip.findAll({attributes: ['naziv']}).then(function(tip){
         res.json(tip);
     })
  });
  app.get('/v2/tip/:id', function(req,res){
     var id = req.params.id;
   db.tip.findOne({attributes: ['naziv'], where: {id:id}} ).then(function(tip){
       res.json(tip);
   })
 });
  app.post('/v2/tip', async function(req,res){
      try{
        let tijelo = req.body;
        const tip = {
            naziv : tijelo['naziv']
            };
    
            let postojiTip = await db.tip.findOne({
                where:{
                    naziv:tijelo['naziv']
                }
            });
    
            if(!postojiTip){
                const tip = await db.tip.create({
                    naziv : tijelo['naziv']
                });
                res.status(200).send({
                    message:'Tip je kreiran'
                });
        
            }
            else{
                
                res.status(500).send({
                    message: 'Postoji tip sa istim nazivom'
                });
            }
      }catch(err){
          console.log(err);
      }
    
  });
 
  app.delete('/v2/tip/:id', function(req,res){
     const id = req.params.id;
     db.tip.destroy({
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno obrisan tip"
             });
         }else{
             res.send({
                 message:"tip nije obrisan"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
  
   });
 
   app.put('/v2/tip/:id', function(req,res){
     const id = req.params.id;
     db.tip.update(req.body,{
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno updateovan tip"
             });
         }else{
             res.send({
                 message:"Tip nije updateovan"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
   });
  
 
 
   // tabela predmet
   app.get('/v2/predmet', function(req,res){
     db.predmet.findAll({attributes: ['naziv']}).then(function(tip){
         res.json(tip);
     })
  });
  app.get('/v2/predmet/:id',  function(req,res){
     var id = req.params.id;
   db.predmet.findOne({attributes: ['naziv'], where: {id:id}} ).then(function(tip){
       res.json(tip);
   })
 });
  app.post('/v2/predmet',async function(req,res){
      try{
        let tijelo = req.body;

        let postojiPredmet = await db.predmet.findOne({
            where:{
                naziv:tijelo['naziv']
            }
        });

        if(!postojiPredmet){
            const tip = await db.predmet.create({
                naziv : tijelo['naziv']
            });
            res.status(200).send({
                message:'Predmet je kreiran'
            });
    
        }
        else{
            
            res.status(500).send({
                message: 'Postoji predmet sa istim nazivom'
            });
        }
      }catch(err){
          console.log(err);
      }
      
 
  });
 
  app.delete('/v2/predmet/:id', function(req,res){
     const id = req.params.id;
     db.predmet.destroy({
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno obrisan predmet"
             });
         }else{
             res.send({
                 message:"Predmet nije obrisan"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
  
   });
 
   app.put('/v2/predmet/:id', function(req,res){
     const id = req.params.id;
     db.predmet.update(req.body,{
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno updateovan predmet"
             });
         }else{
             res.send({
                 message:"Predmet nije updateovan"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
   });
 
 
 
 
 
   // tabela dan
   app.get('/v2/dan', function(req,res){
     db.dan.findAll({attributes: ['naziv']}).then(function(tip){
         res.json(tip);
     })
  });
  app.get('/v2/dan/:id', function(req,res){
     var id = req.params.id;
   db.dan.findOne({attributes: ['naziv'], where: {id:id}} ).then(function(tip){
       res.json(tip);
   })
 });
  app.post('/v2/dan', async function(req,res){
      try{
        let tijelo = req.body;

        let postojiDan = await db.dan.findOne({
            where:{
                naziv:tijelo['naziv']
            }
        });

        if(!postojiDan){
            const tip = await db.dan.create({
                naziv : tijelo['naziv']
            });
            res.status(200).send({
                message:'Dan je kreiran'
            });
    
        }
        else{
            
            res.status(500).send({
                message: 'Postoji dan sa istim nazivom'
            });
        }
      }catch(err){
          console.log(err);
      }
    
  });
 
  app.delete('/v2/dan/:id', function(req,res){
     const id = req.params.id;
     db.dan.destroy({
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno obrisan dan"
             });
         }else{
             res.send({
                 message:"Dan nije obrisan"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
  
   });
 
   app.put('/v2/dan/:id', function(req,res){
     const id = req.params.id;
     db.dan.update(req.body,{
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno updateovan dan"
             });
         }else{
             res.send({
                 message:"Dan nije updateovan"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
   });
 
 
 //tabela grupa ima strani kljuc predmetId
 app.get('/v2/grupa', function(req,res){
     db.grupa.findAll({attributes: ['naziv','predmetId']}).then(function(tip){
         res.json(tip);
     })
  });
  app.get('/v2/grupa/:id', function(req,res){
     var id = req.params.id;
   db.grupa.findOne({attributes: ['naziv','predmetId'], where: {id:id}} ).then(function(tip){
       res.json(tip);
   })
 });
  app.post('/v2/grupa', async function(req,res){
    try{
        let tijelo = req.body;

        let postojiGrupa = await db.grupa.findOne({
            where:{
                naziv:tijelo['naziv'],
                predmetId:tijelo['predmetId']
            }
        });

        if(!postojiGrupa){
            const grupa = await db.grupa.create({
                naziv : tijelo['naziv'],
                predmetId:tijelo['predmetId']
            });
            res.status(200).send({
                message:'Grupa je kreirana'
            });
    
        }
        else{
            
            res.status(500).send({
                message: 'Postoji grupa sa istim nazivom i predmet id-em'
            });
        }

    }catch(err){
        console.log(err);
    }

  
   });
   app.delete('/v2/grupa/:id', function(req,res){
     const id = req.params.id;
     db.grupa.destroy({
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno obrisana grupa"
             });
         }else{
             res.send({
                 message:"Grupa nije obrisana"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
  
   });
 
   app.put('/v2/grupa/:id', function(req,res){
     const id = req.params.id;
     db.grupa.update(req.body,{
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno updateovana grupa"
             });
         }else{
             res.send({
                 message:"Grupa nije updateovana"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
   });
 
 
 
 
 
   //tabela aktivnost ima strani kljuc predmetId, grupaId, danId, tipId
 app.get('/v2/aktivnost', function(req,res){
     db.aktivnost.findAll({attributes: ['naziv','pocetak','kraj','predmetId', 'grupaId', 'danId', 'tipId']}).then(function(tip){
         res.json(tip);
     })
  });
  app.get('/v2/aktivnost/:id',  function(req,res){
     var id = req.params.id;
   db.aktivnost.findOne({attributes: ['naziv','pocetak','kraj','predmetId', 'grupaId', 'danId', 'tipId'], where: {id:id}} ).then(function(tip){
       res.json(tip);
   })
 });
  app.post('/v2/aktivnost', async function(req,res){
     let tijelo = req.body;
     try{
        if(tijelo['pocetak'] < 8 || tijelo['pocetak'] > 20  || tijelo['kraj'] < 8 || tijelo['kraj'] > 20 ||  tijelo['pocetak'] > tijelo['kraj'] || tijelo['kraj'] * 2 != parseInt(tijelo['kraj'] * 2) || tijelo['pocetak'] * 2 != parseInt(tijelo['pocetak'] * 2) ){
            res.status(500).send({
                message: 'Neispravno vrijeme'
            });
         }

         const postojiPreklapanjeAktivnost = await db.aktivnost.findOne({
            where:{
                danId: tijelo['danId'],
                [Op.or]:[
                    {pocetak: {[Op.lt]: tijelo['pocetak']},
                     kraj:  {[Op.gt]: tijelo['kraj']}
                     }, 
                     {pocetak: {[Op.lt]: tijelo['pocetak']},
                     kraj:  {[Op.gt]: tijelo['pocetak']}
                     },
                     {pocetak: {[Op.between]: [tijelo['pocetak'],tijelo['kraj']]}},
                     {pocetak: {[Op.gt]: tijelo['pocetak']},
                     kraj:  {[Op.lt]: tijelo['kraj']}
                     },
                     {pocetak: tijelo['pocetak']},
                     {kraj:tijelo['kraj']} 
                 ]
                
            }});
            if(!postojiPreklapanjeAktivnost){
                const aktivnost = await db.aktivnost.create({
                    naziv : tijelo['naziv'],
                    pocetak : tijelo['pocetak'],
                    kraj : tijelo['kraj'],
                    predmetId: tijelo['predmetId'],
                    grupaId : tijelo['grupaId'],
                    danId : tijelo['danId'],
                    tipId : tijelo['tipId']  
                });
                res.status(200).send({
                    message:'Aktivnost je kreirana'
                });
            }else{
                res.status(500).send({
                    message: 'Postoji druga aktivnost u tom periodu - preklapanje'
                });
            }
     }catch(err){
        console.log(err);
     }
         
     
  
   });
   app.delete('/v2/aktivnost/:id', function(req,res){
     const id = req.params.id;
     db.aktivnost.destroy({
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno obrisana aktivnost"
             });
         }else{
             res.send({
                 message:"Aktivnost nije obrisana"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
  
   });
   app.put('/v2/aktivnost/:id', function(req,res){
     const id = req.params.id;
     db.aktivnost.update(req.body,{
         where : {id : id}
     }).then(num => {
         if(num == 1){
             res.send({
                 message:"Uspješno updateovana aktivnost"
             });
         }else{
             res.send({
                 message:"Aktivnost nije updateovana"
             });
         }
     }).catch(err => {
         res.status(500).send({
             message:
                  err.message || "Greska"
         });
     });
   });
 
 
   //ruta za 2 zadatak
   app.post('/v2/predmetiSaForme', async function(req,res){
     let tijelo = req.body.stud;
     let selektovanaGrupa  = req.body.grupe;
     let nizPoruka = [];
    
     let sviStudentiSaGrupama = await db.student.findAll({
         include: {
           model: db.grupa,
           as: 'grupa'
         }
       });
       const grupeKojeImajuProslijedjeniNaziv = await db.grupa.findOne({
         where: { naziv: selektovanaGrupa },
       });
     try{
         for (var i = 0; i < tijelo.length; i++){
             const sviStudentiSveIsto = await db.student.findAll(
                 {
                     where:{
                         ime: tijelo[i].ime,
                         index: tijelo[i].index
                     }
                 }
             );
             const sviStudentiIstiIndex = await db.student.findAll(
                 {
                     where:{
                         index: tijelo[i].index
                     }
                 }
             );
             if(sviStudentiIstiIndex.length == 0 && sviStudentiSveIsto.length == 0){
                 const noviStudenti = await db.student.create(
                     {
                         ime: tijelo[i].ime,
                         index: tijelo[i].index
                     }
                 
                 );
                
                 await noviStudenti.addGrupa(grupeKojeImajuProslijedjeniNaziv);
             }
             else if(sviStudentiSveIsto.length != 0){
                 const GrupaNova = await db.grupa.findAll({
                     where: {
                         predmetId: grupeKojeImajuProslijedjeniNaziv.predmetId,
                     },
                     include:
                     {
                         model: db.student,
                         as: 'student',
                         through:'pomocna_tabela'
                     }
                 });
                 if(GrupaNova.length != 1){
                     await sviStudentiSveIsto[0].removeGrupa(GrupaNova);
                     await sviStudentiSveIsto[0].addGrupa(grupeKojeImajuProslijedjeniNaziv);
                 }
                 else await sviStudentiSveIsto[0].addGrupa(grupeKojeImajuProslijedjeniNaziv);
             }
             else if(sviStudentiIstiIndex.length != 0){
                 nizPoruka.push('Student ' + tijelo[i].ime +  ' nije kreiran jer postoji student ' +  sviStudentiIstiIndex[0].ime + ' sa istim indexom ' + tijelo[i].index);            }
         }
         if(tijelo.length == 0){
             return res.status(200).send({
                 status:404, 
                 message: 'tijelo je prazno'
             });
         }else{
             if(nizPoruka.length == 0){
                 return res.status(200).send({
                     status:200, 
                     message: nizPoruka
                 });
             }
             if(nizPoruka.length != 0){
                 return res.status(200).send({
                     message: nizPoruka
                 });
             }
         }
     }catch(error){
         res.status(400).send({
             message:
                  error.message || "Neuspješno dodavsnje studenta"
         });
     } 
   });
 
 
 /// zadatak 3 spirala 4

  app.post('/v2/unosRasporeda/spirala4',  async function (req,res)  {
    try{

      let tijelo = req.body;
      let vrijemePocetka = req.body.pocetak;
      let vrijemeZavrsetka = req.body.kraj;

      vrijemePocetka = vrijemePocetka.replace(":00", "");
      vrijemePocetka = vrijemePocetka.replace(":30",".5");
      vrijemeZavrsetka = vrijemeZavrsetka.replace(":00", "");
      vrijemeZavrsetka = vrijemeZavrsetka.replace(":30",".5");
      if(vrijemePocetka < 8 || vrijemePocetka > 20  || vrijemeZavrsetka < 8 || vrijemeZavrsetka > 20 ||  vrijemePocetka > vrijemeZavrsetka || vrijemeZavrsetka * 2 != parseInt(vrijemeZavrsetka * 2) || vrijemePocetka * 2 != parseInt(vrijemePocetka * 2) )
      {

        res.status(200).send({
            status: 404,
            message: 'Neispravan format vremena'
         });
       return;
    }
      const idDana = await db.dan.findOne({
        where: { naziv: tijelo.dan },
      });
    
      const idTipa = await db.tip.findOne({
        where: { naziv: tijelo.tip },
      });

      //PROVJERA PREKLAPANJA
      
        
      const PronadjiAktivnosti2 = await db.aktivnost.findOne({
        where:{
            danId: idDana.id,
            [Op.or]:[
                {pocetak: {[Op.lt]: vrijemePocetka},
                 kraj:  {[Op.gt]: vrijemeZavrsetka}
                 }, 
                 {pocetak: {[Op.lt]: vrijemePocetka},
                 kraj:  {[Op.gt]: vrijemePocetka}
                 },
                 {pocetak: {[Op.between]: [vrijemePocetka,vrijemeZavrsetka]}},
                 {pocetak: {[Op.gt]: vrijemePocetka},
                 kraj:  {[Op.lt]: vrijemeZavrsetka}
                 },
                 {pocetak: vrijemePocetka},
                 {kraj:vrijemeZavrsetka} 
             ]
            
        }});
    if(!PronadjiAktivnosti2){
        
        const idPredmeta = await db.predmet.findOne({
            where: { naziv: tijelo.nazivPredmeta },
          });
      if(idPredmeta == null){
        let nazivPremdeta = tijelo.nazivPredmeta;
        const noviPredmet = await db.predmet.create(
          {
              naziv: nazivPremdeta            
          }
      
      );
    }
    
   
    let aktivnost = {naziv:tijelo.naziv, pocetak: vrijemePocetka, kraj:vrijemeZavrsetka, predmetId:idPredmeta.id, tipId:idTipa.id, danId: idDana.id};
    
    
      db.aktivnost.create(aktivnost)
      .then(data =>{
        

         res.send(data);
      })
      .catch(err => {
          console.log("error")
         res.status(500).send({
             message:
                  err.message || "Neuspješno dodavanje aktivnosti"
         });
     });


    }else{

        res.status(200).send({
            status: 404,
            message: 'PREKLAPANJE'
         });
        return;
    }
    }catch(err){

    }

  });
 
   module.exports = app;
 
 
 
 