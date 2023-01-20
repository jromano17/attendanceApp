const express = require('express');
const session = require("express-session");
const bodyParser = require("body-parser");
const Sequelize = require('sequelize');
const fs = require('fs');
const bcrypt = require('bcrypt');
const db = require('./database.js')
const app = express();

const path=require('path');
var options = {
    root: path.join(__dirname)
};



//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
   secret: 'jalalsifra',
   resave: true,
   saveUninitialized: true
}));

app.use(express.static('public'));
app.use(express.static('public/html'));
app.use(express.static('public/css'));
app.use(express.static('public/scripts'));
app.use(express.static('public/jpgs'));


app.post('/login',function(req,res){
    db.nastavnik.findAll().then(function(nastavnici){
        var username = req.body.username;
        var password = req.body.password;
        var indeks = -1;
        /*bcrypt.hash(password, 10, (err, hash) => {console.log(hash);});*/
        for (let i = 0; i < nastavnici.length; i++) {
            if (nastavnici[i].username==username) {
                indeks = i;
                break;
            }
        }
        if (indeks==-1){
            res.json({message: "Neuspješna prijava"});
        }
        else{
            bcrypt.compare(password, nastavnici[indeks].password_hash, function(err, ress) {
                if(ress) {
                    req.session.username = username;
                    db.predmet.findAll({where:{nastavnikId:nastavnici[indeks].id}, attributes: ['naziv_predmeta'],raw: true}).then(function(predmeti){
                        var naziviPredmeta = [];
                        predmeti.forEach(predmet => {
                            naziviPredmeta.push(predmet.naziv_predmeta);
                        });
                        req.session.predmeti = naziviPredmeta;
                        res.json({message: "Uspješna prijava"});  
                    });
                }
                else res.json({message: "Neuspješna prijava"});
            });
        }
    });
});

app.post('/logout',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
            res.status(400).send();
        }
        else{         
            res.send("Uspjesan logout");
        }
    }); 
});

app.get('/predmeti.html',function(req,res){
    console.log("ovdjee");
    res.sendFile("predmeti.html",options);
});

app.get('/predmeti',function(req,res){
    if(req.session.username){
        res.json({greska:"Nema greske", username:req.session.username, predmeti:req.session.predmeti});
    }
    else{
        res.json({greska:"Nastavnik nije loginovan"});
    }
});

app.get('/predmeti/:naziv',function(req,res){
    var nazivPredmeta = req.params.naziv;
    var lista = {prisustva:[],studenti:[]};
    //var svaPrisustva = JSON.parse(fs.readFileSync('data/prisustva.json', 'utf-8'));
    db.predmet.findOne({where:{naziv_predmeta:nazivPredmeta}}).then(function(predmet){
        lista.predmet = predmet.naziv_predmeta;
        lista.brojPredavanjaSedmicno = predmet.broj_predavanja_sedmicno;
        lista.brojVjezbiSedmicno = predmet.broj_vjezbi_sedmicno;
        db.prisustvo.findAll({where:{predmetId:predmet.id}}).then(function(prisustvaBaze){
        for (let i=0;i<prisustvaBaze.length;i++){
                db.student.findOne({where:{id:prisustvaBaze[i].studentId}}).then(function(student){
                    lista.prisustva.push({
                        sedmica:prisustvaBaze[i].sedmica, 
                        predavanja: prisustvaBaze[i].predavanja,
                        vjezbe:prisustvaBaze[i].vjezbe,
                        index:student.index
                    });
                    lista.studenti.push({
                        ime:student.ime,
                        index:student.index
                    });
                    if(i==prisustvaBaze.length-1){
                        res.json(JSON.stringify({lista}));
                    }
                });

            }
        });
    });


    /*for (let i=0;i<svaPrisustva.length;i++){
        if(svaPrisustva[i].predmet==nazivPredmeta) res.json({lista:svaPrisustva[i]});
    }*/
})

app.post('/predmeti/:naziv/student/:index',function(req,res){
    var nazivPredmeta = req.params.naziv;
    var index = req.params.index;
    var sedmica = req.body.sedmica;
    var vjezbe = req.body.vjezbe;
    var predavanja = req.body.predavanja;
    var svaPrisustva = JSON.parse(fs.readFileSync('data/prisustva.json', 'utf-8'));
    var indeksPredmeta = -1;
    var unesenoPrisustvo = false;
    var zabiljezenaPrisustvaPredmeta;
    for (let i=0;i<svaPrisustva.length;i++){
        if(svaPrisustva[i].predmet==nazivPredmeta){
            indeksPredmeta = i;
            zabiljezenaPrisustvaPredmeta = svaPrisustva[i].prisustva;
            for (let j=0;j<zabiljezenaPrisustvaPredmeta.length;j++){
                if(zabiljezenaPrisustvaPredmeta[j].index==index && zabiljezenaPrisustvaPredmeta[j].sedmica==sedmica) {
                    unesenoPrisustvo = true;
                    zabiljezenaPrisustvaPredmeta[j].predavanja = predavanja;                   
                    zabiljezenaPrisustvaPredmeta[j].vjezbe = vjezbe;                   
                }
            }
            break;
        } 
    }
    if(!unesenoPrisustvo){
        zabiljezenaPrisustvaPredmeta.push({sedmica:sedmica, predavanja: predavanja, vjezbe: vjezbe, index:index});
    }
    var noviJson = JSON.stringify(svaPrisustva);
    fs.writeFileSync('data/prisustva.json', noviJson);
    res.json({odgovor:svaPrisustva[indeksPredmeta]});
})

app.listen(3000);
