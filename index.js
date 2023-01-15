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

app.get('/predmet.html', function(req, res){
    res.sendFile("predmet.html",options);
});

app.get('/prisustvo.html', function(req, res){
    res.sendFile("prisustvo.html",options);
});

app.get('/prijava.html',function(req, res){
    res.sendFile("prijava.html",options);
});



app.post('/login',function(req,res){
    var nastavnici = JSON.parse(fs.readFileSync('data/nastavnici.json', 'utf-8'));
    var username = req.body.username;
    var password = req.body.password;
    var postojiNastavnik = false;
    var indeks = -1;
    /*bcrypt.hash(password, 10, (err, hash) => {
        if(err){
        }
        console.log(hash);
        });
        */

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
                postojiNastavnik = true;
                console.log("ovdje da:");
                res.json({message: "Uspješna prijava"});
            }
            else res.json({message: "Neuspješna prijava"});
        });
    }
    
});

app.listen(3000);
