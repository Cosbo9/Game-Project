export class Game {
  board: string[][] = [
    [],
    [],
    [],
    [],
    [],
    []
  ];

  movesString: string;

  /**
   * @param movesString A string of concatenated colors and column number seperated by commas i.e. black1,#36d1bc6
   */
  constructor(movesString: string) {
    this.movesString = movesString;
    var sidewaysBoard: string[][] = [
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];
    var movesArray = movesString.split(',')
    movesArray.forEach(
      move => {
        var color: string = move.slice(0, -1);
        var column = Number(move.slice(-1))
        sidewaysBoard[column].push(color)
      }
    )

    sidewaysBoard.forEach(
      (column) => {
        if (column.length < 6) {
          for (let i = column.length; i < 6; i++) {
            column.push('')
          }
        }
        column.forEach((token, row) => {
          this.board[5 - row].push(token)
        })
      }
    )
  }
}
