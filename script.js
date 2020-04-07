const gameDisplay = document.querySelectorAll(".theboard");
const btnsave = document.querySelector(".btnsave");
const startcontainer = document.querySelector(".playerscontainer");
const name1 = document.querySelector(".name1");
const name2 = document.querySelector(".name2");
const name1display = document.querySelector(".scorename1");
const name2display = document.querySelector(".scorename2");
const name1score = document.querySelector(".score1");
const name2score = document.querySelector(".score2");
const newround = document.querySelector(".newround");
const cleargame = document.querySelector(".cleargame");
var roundover = false;
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


const Player = (name, symbol) => {
    let score = 0;
    getName = () => name;
    getSymbol = () => symbol;
    getScore = () => score;
    addWin = () => score++;
    empty = () => {
       name = "";
       symbol = "";
       score = "";
    };
  
    return { getName, getSymbol, getScore, addWin, empty };
  };

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const boardclear = () => { board = ["", "", "", "", "", "", "", "", ""]; 
  
gameBoard.render();
if (roundover && drawcombo) {drawcombo.forEach((nbs) => (gameDisplay[nbs].className = "theboard"));};
};
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
        roundover = true;
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
        Player1.addWin();
        name1score.innerHTML = Player1.getScore() + ' Pts';
      winCombos.forEach((combo) => {
        if (combo.every((position) => p1array.includes(position))) {
          drawcombo = combo;
        }
      });
    } else {
        Player2.addWin();
        name2score.innerHTML = Player2.getScore() + ' Pts';
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
    boardclear
  };
})();
const gamePlay = (() => {
  let turnsymbol = "x";
  let roundplayedvar = 0;
  const clicked = (el, position) => {
      if (!roundover) {
    if (!el.innerHTML) {
      el.innerHTML = turnsymbol;
      if (turnsymbol == "x") {
        p1array.push(Number(position));
      } else {
        p2array.push(Number(position));
      }
      changeTurn();
    }
  ;}};
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
      
      gameBoard.boardclear();
      drawcombo = "";
      roundplayedvar = 0;
      
      startcontainer.className = "playerscontainer";

  };
  const newround = () => {
      p1array = [];
      p2array = [];
      
      gameBoard.boardclear();
      drawcombo = "";
      turnsymbol = "x";
      roundover = false;
      roundplayedvar = 0;
      
      
  };

  return {
    clicked,
    currentTurn,
    changeTurn,
    Tie,
    roundplayed,
    reset,
    newround
  };
})();
function startplay () {
gameDisplay.forEach((square) => {
    square.addEventListener("click", function () {
      gamePlay.clicked(this, square.dataset.pos);
    });
  });
};
startplay();

btnsave.addEventListener("click", function() { 
    Player1 = Player(name1.value, "x");
    Player2 = Player(name2.value, "o");
    name1display.innerHTML = name1.value + "<b> <u>;</b></u>";
    name1score.innerHTML = "0 Pts";
    name2score.innerHTML = "0 Pts";
    name2display.innerHTML = name2.value + "<b> <u>;</b></u>";
    startcontainer.className = "playerscontainer Fadeout";});

  


