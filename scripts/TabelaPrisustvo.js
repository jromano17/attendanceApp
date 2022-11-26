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
    
    var brojKolonaTabele = 2 + brojSedmica;
    if(brojKolonaTabele<17) brojKolonaTabele++;
    for(let i = 0; i<podaci.studenti.length; i++){
        htmlKod += "<tr>"+
        "<td rowspan=\"2\">" + podaci.studenti[i].ime + "</td>"+
        "<td rowspan=\"2\">" + podaci.studenti[i].index + "</td>";
        for(let j = 0; j<brojSedmica-1; j++){
            htmlKod += "<td rowspan=\"2\">" + "100%" + "</td>";
        }
        for(let j = 0; j<podaci.brojPredavanjaSedmicno; j++){
            htmlKod += "<td style=\"width: 0.5em;\">P <br> " + (j+1) + "</td>";
        }
        for(let j = 0; j<podaci.brojVjezbiSedmicno; j++){
            htmlKod += "<td style=\"width: 0.5em;\">V <br> " + (j+1) + "</td>";
        }
        if(brojSedmica!=15) htmlKod += "<td rowspan=\"2\" class=\"zadnja-kolona\"></td>";
        htmlKod += "</tr>" + 
        "<tr>";

        var indeks = podaci.prisustva.findIndex((el) => {
            if(el.index == podaci.studenti[i].index && el.sedmica == brojSedmica) return true; 
            else return false;
        });

        for(let j = 0; j<podaci.brojPredavanjaSedmicno; j++) {
            if(j<podaci.prisustva[indeks].predavanja) htmlKod += "<td class= \"prisutan\"></td>";
            else htmlKod += "<td class=\"neprisutan\"></td>";
        }
        for(let j = 0; j<podaci.brojVjezbiSedmicno; j++) {
            if(j<podaci.prisustva[indeks].vjezbe) htmlKod += "<td class= \"prisutan\"></td>";
            else htmlKod += "<td class=\"neprisutan\"></td>";
        }

        htmlKod += "</tr>";
    }


    htmlKod+="</table>";
    divRef.innerHTML = htmlKod;
};
 
