import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.55 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    //classic way of 2d array
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {

        row.push(Math.random() < chanceLightStartsOn);

      }
      initialBoard.push(row)
    }
    ;
    console.log(initialBoard);

    return initialBoard;
  }

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [i, j] = coord.split("-").map(Number);

      const flipCell = (i, j, boardCopy) => {
        // if this coord is actually on board, flip it

        if (j >= 0 && j < ncols && i >= 0 && i < nrows) {
          boardCopy[i][j] = !boardCopy[i][j];
        }
      };

      const boardCopy = oldBoard.map(row => [...row])
      // TODO: Make a (deep) copy of the oldBoard
      flipCell(i, j, boardCopy);
      flipCell(i, j - 1, boardCopy);
      flipCell(i, j + 1, boardCopy);
      flipCell(i - 1, j, boardCopy);
      flipCell(i + 1, j, boardCopy);
      // TODO: in the copy, flip this cell and the cells around it
      return boardCopy;
      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // make table board
  let tableBoard = [];

  for (let i = 0; i < nrows; i++) {
    let row = [];
    for (let j = 0; j < ncols; j++) {
      let coord = `${i}-${j}`;
      row.push(<Cell
        key={coord}
        isLit={board[i][j]}
        flipCellsAroundMe={() => flipCellsAround(coord)} />);
    }
    tableBoard.push(<tr key={i}>{row}</tr>)
  }


  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>

  );
}

export default Board;
