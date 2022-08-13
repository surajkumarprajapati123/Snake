let inputDir = {x:0,y:0};
const gamestart = new Audio("first.mp3");
const foodeat = new Audio("tom-2.mp3");

let speed = 0.5;
let score=0;
let lastPaintTime = 0;
let snackArr = [
    {x:13,y:15}
]
  food= {x:6,y:9};





// game function
 
function main(ctime){
    window.requestAnimationFrame(main);
   
    if((ctime-lastPaintTime)/100 < 1/speed)
    {
        return ;
    }
    lastPaintTime=ctime;
    gameEngine();
    // console.log(ctime);
}
// thise is a touch and game over
function isCollide(snacke)
{
    // if touch self
    for(let i=1;i < snackArr.length;i++)
    {
        if(snacke[i].x === snacke [0].x && snacke[i].y === snacke[0].y)
        {
            return true;
        }
    } 
    //  if your are touch the wal devar
        if(snacke[0].x >= 18 || snacke[0].x<=0 || snacke[0].y >= 18 || snacke[0].y<=0)
        {
            return true;
        }
    

}

function gameEngine()
{
    // 1  paet one updating the snay array
    if(isCollide(snackArr))
    {
        inputDir = {x:0,y:0};
        gamestart.pause();
        alert("Game over ,  plese any key to paly again");
        snackArr = [{x:13,y:15}];
        gamestart.play();

score=0;        
    }
    // if you eten the food increatment the food
    if(snackArr[0].y === food.y && snackArr[0].x === food.x)
    {
        foodeat.play();
        score +=1;
        if(score>highscoreval)
        {
            highscoreval=score;
            localStorage.getItem("Hiscore:",JSON.stringify(highscoreval));
            highscorebox.innerHTML = "Hiscore :"+ highscoreval;
        }
        scoreBox.innerHTML = " Score :" + score;
        snackArr.unshift({x:snackArr[0].x + inputDir.x, y:snackArr[0].y + inputDir.y})
        let a=2;
        let b=16;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())} // thise is a random number
    }
    // move the snack
for( let i=snackArr.length-2; i>=0; i--)
{

    snackArr[i+1]={...snackArr[i]}
}
 snackArr[0].x += inputDir.x;
 snackArr[0].y += inputDir.y;



//  2 display the sanck
board.innerHTML = "";
snackArr.forEach((e,index)=>
{
    snakelement = document.createElement('div');
    snakelement.style.gridRowStart = e.y;
    snakelement.style.gridColumnStart = e.x;
    if(index === 0){
        snakelement.classList.add('head');
    }
    else
    {
        snakelement.classList.add('snack');
    }
    board.appendChild(snakelement);
})
// display the food

    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);

}





// main logic funtion
let highscore = localStorage.getItem("Highscore")
if(highscore === null)
{
    highscoreval = 0;
    localStorage.setItem("Highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscorebox .innerHTML = "Hiscore :"+ highscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
     gamestart.play();
    switch(e.key)

    {
        case "ArrowUp":
        console.log("arrow up")
        inputDir.x=0 ;
        inputDir.y=-1 ;
        break;
        case "ArrowDown":
        console.log("arrow down")
        inputDir.x=0 ;
        inputDir.y= 1;
        break;
        case "ArrowLeft":
        console.log("arrow left")
        inputDir.x=-1 ;
        inputDir.y= 0;
        break;
        case "ArrowRight":
        console.log("arrow right")
        inputDir.x= 1;
        inputDir.y= 0;
        break;
       


    }
})