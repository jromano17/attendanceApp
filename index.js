const express = require('express');
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require('fs');
const bcrypt = require('bcrypt');
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
/*
app.get('/predmet.html', function(req, res){
    res.sendFile("predmet.html",options);
});

app.get('/prisustvo.html', function(req, res){
    res.sendFile("prisustvo.html",options);
});

app.get('/prijava.html',function(req, res){
    res.sendFile("prijava.html",options);
});
*/


app.post('/login',function(req,res){
    var nastavnici = JSON.parse(fs.readFileSync('data/nastavnici.json', 'utf-8'));
    var username = req.body.username;
    var password = req.body.password;
    var indeks = -1;
    /*bcrypt.hash(password, 10, (err, hash) => {console.log(hash);});*/
    for (let i = 0; i < nastavnici.length; i++) {
        if (nastavnici[i].nastavnik.username==username) {
            indeks = i;
            break;
        }
    }
    if (indeks==-1){
        res.json({message: "Neuspješna prijava"});
    }
    else{
        bcrypt.compare(password, nastavnici[indeks].nastavnik.password_hash, function(err, ress) {
            if(ress) {
                req.session.username = username;
                req.session.predmeti = nastavnici[indeks].predmeti;
                res.json({message: "Uspješna prijava"});  
            }
            else res.json({message: "Neuspješna prijava"});
        });
    }
});

app.post('/logout',function(req,res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
            res.status(400).send();
        }
        else{        
            //res.redirect('http://localhost:3000/prijava.html');  
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

app.get('/predmeti/:NAZIV',function(req,res){
    console.log(req);
    var nazivPredmeta = req.body.naziv;   
    console.log(nazivPredmeta);
    var svaPrisustva = JSON.parse(fs.readFileSync('data/prisustva.json', 'utf-8'));
    console.log(svaPrisustva);
    res.setHeader('Content-Type','application/json');
    for (let i=0;i<svaPrisustva.length;i++){
        if(svaPrisustva[i].predmet==nazivPredmeta) res.json({lista:svaPrisustva[i]});
    }
})

app.listen(3000);
