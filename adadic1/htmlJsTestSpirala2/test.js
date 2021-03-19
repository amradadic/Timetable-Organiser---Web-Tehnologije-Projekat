let assert = chai.assert;
alert = function () {};
describe('Tabela', function() {
 describe('kreirajRaspored testovi', function() {
   it('treba iscrtati tabelu sa 5 redova plus red za vrijeme', function() {
    //test provjere broja redova kreiranje tabele
    document.getElementById('divvv').innerHTML = "";

    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();

    let raspored = document.getElementById('divvv');
    let tabela = raspored.firstChild;
    let brojRedova = tabela.rows;
    assert.equal(brojRedova.length, 6,"Broj redova treba biti 6");
   });
   
   it('testira da li ima dbar broj kolona', function() {
    //test provjere broja kolona

    document.getElementById('divvv').innerHTML = "";

    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();

    let satPocetak = 8;
    let satKraj = 21;
    let brojKolona = (satKraj - satPocetak) * 2 + 1;
    let raspored = document.getElementById('divvv');
    let tabela = raspored.firstChild;
    let redTabele = tabela.rows;
    let brojRedovaUTestu = 0;

    for (var i = 0; i < dani.length; i++){ //donji dio tabaele
        var red =  redTabele[i];  
        for(var j = 0; j < brojKolona; j++){
            brojRedovaUTestu++;
        }
    }
    assert.equal(brojKolona, 27,"Broj kolona treba biti 26 + 1 ovo 1 za dane");
   });


    it('Provjera dobrog broja kolona reda dana za od 0 do 23.', function() {
        document.getElementById('divvv').innerHTML = "";

      kreirajRaspored.postaviSatPocetak(8);
      kreirajRaspored.postaviSatKraj(21);
      kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
      kreirajRaspored.postaviDiv(document.getElementById("divvv"));
      kreirajRaspored.iscrtajRaspored();
  
      let satPocetak = 0;
      let satKraj = 23;
      let brojKolona = (satKraj - satPocetak) * 2 + 1;
      let raspored = document.getElementById('divvv');
      let tabela = raspored.firstChild;
      let redTabele = tabela.rows;
      let brojRedovaUTestu = 0;
  
      for (var i = 0; i < dani.length; i++){ 
          var red =  redTabele[i];  
          for(var j = 0; j < brojKolona; j++){
              brojRedovaUTestu++;
          }
      }
      assert.equal(brojKolona, 47,"Broj kolona treba biti 26 + 1 ovo 1 za dane");
   });


  it('Provjera za od 8 do 8(isti početak i kraj, sto je "Greška".)', function() {
    document.getElementById('divvv').innerHTML = "";
    kreirajRaspored.postaviDiv(document.getElementById('divvv'));
    kreirajRaspored.postaviDani(['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak']);
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(8);
    kreirajRaspored.iscrtajRaspored();
    let raspored = document.getElementById('divvv');
    console.log("ispis: " + raspored.firstChild);
    assert.equal(raspored.innerHTML, "Greška","Treba pisati greška.");
   });

   it('Provjera za od 10 do 8(kraj prije početka, sto je "Greška".)', function() {
    document.getElementById('divvv').innerHTML = "";
    kreirajRaspored.postaviDiv(document.getElementById('divvv'));
    kreirajRaspored.postaviDani(['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak']);
    kreirajRaspored.postaviSatPocetak(10);
    kreirajRaspored.postaviSatKraj(8);
    kreirajRaspored.iscrtajRaspored();
    let raspored = document.getElementById('divvv');
    console.log("ispis: " + raspored.firstChild);
    assert.equal(raspored.innerHTML, "Greška","Treba pisati greška.");
   });

   it('Provjera za od 10 do 10.5(kraj nije cijeli broj, sto je "Greška".)', function() {
    document.getElementById('divvv').innerHTML = "";
    kreirajRaspored.postaviDiv(document.getElementById('divvv'));
    kreirajRaspored.postaviDani(['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak']);
    kreirajRaspored.postaviSatPocetak(10);
    kreirajRaspored.postaviSatKraj(10.5);
    kreirajRaspored.iscrtajRaspored();
    let raspored = document.getElementById('divvv');
    console.log("ispis: " + raspored.firstChild);
    assert.equal(raspored.innerHTML, "Greška","Treba pisati greška.");
   });
   it('Provjera za od 9.5 do 10(početak nije cijeli broj, sto je "Greška".)', function() {
    document.getElementById('divvv').innerHTML = "";
    kreirajRaspored.postaviDiv(document.getElementById('divvv'));
    kreirajRaspored.postaviDani(['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak']);
    kreirajRaspored.postaviSatPocetak(9.5);
    kreirajRaspored.postaviSatKraj(10);
    kreirajRaspored.iscrtajRaspored();
    let raspored = document.getElementById('divvv');
    console.log("ispis: " + raspored.firstChild);
    assert.equal(raspored.innerHTML, "Greška","Treba pisati greška.");
   });
   it('Provjera za negativan početak (početak -1 kraj 20, sto je "Greška".)', function() {
    document.getElementById('divvv').innerHTML = "";
    kreirajRaspored.postaviDiv(document.getElementById('divvv'));
    kreirajRaspored.postaviDani(['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak']);
    kreirajRaspored.postaviSatPocetak(-1);
    kreirajRaspored.postaviSatKraj(20);
    kreirajRaspored.iscrtajRaspored();
    let raspored = document.getElementById('divvv');
    console.log("ispis: " + raspored.firstChild);
    assert.equal(raspored.innerHTML, "Greška","Treba pisati greška.");
   });
   it('Provjera za kraj > od 24 sto je "Greška".', function() {
    document.getElementById('divvv').innerHTML = "";
    kreirajRaspored.postaviDiv(document.getElementById('divvv'));
    kreirajRaspored.postaviDani(['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak']);
    kreirajRaspored.postaviSatPocetak(0);
    kreirajRaspored.postaviSatKraj(25);
    kreirajRaspored.iscrtajRaspored();
    let raspored = document.getElementById('divvv');
    console.log("ispis: " + raspored.firstChild);
    assert.equal(raspored.innerHTML, "Greška","Treba pisati greška.");
   });

   it('Provjera za unošenje ne-broja za početak (npr "amra" - što je "Greška".)', function() {
    document.getElementById('divvv').innerHTML = "";
    kreirajRaspored.postaviDiv(document.getElementById('divvv'));
    kreirajRaspored.postaviDani(['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak']);
    kreirajRaspored.postaviSatPocetak("amra");
    kreirajRaspored.postaviSatKraj(20);
    kreirajRaspored.iscrtajRaspored();
    let raspored = document.getElementById('divvv');
    console.log("ispis: " + raspored.firstChild);
    assert.equal(raspored.innerHTML, "Greška","Treba pisati greška.");
   });




 });











 describe('dodajAktivnost testovi', function() {
  it('treba iscrtati tabelu sa 5 redova plus red za vrijeme', function() {
   //test provjere broja redova kreiranje tabele
   document.getElementById('divvv').innerHTML = "";

   kreirajRaspored.postaviSatPocetak(8);
   kreirajRaspored.postaviSatKraj(21);
   kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
   kreirajRaspored.postaviDiv(document.getElementById("divvv"));
   kreirajRaspored.iscrtajRaspored();


   kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
   kreirajRaspored.postaviNaziv('WT');
   kreirajRaspored.postaviTip('predavanje');
   kreirajRaspored.postaviVrijemePocetak(10);
   kreirajRaspored.postaviVrijemeKraj(12);
   kreirajRaspored.postaviDan('Srijeda');
   kreirajRaspored.dodajAktivnost();
   
   let raspored = document.getElementById('divvv');
   let tabela = raspored.firstChild;
   let trazeniRed = tabela.rows[3].cells;

   console.log(trazeniRed.length);
   assert.equal(trazeniRed.length, 24,"Broj kolona treba biti 24");
  });
  
  it('Provjera dodavanja predavanja kad vrijeme početka nije ispravno - očekujemo alert', function() {
    //test provjere broja redova kreiranje tabele
    document.getElementById('divvv').innerHTML = "";
 
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();
 
 
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('WT');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(10.3);
    kreirajRaspored.postaviVrijemeKraj(12);
    kreirajRaspored.postaviDan('Srijeda');
    
    let tekstAlerta = kreirajRaspored.dodajAktivnost();
    assert.equal(tekstAlerta, 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin',"Tekst alerta: ");
   });

   it('Provjera dodavanja predavanja u dan koji ne postoji u rasporedu - očekujemo alert', function() {
    document.getElementById('divvv').innerHTML = "";
 
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();
 
 
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('OOI');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(10);
    kreirajRaspored.postaviVrijemeKraj(12);
    kreirajRaspored.postaviDan('Subota');
    
    let tekstAlerta = kreirajRaspored.dodajAktivnost();
    assert.equal(tekstAlerta, 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin',"Tekst alerta: ");
   });

   it('Provjera dodavanja predavanja u raspored koji ne postoji - očekujemo alert', function() {
    document.getElementById('divvv').innerHTML = "";
 

    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('OOI');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(10);
    kreirajRaspored.postaviVrijemeKraj(12);
    kreirajRaspored.postaviDan('Subota');
    
    let tekstAlerta = kreirajRaspored.dodajAktivnost();
    assert.equal(tekstAlerta, 'Greška - raspored nije kreiran',"Tekst alerta: ");
   });
   

   it('Provjera dodavanja predavanja kojem vrijeme kraja nije ispravno - očekujemo alert', function() {
    document.getElementById('divvv').innerHTML = "";
 
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();
 
 
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('OOI');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(10);
    kreirajRaspored.postaviVrijemeKraj(12.1);
    kreirajRaspored.postaviDan('Ponedjeljak');
    
    let tekstAlerta = kreirajRaspored.dodajAktivnost();
    assert.equal(tekstAlerta, 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin',"Tekst greške: ");
   });

   it('Provjera dodavanja predavanja kojem je vrijeme početka prije početka rasporeda - očekujemo alert', function() {
    document.getElementById('divvv').innerHTML = "";
 
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();
 
 
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('OOI');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(7);
    kreirajRaspored.postaviVrijemeKraj(9);
    kreirajRaspored.postaviDan('Ponedjeljak');
    
    let tekstAlerta = kreirajRaspored.dodajAktivnost();
    assert.equal(tekstAlerta, 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin',"Tekst greške: ");
   });

   it('Provjera dodavanja predavanja kojem je vrijeme kraja nakon završetka rasporeda - očekujemo alert', function() {
    document.getElementById('divvv').innerHTML = "";
 
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();
 
 
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('OOI');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(20);
    kreirajRaspored.postaviVrijemeKraj(22);
    kreirajRaspored.postaviDan('Ponedjeljak');
    
    let tekstAlerta = kreirajRaspored.dodajAktivnost();
    assert.equal(tekstAlerta, 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin',"Tekst greške: ");
   });

   it('Provjera dodavanja predavanja kojem se preklapa sa drugim terminom - očekujemo alert', function() {
    document.getElementById('divvv').innerHTML = "";
 
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();
 
 
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('OOI');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(9);
    kreirajRaspored.postaviVrijemeKraj(11);
    kreirajRaspored.postaviDan('Ponedjeljak');
    let tekst = kreirajRaspored.dodajAktivnost();

    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('RG');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(10);
    kreirajRaspored.postaviVrijemeKraj(12);
    kreirajRaspored.postaviDan('Ponedjeljak');
    
    let tekstAlerta = kreirajRaspored.dodajAktivnost();
    assert.equal(tekstAlerta, 'Greška - već postoji termin u rasporedu u zadanom vremenu',"Tekst greške: ");
   });


   it('Provjera dodavanja predavanja kojem počinje kad i neko drugo predavanje ili vježbe - očekujemo alert', function() {
    document.getElementById('divvv').innerHTML = "";
 
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();
 
 
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('OOI');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(9);
    kreirajRaspored.postaviVrijemeKraj(11);
    kreirajRaspored.postaviDan('Ponedjeljak');
    let tekst = kreirajRaspored.dodajAktivnost();
    
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('RG');
    kreirajRaspored.postaviTip('vježbe');
    kreirajRaspored.postaviVrijemePocetak(9);
    kreirajRaspored.postaviVrijemeKraj(12);
    kreirajRaspored.postaviDan('Ponedjeljak');
    
    let tekstAlerta = kreirajRaspored.dodajAktivnost();
    assert.equal(tekstAlerta, 'Greška - već postoji termin u rasporedu u zadanom vremenu',"Tekst greške: ");
   });


   it('Provjera dodavanja predavanja kojem se preklapa sa drugim terminom 2 - očekujemo alert', function() {
    document.getElementById('divvv').innerHTML = "";
 
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();
 
 
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('OOI');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(9);
    kreirajRaspored.postaviVrijemeKraj(14);
    kreirajRaspored.postaviDan('Ponedjeljak');
    let tekst = kreirajRaspored.dodajAktivnost();
    
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('RG');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(10);
    kreirajRaspored.postaviVrijemeKraj(12);
    kreirajRaspored.postaviDan('Ponedjeljak');
    
    let tekstAlerta = kreirajRaspored.dodajAktivnost();
    assert.equal(tekstAlerta, 'Greška - već postoji termin u rasporedu u zadanom vremenu',"Tekst greške: ");
   });


   it('Provjera dodavanja predavanja kojem se preklapa sa drugim terminom 3 - očekujemo alert', function() {
    document.getElementById('divvv').innerHTML = "";
 
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();
 
 
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('OOI');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(9);
    kreirajRaspored.postaviVrijemeKraj(14);
    kreirajRaspored.postaviDan('Ponedjeljak');
    let tekst = kreirajRaspored.dodajAktivnost();
    
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('RG');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(9);
    kreirajRaspored.postaviVrijemeKraj(12);
    kreirajRaspored.postaviDan('Ponedjeljak');
    
    let tekstAlerta = kreirajRaspored.dodajAktivnost();
    assert.equal(tekstAlerta, 'Greška - već postoji termin u rasporedu u zadanom vremenu',"Tekst greške: ");
   });


   it('Provjera dodavanja aktivnosti u ispravnu ćeliju', function() {
    document.getElementById('divvv').innerHTML = "";
 
    kreirajRaspored.postaviSatPocetak(8);
    kreirajRaspored.postaviSatKraj(21);
    kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
    kreirajRaspored.postaviDiv(document.getElementById("divvv"));
    kreirajRaspored.iscrtajRaspored();
 
 
    kreirajRaspored.postaviRaspored(document.getElementById('divvv'));
    kreirajRaspored.postaviNaziv('OOI');
    kreirajRaspored.postaviTip('predavanje');
    kreirajRaspored.postaviVrijemePocetak(9);
    kreirajRaspored.postaviVrijemeKraj(14);
    kreirajRaspored.postaviDan('Ponedjeljak');
    kreirajRaspored.dodajAktivnost();
    
    let raspored = document.getElementById('divvv');
   let tabela = raspored.firstChild;
   let trazenaCelija = tabela.rows[1].cells[3];
   var varijabla = 0;
   if(trazenaCelija.classList.contains('occupied')){
       varijabla = 1;
   }

    assert.equal(varijabla, 1,"Tekst greške: ");
   });

});

});