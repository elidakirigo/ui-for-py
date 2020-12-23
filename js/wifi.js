var count1 = 0;
let get_wifi_data;
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
                // console.log('clicked');
                $('.body').css('display', 'block');
                $('#dialogBox').fadeIn(2000);
                let selected_wifi_data = {
                    'wifi_channel': document.querySelectorAll('tr')[index + 1].children[0].textContent,
                    'wifi_ssid': document.querySelectorAll('tr')[index + 1].children[1].textContent
                };
                get_wifi_data = () => selected_wifi_data;
                let wifi_name = document.querySelectorAll('tr')[index + 1].children[1].textContent;
                console.log(wifi_name);
                document.getElementById('wifi_name').innerHTML = wifi_name;
            });

        }
    }
}
// checkCount()
function scanResults() {
    // reload();
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
            //reload();
        };
        ws.onclose = function () {
            console.log("closed connection");
            //reload();
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
            data.push(JSON.parse(e.data));
            count1++;
            document.getElementById('data').innerHTML = count1;
            let tbody = document.getElementById('tbody');
            data.forEach((element, i) => {
                const tr = document.createElement("tr");
                tr.setAttribute("style", "margin-top: 3px");
                let wifi_object = element;

                var o = [],
                    td;
                let keyChain = Object.values(wifi_object)
                for (let index = 0; index < 1; index++) {
                    const element = keyChain[0];
                    const elem = keyChain[1];
                    o.push(element)
                    o.push(elem);
                }
                for (let index = 0; index < o.length; index++) {
                    td = document.createElement("td");
                    td.innerHTML = o[index];
                    tr.appendChild(td);
                }
                let button = document.createElement("button");

                button.setAttribute("class", "btn btn-primary btn-sm wifiSelect");
                button.setAttribute("type", "button");
                button.innerHTML = 'select';
                tr.appendChild(button);
                tbody.appendChild(tr);


            });

        };

    } catch (e) {
        console.log("Error Connecting" + e);
        //reload();
    }

};
scanResults();
// other buttons

const clear = () => {
    count1 = 0;
    let tr = document.querySelectorAll('#tbody tr');
    tr.forEach(element => {
        element.remove();
    });
}
document.getElementById('scan_button').addEventListener('click', () => {
    clear();
    scanResults()
})
console.log(count1);

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
            //reload();
        };
        ws.onclose = function () {
            console.log("closed connection");
            //reload();
        };
        ws.onmessage = function (e) {

        };

    } catch (e) {
        console.log("Error Connecting" + e);
        //reload();
    }
})



document.getElementById('WIFIJoin').addEventListener('click', (e) => {
    e.preventDefault();
    let results = get_wifi_data();
    $('#dialogBox').fadeOut(2000);
    $('.body').css('display', 'none');

    let wifi_data = JSON.stringify({
        'wifi_ssid': results.wifi_ssid,
        'wifi_password': document.getElementById('WIFIpwd').value
    })

    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8990')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(wifi_data);
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

        };

    } catch (e) {
        console.log("Error Connecting" + e);
        //reload();
    }
});

document.getElementById('ex_section').addEventListener('click', () => {
    $('#dialogBox').fadeOut(2000);
    $('.body').css('display', 'none');

})

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