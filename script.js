const gameBoard = (() => {
    let gameBoard = ["","","","","","","","",""];
    const addToBoard = (i, marker) => gameBoard[i] = marker;
    return {
        gameBoard,
        addToBoard
    }
})();

const displayController = (() => {
    const drawBoard = function (gameBoard) {
        for (let i = 0; i < 9; i++) {
            const cell = document.getElementById(`${i}`);
            cell.textContent = gameBoard.gameBoard[i];
        }
    }
    return {
        drawBoard
    }
})();

const player = (name, marker) => {
    const markOnBoard = function (location) {
        gameBoard.addToBoard(location, marker);
    }

    return { name, marker, markOnBoard };
}

const player1 = player("Joe", "X");
const player2 = player("Clare", "O");

const gameFlow = (() => {
    let currentPlayer = player1;
    const startGame = function() {
        displayController.drawBoard(gameBoard);
    }
    const playerMove = function(location) {
        if (isValidMove(location)) {
            currentPlayer.markOnBoard(location);
            currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
            displayController.drawBoard(gameBoard);
            console.log(gameBoard.gameBoard)
            console.log("Player moved.")
        }
    }
    const isValidMove = function(location) {
        return gameBoard.gameBoard[location] === "";
    }
    return { currentPlayer, startGame, playerMove }
})();

console.log(gameBoard.gameBoard);

const cells = document.querySelectorAll(".cell");
cells.forEach(function(cell) {
    cell.addEventListener('click', () => gameFlow.playerMove(cell.id))
    console.log(cell);
})

gameFlow.startGame();
