const playerFactory = function (playerName, moves, mark) {
    return { playerName, moves, mark };
};

const gameBoardModule = (function () {
    const gameBoard = [];
    let player1 = playerFactory("player1", [], "X");
    let player2 = playerFactory("player2", [], "O");
    let activePlayer = player1;

    const updatePlayerMove = (playerSelection) => {
        console.log("Update Move ", gameBoardModule.activePlayer);
        gameBoardModule.activePlayer.moves.push(playerSelection);
        displayController.updateGameboardWithPlayerSelection(gameBoardModule.activePlayer);
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

    const updateGameboardWithPlayerSelection = function (activePlayer) {
        const gameSquare = document.querySelectorAll("#game-square");
        activePlayer.moves.forEach((move) => {
            gameSquare[move].textContent = activePlayer.mark;
        });
    };

    const getPlayerInput = () => {
        let gameSquare = document.querySelectorAll("#game-square");
        gameSquare.forEach((square) => {
            square.addEventListener(
                "click",
                () => {
                    _updatePlayerSelection(square);
                },
                {
                    once: true,
                }
            );
        });
    };

    const _updatePlayerSelection = (playerSelection) => {
        gameBoardModule.updatePlayerMove(parseInt(playerSelection.dataset.boxnumber));
        gameBoardModule.toggleActivePlayer();
    };

    return { createGameBoard, getPlayerInput, updateGameboardWithPlayerSelection };
})();

const game = (function () {
    displayController.createGameBoard();
    displayController.getPlayerInput();
})();
