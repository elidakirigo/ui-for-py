setInterval(() => {
    $('#liq_level').css('color', 'red');
    $('#liq_level').fadeToggle(1000);
}, 200);

const initColorPicker = () => {
    var canvas = document.getElementById('colorCanvas');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = " #FFFFFF";
    ctx.fillRect(5, 5, 30, 30);
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(40, 5, 30, 30);
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(75, 5, 30, 30);
    // ctx.fillStyle = "#FF6600";
    // ctx.fillRect(110, 5, 30, 30);
    ctx.fillStyle = "#FF00FF";
    ctx.fillRect(110, 5, 30, 30);
    ctx.fillStyle = "#00FFFF";
    ctx.fillRect(145, 5, 30, 30);
    // ctx.fillStyle = "#FF7F00";
    // ctx.fillRect(215, 5, 30, 30);
    ctx.fillStyle = "#7F00FF";
    ctx.fillRect(180, 5, 30, 30);
    // ctx.fillStyle = "#7F00FF";
    // ctx.fillRect(215, 5, 30, 30);
    // ctx.fillStyle = "#7F00FF";
    // ctx.fillRect(320, 5, 30, 30);
    // ctx.fillStyle = "#7FFF00";
    // ctx.fillRect(355, 5, 30, 30);
    // ctx.fillStyle = "#7F00FF";
    // ctx.fillRect(390, 5, 30, 30);
    // ctx.fillStyle = "#00FF7F";
    // ctx.fillRect(425, 5, 30, 30);

    canvas.onclick = (e) => {

        var imgData = ctx.getImageData((e.offsetX / canvas.clientWidth) * canvas.width, (e.offsetY / canvas.clientHeight) * canvas.height, 1, 1);

        var rgba = imgData.data;

        var color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + rgba[3] + ")";

        // console.log("%c" + color, "color:" + color);

        let selected_color;

        $('#color_update').css('background-color', color);

        $('#led_button').click(function (e) {

            selected_color = color

            const color_changes = JSON.stringify({
                led_update_color: selected_color,
                r: rgba[0],
                g: rgba[1],
                b: rgba[2]
            })
            // console.log(color_changes);

            try {
                console.log('Connnecting...');
                const ws = new WebSocket('ws://127.0.0.1:8989')

                ws.onopen = function () {
                    console.log('WebSocket Client Connected');
                    ws.send(color_changes);

                    setTimeout(() => {
                        $('#color_current').css('background-color', selected_color);

                    }, 1000);
                };
                ws.onerror = function () {
                    console.log("No connection");
                    //reload();
                };
                ws.onclose = function () {
                    console.log("No connection");
                    //reload();
                };
                ws.onmessage = function (e) {
                    const current_color = JSON.parse(e.data);

                    const led_color = current_color.led_color;

                    $('#color_current').css('background-color', led_color);

                };

            } catch (e) {
                console.log("Error Connecting" + e);
                //reload();
            }
        })
    }
}

initColorPicker()

const fetch_color = () => {
    let mesg = JSON.stringify({
        'color_fetch': 'current_color'
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(mesg);
        };
        ws.onerror = function () {
            console.log("No connection");
            //reload();
        };
        ws.onclose = function () {
            console.log("closed connection");
            //reload();
        };
        ws.onmessage = function (e) {
            const current_color = JSON.parse(e.data);

            const led_color = current_color.led_color;

            $('#color_current').css('background-color', led_color);

        };

    } catch (e) {
        console.log("Error Connecting" + e);
        //reload();
    }
}
fetch_color()

setInterval(() => {
    const liq_level = JSON.stringify({
        'liquid_status': 'status'
    })
    try {
        console.log('Connessione...');
        const ws = new WebSocket('ws://localhost:8989');
        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(liq_level);
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
            let data = JSON.parse(e.data);

            let liquid_data = data.level;
            if (liquid_data == 1) {

                // setInterval(() => {
                    $('#liq_level').css('color', 'red');
                    $('#liq_level').fadeToggle(1000);
                // }, 200);

                $('#liq_level').removeClass('fa-battery-full');
                $('#liq_level').addClass('fa-battery-empty');

            } else if (liquid_data == 0) {

                $('#liq_level').css('color', '#5ba8ff');
                $('#liq_level').removeClass('fa-battery-empty');
                $('#liq_level').addClass('fa-battery-full');
            }
        };

    } catch (e) {
        console.log("Err Connecting" + e);
        // reload();
    }
}, 1000);