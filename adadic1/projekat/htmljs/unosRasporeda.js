function potvrdiDugme(){
    let nazivPredmeta  = document.getElementById("nazivPredmeta").value; 
    let tip = document.getElementById("tip").value;
    let vrijemePocetka =document.getElementById("vrijemePocetka").value;
    let vrijemeZavrsetka= document.getElementById("vrijemeZavrsetka").value;
    let dan =document.getElementById("dan").value;
    let nazivAktivnosti = nazivPredmeta + tip; //je li to naziv valjda jeste
    
    var aktivnost = {naziv:nazivAktivnosti, tip:tip, pocetak:vrijemePocetka, kraj:vrijemeZavrsetka, dan:dan, nazivPredmeta:nazivPredmeta, dan:dan};
    dodajAktivnost(aktivnost);
}


function dodajAktivnost(aktivnost){
    let file = new XMLHttpRequest(); 
    file.open("POST", "//localhost:3000/v2/unosRasporeda/spirala4", true);
    file.setRequestHeader("Content-Type", "application/json");
    file.send(JSON.stringify(aktivnost));
    file.onreadystatechange = function () {
        if (file.readyState == 4 && file.status == 200) {
            let jsonText = JSON.parse(file.responseText);
            console.log(jsonText);
        }
    }
 }




function ucitajDane(){
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "//localhost:3000/v2/dan", true);
    ajax.send();
    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {
        dani = JSON.parse(ajax.responseText); 
       console.log(ajax.responseText);
       for(var i  = 0; i< dani.length; i++){
        var redoviPodataka = dani[i];
        var dan = {naziv:redoviPodataka['naziv']};
        console.log(dan);
        var selectTag = document.getElementById("dan");
        var opcija = document.createElement("option");
        opcija.text = dan.naziv ;
        selectTag.add(opcija);
       }
            
        }
       }
    }


    function ucitajTipove(){
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "//localhost:3000/v2/tip", true);
        ajax.send();
        ajax.onreadystatechange = function() {
    
            if (ajax.readyState == 4 && ajax.status == 200) {
            dani = JSON.parse(ajax.responseText); 
           console.log(ajax.responseText);
           for(var i  = 0; i< dani.length; i++){
            var redoviPodataka = dani[i];
            var dan = {naziv:redoviPodataka['naziv']};
            console.log(dan);
            var selectTag = document.getElementById("tip");
            var opcija = document.createElement("option");
            opcija.text = dan.naziv ;
            selectTag.add(opcija);
           }
                
            }
           }
        }



window.onload = (event) => {
    ucitajDane();
    ucitajTipove();
    //ucitajPredmeteNaFormu();
}

/* spirala 3 kod za unos rasporeda

let aktivnosti = [];
let predmeti = [];

function potvrdiDugme(){
    let nazivPredmeta  = document.getElementById("nazivPredmeta").value; 
    let tip = document.getElementById("tip").value;
    let vrijemePocetka =document.getElementById("vrijemePocetka").value;
    let vrijemeZavrsetka= document.getElementById("vrijemeZavrsetka").value;
    let dan =document.getElementById("dan").value;
    let postojiLiPredmetUTxt = 0;
    for(var i = 0; i < predmeti.length; i++){
        if(predmeti[i].naziv == nazivPredmeta) postojiLiPredmetUTxt = 1;
    }
    let tmp = {naziv:nazivPredmeta};
    if(postojiLiPredmetUTxt == 0) 
    {
        dodajPredmet(tmp);
    }

    vrijemePocetka = vrijemePocetka.replace(":00", "");
    vrijemePocetka = vrijemePocetka.replace(":30",".5");
    vrijemeZavrsetka = vrijemeZavrsetka.replace(":00", "");
    vrijemeZavrsetka = vrijemeZavrsetka.replace(":30",".5");

    var aktivnost = {naziv:nazivPredmeta, tip:tip, pocetak:vrijemePocetka, kraj:vrijemeZavrsetka, dan:dan};
    dodajAktivnost(aktivnost,postojiLiPredmetUTxt);  
}
function obrisiPredmet(predmet){
    let file = new XMLHttpRequest(); 
    file.open("DELETE", "//localhost:3000/predmet/" + predmet, true);
    file.send(JSON.stringify(predmet));
 }

function dodajAktivnost(aktivnost, postojiLiPredmetUTxt){
    let file = new XMLHttpRequest(); 
    file.open("POST", "//localhost:3000/aktivnost", true);

    
    file.setRequestHeader("Content-Type", "application/json");
    
    file.send(JSON.stringify(aktivnost));
        file.onreadystatechange = function () {

        if (file.readyState == 4 && file.status == 200) {
            let jsonText = JSON.parse(file.responseText);
            
            if(jsonText.message == "Aktivnost nije validna!" && postojiLiPredmetUTxt != 1){
                obrisiPredmet(aktivnost.naziv);
            }
        }
    }

}
function dodajPredmet(predmet){
    let file = new XMLHttpRequest(); 
    file.open("POST", "//localhost:3000/predmet", true);
    file.setRequestHeader("Content-Type", "application/json");
    file.send(JSON.stringify(predmet));     
}

function ucitajSveAktivnosti(){
    //ucitavaju se na pocetku
    aktivnosti = [];
    var xmlhttpRequest = new XMLHttpRequest();
    xmlhttpRequest.open("GET", "http://localhost:3000/aktivnosti", true);

    xmlhttpRequest.onreadystatechange = function(){
        if(xmlhttpRequest.readyState == 4){
            if(xmlhttpRequest.status == 200 || xmlhttpRequest.status == 0){
                let podaci = JSON.parse(xmlhttpRequest.responseText);
                $.each(podaci, function(){
                    var aktivnost = {naziv:this['naziv'], tip:this['tip'], pocetak:this['pocetak'], kraj:this['kraj'], dan:this['dan']};
                    aktivnosti.push(aktivnost);
                });
            }
        }
    };
    xmlhttpRequest.send();

}
function ucitajSvePredmete(){
    //ucitavaju se na pocetku samom
    predmeti = [];
    var xmlhttpRequest = new XMLHttpRequest();
    xmlhttpRequest.open("GET", "http://localhost:3000/predmeti", true);

    xmlhttpRequest.onreadystatechange = function(){
        if(xmlhttpRequest.readyState == 4){
            if(xmlhttpRequest.status == 200 || xmlhttpRequest.status == 0){
                let podaci = JSON.parse(xmlhttpRequest.responseText);
                $.each(podaci, function(){
                    var predmet = {naziv:this['naziv']};
                    predmeti.push(predmet);
                });
            }
        }
    };
    xmlhttpRequest.send();


}
*/







