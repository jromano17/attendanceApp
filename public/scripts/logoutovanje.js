function logout(){
    PoziviAjax.postLogout(function(error,data){
        if(error){
            console.log(error);
        }
        else{
            console.log("Uspjesan logout");
        }

    });
}