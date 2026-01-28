const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let board = ["","","","","","","","",""];

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click",()=>{
        const index = cell.getAttribute("data-index");

        if(board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnText.textContent = `Player ${currentPlayer} Turn`;
    });
});

function checkWinner(){
    for(let pattern of winPatterns){
        const [a,b,c] = pattern;
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            gameActive = false;
            turnText.textContent = `🎉 Player ${board[a]} Wins!`;
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");
            return;
        }
    }

    if(!board.includes("")){
        gameActive = false;
        turnText.textContent = "😐 It's a Draw!";
    }
}

restartBtn.addEventListener("click",()=>{
    board = ["","","","","","","","",""];
    currentPlayer = "X";
    gameActive = true;
    turnText.textContent = "Player X Turn";
    cells.forEach(cell=>{
        cell.textContent = "";
        cell.className = "cell";
    });
});