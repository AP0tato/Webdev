var lives = 3, time = 60, score = 0, speed = 1, diff = 1;

var life = document.getElementsByClassName("lives"), scor = document.getElementsByClassName("score"), tim = document.getElementsByClassName("time");

function start() 
{
    document.getElementsByClassName("lives").innerHTML = "Lives: " + lives;
}