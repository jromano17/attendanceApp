function login(){
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;


    PoziviAjax.postLogin(username,password, function(error, data) {
        if(error){
            console.log(error);
        }
        else{
            if(data=="neuspjesna") {
                console.log("NOK");
                var nemaProfila = document.getElementById("nemaProfil");
                nemaProfila.innerHTML = "Neuspješna prijava";
                nemaProfila.style.backgroundColor = "#ffcccc";
            }
            else if(data=="uspjesna"){
                console.log("OK");
                window.location.href = 'http://localhost:3000/predmeti.html';
            }            
        }
    });

    


}