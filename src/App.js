import React, { Component } from 'react';
import './style/App.css';
import Title from "./Title";
import Square from "./Square";
import Button from "./Button";
import Resultat from "./Resultat";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      turn: "X",
      winner: "",
      board: Array(9).fill(""),
      count: 0,
      gameEnd: false,
      myTurn: false
    }
  }

  clicked = (event) => {
    if (this.state.winner !== "" || this.state.myTurn) return;
    if (this.state.board[event.dataset.square] === "") {
      this.state.board[event.dataset.square] = this.state.turn;
      event.innerText = this.state.turn;
      this.setState({
        turn: this.state.turn === "X" ? "O" : "X",
        count: this.state.count + 1,
      }, () => {
        console.log(this.state.myTurn)
        const winner = this.decideWinner();
        if (winner === "X") {
          this.setState({
            winner: "Ta gagné !",
            gameEnd: true,
          })
        } else if (winner === "O") {
          this.setState({
            winner: "Ta perdu !",
            littlePhrase: "La honte ...  T'as perdu contre une IA",
            gameEnd: true
          })
        } else if (this.state.count === 9) {
          this.setState({
            winner: "Egalité !",
            gameEnd: true
          })
        } else if (this.state.turn === "O" && !this.state.gameEnd) {
          this.setState({
            myTurn: true
          }, () => {
            setTimeout(() => {
              do {
                var random = Math.floor(Math.random() * 9);
              } while (this.state.board[random] !== "");
              this.setState({
                myTurn: false
              })
              this.clicked(document.querySelectorAll(".square")[random])
            }, 700)
          })
        }
      })
    }
  }

  decideWinner = () => {
    const moves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];
    let board = this.state.board;
    for (let i = 0; i < moves.length; i++) {
      if (board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]) {
        console.log(board[moves[i][2]])
        return board[moves[i][1]]
      }
    }
  }

  reset = () => {
    window.location.reload();
  }

  render() {
    return (
      <div id="game">
        <Title />
        <Square clicked={(e) => this.clicked(e.target)}/>
        <Button reset={this.reset} />
        <Resultat winner={this.state.winner} little={this.state.littlePhrase}/>
      </div>
    );
  }
}

export default App;
