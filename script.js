const gameBoard = (() => {
    let gameBoard = ["","","","","","","","",""];
    const addToBoard = (i, player) => gameBoard[i] = player;
    return {
        gameBoard,
        addToBoard
    }
})();

gameBoard.addToBoard(2, "X");

console.log(gameBoard.gameBoard);