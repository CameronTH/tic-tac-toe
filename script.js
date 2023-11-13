const boxes = document.querySelectorAll(".box");

const gameBoard = (function () {
  let currentBoard = ["", "", "", "", "", "", "", "", ""];
  let isFirstStart = true;
  let isGameOver = false;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const resetBoard = () => {
    gameBoard.currentBoard = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => {
      box.textContent = "";
      box.classList.remove("x");
      box.classList.remove("o");
    });
  };

  const createPlayerProfile = function (
    playerName,
    playerType,
    playerAi,
    playerTurn
  ) {
    const player = playerName;
    const type = playerType;
    const isComputer = playerAi;
    const isTurn = playerTurn;

    return { player, type, isComputer, isTurn };
  };

  const boxes = document.querySelectorAll(".box");

  return {
    currentBoard,
    isFirstStart,
    isGameOver,
    winningCombos,
    resetBoard,
    boxes,
    createPlayerProfile,
  };
})();

const player1 = gameBoard.createPlayerProfile("cammy", "x", false, true);
const player2 = gameBoard.createPlayerProfile("computer", "o", true, false);

const randomNum = function () {
  let rand = Math.floor(Math.random() * 9);
  while (
    gameBoard.boxes[rand].textContent !== "" &&
    gameBoard.currentBoard.includes("")
  )
    rand = Math.floor(Math.random() * 9);

  return rand;
};

const handleClick = function () {
  if (player1.isTurn === true) {
    console.log(gameBoard.isFirstStart);
    gameBoard.currentBoard[this.getAttribute("data-number")] = player1.type;
    this.textContent = "x";
    this.classList.add(player1.type);
    this.removeEventListener("click", handleClick);
    player1.isTurn = false;
    checkWinStatus();

    if (player2.isComputer === true && gameBoard.isGameOver === false) {
      let randomNumber = randomNum();
      gameBoard.currentBoard[
        gameBoard.boxes[randomNumber].getAttribute("data-number")
      ] = player2.type;
      gameBoard.boxes[randomNumber].textContent = player2.type;
      gameBoard.boxes[randomNumber].classList.add("o");
      player1.isTurn = true;
      checkWinStatus();
    }
  }
};

const gameController = function () {
  gameBoard.boxes.forEach((box) => {
    box.addEventListener("click", handleClick);
  });
};

const checkWinStatus = function () {
  gameBoard.winningCombos.forEach((array) => {
    const crossWins = array.every(
      (cell) => boxes[cell].textContent === player1.type
    );

    if (crossWins) {
      gameBoard.isGameOver = true;
      gameMenu(player1);
    }
    const circleWins = array.every(
      (cell) => boxes[cell].textContent === player2.type
    );

    if (circleWins) {
      gameBoard.isGameOver = true;
      gameMenu(player2);
    }
  });

  // const array = Array.from(gameBoard.boxes);

  const draw = Array.from(gameBoard.boxes).every(
    (array) => array.textContent !== ""
  );

  if (draw && gameBoard.isGameOver === false) {
    gameBoard.isGameOver = true;
    gameMenu();
  }
};
const gameMenu = function (winningPlayer) {
  const dialog = document.querySelector(".dialog");
  if (gameBoard.isFirstStart === true) {
    dialog.showModal();
    const vsComputer = document.querySelector(".vs-computer");
    const vsPlayer = document.querySelector(".vs-player");
    vsComputer.addEventListener("click", () => {
      const nameInput1 = document.querySelector("#player1");

      gameController();
      gameBoard.isFirstStart = false;
      dialog.replaceChildren();
      dialog.close();
    });
  } else {
    dialog.showModal();
    const GameOverMenuContainer = document.createElement("div");
    const status = document.createElement("h1");
    const startButton = document.createElement("button");
    GameOverMenuContainer.classList.add("main-menu");
    GameOverMenuContainer.append(status);
    GameOverMenuContainer.append(startButton);
    dialog.append(GameOverMenuContainer);
    startButton.textContent = "Play Again";
    status.textContent = `The Winner is ${winningPlayer.player}!`;
    startButton.addEventListener("click", () => {
      gameBoard.resetBoard();
      player1.isTurn = true;
      gameBoard.isGameOver = false;
      gameController();
      GameOverMenuContainer.replaceChildren();
      dialog.close();
    });
  }
};

gameMenu();
