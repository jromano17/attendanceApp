function iscrtaj(divRef, podaci,trenutna) {
    divRef.innerHTML="";
    if(podaci.brojPredavanjaSedmicno<0 || podaci.brojVjezbiSedmicno<0) return "Podaci o prisustvu nisu validni!";
    var nizUpisanihSedmica = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(let i = 0; i<podaci.prisustva.length; i++){
        if(podaci.studenti.findIndex((el) => {return el.index == podaci.prisustva[i].index;})==-1)
            return {htmlKod: "Podaci o prisustvu nisu validni!"};
        nizUpisanihSedmica[podaci.prisustva[i].sedmica-1] = 1;
    }
    for(let i = 1; i<nizUpisanihSedmica.length-1;i++){
        if(nizUpisanihSedmica[i]==0 && nizUpisanihSedmica[i-1]==1 && nizUpisanihSedmica[i+1]==1)
            return {htmlKod: "Podaci o prisustvu nisu validni!"};
    }
    var brojSedmica = 0;
    for(let i = 0; i<podaci.prisustva.length; i++){
        if(podaci.prisustva[i].sedmica>brojSedmica) brojSedmica = podaci.prisustva[i].sedmica;
    }
    var rimskiBrojevi = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];
    var brojCasova = podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno;
    var htmlKod;
    htmlKod = "<h1 id=\"nazivPredmeta\">" + podaci.predmet + "</h1>";
    htmlKod += "<h2 id=\"smjer\">BSc 2</h2>"+
    "<h3>Računarstvo i informatika</h3> "+
    " <table id=\"tabela\">"+
    "<tr>"+
    "<th class=\"ime_studenta\">Ime i prezime</th>"+
    "<th>Index</th>" ;
    for(let i = 0; i<trenutna-1; i++){
        htmlKod += "<th>" + rimskiBrojevi[i] + "</th>";
    }
    htmlKod += "<th colspan=\"" + brojCasova + "\">" + rimskiBrojevi[trenutna-1] + "</th>";
    for(let i = trenutna; i<brojSedmica; i++){
        htmlKod += "<th>" + rimskiBrojevi[i] + "</th>";
    }
    if(brojSedmica<14) htmlKod += "<th>" + rimskiBrojevi[brojSedmica] + " - XV </th>" ;
    else if(brojSedmica==14) htmlKod += "<th>XV</th>";
    htmlKod+="</tr>";
    for(let i = 0; i<podaci.studenti.length; i++){
        
        /**/htmlKod+="<tbody id=\"neki" + i+ "\">"; 


        for(let k = 0; k<podaci.studenti.length; k++){
            if(i!=k && podaci.studenti[i].index == podaci.studenti[k].index)
                return {htmlKod: "Podaci o prisustvu nisu validni!"};
        }
        

        htmlKod += "<tr id=\"redStudenta\">"+
        "<td rowspan=\"2\" class=\"ime_studenta\" id=\"imeStudenta\">" + podaci.studenti[i].ime + "</td>"+
        "<td rowspan=\"2\" id=\"indeksStudenta\">" + podaci.studenti[i].index + "</td>";
        for(let j = 0; j<trenutna-1; j++){
            var indeksZaProcente;
            var brojac = 0;
            for(let k = 0; k<podaci.prisustva.length; k++){
                if(podaci.prisustva[k].index == podaci.studenti[i].index && podaci.prisustva[k].sedmica == j+1) {
                    brojac++;
                    indeksZaProcente = k;
                }
            }
            if(brojac==0){
                htmlKod += "<td rowspan=\"2\"> </td>";
                continue;
            }
            if(brojac>1 || podaci.prisustva[indeksZaProcente].predavanja>podaci.brojPredavanjaSedmicno || podaci.prisustva[indeksZaProcente].vjezbe>podaci.brojVjezbiSedmicno  || podaci.prisustva[indeksZaProcente].predavanja<0 || podaci.prisustva[indeksZaProcente].vjezbe<0)
                return {htmlKod: "Podaci o prisustvu nisu validni!"};
            var casovaPrisutan = podaci.prisustva[indeksZaProcente].predavanja + podaci.prisustva[indeksZaProcente].vjezbe;
            var posto = Math.floor(100*casovaPrisutan/brojCasova);
            htmlKod += "<td rowspan=\"2\">" + posto + "%" + "</td>";
        }
        for(let j = 0; j<podaci.brojPredavanjaSedmicno; j++){
            htmlKod += "<td style=\"width: 0.5em;\">P <br> " + (j+1) + "</td>";
        }
        for(let j = 0; j<podaci.brojVjezbiSedmicno; j++){
            htmlKod += "<td style=\"width: 0.5em;\">V <br> " + (j+1) + "</td>";
        }


        for(let j = trenutna; j<brojSedmica; j++){
            var indeksZaProcente;
            var brojac = 0;
            for(let k = 0; k<podaci.prisustva.length; k++){
                if(podaci.prisustva[k].index == podaci.studenti[i].index && podaci.prisustva[k].sedmica == j+1) {
                    brojac++;
                    indeksZaProcente = k;
                }
            }
            if(brojac==0){
                htmlKod += "<td rowspan=\"2\"> </td>";
                continue;
            }
            if(brojac>1 || podaci.prisustva[indeksZaProcente].predavanja>podaci.brojPredavanjaSedmicno || podaci.prisustva[indeksZaProcente].vjezbe>podaci.brojVjezbiSedmicno  || podaci.prisustva[indeksZaProcente].predavanja<0 || podaci.prisustva[indeksZaProcente].vjezbe<0)
                return {htmlKod: "Podaci o prisustvu nisu validni!"};
            var casovaPrisutan = podaci.prisustva[indeksZaProcente].predavanja + podaci.prisustva[indeksZaProcente].vjezbe;
            var posto = Math.floor(100*casovaPrisutan/brojCasova);
            htmlKod += "<td rowspan=\"2\">" + posto + "%" + "</td>";
        }

        if(brojSedmica!=15) htmlKod += "<td rowspan=\"2\" class=\"zadnja-kolona\"></td>";
        htmlKod += "</tr>";
        htmlKod += "<tr id=\"" + trenutna  + "trenutnoPrisustvoStudenta\">";

        var indeks = podaci.prisustva.findIndex((el) => {
            if(el.index == podaci.studenti[i].index && el.sedmica == trenutna) return true; 
            else return false;
        });
        /*ovo bi kofol trebalo ono da stavlja bijele celije ukoliko nekom od studenata nije uneseno prisustvo za unesenu sedmicu*/
        if(indeks==-1){
            for(let j = 0; j<brojCasova; j++)
                //htmlKod += "<td class= \"nepopunjeno\"  onclick=\"praznoKliknuto(event)\"></td>";
                if(j<podaci.brojPredavanjaSedmicno) htmlKod += "<td class= \"nepopunjeno\" id=\"Pnepopunjeno\"  onclick=\"praznoKliknuto(event)\" ></td>";
                else htmlKod += "<td class= \"nepopunjeno\" id=\"Vnepopunjeno\"  onclick=\"praznoKliknuto(event)\"></td>";
        }
        else{     
            for(let j = 0; j<podaci.brojPredavanjaSedmicno; j++) {
                if(j<podaci.prisustva[indeks].predavanja) htmlKod += "<td class= \"prisutan\" id=\"Pprisutan\" onclick=\"obojenoKliknuto(event)\" ></td>";
                else htmlKod += "<td class=\"neprisutan\"  id=\"Pneprisutan\"  onclick=\"obojenoKliknuto(event)\"  ></td>";
            }
            for(let j = 0; j<podaci.brojVjezbiSedmicno; j++) {
                if(j<podaci.prisustva[indeks].vjezbe) htmlKod += "<td class= \"prisutan\" id=\"Vprisutan\" onclick=\"obojenoKliknuto(event)\" ></td>";
                else htmlKod += "<td class=\"neprisutan\"  id=\"Vneprisutan\"  onclick=\"obojenoKliknuto(event)\"  ></td>";
            }
        }
        htmlKod += "</tr>";
        /**/htmlKod+="</tbody>";

    }
    htmlKod+="</table>";



    return {htmlKod,divRef};
    }

let TabelaPrisustvo = function (divRef, podaci) {
    var zadnjaUnesenaSedmica = 0;
    var trenutnaSedmica;
    for(let i = 0; i<podaci.prisustva.length; i++){
        if(podaci.prisustva[i].sedmica>zadnjaUnesenaSedmica) zadnjaUnesenaSedmica = podaci.prisustva[i].sedmica;
    }
    trenutnaSedmica = zadnjaUnesenaSedmica;
    let sljedecaSedmica = function () {
        if(trenutnaSedmica==zadnjaUnesenaSedmica) return;
        trenutnaSedmica++;
        htmlBilder = iscrtaj(divRef,podaci,trenutnaSedmica).htmlKod;
        divRef.innerHTML = htmlBilder;
        let leftBtn = document.createElement("button");
        leftBtn.innerHTML ="<i class=\"fa-solid fa-arrow-left\"></i>";
        leftBtn.onclick = () =>  prethodnaSedmica();
        divRef.appendChild(leftBtn);
        let rightBtn = document.createElement("button");
        rightBtn.innerHTML ="<i class=\"fa-solid fa-arrow-right\"></i>";
        rightBtn.onclick = () =>  sljedecaSedmica();
        divRef.appendChild(rightBtn);
    }

    let prethodnaSedmica = function () {
        if(trenutnaSedmica==1) return;
        trenutnaSedmica--;
        htmlBilder = iscrtaj(divRef,podaci,trenutnaSedmica).htmlKod ;
        divRef.innerHTML = htmlBilder; 
        let leftBtn = document.createElement("button");
        leftBtn.innerHTML ="<i class=\"fa-solid fa-arrow-left\"></i>";
        leftBtn.onclick = () =>  prethodnaSedmica();
        divRef.appendChild(leftBtn);
        let rightBtn = document.createElement("button");
        rightBtn.innerHTML ="<i class=\"fa-solid fa-arrow-right\"></i>";
        rightBtn.onclick = () =>  sljedecaSedmica();
        divRef.appendChild(rightBtn);
    }    

    var htmlBilder = iscrtaj(divRef,podaci,trenutnaSedmica).htmlKod;
    divRef.innerHTML = htmlBilder; 
    if(htmlBilder=="Podaci o prisustvu nisu validni!") {console.log("nijevalidno");return;}
    let leftBtn = document.createElement("button");
    leftBtn.innerHTML ="<i class=\"fa-solid fa-arrow-left\"></i>";
    leftBtn.onclick = () =>  prethodnaSedmica();
    divRef.appendChild(leftBtn);
    let rightBtn = document.createElement("button");
    rightBtn.innerHTML ="<i class=\"fa-solid fa-arrow-right\"></i>";
    rightBtn.onclick = () =>  sljedecaSedmica();
    divRef.appendChild(rightBtn);

    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }
};
