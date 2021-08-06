const gameBoard = (() => {
    let gameBoard = ["","","","","","","","",""];
    const addToBoard = (i, marker) => gameBoard[i] = marker;

    const isGameOver = function() {
        return isThereThreeInARow() || isThereATie();
    }

    const isThereThreeInARow = function() {
        return ((gameBoard[0] === "X" && gameBoard[1] === "X" && gameBoard[2] === "X")
            || (gameBoard[3] === "X" && gameBoard[4] === "X" && gameBoard[5] === "X")
            || (gameBoard[6] === "X" && gameBoard[7] === "X" && gameBoard[8] === "X")
            || (gameBoard[0] === "X" && gameBoard[3] === "X" && gameBoard[6] === "X")
            || (gameBoard[1] === "X" && gameBoard[4] === "X" && gameBoard[7] === "X")
            || (gameBoard[2] === "X" && gameBoard[5] === "X" && gameBoard[8] === "X")
            || (gameBoard[0] === "X" && gameBoard[4] === "X" && gameBoard[8] === "X")
            || (gameBoard[2] === "X" && gameBoard[4] === "X" && gameBoard[6] === "X")
            || (gameBoard[0] === "O" && gameBoard[1] === "O" && gameBoard[2] === "O")
            || (gameBoard[3] === "O" && gameBoard[4] === "O" && gameBoard[5] === "O")
            || (gameBoard[6] === "O" && gameBoard[7] === "O" && gameBoard[8] === "O")
            || (gameBoard[0] === "O" && gameBoard[3] === "O" && gameBoard[6] === "O")
            || (gameBoard[1] === "O" && gameBoard[4] === "O" && gameBoard[7] === "O")
            || (gameBoard[2] === "O" && gameBoard[5] === "O" && gameBoard[8] === "O")
            || (gameBoard[0] === "O" && gameBoard[4] === "O" && gameBoard[8] === "O")
            || (gameBoard[2] === "O" && gameBoard[4] === "O" && gameBoard[6] === "O"))
    }

    const isThereATie = function() {
        let tie = true;
        for (let i = 0; i < 9; i++) {
            tie = tie && gameBoard[i] !== "";
        }
        return tie;
    }

    return {
        gameBoard,
        addToBoard,
        isGameOver
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

const player1 = player("Player1", "X");
const player2 = player("Player2", "O");

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
            console.log(gameBoard.isGameOver());
        }
    }
    const isValidMove = function(location) {
        return gameBoard.gameBoard[location] === "";
    }
    return { currentPlayer, startGame, playerMove }
})();

const cells = document.querySelectorAll(".cell");
cells.forEach(function(cell) {
    cell.addEventListener('click', () => gameFlow.playerMove(cell.id))
})

gameFlow.startGame();
