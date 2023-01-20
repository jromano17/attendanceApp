var porukaElement,brojPokusajaElement;
var nastavnik,predmeti;
window.onload=function(){
    PoziviAjax.getPredmeti(function(error,data){
        if(error) console.log(error);
        else if(data==null) console.log("Tek otvorena");
        else if(data.greska=="Nastavnik nije loginovan") {
            var greska = document.getElementById("welcome");
            greska.innerHTML = "Niste prijavljeni";
            var logoutButton = document.getElementById("logoutButton");
            logoutButton.style.display = "none";
        }
        else if(data.greska=="Nema greske"){
            nastavnik=document.getElementById("nastavnik");
            predmeti=document.getElementById("predmeti");
            nastavnik.innerHTML = data.username;
            var htmlPredmeta = "";
            /*for (let i=0; i<data.predmeti.length; i++){
                htmlPredmeta += "<li id= \"" + data.predmeti[i] + "\">";
                htmlPredmeta += data.predmeti[i];
                htmlPredmeta += "</li>";
            }*/
            for (let i=0; i<data.predmeti.length; i++){
                htmlPredmeta += "<li> <a href=\"#\"  id= \"" + data.predmeti[i] +  "\" onclick=\"prikaziPrisustvo(this.id)\"> ";
                htmlPredmeta += data.predmeti[i];
                htmlPredmeta += "</a> </li>";
            }
            predmeti.innerHTML = htmlPredmeta;
        }
    });
}

function prikaziPrisustvo(nazivPredmeta){
    PoziviAjax.getPredmet(nazivPredmeta,function(error,data){
        if(error) console.log(error);
        else if(data==null) console.log("error");
        else{
            let div = document.getElementById("divSadrzaj");
            //console.log("preUse:" + data);
            //console.log(data.lista);
            console.log(data.lista);
            TabelaPrisustvo(div,data["lista"]);
        }
    });
}

function obojenoKliknuto(event){  
    var clickedCell = event.target;
    var prisustva = clickedCell.parentNode;
    var red = prisustva.parentNode;
    var naziv = document.getElementById("nazivPredmeta").innerHTML;
    var indeks = red.children[0].children[1].innerHTML;
    var sedmica = red.children[1].id[0];
    var sedmicaBlok = red.children[1].children;
    var predavanja,vjezbe;

    if (clickedCell.id=="Vprisutan") {
        predavanja = 0;
        vjezbe = -1;
    }
    else if (clickedCell.id=="Pprisutan") {
        predavanja = -1;
        vjezbe = 0;
    }
    else if (clickedCell.id=="Vneprisutan"){
        predavanja = 0;
        vjezbe = 1;
    }
    else if (clickedCell.id=="Pneprisutan"){
        predavanja = 1;
        vjezbe = 0;
    }
    for(let i=0;i<sedmicaBlok.length;i++){
        if(sedmicaBlok[i].id=="Pprisutan") predavanja++;
        if(sedmicaBlok[i].id=="Vprisutan") vjezbe++;
    }
    PoziviAjax.postPrisustvo(naziv,indeks,{sedmica:sedmica,predavanja:predavanja,vjezbe:vjezbe},function(error,data){
        if(error) console.log(error);
        else if(data==null) console.log("error");
        else {
            let div = document.getElementById("divSadrzaj");

            var tabela = TabelaPrisustvo(div,data,sedmica);
            for(let i = 0; i<7-sedmica;i++){
                tabela.prethodnaSedmica();
            }
        }
    });
}

function praznoKliknuto(event){  
    var clickedCell = event.target;
    var prisustva = clickedCell.parentNode;
    var red = prisustva.parentNode;
    var naziv = document.getElementById("nazivPredmeta").innerHTML;
    var indeks = red.children[0].children[1].innerHTML;
    var sedmica = red.children[1].id[0];
    var sedmicaBlok = red.children[1].children;
    var predavanja=0,vjezbe=0;
    
    if (clickedCell.id=="Pnepopunjeno") {
        predavanja = 1;
        vjezbe = 0;
    }
    else if (clickedCell.id=="Vnepopunjeno") {
        predavanja = 0;
        vjezbe = 1;
    }

    PoziviAjax.postPrisustvo(naziv,indeks,{sedmica:sedmica,predavanja:predavanja,vjezbe:vjezbe},function(error,data){
        if(error) console.log(error);
        else if(data==null) console.log("error");
        else {
            let div = document.getElementById("divSadrzaj");

            var tabela = TabelaPrisustvo(div,data,sedmica);
            for(let i = 0; i<7-sedmica;i++){
                tabela.prethodnaSedmica();
            }
        }
    });
}