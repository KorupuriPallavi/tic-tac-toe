const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);


function handleCellClick(event) {

    const index = event.target.getAttribute("data-index");

    // Don't allow clicking an already filled cell
    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;

    event.target.textContent = currentPlayer;

    checkWinner();
}


function checkWinner() {

    let winner = null;

    for (let pattern of winningPatterns) {

        const first = board[pattern[0]];
        const second = board[pattern[1]];
        const third = board[pattern[2]];

        if (
            first !== "" &&
            first === second &&
            second === third
        ) {
            winner = first;
            break;
        }
    }

    // Winner found
    if (winner !== null) {

        statusText.textContent =
            `Player ${winner} Wins! 🎉`;

        gameActive = false;

        return;
    }

    // Check draw
    if (!board.includes("")) {

        statusText.textContent = "It's a Draw! 🤝";

        gameActive = false;

        return;
    }

    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent =
        `Player ${currentPlayer}'s Turn`;
}


function restartGame() {

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    currentPlayer = "X";

    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}
