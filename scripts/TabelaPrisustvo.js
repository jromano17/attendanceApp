let TabelaPrisustvo = function (divRef, podaci) {
    divRef.innerHTML="";
  /*
    let prisustvo = TabelaPrisustvo(div, {studenti: [{ime:"Neko",index:12345}],
     prisustva:[{sedmica:1,predavanja:1,vjezbe:1,index:12345}], predmet:"WT", brojPredavanjaSedmicno:3, brojVjezbiSedmicno:2});
*/
    var brojSedmica = 0;
    for(let i = 0; i<podaci.prisustva.length; i++){
        if(podaci.prisustva[i].sedmica>brojSedmica) brojSedmica = podaci.prisustva[i].sedmica;
    }
    var rimskiBrojevi = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];
    var brojCasova = podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno;
    var htmlKod;
    htmlKod = "<h1>" + podaci.predmet + "</h1>";
    htmlKod += "<h2>BSc 2</h2>"+
    "<h3>Računarstvo i informatika</h3> "+
    " <table id=\"tabela\">"+
    "<tr>"+
    "<th>Ime i prezime</th>"+
    "<th>Index</th>" ;
    for(let i = 0; i<brojSedmica-1; i++){
        htmlKod += "<th>" + rimskiBrojevi[i] + "</th>";
    }
    htmlKod += "<th colspan=\"" + brojCasova + "\">" + rimskiBrojevi[brojSedmica-1] + "</th>";
    if(brojSedmica<14) htmlKod += "<th>" + rimskiBrojevi[brojSedmica] + " - XV </th>" ;
    else if(brojSedmica==14) htmlKod += "<th>XV</th>";

    htmlKod+="</tr>";

    
    htmlKod+="</table>";
    divRef.innerHTML = htmlKod;
};
 
