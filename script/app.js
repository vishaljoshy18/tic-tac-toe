const playerFactory = function (playerName, moves, mark) {
    return { playerName, moves, mark };
};

const gameBoardModule = (function () {
    const gameBoard = [];
    let player1 = playerFactory("player1", [], "X"),
        player2 = playerFactory("player2", [], "O");
    let activePlayer = player1;
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2],
    ];

    const updatePlayerMove = (playerSelection) => {
        console.log("Update Move ", gameBoardModule.activePlayer);
        gameBoardModule.activePlayer.moves.push(playerSelection);
        displayController.updateGameBoardWithPlayerSelection(gameBoardModule.activePlayer);
        _updateGameBoard(gameBoardModule.activePlayer);
    };

    const _updateGameBoard = function (player) {
        player.moves.forEach((move) => {
            gameBoard[move] = player.playerName;
        });
        _checkForWinner(player.playerName);
    };
    const _checkForWinner = function (playerName) {
        console.log(gameBoard);
        winningCombos.forEach((combo) => {
            let i = combo[0],
                j = combo[1],
                k = combo[2];
            if (
                gameBoard[i] == playerName &&
                gameBoard[j] == playerName &&
                gameBoard[k] == playerName
            ) {
                console.log("winner", playerName);
                displayController.endGameText(playerName);
            }
            if (gameBoard.length == 9 && !(Object.values(gameBoard).length !== gameBoard.length)) {
                //checks if array has empty elements
                displayController.endGameText("", true);
            }
        });
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

    const updateGameBoardWithPlayerSelection = function (activePlayer) {
        const gameSquare = document.querySelectorAll("#game-square");
        activePlayer.moves.forEach((move) => {
            gameSquare[move].textContent = activePlayer.mark;
        });
    };

    const getPlayerInput = () => {
        let gameSquare = document.querySelectorAll("#game-square");
        gameSquare.forEach((square) => {
            square.addEventListener("click", _updatePlayerSelection, {
                once: true,
            });
        });
    };

    const _updatePlayerSelection = (event) => {
        gameBoardModule.updatePlayerMove(parseInt(event.target.dataset.boxnumber));
        gameBoardModule.toggleActivePlayer();
    };

    const endGameText = (playerName, draw = false) => {
        if (!draw) {
            document.querySelector("#winner-text").textContent = `${playerName} wins!`;
            let gameSquare = document.querySelectorAll("#game-square");
            gameSquare.forEach((square) => {
                square.removeEventListener("click", _updatePlayerSelection);
            });
        }
        else{
            document.querySelector("#winner-text").textContent = 'Draw !';
        }
        const tryAgainButton = document.querySelector("#try-again-button");
        tryAgainButton.style.display = "block";
        tryAgainButton.addEventListener("click", () => {
            window.location.reload();
        });
    };

    return {
        createGameBoard,
        getPlayerInput,
        updateGameBoardWithPlayerSelection,
        endGameText,
    };
})();

const game = (function () {
    displayController.createGameBoard();
    displayController.getPlayerInput();
})();
