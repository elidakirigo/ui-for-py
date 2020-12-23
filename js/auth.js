let auth = window.sessionStorage.getItem('admin');

const root = 'file://';

const url = '/home/pi/n6/raspberry-ui/';


// const root = 'http:/';

// const url = '/localhost:5500/';

const base = window.sessionStorage.getItem('selected');


document.getElementById('ex_section').addEventListener('click', () => {

    $('#dialog_index').fadeOut(2000);

    window.location = root + url + 'index.html';

    $('.body').css('display', 'none');

})
$('#pwd_index_btn').click(function (e) {
    e.preventDefault();

    const password = document.getElementById('auth_pwd').value;
    
    const get_pwd = JSON.stringify({
        pwd: 'get_pwd'
    })
    
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(get_pwd);
        };
        ws.onerror = function () {
            console.log("No connection");
            //reload();
        };
        ws.onclose = function () {
            console.log("closed connection");
            //reload();
        };
        ws.ondisconnect = function () {
            reload();
        };
        ws.onmessage = function (e) {

            const data = JSON.parse(e.data);
             const real_password = data.pwd;

               if (real_password == password) {

                   window.sessionStorage.setItem('admin', 'pi admin');

                   $('#dialog_index').fadeOut(2000);
                   $('.body').fadeOut(2000);

                   window.location = root + url + base;

                   $('#return_ans').html('approved');
                   $('#return_ans').css('color', 'green !important');


               } else {

                   $('#return_ans').html('sorry..wrong password <br> request denied!');

                   $('#return_ans').css('color', 'red !important');
               }
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        //reload();
    }

});

let eye = 0;
$('#pwd_eye_front').click(function (e) {

    e.preventDefault();
    if (eye) {
        $('#auth_pwd').attr('type', 'password');
        $(this).removeClass('fa-eye');
        $(this).addClass('fa-eye-slash');

        $(this).css({
            'color': '#bbb',
            'border': '1px solid #bbbbbb'
        });
        eye = 0;
    } else {
        $('#auth_pwd').attr('type', 'text');
        $(this).removeClass('fa-eye-slash');
        $(this).addClass('fa-eye');

        $(this).css({
            'color': '#0c69bf',
            'border': '1px solid #0c69bf'

        });
        eye = 1;
    }
});