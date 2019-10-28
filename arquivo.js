
var{ipcRenderer,remote} = require("electron");
var enviado = false;

function tempo(){

    var btsend = document.getElementsByClassName("_3M-N-")[0];
    var inputSend = document.getElementsByClassName("_3u328")[0];
    
    if(typeof inputSend !== "undefired" && inputSend.textContent && !enviado){
        btsend.click();
        enviado = true;
    }else if(enviado) {
        /*enviado a mensagem */
        ipcRenderer.send("para", {status:true});
        enviado = false;
    }
}
setInterval(tempo, 3000);



