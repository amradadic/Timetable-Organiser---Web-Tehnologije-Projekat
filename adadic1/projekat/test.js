const app = require("./zadatak1.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
chai.should();
chai.expect();
const fs = require('fs');
const { type } = require("os");
const { isIPv4 } = require("net");
const { json } = require("express");


var datoteka = fs.readFileSync('testniPodaci.txt', 'utf-8');
var redovi = datoteka.split('\n');


for(var i = 0; i < redovi.length; i++){
  let objekat = {operacija:"", ulaz:"", izlaz:"", ruta:""};
  if(redovi[i].toString().length>1){
    objekat = pomocna(redovi[i]);
    
  }
  if(objekat.operacija == 'GET'){

    describe(objekat.operacija, ()=>{
      it(objekat.operacija, done=>{
        chai.request(app)
        .get(objekat.ruta)
        .end((err, res)=>
        {
          res.should.have.status(200);
          expect(res.body).to.eql(objekat.izlaz);
          done();
        });
      } );
      
    });

  } 
  ///////////////////////////


  else if(objekat.operacija == 'POST'){
    describe(objekat.operacija, ()=>{
      it('post', done=>{
        chai.request(app)
        .post(objekat.ruta)
        .send(objekat.ulaz)
        .end((err, res)=>
        {
          res.should.have.status(200);        
          expect(res.body).to.eql(objekat.izlaz);
          done();
        });
      } );
      
    });
  }

  else if(objekat.operacija == 'DELETE'){
    describe(objekat.operacija, ()=>{
      it('post', done=>{
        chai.request(app)
        .delete(objekat.ruta)
        .end((err, res)=>
        {
          
          res.should.have.status(200);
          expect(JSON.stringify(res.body)).to.eql(objekat.izlaz);
          done();
        });
      } );
      
    });
    
  }
}


function pomocna (text){
  console.log("tu sam 1")
  var bezKosih = text.replace(/\\/gi, "").split(",");

  var objekat = {};
  var pomocniString = "";
  if(bezKosih[0] == "POST"){
    objekat.operacija = bezKosih[0];
    objekat.ruta  = bezKosih[1];

    for(var i = 2; i< bezKosih.length-1 ; i++){

      pomocniString+= bezKosih[i];
      console.log(pomocniString);
      if(i != bezKosih.length-2){

        pomocniString+=",";
      }
    }

    objekat.ulaz = JSON.parse(pomocniString);

    objekat.izlaz = JSON.parse(bezKosih[bezKosih.length-1]);

    
  }
  else if( bezKosih[0] == "GET"){
    objekat.operacija = bezKosih[0];
    objekat.ruta  = bezKosih[1];

    console.log(bezKosih.length)
    for(var i = 3; i< bezKosih.length ; i++){
      pomocniString+= bezKosih[i];
      
      if(i != bezKosih.length-1){
        pomocniString+=",";
      }
    }
    objekat.izlaz = JSON.parse(pomocniString);
    console.log(bezKosih[3]);
    objekat.ulaz = JSON.parse(bezKosih[2]);
  }
  else{
    objekat.operacija = bezKosih[0];
    objekat.ruta = bezKosih[1];
    objekat.ulaz = bezKosih[2];
    objekat.izlaz = bezKosih[3];
  }
  return objekat;

}

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}
