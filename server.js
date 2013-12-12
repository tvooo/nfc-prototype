var io = require('socket.io').listen(9003);
var readline = require('readline');
var prompt = require('prompt');
prompt.start();
/*var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});*/

function sendCommand( socket ) {
    prompt.get(['command'], function (err, result) {
        console.log('Command-line input received:');
        socket.emit('evoke', { item: result.command });
    });
}

io.set('log level', 1);

io.sockets.on('connection', function (socket) {

    socket.on('disconnect', function () {
        io.sockets.emit('--- DISCONNECTED ---');
    });

    socket.on('controlme', function() {
        console.log('Got command: controlme');
        sendCommand( socket );
    });

    console.log('+++ CONNECTED +++')

    sendCommand( socket );
});
