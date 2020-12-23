const authorize = window.sessionStorage.getItem('admin');

const root_path = 'file://';

const url_path = '/home/pi/n6/raspberry-ui/';


// const root_path = 'http:/';

// const url_path = '/localhost:5500/';

const linked = (arg) => {

    if (authorize == '' || authorize == null) {

        window.sessionStorage.setItem('selected',arg);

        window.location = root_path + url_path + 'pass.html';

    } else {
        window.location = root_path + url_path + arg;
    }
}