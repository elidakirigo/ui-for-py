let screenHeight = document.getElementsByTagName('body')[0].scrollHeight;

const KEYboardSetUp = () => {
    const ids = ['#active2', '#safe2'];

    if (screenHeight < 551) {

        ids.forEach(element => {

            $(element).focus(function (e) {

                $('.identifier').removeClass('keyboard');

                $('.identifier').addClass('keyboard--dummy');

                document.querySelector('.keyboard--dummy').style.display = 'block';
            });
        });
    }
}
KEYboardSetUp()



const KEYboard_input_SetUp = () => {
    const ids = ['#WIFIpwd', '#auth_pwd','#password','#Machine_name'];

    if (screenHeight < 551) {
        ids.forEach(element => {

            $(element).focus(function (e) {

                $('.identifier_input').removeClass('keyboard');

                $('.identifier_input').addClass('keyboard--dummy');

                document.querySelector('.keyboard--dummy').style.display = 'block';
            });
        });

    }

}
KEYboard_input_SetUp()

setInterval(function () {
    let input_email = document.querySelectorAll('#dynamic_table1 input');

    for (i = 0; i < input_email.length; i++) {
        if (screenHeight < 551) {


            $(input_email[i]).focus(function (e) {

                $('.identifier_input').removeClass('keyboard');

                $('.identifier_input').addClass('keyboard--dummy');

                document.querySelector('.keyboard--dummy').style.display = 'block';

            });
        }
    }
    let input = document.querySelectorAll('#dynamic_table2 input');

    for (i = 0; i < input.length; i++) {
        if (screenHeight < 551) {


            $(input[i]).focus(function (e) {

                $('.identifier').removeClass('keyboard');

                $('.identifier').addClass('keyboard--dummy');

                document.querySelector('.keyboard--dummy').style.display = 'block';

            });
        }
    }
}, 30);

const root_path = 'file://';

const url_path = '/home/pi/n6/raspberry-ui/';


// const root_path = 'http://';

// const url_path = 'localhost:5500/';

const  logOutKey = () =>{
    window.sessionStorage.removeItem('admin');

    window.sessionStorage.removeItem('selected');

    window.location = root_path + url_path + 'index.html';
}