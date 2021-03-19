var kreirajRaspored = ( function(){

    dani = [];
    var satPocetak;
    var satKraj  ;
    var div;
    var raspored;
    var satPocetak;
    var satKraj;
    var vrijemePocetak;
    var vrijemeKraj;
    var naziv;
    var tip;
    var dan;

    var satPocetakRaspored;
    var brojDanaUTabeli;
    var satKrajRasporeda;
    var ukupanBrojKolonaRasporeda;

    
    var iscrtajRaspored = function() {
        satPocetakRaspored = satPocetak;
    satKrajRasporeda = satKraj;

    if(satPocetak >= satKraj || satKraj > 24 || satPocetak > 24 || satKraj < 0 || satPocetak < 0 || !Number.isInteger(satKraj) || !Number.isInteger(satPocetak)){
        var tekstGreska = document.createTextNode("Greška");
        div.appendChild(tekstGreska);
        
        alert("Greška");
        return 'Greška';
    }
    var table = document.createElement('table');
    var brojKolona = (satKraj - satPocetak) * 2 + 1;
    ukupanBrojKolonaRasporeda = brojKolona;
    var vrijeme = [0,2,4,6,8,10,12,15,17,19,21,23];

    var trPrvi = document.createElement('tr');
    trPrvi.classList.add('first-row');

    //PRVI RED
    for (var i = satPocetak; i < satKraj ; i++){
        var tdPrvi = document.createElement('td');
        
        if (i%2 == 0 && i<=12) {
            if(i<10){
                var textPrvi = document.createTextNode("0" + i + ":00");
                tdPrvi.appendChild(textPrvi);
            }else{
                var textPrvi = document.createTextNode(i + ":00");
                tdPrvi.appendChild(textPrvi); 
            }
           
              
        }
        if(i > 13 && i%2 != 0){
            var textPrvi = document.createTextNode(i + ":00");
            tdPrvi.appendChild(textPrvi);
        }
        var tdDrugaCelija = document.createElement('td');
        trPrvi.appendChild(tdDrugaCelija);
        trPrvi.appendChild(tdPrvi);
    }
    table.appendChild(trPrvi);

    for (var i = 0; i < dani.length; i++){ //donji dio tabaele
        var tr = document.createElement('tr');   

        for(var j = 0; j < brojKolona; j++){

            if (j == 0){
                var tdDan = document.createElement('td');
                var tekstDani = document.createTextNode(dani[i]);
                tdDan.appendChild(tekstDani);
                tdDan.classList.add('days');

                tr.appendChild(tdDan);
            }else{
                var td1 = document.createElement('td');
                tr.appendChild(td1);
            }
        }
    
        table.appendChild(tr);
    }
    div.appendChild(table);
    }
/////////////////////////////////////////////////////////////////////////komentar
    var dodajAktivnost = function() {
        if(raspored.firstElementChild ==  null){
            alert("Greška - raspored nije kreiran");
            return 'Greška - raspored nije kreiran';
        }
        if(vrijemePocetak >= vrijemeKraj){
            alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            return 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin';
        }
        if(vrijemeKraj * 2 != parseInt(vrijemeKraj*2) || vrijemePocetak*2 != parseInt(vrijemePocetak*2)){
            alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            return 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin';
        }

        console.log("vrijeme pocetak: "+vrijemePocetak );
        console.log("vrijeme kraj : "+ vrijemeKraj);
        var brojKolona = (vrijemeKraj - vrijemePocetak) / 0.5;
        var pocetak = (vrijemePocetak - satPocetakRaspored) *2 + 1;
        var redTR = raspored.firstElementChild.rows[0];
        var brojReda;
        var ukupanBrojKolona = 0;
    
        if(vrijemePocetak < satPocetakRaspored || vrijemePocetak > satKrajRasporeda){
            alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            return 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin';
        }
        if(vrijemeKraj > satKrajRasporeda || vrijemeKraj < satPocetakRaspored){
            alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            return 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin';
        }
        /*u koji red idemo...*/
        for (var i = 1; i < raspored.firstElementChild.rows.length; i++){
           if(raspored.firstElementChild.rows[i].cells[0].innerText.trim() == dan){
                brojReda = i;
                redTR = raspored.firstElementChild.rows[i];
           }
        }
        if(brojReda == null){
            alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
            return 'Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin';
        }
         
        /*provjera koliko ima colspanova*/
        var tmp = pocetak;
    for (var i = 1; i< redTR.cells.length ; i++){
        if(redTR.cells[i].colSpan != 1 && i < pocetak){

            pocetak -= redTR.cells[i].colSpan;
            pocetak+=1;
            if(tmp > pocetak && i + redTR.cells[i].colSpan > tmp){
                alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
                return 'Greška - već postoji termin u rasporedu u zadanom vremenu';
            }
        }
    }
    
        var celijaTD = redTR.cells[pocetak];
         
        /*if(celijaTD.classList.contains("occupied")){
            alert("Termin je već zauzet, pokušajte drugi!");
            return;
        }*/
    
        /*ima li preklapanja*/
        var brojZaBrisanjeCelija = brojKolona;  
        for (var i = pocetak; i < (brojZaBrisanjeCelija + pocetak); i++){
            if(redTR.cells[i].classList.contains("occupied")){
                alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
                return 'Greška - već postoji termin u rasporedu u zadanom vremenu';
            }
        } 
    
        celijaTD.colSpan = parseInt(brojKolona);
        celijaTD.classList.add('occupied');
        
        var text1 = naziv ; 
        var text2 = tip;
        var text3 = document.createElement('br');
        var dodaj = document.createTextNode(text1);
        var dodaj3 = document.createTextNode(text2);
        celijaTD.appendChild(dodaj);
        celijaTD.appendChild(text3);
        celijaTD.appendChild(dodaj3);
     
        console.log("AMRA");
        /*sad moramo obrisati visak*/ 
        var brojZaBrisanjeCelija = brojKolona;  
        for (var i = (pocetak + 1); i < (brojZaBrisanjeCelija + pocetak); i++){
            redTR.deleteCell(pocetak+1);
        }   
    }
    

    var postaviDani = function(daniP){
        dani = daniP;
    }
    var postaviSatPocetak = function(satPocetakP){
        satPocetak = satPocetakP;
    }
    var postaviSatKraj = function(satKrajP){
        satKraj = satKrajP;
    } 
    var postaviDiv = function(divP){
        div  = divP;
    }

    var postaviRaspored = function(rasporedP){
        raspored = rasporedP;
    }
    var postaviVrijemePocetak = function(vrijemePocetakP){
        vrijemePocetak = vrijemePocetakP;
    }
    var postaviVrijemeKraj = function (vrijemeKrajP){
        vrijemeKraj = vrijemeKrajP;
    }
    var postaviNaziv = function(nazivP){
        naziv = nazivP;
    }
    var postaviTip = function(tipP){
        tip = tipP;
    }
    var postaviDan = function (danP){
        dan = danP;
    }
    return {
        iscrtajRaspored:iscrtajRaspored,
        postaviDani:postaviDani,
        postaviSatPocetak:postaviSatPocetak,
        postaviSatKraj:postaviSatKraj,
        postaviDiv:postaviDiv,

        dodajAktivnost:dodajAktivnost,
        postaviRaspored:postaviRaspored,
        postaviVrijemeKraj:postaviVrijemeKraj,
        postaviVrijemePocetak:postaviVrijemePocetak,
        postaviNaziv:postaviNaziv,
        postaviTip:postaviTip,
        postaviDan:postaviDan
    }
    }

)();

/*kreirajRaspored.postaviSatPocetak(8);
kreirajRaspored.postaviSatKraj(21);
kreirajRaspored.postaviDani(["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"]);
kreirajRaspored.postaviDiv(document.getElementById("divvv"));
kreirajRaspored.iscrtajRaspored();


kreirajRaspored.postaviRaspored(document.getElementById("divvv"));
kreirajRaspored.postaviNaziv("WT");
kreirajRaspored.postaviTip("vježbe");
kreirajRaspored.postaviVrijemePocetak(12);
kreirajRaspored.postaviVrijemeKraj(14);
kreirajRaspored.postaviDan("Ponedjeljak");
kreirajRaspored.dodajAktivnost();*/
