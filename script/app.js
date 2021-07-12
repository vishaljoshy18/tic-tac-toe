const playerFactory = function (playerName, move) {
    return { playerName, move };
};

const gameBoardModule = (function () {
    const gameBoard = [];
    let player1 = playerFactory("player1", []);
    let player2 = playerFactory("player2", []);
    let activePlayer = player1;

    const updatePlayerMove = (playerSelection) => {
        console.log("Update Move ", gameBoardModule.activePlayer);
        gameBoardModule.activePlayer.move.push(playerSelection);
    };

    const toggleActivePlayer = () => {
        if (gameBoardModule.activePlayer == player1) {
            gameBoardModule.activePlayer = player2;
        } else {
            gameBoardModule.activePlayer = player1;
        }
    };

    return { activePlayer, gameBoard, toggleActivePlayer, updatePlayerMove };
})();

const displayController = (function () {
    const gameBoardDisplay = document.querySelector(".game-board");
    const createGameBoard = () => {
        for (let i = 0; i < 9; i++) {
            const gameSquare = document.createElement("div");
            gameSquare.setAttribute("id", "game-square");
            gameSquare.setAttribute("data-boxnumber", i);
            gameSquare.classList.add("game-square");
            gameBoardDisplay.appendChild(gameSquare);
        }
    };
    const getPlayerInput = () => {
        let gameSquare = document.querySelectorAll("#game-square");
        console.log(gameSquare);
        gameSquare.forEach((box) => {
            box.addEventListener("click", () => {
                _updatePlayerSelection(
                    box.dataset.boxnumber,
                    gameBoardModule.activePlayer
                );
            });
        });
    };
    const _updatePlayerSelection = (playerSelection, activePlayer) => {
        console.log(activePlayer);
        gameBoardModule.updatePlayerMove(parseInt(playerSelection));
        gameBoardModule.toggleActivePlayer();
    };

    return { createGameBoard, getPlayerInput };
})();

const game = (function () {
    displayController.createGameBoard();
    displayController.getPlayerInput();
})();
