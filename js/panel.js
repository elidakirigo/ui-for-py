const auth = window.sessionStorage.getItem('admin');

const root = 'file://';



const url = '/home/pi/n6/raspberry-ui/';



// const root = 'http://localhost:';



// const url = '5500/';



if (auth == '' || auth == null) {

    window.location = root + url + 'index.html';

}



let bodyHeight = document.getElementsByTagName('body')[0].scrollHeight;



if (bodyHeight < 480) {

    document.getElementById('sidebar').style.height = '500px';

}

setTimeout(() => {

    document.querySelector('#content').style.display = 'block';

    document.querySelector('.loader').style.display = 'none';



}, 1500);

document.querySelector('#temperature').style.display = 'block';

document.querySelector('#sensors').style.display = 'none';

document.querySelector('#notifications').style.display = 'none';

document.querySelector('#LED_settings').style.display = 'none';

document.querySelector('#system-settings').style.display = 'none';

document.querySelector('#emailnNumbers').style.display = 'none';



M.updateTextFields();



(function () {

    $('#sidebar #a a').css('color', '#0C69BF !important');

})();



function switchActive(id) {

    let divList = ['#temperature', '#sensors', '#notifications', '#LED_settings', '#system-settings', '#emailnNumbers'];

    for (let index = 0; index < divList.length; index++) {

        const element = divList[index];

        if (document.querySelector(element).style.display == 'block') {

            document.querySelector(element).style.display = 'none';

        }

    }

    document.querySelector(id).style.display = 'block';

}



const AddActiveClass = (arg) => {



    let id_array = ['a', 'b', 'c', 'd', 'e', 'g'];

    for (i = 0; i < id_array.length; i++) {

        if ($('#' + id_array[i]).hasClass('active')) {

            $('#' + id_array[i]).removeClass('active');

        }

        if (arg == id_array[i]) {

            $('#' + arg).addClass('active');

        }

    }

}



document.querySelectorAll('#sidebar li')[0].addEventListener('click', () => {

    switchActive('#temperature')

    AddActiveClass('a')



})

document.querySelectorAll('#sidebar li')[1].addEventListener('click', () => {

    AddActiveClass('b')

    switchActive('#sensors')



})

document.querySelectorAll('#sidebar li')[2].addEventListener('click', () => {

    AddActiveClass('c')



    switchActive('#notifications')

})

document.querySelectorAll('#sidebar li')[3].addEventListener('click', () => {

    AddActiveClass('d')



    switchActive('#LED_settings')



})

document.querySelectorAll('#sidebar li')[4].addEventListener('click', () => {

    AddActiveClass('e')



    switchActive('#system-settings')



})

document.querySelectorAll('#sidebar li')[5].addEventListener('click', () => {

    AddActiveClass('g')



    switchActive('#emailnNumbers')



})



const createElements = () => {

    let div_row = document.createElement('div');

    let div_col = document.createElement('div');

    let input = document.createElement('input');

    let label = document.createElement('label');

    let br = document.createElement('br');

    let button = document.createElement('button');



    const div_inputs = document.getElementById('inputs');



    div_row.setAttribute("class", "row manyRows");

    div_row.setAttribute("style", "margin-top: -4em; ");

    div_col.setAttribute("class", "input-field col s4");

    div_col.setAttribute("style", "margin-left: -11em;");



    input.setAttribute("class", "use-keyboard-input");

    input.setAttribute("text", "text");



    label.innerHTML = 'update';



    button.setAttribute("type", "button");

    button.setAttribute("class", "btn-small btn btn-primary removeEmail");

    button.setAttribute("style", "background-color: #0C69BF;");



    button.innerHTML = 'x'



    div_col.appendChild(input)

    div_col.appendChild(label)

    div_row.appendChild(div_col)

    div_row.appendChild(br)

    div_row.appendChild(button)

    div_inputs.appendChild(div_row);

}



let eye = 0;



$('#pwd_eye').click(function (e) {



    e.preventDefault();

    if (eye) {

        $('#password').attr('type', 'password');

        $(this).removeClass('fa-eye');

        $(this).addClass('fa-eye-slash');



        $(this).css({

            'color': '#bbb',

            'border': '1px solid #bbbbbb'

        });

        eye = 0;

    } else {

        $('#password').attr('type', 'text');

        $(this).removeClass('fa-eye-slash');

        $(this).addClass('fa-eye');



        $(this).css({

            'color': '#0c69bf',

            'border': '1px solid #0c69bf'



        });

        eye = 1;

    }

});



const content_width = document.getElementsByTagName('body')[0].scrollWidth;



if (content_width < 717) {

    const t = document.querySelectorAll('#sidebar li a span');
    console.log(t);
    t.forEach(element => {

        element.style.display = 'none';

    });

}
const t = document.querySelectorAll('#sidebar li a span');
setTimeout(() => {

    t.forEach(element => {

        element.display = 'none';

    });
}, 1000);
t.forEach(element => {

    element.display = 'block';

});