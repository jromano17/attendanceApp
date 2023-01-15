function login(){

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log("logiranje: " + username + " " + password);

    PoziviAjax.postLogin(username,password, function(error, data) {
        if(error){
            console.log(error);
        }
        else{
            if(data=="neuspjesna") {
                var nemaProfila = document.getElementById("nemaProfil")
                nemaProfila.innerHTML = "Neuspješna prijava";
                nemaProfila.style.backgroundColor = "#ffcccc";
            }
            else {
                var nemaProfila = document.getElementById("nemaProfil")
                nemaProfila.innerHTML = "uspješna prijava";
                nemaProfila.style.backgroundColor = "#ffcccc";

            }            
        }
    });
}