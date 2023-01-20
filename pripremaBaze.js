const db = require('./database.js')
db.sequelize.sync({force:true}).then(function(){
    inicializacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});
function inicializacija(){

    var prisustvaListaPromisa=[];
    var predmetiListaPromisa=[];
    var studentiListaPromisa=[];
    var nastavniciListaPromisa=[];

    return new Promise(function(resolve,reject){
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:3,vjezbe:2}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:3,vjezbe:1}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:3,vjezbe:0}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:2}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:1}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:2,vjezbe:0}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:1,vjezbe:2}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:1,vjezbe:1}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:1,vjezbe:0}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:0,vjezbe:2}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:0,vjezbe:1}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:1,predavanja:0,vjezbe:0}));
        
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:3,vjezbe:2}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:3,vjezbe:1}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:3,vjezbe:0}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:2}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:1}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:2,vjezbe:0}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:1,vjezbe:2}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:1,vjezbe:1}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:1,vjezbe:0}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:0,vjezbe:2}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:0,vjezbe:1}));
        prisustvaListaPromisa.push(db.prisustvo.create({sedmica:2,predavanja:0,vjezbe:0}));


        Promise.all(prisustvaListaPromisa).then(function(prisustva){
            var s1p3v2=prisustva.filter(function(p){return p.predavanja==3 && p.vjezbe==2 && p.sedmica==1})[0];
            var s1p3v1=prisustva.filter(function(p){return p.predavanja==3 && p.vjezbe==1 && p.sedmica==1})[0];
            var s1p3v0=prisustva.filter(function(p){return p.predavanja==3 && p.vjezbe==0 && p.sedmica==1})[0];
            var s1p2v2=prisustva.filter(function(p){return p.predavanja==2 && p.vjezbe==2 && p.sedmica==1})[0];
            var s1p2v1=prisustva.filter(function(p){return p.predavanja==2 && p.vjezbe==1 && p.sedmica==1})[0];
            var s1p2v0=prisustva.filter(function(p){return p.predavanja==2 && p.vjezbe==0 && p.sedmica==1})[0];
            var s1p1v2=prisustva.filter(function(p){return p.predavanja==1 && p.vjezbe==2 && p.sedmica==1})[0];
            var s1p1v1=prisustva.filter(function(p){return p.predavanja==1 && p.vjezbe==1 && p.sedmica==1})[0];
            var s1p1v0=prisustva.filter(function(p){return p.predavanja==1 && p.vjezbe==0 && p.sedmica==1})[0];
            var s1p0v2=prisustva.filter(function(p){return p.predavanja==0 && p.vjezbe==2 && p.sedmica==1})[0];
            var s1p0v1=prisustva.filter(function(p){return p.predavanja==0 && p.vjezbe==1 && p.sedmica==1})[0];
            var s1p0v0=prisustva.filter(function(p){return p.predavanja==0 && p.vjezbe==0 && p.sedmica==1})[0];

            
            var s2p3v2=prisustva.filter(function(p){return p.predavanja==3 && p.vjezbe==2 && p.sedmica==2})[0];
            var s2p3v1=prisustva.filter(function(p){return p.predavanja==3 && p.vjezbe==1 && p.sedmica==2})[0];
            var s2p3v0=prisustva.filter(function(p){return p.predavanja==3 && p.vjezbe==0 && p.sedmica==2})[0];
            var s2p2v2=prisustva.filter(function(p){return p.predavanja==2 && p.vjezbe==2 && p.sedmica==2})[0];
            var s2p2v1=prisustva.filter(function(p){return p.predavanja==2 && p.vjezbe==1 && p.sedmica==2})[0];
            var s2p2v0=prisustva.filter(function(p){return p.predavanja==2 && p.vjezbe==0 && p.sedmica==2})[0];
            var s2p1v2=prisustva.filter(function(p){return p.predavanja==1 && p.vjezbe==2 && p.sedmica==2})[0];
            var s2p1v1=prisustva.filter(function(p){return p.predavanja==1 && p.vjezbe==1 && p.sedmica==2})[0];
            var s2p1v0=prisustva.filter(function(p){return p.predavanja==1 && p.vjezbe==0 && p.sedmica==2})[0];
            var s2p0v2=prisustva.filter(function(p){return p.predavanja==0 && p.vjezbe==2 && p.sedmica==2})[0];
            var s2p0v1=prisustva.filter(function(p){return p.predavanja==0 && p.vjezbe==1 && p.sedmica==2})[0];
            var s2p0v0=prisustva.filter(function(p){return p.predavanja==0 && p.vjezbe==0 && p.sedmica==2})[0];

            studentiListaPromisa.push(
                db.student.create({ime:'Jalaludin Romano',index:18875}).then(function(s){
                    s.setPrisustva([s1p3v2,s2p3v2,s1p3v1,s2p3v1]);
                    return new Promise(function(resolve,reject){resolve(s);});
                })
            );
            studentiListaPromisa.push(
                db.student.create({ime:'Alma Almic',index:12345}).then(function(s){
                    s.setPrisustva([s1p3v0,s1p2v2,s2p3v0,s2p2v2]);
                    return new Promise(function(resolve,reject){resolve(s);});
                })
            );

            studentiListaPromisa.push(
                db.student.create({ime:'Jasmina Jasminic',index:12346}).then(function(s){
                    s.setPrisustva([s1p2v1,s1p2v0,s2p2v1,s2p2v0]);
                    return new Promise(function(resolve,reject){resolve(s);});
                })
            );
            studentiListaPromisa.push(
                db.student.create({ime:'Jahja Jahjic',index:12347}).then(function(s){
                    s.setPrisustva([s1p1v2,s1p1v1,s2p1v2,s2p1v1,]);
                    return new Promise(function(resolve,reject){resolve(s);});
                })
            );

            studentiListaPromisa.push(
                db.student.create({ime:'Lejla Lejlic',index:12348}).then(function(s){
                    s.setPrisustva([s1p1v0,s1p0v2,s2p1v0,s2p0v2]);
                    return new Promise(function(resolve,reject){resolve(s);});
                })
            );
            studentiListaPromisa.push(
                db.student.create({ime:'Suli Suljic',index:12349}).then(function(s){
                    s.setPrisustva([s1p0v1,s1p0v0,s2p0v1,s2p0v0]);
                    return new Promise(function(resolve,reject){resolve(s);});
                })
            );

            Promise.all(studentiListaPromisa).then(function(studenti){

                predmetiListaPromisa.push(
                    db.predmet.create({naziv_predmeta:'Logički dizajn', broj_predavanja_sedmicno:3,broj_vjezbi_sedmicno:2}).then(function(p){
                        p.setPrisustva([s1p3v2,s1p3v0,s1p2v1,s1p1v2,s1p1v0,s1p0v1,s2p3v2,s2p3v0,s2p2v1,s2p1v2,s2p1v0,s2p0v1]);
                        return new Promise(function(resolve,reject){resolve(p);});
                    })
                );
                predmetiListaPromisa.push(
                    db.predmet.create({naziv_predmeta:'Automati i formalni jezici', broj_predavanja_sedmicno:3,broj_vjezbi_sedmicno:2}).then(function(p){
                        p.setPrisustva([s1p3v1,s1p2v2,s1p2v0,s1p1v1,s1p0v2,s1p0v0,s2p3v1,s2p2v2,s2p2v0,s2p1v1,s2p0v2,s2p0v0]);
                        return new Promise(function(resolve,reject){resolve(p);});
                    })
                );


                Promise.all(predmetiListaPromisa).then(function(predmeti){

                    var ld = predmeti.filter(function(p){return p.broj_predavanja_sedmicno==3})[0]; 
                    var afj = predmeti.filter(function(p){return p.broj_predavanja_sedmicno==3})[1]; 


                    nastavniciListaPromisa.push(
                        db.nastavnik.create({username:'jalal', password_hash:'$2b$10$W4yaPtCOwrk9nQWluUfMFugjVZQZOLhiXjUdadkligckUNjPUKI92'}).then(function(n){
                            return n.setPredmeti([ld,afj]).then(function(){
                                return new Promise(function(resolve,reject){resolve(n);});
                            });
                        })
                    );
                    
                    Promise.all(nastavniciListaPromisa).then(function(nastavnici){resolve(nastavnici);}).catch(function(err){console.log("Nastavnici greska "+err);});
                }).catch(function(err){console.log("Predmeti greska "+err);});
            }).catch(function(err){console.log("Studenti greska "+err);});
        }).catch(function(err){console.log("Prisustva greska "+err);});   
    });
}

