const gameDisplay = document.querySelectorAll(".theboard");
var currentPlayer;
var currentTurn = "x";


const gameBoard = (() => {
    let board = [
        '','','',
        '','','',
        '','',''];
    const render = () => {
        gameDisplay.forEach(square => {
            let rz = square.dataset.pos;
            square.innerHTML = gameBoard.board[rz];
            
        });
        


    };
    return {
        board,render,
    };

})();
const gamePlay = (() => {

    const clicked = (el,position) => {
        if (!el.innerHTML) { 
            el.innerHTML = currentTurn;
        }
        
    };
    return {
        clicked
    };

})();

gameDisplay.forEach(square => { 
    square.addEventListener('click', function() {

        gamePlay.clicked(this,square.dataset.pos);
    });
});
const Player = (name) => {
    getName = () => name;

    return {getName};
};
gameBoard.board = [ "o", "x", "o", "x", "o", "x", "o", "x", "o" ];