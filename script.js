const gameBoard = (() => {
    let gameBoard = ["","","","","","","","",""];

    const addToBoard = function(i, marker) {
        gameBoard[i] = marker;
    }

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

    const clearBoard = function() {
        console.log("Board cleared.")
        gameBoard = ["","","","","","","","",""];
    }

    return {
        gameBoard,
        addToBoard,
        isGameOver,
        isThereThreeInARow,
        isThereATie,
        clearBoard
    }
})();

const displayController = (() => {
    const drawBoard = function (gameBoard) {
        for (let i = 0; i < 9; i++) {
            const cell = document.getElementById(`${i}`);
            cell.textContent = gameBoard.gameBoard[i];
        }
    }
    const displayGameEndingMessage = function () {
        const message = document.getElementById("message");
        if (gameBoard.isThereATie()) {
            message.textContent = "Tie game!"
        } else if (gameBoard.isThereThreeInARow()) {
            message.textContent = winner.name + " wins!"
        }
    }
    return {
        drawBoard,
        displayGameEndingMessage
    }
})();

const player = (name, marker) => {
    const markOnBoard = function (location) {
        console.log(marker + " on " + location);
        gameBoard.addToBoard(location, marker);
        console.log(gameBoard.gameBoard);
    }

    return { name, marker, markOnBoard };
}

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");
let winner;

const gameFlow = (() => {
    let currentPlayer = player1;
    const startGame = function() {
        console.log("game started.")
        // gameBoard.clearBoard();
        displayController.drawBoard(gameBoard);
    }
    const playerMove = function(location) {
        if (isValidMove(location)) {
            currentPlayer.markOnBoard(location);
            displayController.drawBoard(gameBoard);
            if (gameBoard.isGameOver()) {
                winner = currentPlayer;
                displayController.displayGameEndingMessage();
            }
            currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
        }
    }
    const isValidMove = function(location) {
        return (gameBoard.gameBoard[location] === "" && !gameBoard.isGameOver());
    }
    return { currentPlayer, startGame, playerMove }
})();

const cells = document.querySelectorAll(".cell");
cells.forEach(function(cell) {
    cell.addEventListener('click', () => gameFlow.playerMove(cell.id))
})


const startGameBtn = document.getElementById("startBtn");
startGameBtn.addEventListener('click', gameFlow.startGame);


gameFlow.startGame();
