let studenti = [];
let grupe  = [];


function ucitajGrupe() {
    var ajax = new XMLHttpRequest();
    grupe= [];
    ajax.open("GET", "http://localhost:3000/v2/grupa", true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
        let data  = JSON.parse(ajax.responseText);
        $.each(data,function(){
            var grupa = {naziv:this['naziv'], predmet: this['predmetId']}
            grupe.push(grupa);
            var element  = document.getElementById("grupe");
            var opcija = document.createElement("option");
            opcija.text = grupa.naziv;
            element.add(opcija);
        });
       } 
    };
}

function ucitajStudenteSaTextArea(){
    var text = document.getElementById("studenti").value;
    var redoviPodataka = text.split("\n") ;
    var studentis = [] ;
    for ( var i = 0 ; i<redoviPodataka.length ; i++) {
        if(redoviPodataka[i] != ""){}
        var kolonaPodataka = redoviPodataka[i].split(",") ;
        var student = {ime:kolonaPodataka[0],index:kolonaPodataka[1]}
        studentis.push(student) ;
        
    }
    return studentis;
}
function posaljiBtn(){

    let studentiTextArea = ucitajStudenteSaTextArea();

    kreirajStudenta(studentiTextArea);
    
}

function kreirajStudenta(studenti){
    var selektovanaGrupa  = document.getElementById("grupe").value;
    let ajax = new XMLHttpRequest();
    ajax.open("POST", "//localhost:3000/v2/predmetiSaForme", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    
    var zaSlanje = {grupe: selektovanaGrupa , stud: studenti} ;

    ajax.send(JSON.stringify(zaSlanje));  
    
    
    ajax.onreadystatechange = function()
    {
        if(ajax.readyState == 4){
            if(ajax.status == 200 || ajax.status == 0){
                let tekst = JSON.parse(ajax.responseText);
                var poruka = {message:tekst['message'], status:tekst['status']};
                console.log(poruka.message)

                if(poruka.message.toString() != ""){
                    document.getElementById("studenti").value = poruka.message;
                }
                else {
                    document.getElementById("studenti").value = "";
                }
            }
        }
    }
}
window.onload = (event) => {

    ucitajGrupe();
}