let num = 0;

function triggerButton(choice, arg) {
    document.querySelector('#hamburger ul').style.display = choice;
    let status = arg;
    arg ? status = 1 : status = 0;
    num == status;
    return num;
}

document.querySelector('#hamburger .chosen').addEventListener('click', () => {
    console.log('click')
    if (num) {
        triggerButton('none', num)
        num = 0;
    } else {
        triggerButton('block', num);
        num = 1;
    };
})
