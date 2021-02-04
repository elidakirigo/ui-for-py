var count1 = 0;

let get_wifi_data, selected_button, wifi_SSIDs, newID = [];

const auth = window.sessionStorage.getItem('admin');

const root = 'file://';

const url = '/home/pi/n6/raspberry-ui/';

// const root = 'http:/';

// const url = '/localhost:5500/';

if (auth == '' || auth == null) {

    window.location = root + url + 'index.html';
}

const checkCount = () => {
    let select_button = document.querySelectorAll('.wifiSelect');
    if (select_button) {
        for (let index = 0; index < select_button.length; index++) {

            select_button[index].addEventListener('click', () => {

                selected_button = () => index;

                $('.body').css('display', 'block');

                $('#dialogBox').fadeIn(2000);

                let selected_wifi_data = {
                    'wifi_channel': document.querySelectorAll('tr')[index + 1].children[0].textContent,
                    'wifi_ssid': document.querySelectorAll('tr')[index + 1].children[1].textContent
                };

                get_wifi_data = () => selected_wifi_data;

                let wifi_name = document.querySelectorAll('tr')[index + 1].children[1].textContent;

                document.getElementById('wifi_name').innerHTML = wifi_name;
            });
        }
    }
}
const connecting = () => {
    const update = JSON.stringify({
        'connection_update': 'update'
    })

    try {

        console.log('Connnecting...');

        const ws = new WebSocket('ws://127.0.0.1:8990')
        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(update);
        };
        ws.onerror = function () {
            console.log("No connection");
        };

        ws.onclose = function () {
            console.log("closed connection");
        };
        ws.onmessage = function (e) {
            const recieved_data = JSON.parse(e.data);

            const data = {
                CHANNEL: recieved_data.Channel.toString(),
                WIFI_SSID: recieved_data.WIFI_SSID,
                response: recieved_data.response
            }

            if (recieved_data.response == '1') {
                wifi_SSIDs().forEach((element, i) => {
                    if (recieved_data.WIFI_SSID == element.SSID && data.CHANNEL == element.channel.toString()) {

                        document.getElementById('connection').innerHTML = `connected to : ${element.SSID}`;

                        let my_button = document.querySelectorAll('.wifiSelect')

                        for (let i = 0; i < my_button.length; i++) {

                            my_button[i].innerHTML == 'connected' ? my_button[i].innerHTML = 'select' : null;

                            if ($(my_button[i]).hasClass('button_color')) {

                                $(my_button[i]).removeClass('button_color');

                                $(my_button[i]).removeClass('btn-default');

                                $(my_button[i]).addClass('btn-primary');

                                $(my_button[i]).removeAttr('disabled');
                            }
                        }
                        const current_btn = document.querySelectorAll('tr')[i + 1].children[2];

                        if (current_btn) {

                            current_btn.innerHTML = 'connected'

                            current_btn.setAttribute('disabled', 'disabled')

                            $(current_btn).removeClass('btn-primary');

                            $(current_btn).addClass('button_color btn-default');
                        }
                    }
                });
            } else if (data.response == '0') {

                document.getElementById('connection').innerHTML = '';

                let my_button = document.querySelectorAll('.wifiSelect')

                for (let i = 0; i < my_button.length; i++) {

                    my_button[i].innerHTML == 'connected' ? my_button[i].innerHTML = 'select' : null;

                    if ($(my_button[i]).hasClass('button_color')) {

                        $(my_button[i]).removeClass('button_color');

                        $(my_button[i]).removeClass('btn-default');

                        $(my_button[i]).addClass('btn-primary');

                        $(my_button[i]).removeAttr('disabled');
                    }
                }
            }
        };

    } catch (e) {
        console.log("Error Connecting" + e);
    }
};
checkCount()

function scanResults() {

    try {

        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8990')
        let data = JSON.stringify({
            scan: 1
        });

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(data);
        };
        ws.onerror = function () {
            console.log("No connection");
        };
        ws.onclose = function () {
            console.log("closed connection");
        };
        ws.onmessage = function (e) {

            if (count1 > 3) {
                $('#table').css({
                    'height': '40vh',
                    'overflow-y': 'scroll',
                    'overflow-x': 'hidden',
                    'scrollbar-width': 'auto',
                    'scrollbar-color': ' #0c69bf #dfdfdf',
                    'scroll-behavior': 'smooth',
                    'scroll-padding': '1px'
                });
            }

            let data = []

            checkCount()
            // connecting()
            data.push(JSON.parse(e.data));

            count1++;

            document.getElementById('data').innerHTML = count1;

            let tbody = document.getElementById('tbody');

            data.forEach((element, i) => {

                const tr = document.createElement("tr");
                tr.setAttribute("style", "margin-top: 3px");
                let wifi_object = element;
                let o = [],
                    td;
                let keyChain = Object.values(wifi_object)

                for (let index = 0; index < 1; index++) {

                    const element = keyChain[0];

                    const elem = keyChain[1];

                    o.push(element)

                    o.push(elem);

                }
                newID.push({
                    channel: keyChain[0],
                    SSID: keyChain[1]
                });

                for (let index = 0; index < o.length; index++) {

                    td = document.createElement("td");

                    td.innerHTML = o[index];

                    tr.appendChild(td);
                }

                wifi_SSIDs = () => newID;

                let button = document.createElement("button");

                $(button).width(10 + 'em')

                button.setAttribute("class", "btn btn-primary btn-sm wifiSelect");

                button.setAttribute("type", "button");

                button.innerHTML = 'select';

                tr.appendChild(button);

                tbody.appendChild(tr);

            });
            checkCount()
            connecting()
        };

    } catch (e) {
        console.log("Error Connecting" + e);
    }
};
scanResults();

const clear = () => {
    count1 = 0;
    newID.length = 0;
    let tr = document.querySelectorAll('#tbody tr');

    tr.forEach(element => {
        element.remove();
    });
}

document.getElementById('scan_button').addEventListener('click', () => {
    clear();
    scanResults()
    // connecting()
})

document.getElementById('WIFIReset').addEventListener('click', () => {

    let wifi_reset = JSON.stringify({
        'wifi_reset': 'true'
    })
    reload()

    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8990')
        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(wifi_reset);
        };
        ws.onerror = function () {
            console.log("No connection");
        };
        ws.onclose = function () {
            console.log("closed connection");
        };
        ws.onmessage = function (e) {};

    } catch (e) {
        console.log("Error Connecting" + e);
    }

})

document.getElementById('WIFIJoin').addEventListener('click', (e) => {

    e.preventDefault();

    let results = get_wifi_data();

    let wifi_data = JSON.stringify({
        'wifi_ssid': results.wifi_ssid,
        'wifi_password': document.getElementById('WIFIpwd').value,
        'response': 0
    })
    console.log(wifi_data)
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8990')
        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(wifi_data);
        };
        ws.onerror = function () {
            console.log("No connection");
        };
        ws.onclose = function () {
            console.log("closed connection");
        };
        ws.onmessage = function (e) {
            const res_data = JSON.parse(e.data);

            console.log(res_data);

            const data = {
                response: res_data.response
            }

           
    if (data.response == 1) {

        $('#dialogBox').fadeOut(2000);

        $('.body').css('display', 'none');

        const wifi_ssid_val = get_wifi_data()

        document.getElementById('connection').innerHTML = `connected to -w : ${wifi_ssid_val.wifi_ssid}`;

        let my_button = document.querySelectorAll('.wifiSelect')

        for (let i = 0; i < my_button.length; i++) {

            my_button[i].innerHTML == 'connected' ? my_button[i].innerHTML = 'select' : null;

            if ($(my_button[i]).hasClass('button_color')) {

                $(my_button[i]).removeClass('button_color');

                $(my_button[i]).removeClass('btn-default');

                $(my_button[i]).addClass('btn-primary');

                $(my_button[i]).removeAttr('disabled');
            }
        }

        document.querySelectorAll('.wifiSelect')[selected_button()].innerHTML = 'connected';

        document.querySelectorAll('.wifiSelect')[selected_button()].setAttribute('disabled', 'disabled')

        $(document.querySelectorAll('.wifiSelect')[selected_button()]).removeClass('btn-primary');

        $(document.querySelectorAll('.wifiSelect')[selected_button()]).addClass('button_color btn-default');
    } else if (data.response == 0 || data.response != 1) {

        $('.response').html('password is not correct');

        setTimeout(() => {

            $('#dialogBox').fadeOut(2000);

            $('.body').css('display', 'none');

            reload()
        }, 6000);
    }
        };

    } catch (e) {
        console.log("Error Connecting" + e);
    }
});

document.getElementById('ex_section').addEventListener('click', () => {

    $('#dialogBox').fadeOut(2000);

    $('.body').css('display', 'none');
})

connecting()

setInterval(() => {
    connecting()
}, 10000);

function reload() {
    console.log("Reload");
    setTimeout(function () {

        window.location.reload();

    }, 1000);
}

let eye = 0;

$('#pwd_eye').click(function (e) {

    e.preventDefault();

    if (eye) {

        $('#WIFIpwd').attr('type', 'password');

        $(this).removeClass('fa-eye');

        $(this).addClass('fa-eye-slash');

        $(this).css({
            'color': '#bbb',
            'border': '1px solid #bbbbbb'
        });

        eye = 0;
    } else {

        $('#WIFIpwd').attr('type', 'text');

        $(this).removeClass('fa-eye-slash');

        $(this).addClass('fa-eye');

        $(this).css({
            'color': '#0c69bf',
            'border': '1px solid #0c69bf'
        });

        eye = 1;
    }
});
