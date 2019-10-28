
const { app, BrowserWindow, ipcMain, remote} = require('electron')
const express = require("express");
app.on('ready', function () {
  
    var ex = express();

   var mainWindow = new BrowserWindow(

    {width: 800, height: 600,webPreferences:{

      nodeIntegration: true
    } 
  }); 

  ex.get("/whats/:num/:msg", function(req,res){
    var numero  = req.params.num;
    var msg     = req.params.msg;
    enviar(numero,msg);
    res.send("enviando Mensagem via whatsapp..")
  });

    function enviar(telefone,mensagem){
   
   mainWindow.loadURL("https://web.whatsapp.com/send?phone="+telefone+"&text="+mensagem, 
   { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36' });

   mainWindow.webContents.once('dom-ready', () => {


  mainWindow.webContents.executeJavaScript(`

         console.log("This loads no problem!");

        var{ipcRenderer,remote} = require("electron");
        var enviado = false;
        
        function tempo(){
        
            var btsend = document.getElementsByClassName("_3M-N-")[0];
            var inputSend = document.getElementsByClassName("_3u328")[0];
            
            if(typeof inputSend !== "undefired" && inputSend.textContent && !enviado){
                btsend.click();
                enviado = true;
               
            }else if(enviado) {
             ${mainWindow.hide()}
                enviado = false;
            }
        }
        setInterval(tempo, 5000);

  `);

      })
    }
    ex.listen(3400);
 });