let light = true;
let switchON = true;
let broken = false;
let clicksNum = 0;
const MAX_CLICKS = 5;

function boom(){
    document.getElementById('boom').play();
}

function lightSwitch(){
    clicksNum++;

    if (clicksNum == MAX_CLICKS){
        lightSwitchBroke();
    }

    if (clicksNum == MAX_CLICKS+3){
        document.getElementById(":C").play();
    }

    switcherImg = document.getElementById('lightswitch');
    document.getElementById('click').play();

    //Отображение
    if (switchON){
        switcherImg.src = "img/switch-off.png";
        switchON = false;
    } else {
        switcherImg.src = "img/switch-on.png";
        switchON = true;
    }

    //Свет
    if (!broken){
        if (light) {
            darkTheme();
        } else {
            lightTheme();
        }
        light = !light;
    }
}

function lightSwitchBroke(){
    document.getElementById('broke').play();
    broken = true;
    light = false;
    darkTheme();
}

function lightTheme(){
    document.body.style.backgroundColor = "teal";
    contentElement = document.getElementsByClassName('content')[0];
    contentElement.style.backgroundColor="yellow";
    contentElement.style.color = "black";

    header3Elements = document.querySelectorAll('h3');
    header3Elements.forEach(element => {
        element.style.backgroundColor = "white"
        element.style.color = "red";
    });

    backElements = document.querySelectorAll('.banner-img, .vert-banner-img, nav');

    document.getElementById('topBanner').style.backgroundColor = 'black';
    document.getElementById('bottomBanner').style.backgroundColor = 'black';
    backElements.forEach(element => {
        element.style.filter = 'brightness(100%)';
    });

    document.getElementById('content').style.filter = 'brightness(100%)';
    document.getElementById('top').style.filter = 'brightness(100%)';

}

function darkTheme(){
    document.body.style.backgroundColor = "black";
    contentElement = document.getElementsByClassName('content')[0];
    contentElement.style.backgroundColor="dimgray";
    contentElement.style.color = "white";

    header3Elements = document.querySelectorAll('h3');
    header3Elements.forEach(element => {
        element.style.backgroundColor = "darkred";
        element.style.color = "white";
    });

    contactsElement = document.getElementsByClassName('contacts')[0];
    contactsElement.style.backgroundColor = "gray";
    contactsElement.style.color = "white";

    backElements = document.querySelectorAll('.banner-img, .vert-banner-img');

    document.getElementById('topBanner').style.backgroundColor = 'black';
    document.getElementById('bottomBanner').style.backgroundColor = 'black';
    backElements.forEach(element => {
        element.style.filter = 'brightness(25%)';
    });

    document.getElementById('content').style.filter = 'brightness(75%)';
    document.getElementById('top').style.filter = 'brightness(75%)';
}