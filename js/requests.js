/*-----------------------------------------------
connecting to the http.
-------------------------------------------------
*/

/* --------------------------
 GET REQUESTS 
 ----------------------------
 */

(function () {
    try {
        let update = JSON.stringify({
            update: 'update'
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
            //reload();
        };
        ws.onmessage = function (e) {
            let data = JSON.parse(e.data);
            let returned_data = Object.keys(data);
           /*  if (returned_data == 'TempAlert') {
                if (data.TempAlert == 1) {
                    $('#tempAlert').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#tempAlert').removeAttr('checked');
                    }, 10);
                }
            } else if (returned_data == 'liquidAlert') {
                if (data.liquidAlert == 1) {
                    $('#liquidLevel').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#liquidLevel').removeAttr('checked');
                    }, 10);
                }
            }*/ if (returned_data == 'checkedPump1') {
                if (data.checkedPump1 == 1) {
                    $('#checkedPump1').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#checkedPump1').removeAttr('checked');
                    }, 10);
                }
            } else if (returned_data == 'checkedPump2') {
                if (data.checkedPump2 == 1) {
                    $('#checkedPump2').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#checkedPump2').removeAttr('checked');
                    }, 10);
                }
            } else if (returned_data == 'temp_email') {
                if (data.temp_email == 1) {
                    $('#temp_email').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#temp_email').removeAttr('checked');
                    }, 10);
                }
            } else if (returned_data == 'temp_sms') {

                if (data.temp_sms == 1) {
                    $('#temp_sms').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#temp_sms').removeAttr('checked');
                    }, 10);
                }
            } else if (returned_data == 'liq_email') {

                if (data.liq_email == 1) {
                    $('#liq_email').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#liq_email').removeAttr('checked');
                    }, 10);
                }
            } else if (returned_data == 'liq_sms') {

                if (data.liq_sms == 1) {
                    $('#liq_sms').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#liq_sms').removeAttr('checked');
                    }, 10);
                }
            } /* else if (returned_data == 'dailyReport') {

                if (data.dailyReport == 1) {
                    $('#dailyReport').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#dailyReport').removeAttr('checked');
                    }, 10);
                }
            }*/ else if (returned_data == 'rep_email') {

                if (data.rep_email == 1) {
                    $('#rep_email').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#rep_email').removeAttr('checked');
                    }, 10);
                }
            } else if (returned_data == 'rep_sms') {

                if (data.rep_sms == 1) {
                    $('#rep_sms').attr('checked', 'checked');
                } else {
                    setTimeout(() => {
                        $('#rep_sms').removeAttr('checked');
                    }, 10);
                }
            } else if (returned_data[0] == 'report_time') {

                let time_selected, hours = data.hours, minutes = data.minutes

                time_selected = [hours, minutes].join(':');

                document.getElementById('time').value = time_selected;
            }
        }

    } catch (e) {
        console.log("Error Connecting" + e);
        //reload();
        failedesults(id)
    }

})()
const nullifyInput = (id) => {
    setTimeout(() => {
        $('#' + id).val('');
    }, 1000);
}
//notification buttons
function successReturn(id) {
    $('#' + id + ' .success').fadeIn(4000);
    $('#' + id + ' .success').fadeOut(2000);
}

function failedesults(id) {
    $('#' + id + ' .failed').fadeIn(4000);
    $('#' + id + ' .failed').fadeOut(2000);
}
/*
document.querySelector('#tempAlert + span').addEventListener('click', e => {
    var data = document.getElementById('tempAlert').checked;

    if (data == false) {
        data = true;
        $('#tempAlert').attr('checked', 'checked');
    } else {
        setTimeout(() => {
            $('#tempAlert').removeAttr('checked');
        }, 10);
        data = false;
    }

    let temp_data = JSON.stringify({
        'tempAlert': data
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(temp_data);
            successReturn('liquidLevel')
        };
        ws.onerror = function () {
            console.log("No connection");
            //reload();
        };
        ws.onclose = function () {
            console.log("closed connection");
            //reload();
        };
        ws.onmessage = function (e) {};

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('liquidLevel')
        //reload();
    }
})

document.querySelector('#liquidLevel + span').addEventListener('click', e => {
    var liq_data = document.getElementById('liquidLevel').checked;
    if (liq_data == false) {
        liq_data = true;
        $('#liquidLevel').attr('checked', 'checked');
    } else {
        setTimeout(() => {
            $('#liquidLevel').removeAttr('checked');
        }, 10);
        liq_data = false;
    }
    let liquid_data = JSON.stringify({
        'liquidLevel': liq_data
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(liquid_data);
            successReturn('liquidLevel')
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
            console.log("Received: '" + e.data + "'");

            setTimeout(function () {}, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('liquidLevel')
        //reload();
    }
})
*/
//
document.getElementById('tempButton').addEventListener('click', e => {

    e.preventDefault();

    var data1 = document.getElementById('threadshold').value;
    let TH = JSON.stringify({
        TempThreshold: data1
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(TH);
            successReturn('temperature');
            nullifyInput('threadshold');
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;


        };

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('temperature')
        //reload();
    }
})
document.getElementById('sensorButton1').addEventListener('click', e => {

    e.preventDefault();

    var active = document.getElementById('active1').value;
    var data2 = document.getElementById('safe1').value;
    let PUMP1 = JSON.stringify({
        'pump1': '1',
        'active1 for': active,
        'safety1': data2
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(PUMP1);
            successReturn('form1')
            nullifyInput('active1');
            nullifyInput('safe1');

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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;

            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('form1')
        //reload();
    }

})
document.getElementById('sensorButton2').addEventListener('click', e => {

    e.preventDefault();

    var data = document.getElementById('active2').value;
    var data2 = document.getElementById('safe2').value;
    let PUMP2 = JSON.stringify({
        'pump2': '2',
        'active2 for': data,
        'safety2': data2
    })
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(PUMP2);
            successReturn('form2');
            nullifyInput('active2');
            nullifyInput('safe2');

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
            console.log("Received: '" + e.data + "'");

            setTimeout(function () {

            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('form2')
        //reload();
    }

})
document.getElementById('passwordButton').addEventListener('click', e => {

    e.preventDefault();

    var data = document.getElementById('password').value;
    let pwd = JSON.stringify({
        password: data
    });

    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(pwd);
            successReturn('pwd_success');
            nullifyInput('password');

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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;

            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        failedesults('main2')
        console.log("Error Connecting" + e);
        //reload();
    }
})
// checkboxes

document.getElementById('shut-down').addEventListener('click', e => {

    e.preventDefault();

    var shut_down = "True";
    var reboot = "False";

    var results = JSON.stringify({
        shut_down_data: shut_down,
        reboot_data: reboot
    });

    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(results);
            successReturn('checkboxes')
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;

            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('checkboxes')
        //reload();
    }
})

document.getElementById('re-boot').addEventListener('click', e => {

    e.preventDefault();

    var shut_down = "False";
    var reboot = "True";

    var results = JSON.stringify({
        shut_down_data: shut_down,
        reboot_data: reboot
    });

    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(results);
            successReturn('checkboxes')
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;

            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('checkboxes')
        //reload();
    }
})

document.getElementById('MachineButton').addEventListener('click', e => {

    e.preventDefault();

    var data = document.getElementById('Machine_name').value;
    let machine = JSON.stringify({
        Machine_Name: data
    });

    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(machine);
            successReturn('machine_success');
            nullifyInput('Machine_name');

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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;

            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('system-credential')
        //reload();
    }
})

document.querySelector('#checkedPump1 + span').addEventListener('click', () => {


    var active = document.getElementById('checkedPump1').checked;

    //now we need to make JSON string t o s//end //ok

    let checked_data = JSON.stringify({
        'checkedPump1': active
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(checked_data);
            successReturn('checkedPump1')
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;

            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('checkedPump1')
        //reload();
    }

})
document.querySelector('#checkedPump2 + span').addEventListener('click', () => {


    var active = document.getElementById('checkedPump2').checked;

    let checked_data = JSON.stringify({
        'checkedPump2': active
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(checked_data);
            successReturn('checkedPump2')
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;

            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('checkedPump2')
        //reload();
    }

})
/*
-------------------------------------------------
Handling the email / sms notifications
------------------------------------------------
 */

document.getElementById('submit_btn1').addEventListener('click', () => {
    let email_result = [],
        email_results = document.querySelectorAll('#dynamic_table1 input');
    if (email_results) {
        for (let i = 0; i < email_results.length; i++) {
            let email_input = email_results[i].value;
            email_result.push(email_input)
        }
        console.log(email_result);

        let output = JSON.stringify({
            emails: email_results.length,
            email: email_result
        });
        try {
            console.log('Connnecting...');
            const ws = new WebSocket('ws://127.0.0.1:8989')

            ws.onopen = function () {
                console.log('WebSocket Client Connected');
                ws.send(output);

                /* email_results.forEach(element => {
                     element.value = '';
                 });*/
                successReturn('f_dynamic1')
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
                console.log("Received: '" + e.data + "'");
            };

        } catch (e) {
            console.log("Error Connecting" + e);
            failedesults('checkedPump2')
            //reload();
        }

        for (let index = 0; index < email_results.length; index++) {
            //nullifyButton('dynamic_table1', index);
        }
    }
})
document.getElementById('submit_btn2').addEventListener('click', () => {
    let phone_result = [],
        phone_inputs = document.querySelectorAll('#dynamic_table2 input');
    if (phone_inputs) {
        for (let i = 0; i < phone_inputs.length; i++) {
            let phone_input = phone_inputs[i].value;
            phone_result.push(phone_input)
        }
        console.log(phone_result);
        let output1 = JSON.stringify({
            numbers: phone_inputs.length,
            number: phone_result
        });
        try {
            console.log('Connnecting...');
            const ws = new WebSocket('ws://127.0.0.1:8989')

            ws.onopen = function () {
                console.log('WebSocket Client Connected');
                ws.send(output1);
                successReturn('f_dynamic2')

                /*  phone_inputs.forEach(element => {
                      element.value = '';
                  });*/

            };
            ws.onerror = function () {
                console.log("No connection");
                // failedesults('f_dynamic2')

                //reload();
            };
            ws.onclose = function () {
                console.log("closed connection");
                //reload();
            };
            ws.onmessage = function (e) {
                console.log("Received: '" + e.data + "'");
            };

        } catch (e) {
            console.log("Error Connecting" + e);
            failedesults('checkedPump2')
            //reload();
        }
        console.log(output1)

    }
})
document.querySelector('#temp_email + span').addEventListener('click', e => {
    var data = document.getElementById('temp_email').checked;
    //console.log(data, 'data1')
    if (data == false) {
        data = true;
        $('#temp_email').attr('checked', 'checked');
    } else {
        setTimeout(() => {
            $('#temp_email').removeAttr('checked');
        }, 1000);
        data = false;
        // this one is false returning 0/ /since it has been changed back.
    }

    //now we need to make JSON string t o s//end //ok

    let temp_email_data = JSON.stringify({
        'temp_email': data
    });
    console.log(temp_email_data)
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(temp_email_data);
            //successReturn('liquidLevel')
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
        //failedesults('liquidLevel')
        //reload();
    }
})

document.querySelector('#temp_sms + span').addEventListener('click', e => {
    var data = document.getElementById('temp_sms').checked;

    if (data == false) {
        data = true;
        $('#temp_sms').attr('checked', 'checked');
    } else {
        setTimeout(() => {
            $('#temp_sms').removeAttr('checked');
        }, 1000);
        data = false;
        // this one is false returning 0/ /since it has been changed back.
    }

    //now we need to make JSON string t o s//end //ok

    let temp_sms_data = JSON.stringify({
        'temp_sms': data
    });
    console.log(temp_sms_data)
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(temp_sms_data);
            //successReturn('liquidLevel')
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;
            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        //failedesults('liquidLevel')
        //reload();
    }
})
document.querySelector('#liq_email + span').addEventListener('click', e => {
    var data = document.getElementById('liq_email').checked;
    //console.log(data, 'data1')
    if (data == false) {
        data = true;
        $('#liq_email').attr('checked', 'checked');
    } else {
        setTimeout(() => {
            $('#liq_email').removeAttr('checked');
        }, 1000);
        data = false;
        // this one is false returning 0/ /since it has been changed back.
    }

    //now we need to make JSON string t o s//end //ok

    let liq_email_data = JSON.stringify({
        'liq_email': data
    });
    console.log(liq_email_data)
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(liq_email_data);
            //successReturn('liquidLevel')
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;
            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        //failedesults('liquidLevel')
        //reload();
    }
})
document.querySelector('#liq_sms + span').addEventListener('click', e => {
    var data = document.getElementById('liq_sms').checked;
    //console.log(data, 'data1')
    if (data == false) {
        data = true;
        $('#liq_sms').attr('checked', 'checked');
    } else {
        setTimeout(() => {
            $('#liq_sms').removeAttr('checked');
        }, 1000);
        data = false;
        // this one is false returning 0/ /since it has been changed back.
    }

    //now we need to make JSON string t o s//end //ok

    let liq_sms_data = JSON.stringify({
        'liq_sms': data
    });
    console.log(liq_sms_data)
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(liq_sms_data);
            //successReturn('liquidLevel')
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;
            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        //failedesults('liquidLevel')
        //reload();
    }
})
document.querySelector('#rep_email + span').addEventListener('click', e => {
    var data = document.getElementById('rep_email').checked;
    //console.log(data, 'data1')
    if (data == false) {
        data = true;
        $('#rep_email').attr('checked', 'checked');
    } else {
        setTimeout(() => {
            $('#rep_email').removeAttr('checked');
        }, 1000);
        data = false;
        // this one is false returning 0/ /since it has been changed back.
    }

    //now we need to make JSON string t o s//end //ok

    let rep_email_data = JSON.stringify({
        'rep_email': data
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(rep_email_data);
            //successReturn('liquidLevel')
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;
            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        //failedesults('liquidLevel')
        //reload();
    }
})
document.querySelector('#rep_sms + span').addEventListener('click', e => {
    var data = document.getElementById('rep_sms').checked;
    //console.log(data, 'data1')
    if (data == false) {
        data = true;
        $('#rep_sms').attr('checked', 'checked');
    } else {
        setTimeout(() => {
            $('#rep_sms').removeAttr('checked');
        }, 1000);
        data = false;
        // this one is false returning 0/ /since it has been changed back.
    }

    //now we need to make JSON string t o s//end //ok

    let rep_sms_data = JSON.stringify({
        'rep_sms': data
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(rep_sms_data);
            //successReturn('liquidLevel')
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;
            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        //failedesults('liquidLevel')
        //reload();
    }
})
/*document.querySelector('#dailyReport + span').addEventListener('click', e => {
    var rep_data = document.getElementById('dailyReport').checked;
    if (rep_data == false) {
        rep_data = true;
        $('#dailyReport').attr('checked', 'checked');
        // this part returns 1 since the button is clicked and active
    } else {
        setTimeout(() => {
            $('#dailyReport').removeAttr('checked');
        }, 10);
        rep_data = false;
        // this one is false returning 0/ /since it has been changed back.
    }
    let report_data = JSON.stringify({
        'dailyReport': rep_data
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(report_data);
            // successReturn('liquidLevel')
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
            console.log("Received: '" + e.data + "'");
            //document.getElementById('temp').innerHTML=e.data;

            setTimeout(function () {
                //document.getElementById('temp').innerHTML="0.0";
            }, 5000);
        };

    } catch (e) {
        console.log("Error Connecting" + e);
        failedesults('liquidLevel')
        //reload();
    }
})
*/
document.getElementById('timeButton').addEventListener('click', () => {

    const report_time = (document.getElementById('time').value).split(':');

    const report_data_time = JSON.stringify({
        'report_time': 'recieved',
        'hours': report_time[0],
        'minutes': report_time[1]
    });
    try {
        console.log('Connnecting...');
        const ws = new WebSocket('ws://127.0.0.1:8989')

        ws.onopen = function () {
            console.log('WebSocket Client Connected');
            ws.send(report_data_time);
            successReturn('timeSection')
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
        failedesults('liquidLevel')
        //reload();
    }
})
function reload() {
    console.log("Reload");
    setTimeout(function () {
        window.location.reload();
    }, 1000);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}