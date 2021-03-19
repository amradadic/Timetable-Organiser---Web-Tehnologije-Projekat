var satPocetakRaspored;
var brojDanaUTabeli;
var satKrajRasporeda;
var ukupanBrojKolonaRasporeda;

function iscrtajRaspored(div,dani,satPocetak,satKraj){
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

function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj,dan){

    if(raspored.firstElementChild ==  null){
        alert("rasporeda nema");
        return;
    }
    if(vrijemePocetak >= vrijemeKraj){
        alert("Neispravno vrijeme!");
        return;
    }
    var brojKolona = (vrijemeKraj - vrijemePocetak) / 0.5;
    var pocetak = (vrijemePocetak - satPocetakRaspored) *2 + 1;
    var redTR = raspored.firstElementChild.rows[0];
    var brojReda;
    var ukupanBrojKolona = 0;

    if(vrijemePocetak < satPocetakRaspored || vrijemePocetak > satKrajRasporeda){
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return;
    }
    if(vrijemeKraj > satKrajRasporeda || vrijemeKraj < satPocetakRaspored){
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return;
    }
    if(vrijemeKraj * 2 != parseInt(vrijemeKraj*2) || vrijemePocetak*2 != parseInt(vrijemePocetak*2)){
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
        return;
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
        return;
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
     
    console.log(pocetak);
    console.log(celijaTD);
   /* if(celijaTD.classList.contains("occupied")){
        alert("Termin je već zauzet, pokušajte drugi!");
        return;
    }*/

    /*ima li preklapanja*/
    var brojZaBrisanjeCelija = brojKolona;  
    for (var i = pocetak; i < (brojZaBrisanjeCelija + pocetak); i++){
       // console.log("pocetak je" + pocetak);

        //console.log(redTR.cells[i] + " + " +  i);
        if(redTR.cells[i].classList.contains("occupied")){
            console.log("tu je");
            alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
            return;
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
 
    /*sad moramo obrisati visak*/ 
    var brojZaBrisanjeCelija = brojKolona;  
    for (var i = (pocetak + 1); i < (brojZaBrisanjeCelija + pocetak); i++){
        redTR.deleteCell(pocetak+1);
    }   
}
