setInterval(() => {
    try {
        console.log('Connessione...');
        const ws = new WebSocket('ws://localhost:5678');
        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send('Hi this is web client.');
        };
        ws.onerror = function () {
            console.log("No connection");
            // timeInterval();
        };
        ws.onclose = function () {
            console.log("closed connection");
            // timeInterval();
        };
        ws.onmessage = function (e) {
            console.log("Received: '" + e.data + "'");
            document.getElementById('temp').innerHTML = e.data;

            setTimeout(function () {
                document.getElementById('temp').innerHTML = "00.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Err Connecting" + e);
        // reload();
    }
}, 2000);