window.onload = (event) => {
    dani = ["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"];
    var satPocetak = 7;
    var satKraj = 21 ;
    var divZaTabelu = document.getElementById("divvv") ;
    iscrtajRaspored(divZaTabelu,dani,satPocetak,satKraj); 
    dodajAktivnost(divZaTabelu,"OOI","predavanje",10,16,"Ponedjeljak");

    dodajAktivnost(divZaTabelu,"OOI","predavanje",10,14,"Ponedjeljak");

    dodajAktivnost(divZaTabelu,"WT","vježbe",14,15,"Srijeda");
    dodajAktivnost(divZaTabelu,"WT","vježbe",9,9.5,"Petak");
    dodajAktivnost(divZaTabelu,"WT","vježbe",12,13.5,"Petak");
    dodajAktivnost(divZaTabelu,"DM","predavanje",18,20,"Utorak");
    dodajAktivnost(divZaTabelu,"DM","predavanje",20,21,"Utorak");
    dodajAktivnost(divZaTabelu,"RMA","vježbe",12.5,14,"Četvrtak");
    dodajAktivnost(divZaTabelu,"RMA","vježbe",20,23,"Ponedjeljak");


    dani = ["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak"];
    var satPocetak = 6;
    var satKraj = 23 ;
    var divZaTabelu2 = document.getElementById("div2") ;
    iscrtajRaspored(divZaTabelu2,dani,satPocetak,satKraj);

    dodajAktivnost(divZaTabelu2,"WT","vježbe",6,9,"Ponedjeljak");
    dodajAktivnost(divZaTabelu2,"WT","predavanje",18.3,19,"Ponedjeljak");
    dodajAktivnost(divZaTabelu2,"RG","vježbe",14,15,"Srijeda");
    dodajAktivnost(divZaTabelu2,"PWS","vježbe",9,9.5,"Petak");
    dodajAktivnost(divZaTabelu2,"WT","vježbe",12,13.5,"Petak");
    dodajAktivnost(divZaTabelu2,"DM","predavanje",18,20,"Utorak");
    dodajAktivnost(divZaTabelu2,"DM","vježbe",23,21,"Utorak");
    dodajAktivnost(divZaTabelu2,"RMA","predavanje",12.5,14,"Petak");
    dodajAktivnost(divZaTabelu2,"OOI","vježbe",19,19.5,"Srijeda");

   }