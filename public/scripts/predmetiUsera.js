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
            console.log("preUse:" + data);
            TabelaPrisustvo(div,data.lista);
        }
    });
}