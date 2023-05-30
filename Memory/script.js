var lives = 3, time = 3, score = 0, speed = 2, diff = 1;
var pattern = [], input = [];
var keys = {1: "u", 2: "r", 3:"d", 4:"l"};
const sleep = (ms) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function start() 
{
    while(lives>0) {
        generate();
        await display();
        check();
        await sleep(3000);
    }
}

function generate() {
    pattern = [];
    for(let i = 0; i < diff; i++) 
        pattern.push( parseInt(Math.random()*4)+1 );
}

async function display() {
    for(let i = 0; i < pattern.length; i++) {
        let temp = document.getElementById(keys[pattern[i]]);
        temp.style.backgroundColor='#000000';
        await sleep(speed*1000);
        temp.style.backgroundColor='#FFFFFF';
        await sleep(speed*250);
    }
    return new Promise((resolve, reject) => { resolve(); })
}

async function check() {
    input = [];
    await sleep(speed*1000);
    console.log(pattern);
    console.log(input);
    if(input.length==pattern.length) {
        for(let i = 0; i < input.length; i++) {
            if(input[i]!=pattern[i]) {
                lives--;
                return;
            }
        }
    }
    else {
        lives--;
        return;
    }
    
    correct();
}

function correct() {
    score = score * (speed + diff);

    diff++;
    speed -= 0.1;

    time = parseInt(parseInt(speed+time)*1.7);
}

function changeText(type, id, text) {
    if(type.toLowerCase()=="id") 
        document.getElementById(id).innerHTML = text;
    else if(type.toLowerCase()=="class") 
        document.getElementsByClassName(id).innerHTML = text;
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode==37) 
        input.push(4); // Left
    if(event.keyCode==38) 
        input.push(1); // Up
    if(event.keyCode==39) 
        input.push(2); // Right
    if(event.keyCode==40) 
        input.push(3); // Down
});