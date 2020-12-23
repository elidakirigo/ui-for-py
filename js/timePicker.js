document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, {
        defaultTime: 'now',
        twelveHour: false
    });
});

// Or with jQuery

//   $(document).ready(function(){
//     $('.timepicker').timepicker();
//   });