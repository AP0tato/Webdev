var lives = 3, score = 0, speed = 1.7, diff = 1;
var pattern = [], input = [];
var keys = {1: "u", 2: "r", 3:"d", 4:"l"};
const sleep = (ms) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

async function start() 
{
    lives = 3;
    time = 3;
    speed = 2;
    diff = 1;
    score = 0;

    update();
    while(lives>0) {
        update();
        generate();
        await display();
        await check();
    }
    update();
}

function update() {
    document.getElementById("lives").innerHTML = "Lives: "+lives;
    document.getElementById("score").innerHTML = "Score: "+score;
    document.getElementById("diff").innerHTML = "Pattern length: "+diff;
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
        await sleep(speed*150);
    }
    return new Promise((resolve, reject) => { resolve(); })
}

async function check() {
    input = [];
    await sleep(diff*1000);
    console.log(pattern);
    console.log(input);
    if(input.length==pattern.length) {
        for(let i = 0; i < input.length; i++) {
            if(input[i]!=pattern[i]) {
                lives--;
                return new Promise((resolve, reject) => { resolve(); })
            }
        }
    }
    else {
        lives--;
        return new Promise((resolve, reject) => { resolve(); })
    }

    correct();
    return new Promise((resolve, reject) => { resolve(); })
}

function correct() {
    score = score + 25;

    diff++;
    speed -= 0.1;
}

function changeText(type, id, text) {
    if(type.toLowerCase()=="id") 
        document.getElementById(id).innerHTML = text;
    else if(type.toLowerCase()=="class") 
        document.getElementsByClassName(id).innerHTML = text;
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode==37) {
        input.push(4); // Left
        document.getElementById("l1").style.backgroundColor = "#000000";
    }
    if(event.keyCode==38) { 
        input.push(1); // Up
        document.getElementById("u1").style.backgroundColor = "#000000";
    }
    if(event.keyCode==39) { 
        input.push(2); // Right
        document.getElementById("r1").style.backgroundColor = "#000000";
    }
    if(event.keyCode==40) { 
        input.push(3); // Down
        document.getElementById("d1").style.backgroundColor = "#000000";
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode==37) 
        document.getElementById("l1").style.backgroundColor = "#FFFFFF";
    
    if(event.keyCode==38) 
        document.getElementById("u1").style.backgroundColor = "#FFFFFF";
    
    if(event.keyCode==39) 
        document.getElementById("r1").style.backgroundColor = "#FFFFFF";
    
    if(event.keyCode==40) 
        document.getElementById("d1").style.backgroundColor = "#FFFFFF";
    
});