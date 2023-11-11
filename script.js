const boxes = document.querySelectorAll(".box");

const gameBoard = (function () {
  let currentBoard = ["", "", "", "", "", "", "", "", ""];

  const resetBoard = () => {
    gameBoard.currentBoard = ["", "", "", "", "", "", "", "", ""];
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

  return { currentBoard, resetBoard, createPlayerProfile };
})();

const randomNum = function () {
  let rand = Math.floor(Math.random() * 9);
  while (
    boxes[rand].textContent !== "" &&
    gameBoard.currentBoard.includes("")
  ) {
    rand = Math.floor(Math.random() * 9);
  }

  return rand;
};

const gameController = (function () {
  boxes.forEach((box) => {
    function handleClick() {
      console.log("pressed");
      if (player1.isTurn === true) {
        gameBoard.currentBoard[box.getAttribute("data-number")] = player1.type;
        box.textContent = player1.type;
        player1.isTurn = false;
        boxStopClick();
        if (player2.isComputer === true) {
          let randomNumber = randomNum();
          console.log("this" + randomNumber);
          gameBoard.currentBoard[
            boxes[randomNumber].getAttribute("data-number")
          ] = player2.type;
          boxes[randomNumber].textContent = player2.type;
          boxes[randomNumber].removeEventListener("click", handleClick);
          player1.isTurn = true;
          console.log(gameBoard.currentBoard);
        }
      }
    }
    box.addEventListener("click", handleClick);

    const boxStopClick = () => {
      box.removeEventListener("click", handleClick);
    };
  });
})();

// const playerTurn = function (box) {
//   gameBoard.currentBoard[box.getAttribute("data-number")] = player1.type;
//   box.textContent = player1.type;
//   player1.isTurn = false;
// };

// const computerTurn = function () {
//   const randomNum = Math.floor(Math.random() * 9);
//   gameBoard.currentBoard[boxes[randomNum].getAttribute("data-number")] =
//     player2.type;
//   boxes[randomNum].textContent = player2.type;
//   player1.isTurn = true;
// };

const player1 = gameBoard.createPlayerProfile("cammy", "x", false, true);
const player2 = gameBoard.createPlayerProfile("computer", "o", true, false);
