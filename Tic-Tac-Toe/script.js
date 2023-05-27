var isX = true; 
var ai = false;
var inGame = false;
var arr = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
var xIndexes = [];
var winner = [];
const buttonIds = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
const map = {"r1": [0, 1, 2], "r2": [3, 4, 5], "r3": [6, 7, 8], "l1": [0, 3, 6], "l2": [1, 4, 7], "l3": [2, 5, 8], "d1": [0, 4, 8], "d2": [6, 4, 2]};
const sleep = (ms) => {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}
const disableBtns = (item) => {
    document.getElementById(item).disabled = true;
}
const toggleBtn = (element) => {
    element.disabled = !element.disabled;
}

const endPanel = document.createElement("div");
endPanel.style.position = "absolute";
endPanel.style.left = "50%";
endPanel.style.top = "140px";
endPanel.style.marginLeft = "-11%";
endPanel.style.backgroundColor = "black";
endPanel.style.opacity = 0.0;
endPanel.style.width = "310px";
endPanel.style.height = "310px";
endPanel.style.color = "white";
endPanel.style.display = "flex";
endPanel.style.alignItems = "center";
endPanel.style.justifyContent = "center";

const panel = document.createElement("h1");
panel.style.fontFamily = "Open Sans";
panel.style.fontSize = "40px";

function aiMove()
{
    var m = {"r1": 0, "r2": 0, "r3": 0, "l1": 0, "l2": 0, "l3": 0, "d1": 0, "d2":0};
    var l = ["r1", "r2", "r3"];
    for(let i = 0; i < 3; i++)
    {
        m["r1"] += arr[0][i];
        m["r2"] += arr[1][i];
        m["r3"] += arr[2][i];

        m["l1"] += arr[i][0];
        m["l2"] += arr[i][1];
        m["l3"] += arr[i][2];

        m["d1"] += arr[i][i];
        m["d2"] += arr[2-i][i];
    }

    var pos;
    for(const [key, value] of Object.entries(m))
    {
        if(value==-2) 
        {
            pos = key;
            break
        }
    }
    for(const [key, value] of Object.entries(m))
    {
        if(value==2)
        {
            pos = key;
            break;
        }
    }

    var t = [];

    if(pos==undefined)
    {
        if(arr[1][1]==0)
        {
            t = [4];
        }
        else
        {
            if(arr[0][1]==0)
                t = [1];
            else if(arr[1][0]==0)
                t = [3];
            else if(arr[1][2]==0)
                t = [5]
            else if(arr[2][1]==0)
                t = [7];
            else if(arr[0][0]==0)
                t = 0;
            else if(arr[0][2]==0)
                t = 2;
            else if(arr[2][0]==0)
                t = 6;
            else if(arr[2][2]==0)
                t = 8;

        }
    }
    else
    {
        t = map[pos];
    }

    for(let i = 0; i < t.length; i++)
    {
        let val = t[i];
        if(arr[parseInt(val/3)][val%3]==0)
        {
            document.getElementById(buttonIds[val]).innerHTML = "O";
            arr[parseInt(val/3)][val%3]=1;
            break;
        }
    }
}

async function pressed(element)
{
    inGame = true;

    let index = buttonIds.indexOf(element.id);
    if(arr[parseInt(index/3)][index%3]==0)
    {
        document.getElementById(element.id).innerHTML = isX?"X":"O";
        document.getElementById("player-turn").innerHTML = "Player " + (isX==false?1:2).toString() + " Turn";
        if(isX) { xIndexes.push([parseInt(index/3), index%3]); }
        isX = !isX; // Causes X to become -1
        arr[parseInt(index/3)][index%3] = isX?1:-1;
    }
    winner = hasWon();
    if(winner[0]!=0)
    {
        gameEnd(winner[1]);
    }
    else
    {
        if(ai)
        {
            await sleep(500);
            document.getElementById("player-turn").innerHTML = "Player " + (isX==false?1:2).toString() + " Turn";
            aiMove();
            isX = !isX;
        }
    }

    winner = hasWon();
    if(winner[0]!=0)
    {
        gameEnd(winner[1]);
    }
    else if(isDraw())
    {
        gameDraw();
    }
}

function restart()
{
    isX = true;
    arr = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    for(let i = 0; i < 9; i++) 
    {
        document.getElementById(buttonIds[i]).innerHTML = " ";
        document.getElementById(buttonIds[i]).style.backgroundColor = "#fca94ac5";
        document.getElementById(buttonIds[i]).disabled = false;
    }
    document.getElementById("player-turn").innerHTML = "Player 1 Turn";

    endPanel.style.opacity = "0.0";
    endPanel.remove();
    xIndexes = [];

    inGame = false;
}

async function gameDraw()
{
    panel.textContent = "Draw"
    endPanel.append(panel);
    document.body.append(endPanel);

    buttonIds.forEach(disableBtns);

    easeIn(endPanel);
}

async function gameEnd (position)
{
    if(position == undefined) return;
    
    panel.textContent = "Player " + (winner[0]==1?1:2) + " Wins";
    endPanel.append(panel);
    document.body.append(endPanel);

    buttonIds.forEach(disableBtns);

    let t = map[position];
    for(let i = 0; i < t.length; i++)
    {
        document.getElementById(buttonIds[t[i]]).style.backgroundColor = "#79ff6bb8";
        await sleep(350);
    }

    document.body.append(endPanel);
    easeIn(endPanel);
}

function hasWon()
{
    var r1 = 0, r2 = 0, r3 = 0;
    var l1 = 0, l2 = 0, l3 = 0;
    var d1 = 0, d2 = 0;
    for(let i = 0; i < 3; i++)
    {
        r1 += arr[0][i]*Math.pow(10, 2-i);
        r2 += arr[1][i]*Math.pow(10, 2-i);
        r3 += arr[2][i]*Math.pow(10, 2-i);

        l1 += arr[i][0]*Math.pow(10, 2-i);
        l2 += arr[i][1]*Math.pow(10, 2-i);
        l3 += arr[i][2]*Math.pow(10, 2-i);

        d1 += arr[i][i]*Math.pow(10, 2-i);
        d2 += arr[2-i][i]*Math.pow(10, 2-i);
    }

    if( (r1==-111||r2==-111||r3==-111||l1==-111||l2==-111||l3==-111||d1==-111||d2==-111) )
    {
        return [ 1, (r1==-111?"r1":r2==-111?"r2":r3==-111?"r3":l1==-111?"l1":l2==-111?"l2":l3==-111?"l3":d1==-111?"d1":"d2") ];
    }
    else if( (r1==111||r2==111||r3==111||l1==111||l2==111||l3==111||d1==111||d2==111) )
    {
        return [ -1, (r1==111?"r1":r2==111?"r2":r3==111?"r3":l1==111?"l1":l2==111?"l2":l3==111?"l3":d1==111?"d1":"d2") ];
    }
    else 
    {
        return [0];
    }
}

function isDraw()
{
    for(let i = 0; i < arr.length; i++)
        for(let j = 0; j < arr.length; j++)
            if(arr[i][j]==0) return false;
    return true;
}

async function easeIn(element)
{
    let i = 50;
    while(i<110)
    {
        let y = 0.0002*(i-50)*(i-50);
        element.style.opacity = y.toString();
        i++;
        await sleep(0.01);
    }
}

function mode(element)
{
    if(!inGame)
    {
        if(element.id == "bot")
        {
            ai = true;
            toggleBtn(element);
            toggleBtn(document.getElementById("multi"));
        }
        else if(element.id == "multi")
        {
            ai = false;
            toggleBtn(element);
            toggleBtn(document.getElementById("bot"));
        }
    }
}