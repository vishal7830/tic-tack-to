const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const newBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function gameInit(){
    currentPlayer = 'X';
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("win");
        box.style.pointerEvents = "all";
    });
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    newBtn.classList.remove("active");
}


gameInit()


function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer ="";

    winningPositions.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            answer = gameGrid[position[0]];
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newBtn.classList.add("active");
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        }) 
    }
    else{
        let fillCount=0;
        gameGrid.forEach((value) => {
            if(value !== ""){
                fillCount++;
            }
        })
        if( fillCount === 9){
            gameInfo.innerText = `Game Tied!`;
            newBtn.classList.add("active");
        }

    }

}

function handleClick(index) {
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newBtn.addEventListener("click", gameInit);