const gameDisplay = document.querySelectorAll(".theboard");
const btnsave = document.querySelector(".btnsave");
const startcontainer = document.querySelector(".playerscontainer");
const name1 = document.querySelector(".name1");
const name2 = document.querySelector(".name2");
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var currentPlayer;
var p1array = [];
var p2array = [];
var drawcombo = [];
var Player1 = "";
var Player2 = "";


const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const boardclear = () => { board = ["", "", "", "", "", "", "", "", ""]; };
  const render = () => {
    gameDisplay.forEach((square) => {
      let rz = square.dataset.pos;
      square.innerHTML = gameBoard.board[rz];
    });
  };
  const chkwin = () => {
    var resultp1 = winCombos.some((ar) => ar.every((e) => p1array.includes(e)));
    var resultp2 = winCombos.some((ari) =>
      ari.every((ei) => p2array.includes(ei))
    );

    if (resultp1 || resultp2 == true) {
      console.log(" the winner is" + gamePlay.currentTurn());
      drawwin(gamePlay.currentTurn());
    } else if (
      gamePlay.roundplayed() == 8 &&
      resultp1 == false &&
      resultp2 == false
    ) {
      gamePlay.Tie();
    }
  };
  const drawwin = (winner) => {
    if (winner == "x") {
      winCombos.forEach((combo) => {
        if (combo.every((position) => p1array.includes(position))) {
          drawcombo = combo;
        }
      });
    } else {
      winCombos.forEach((combo) => {
        if (combo.every((position) => p2array.includes(position))) {
          drawcombo = combo;
        }
      });
    }

    drawcombo.forEach((nbs) => (gameDisplay[nbs].className += " woncase"));
  };
  return {
    board,
    render,
    chkwin,
    drawwin,
  };
})();
const gamePlay = (() => {
  let turnsymbol = "x";
  let roundplayedvar = 0;
  const clicked = (el, position) => {
    if (!el.innerHTML) {
      el.innerHTML = turnsymbol;
      if (turnsymbol == "x") {
        p1array.push(Number(position));
      } else {
        p2array.push(Number(position));
      }
      changeTurn();
    }
  };
  const Tie = () => {
    console.log("tie");
  };
  const currentTurn = () => {
    return turnsymbol;
  };
  const roundplayed = () => {
    return roundplayedvar;
  };
  const changeTurn = () => {
    if (gamePlay.roundplayed() >= 4) {
      gameBoard.chkwin();
    }
    if (turnsymbol == "x") {
      turnsymbol = "o";
    } else {
      turnsymbol = "x";
    }
    roundplayedvar++;
  };
  const reset = () => { 
      currentPlayer = "";
      p1array = [];
      p2array = [];
      drawcombo = "";
      gameBoard.boardclear();
      roundplayedvar = 0;
  };

  return {
    clicked,
    currentTurn,
    changeTurn,
    Tie,
    roundplayed,
  };
})();

gameDisplay.forEach((square) => {
  square.addEventListener("click", function () {
    gamePlay.clicked(this, square.dataset.pos);
  });
});

const Player = (name, symbol) => {
  let score = 0;
  getName = () => name;
  getSymbol = () => symbol;
  getScore = () => score;
  addWin = () => score++;
  reset = () => {
     name = "";
     symbol = "";
     score = "";
  };

  return { getName, getSymbol, getScore, addWin,reset };
};
btnsave.addEventListener("click", function() { 
    Player1 = Player(name1.value, "x");
    Player2 = Player(name2.value, "o");
    startcontainer.className = "playerscontainer Fadeout";});


