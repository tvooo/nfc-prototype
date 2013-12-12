$(function() {
    var socket;

    //document.querySelector('#ipbtn').addEventListener('touchend', function (e) {
    //  }, false);
    $( document ).on('touchend', '#ipbtn', function( event ) {
        if ( socket ) {
            socket.disconnect();
        }

        var ip = $('#ip').val();
        var address = 'http://' + ip + ':9003';

        socket = io.connect( address );
        console.log( 'Connected to ' + address );

        socket.on('evoke', function (data) {
            console.log( 'Got command!');
            console.log( data );

            var touchEvent = document.createEvent("HTMLEvents");

            touchEvent.initEvent("touchend", true, true);

            var el = $('#' + data.item);
            if ( $('#' + data.item).length > 0 ) {
                $('#' + data.item).get(0).dispatchEvent(touchEvent);
            }

            socket.emit('controlme');
        });
    });
});
