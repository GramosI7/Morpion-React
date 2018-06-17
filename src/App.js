import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      turn: "X",
      gameEnded: false,
      winner: undefined,
      board: Array(9).fill(""),
      totalMoves: 0
    }
  }


  clicked = (event) => {
    //si l'index de board est vide, rempli la avec X ou O
    if (this.state.board[event.target.dataset.square] === "") {
      //insere le turn dans le tableau de board
      this.state.board[event.target.dataset.square] = this.state.turn;
      //ecrit dans la div le state.turn
      event.target.innerText = this.state.turn;
      //change la valeur a chaque fois et met a jour le board
      this.setState({
        turn: this.state.turn === "X" ? "O" : "X",
        board: this.state.board,
        totalMoves: this.state.totalMoves++
      }, () => {
        // console.log(this.state.board)
      })
    }
    var result = this.checkWinner();
    //si le tab renvoyé est 3 x "X"
    if (result === "X") {
      this.setState({
        gameEnded: true,
        winner: "X"
      }, () => {
        console.log(this.state.winner)
      })

      //si le tab renvoyé est 3 x "X"
    } else if (result === "O") {
      this.setState({
        gameEnded: true,
        winner: "O"
      }, () => {
        console.log(this.state.winner)
      })

    }
    // console.log(this.state.gameEnded)
  }

  checkWinner = () => {
    //toutes les combinaisons win
    const moves = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6], [0, 1, 2], [3, 4, 5], [6, 7, 8]];
    var board = this.state.board;
    //boucle de moves = combinaisons win
    for (let i = 0; i < moves.length; i++) {
      //si un des tableau on trois fois la meme valeur alors return le tableau avec la combinaison win
      if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]) {
        return board[moves[i][0]];
        // console.log("board", board[moves[i][0]])
      }
    }
  }

  render() {
    return (
      <div id="game">
        <div id="head">
          <h1>Morpion</h1>
        </div>
        <div id="board" onClick={(e) => this.clicked(e)}>
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
        <h2>Le gagnant est {this.state.winner}</h2>
      </div>
    );
  }
}

export default App;
