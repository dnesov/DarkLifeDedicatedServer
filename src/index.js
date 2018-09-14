const config = "./config.txt"
let configContent = []
const app = require('express')();
const http = require('http').Server(app);
let port = "7777"
const colors = require('colors');
var io = require('socket.io')(http);
const rl = require("readline")
let stdin = process.openStdin(); 
const fs = require("fs")


app.get('/', function(req, res){
    console.log("DARKLIFE DEDICATED SERVER\n".cyan)
  res.send(`<h1>DARKLIFE SERVER STARTED</h1>`);
});

io.on('connection', function(socket) {
    console.log("[INFO]Someone joined".cyan.bold);
    socket.on('event', function(message){
    console.log(message);
    });
});
function generateServerID() {
    if(fs.existsSync("./serverID.txt")) {
    } else {
    console.log("[INFO]SERVERID File does not exists, creating a new one...".cyan.bold)

    try {
    let content = Math.floor(Math.random()* 99999999999) + "\n <- This is ID for your server to identify it. Do not share this!"
    fs.writeFileSync("./serverID.txt", content);
    } catch (e){
    console.log("[ERR]Can't create serverID.txt, ".red.bold, e);
    }
    }
}
generateServerID()

function reGenerateServerID() {
    try {
    let content = Math.floor(Math.random()* 99999999999) + "\n <- This is ID for your server to identify it. Do not share this!"
    fs.writeFileSync("./serverID.txt", content);
    console.log("[SUCCESS]serverID.txt successfully regenerated!".bold.green)
    } catch (e){
    console.log("[ERR]Can't regenerate serverID.txt, ".red.bold, e);
    }
    
}


try {
    http.listen(port, function(){
      console.log("[SUCCESS]DARKLIFE SERVER STARTED\n".green.underline.bold)
      console.log("[INFO]Waiting for clients to join...\n".cyan.bold)
    });
        } catch(err) {
            console.log("[ERR]FAILED TO START SERVER! ERROR:\n".red.underline.bold+err)
        }

io.on("disconnect", function(socket) {
    console.log("[INFO]Someone leaved".cyan.bold);
});


stdin.addListener("data", function(d) {
    let input = d.toString().trim()
    switch(input) {
        case "help":
        console.log("List of available commands:".underline.cyan)
        console.log("help - prints this message;\nban [userID] - bans the user.\nshutdown - shutdowns the server\n")
        break;

        case "shutdown":
        console.log("\nGoodbye!\n".bold.green)
        setTimeout(function() {
            process.exit()
        }, 1000
    )
        break;

        case "ban":
        console.log("Command is work in progress :3")
        break;

        case "reloadSID":
        console.log("Regenerating serverID file...")
        reGenerateServerID()
        break;

        default:
        console.log("[ERR]Unknown Command!".red.bold)
    }

  });

