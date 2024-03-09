const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // Update UI
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("win"); // Remove winning class
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player: ${currentPlayer}`;
}

initGame();

function swap() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    // Update UI
    gameInfo.innerText = `Current Player: ${currentPlayer}`;
}

function checkGameOver() 
{
    let answer = "";

    winningPositions.forEach(position => {
        const [a, b, c] = position;
        if (
            gameGrid[a] !== "" &&
            gameGrid[a] === gameGrid[b] &&
            gameGrid[b] === gameGrid[c]
        ) {
            // Declare the winner
            answer = gameGrid[a] + " wins!";
            // Mark winning positions
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
        }
    });

    // Display winner or tie
    if (answer !== "") {
        gameInfo.innerText = answer;
        newGameBtn.classList.add("active");
        return;
    }

    // Check for tie
    if (gameGrid.every(box => box !== "")) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
 if (gameGrid[index] === "" && !newGameBtn.classList.contains("active")) {
     boxes[index].innerText = currentPlayer;
     gameGrid[index] = currentPlayer;
     swap();
     checkGameOver();
 }
}


boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);
