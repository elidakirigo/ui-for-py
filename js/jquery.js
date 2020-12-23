let _values = [];
let _num = [];
$(function () {
    let i = 1,
        a = 1;

    try {
        let update = JSON.stringify({
            email_send: 1
        })
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')


        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            this.send(update)
        };
        ws.onerror = function () {
            console.log("No connection");
            //reload();
        };
        ws.onclose = function () {
            console.log("closed connection");
            inc()
            incr()
            //reload();
        };
        ws.onmessage = function (e) {
            let data = JSON.parse(e.data);
           
            let returned_data = Object.keys(data);

            if (returned_data == 'email') {
                _values.push(data.email)
               
                console.log(_values)

            }
            if (returned_data == 'number') {
                _num.push(data.number)
               
                console.log(_num)

            }

        }

    } catch (e) {
        console.log("Error Connecting" + e);
        //reload();
        //failedesults(id)
    }

    function inc() {
        i++;

        for (m = 0; m < _values.length; m++) {
            $('#dynamic_table1').append(`<tr id="row_${i}">
                                        <td>
                                            <input type="text"  id="xd_${i}" value=${_values[m]}></td>
                                        <td>
                                            <button id="${i}" type="button" class="button_remove1 btn btn-small btn-danger">x</button>
                                         </td>
                                         </tr>`);
            if (m > 2) {
                $('.overflow1').css({
                    'height': '230px',
                    'overflow-y': 'scroll !important',
                    'overflow-x': 'hidden',
                    'scrollbar-width': 'auto',
                    'scrollbar-color': ' #0c69bf #dfdfdf',
                    'scroll-behavior': 'smooth',
                    'scroll-padding': '1px'
                });
            }
        }
    }

    $('#moreButton1').click(function (e) {
        i++;
        $('#dynamic_table1').append(`<tr id="row_${i}">
                                        <td>
                                            <input type="text"  id="xd_${i}" value=''></td>
                                        <td>
                                            <button id="${i}" type="button" class="button_remove1 btn btn-small btn-danger">x</button>
                                         </td>
                                         </tr>`);


        if (i > 2) {
            $('.overflow1').css({
                'height': '230px',
                'overflow-y': 'scroll !important',
                'overflow-x': 'hidden',
                'scrollbar-width': 'auto',
                'scrollbar-color': ' #0c69bf #dfdfdf',
                'scroll-behavior': 'smooth',
                'scroll-padding': '1px'
            });
        }
    });
    var _values1 = ['777-777-7', '213-123-321'] //, '111-111-111', '222-222-222', '000-000-000']

    function incr() {
        a++;
        for (n = 0; n < _num.length; n++) {

            $('#dynamic_table2').append(`<tr id="row2_${a}">
            <td>
            <input type="text"  id="xdR_${a}" value=${_num[n]}></td>
            <td>
                <button id="${a}" type="button" class="button_remove2 btn btn-small btn-danger">x</button>
            </td>
        </tr>`);
            if (n > 2) {
                $('.overflow2').css({
                    'height': '230px',
                    'overflow-y': 'scroll !important',
                    'overflow-x': 'hidden',
                    'scrollbar-width': 'auto',
                    'scrollbar-color': ' #0c69bf #dfdfdf',
                    'scroll-behavior': 'smooth',
                    'scroll-padding': '1px'
                });
            }
        }
    }

    $(document).on('click', '.button_remove1', function () {
        var button_id = $(this).attr('id');
        $('#row_' + button_id).remove();
    });

    $('#moreButton2').click(function (e) {
        a++;
        $('#dynamic_table2').append(`<tr id="row2_${a}">
        <td>
        <input type="text"  id="xdR_${a}" ></td>
        <td>
            <button id="${a}" type="button" class="button_remove2 btn btn-small btn-danger">x</button>
        </td>
    </tr>`);
        if (a > 2) {
            $('.overflow2').css({
                'height': '230px',
                'overflow-y': 'scroll !important',
                'overflow-x': 'hidden',
                'scrollbar-width': 'auto',
                'scrollbar-color': ' #0c69bf #dfdfdf',
                'scroll-behavior': 'smooth',
                'scroll-padding': '1px'
            });
        }
    });
    $(document).on('click', '.button_remove2', function () {
        var button_id = $(this).attr('id');
        $('#row2_' + button_id).remove();
    });

});

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}