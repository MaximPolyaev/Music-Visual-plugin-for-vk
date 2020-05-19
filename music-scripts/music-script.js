const body = document.querySelector('body');
const  width = 10;
const num = Math.floor(document.documentElement.clientWidth / (width + 4));
let context;
let analyzer;
let src;
let height;
let myElements;
let array = new Uint8Array(num * 2);
let line;

let backMusic = document.createElement('div');
backMusic.className = 'maximmusic';
backMusic.style.minwidth = '100%';
backMusic.style.minHeight = '100vh';
backMusic.style.width = '100%';
backMusic.style.position = 'fixed';
backMusic.style.top = '0';
backMusic.style.display = 'flex';
backMusic.style.justifyContent = 'center';
backMusic.style.alignItems = 'flex-end';
backMusic.style.zIndex = '-1000';
body.append(backMusic);

window.onclick = function() {
    if(context) {
        return;
    }

    for(let i = 0; i < num; i++) {
        line = document.createElement('div');
        line.className = 'line';
        line.style.background = 'red';
        line.style.margin = '2px';
        line.style.minWidth = width + 'px';
        line.style.borderRadius = '30px';
        line.style.width = '10px';

        backMusic.appendChild(line);
    }

    myElements = document.getElementsByClassName('line');

    context = new AudioContext();
    analyzer = context.createAnalyser();

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        src = context.createMediaStreamSource(stream);
        src.connect(analyzer);

        loop();
    }).catch(error => {
        alert(error + '\r\n Отклонено. Страница будет обновлена!');
        location.reload();
    });
};

function loop() {
    window.requestAnimationFrame(loop);

    analyzer.getByteFrequencyData(array);


    for(let i = 0; i < num; i++) {
        height = array[i + num];
        myElements[i].style.minHeight = (height * 4) + 'px';
        myElements[i].style.opacity = 0.008 * height;
        myElements[i].style.backgroundColor = `rgba(${height}, ${height > 100 ? height : 255 - height}, ${255 - height}, 1)`;
    }
}