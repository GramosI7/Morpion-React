import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      winner: undefined,
    };
    this.gameState = {
      turn: "X",
      gameEnded: false,
      gameLocked: false,
      board: Array(9).fill(""),
      totalMoves: 0,
      titlePhrase: "",
    }
  }

  gameStateOrigin = this.gameState;

  clicked = (event) => {


    //stop l'ecriture apres victoire
    //si false impossible d'aller plus loin dans la function
    if (this.gameState.gameEnded || this.gameState.gameLocked) return;
    //si l'index de board est vide, rempli la avec X ou O
    if (this.gameState.board[event.dataset.square] === "") {
      //insere le turn dans le tableau de board
      this.gameState.board[event.dataset.square] = this.gameState.turn;
      //ecrit dans la div le state.turn
      event.innerText = this.gameState.turn;
      //change la valeur a chaque fois et met a jour le board
      this.gameState.turn = this.gameState.turn === "X" ? "O" : "X",
        this.gameState.totalMoves++;
      console.log(this.gameState)
    }
    var result = this.checkWinner();
    //si le tab renvoyé est 3 x "X"
    if (result === "X") {
      this.gameState.gameEnded = true;
      this.setState({
        winner: "X",
        htmlWinner: "Bien joué !"
      })

      //si le tab renvoyé est 3 x "X"
    } else if (result === "O") {
      this.gameState.gameEnded = true;

      this.setState({
        winner: "O",
        htmlWinner: "Ta perdu ...",
        littlePhrase: "La honte ...  T'as perdu contre une IA"
      })
    } else if (result === "Draw") {
      this.gameState.gameEnded = true;

      this.setState({
        winner: "Draw",
        htmlWinner: "Egalité !"
      })
      // console.log(this.state.gameEnded)
    }
    //si c'est au tour de "O" et que la partie n'est pas fini
    if (this.gameState.turn === "O" && !this.gameState.gameEnded) {
      this.gameState.gameLocked = true;
      //attend 1seconde
      setTimeout(() => {
        //faire 
        do {
          //var random 
          var random = Math.floor(Math.random() * 9);
          //ecrire dans le tableau board du state 
        } while (this.gameState.board[random] !== "");
        this.gameState.gameLocked = false;
        //ajoute a la div
        this.clicked(document.querySelectorAll(".square")[random])
      }, 700);


    }
  }

  checkWinner = () => {
    //toutes les combinaisons win
    const moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    var board = this.gameState.board;
    //boucle de moves = combinaisons win
    for (let i = 0; i < moves.length; i++) {
      //si un des tableau on trois fois la meme valeur alors return le tableau avec la combinaison win
      //ex: [0,3,6] === ["X","X","X"]
      if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]) {
        return board[moves[i][0]];
        // console.log("board", board[moves[i][0]])
      }

    }
    if (this.gameState.totalMoves === 9) {
      return "Draw"
    }
  }

  reset = () => {
   window.location.reload();
  }

  render() {
    return (
      <div id="game">
        <div id="head">
          <h1>Morpion</h1>
        </div>
        <div id="board" onClick={(e) => this.clicked(e.target)}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
        <div className="status">
          <h2>{this.state.htmlWinner}</h2>
          <h2>{this.state.littlePhrase}</h2>
        </div>
        <div className="btn">
          <button onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default App;
