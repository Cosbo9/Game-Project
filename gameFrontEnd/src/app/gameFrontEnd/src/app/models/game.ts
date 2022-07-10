import { BehaviorSubject } from "rxjs";

export class Game {
  board: string[][] = [
    [],
    [],
    [],
    [],
    [],
    []
  ];


  private _movesString: BehaviorSubject<string>;

  moveStringObservable(){return this._movesString.asObservable}

  public get movesString(){return this._movesString.value}
  public set movesString(string: string){
    console.log("movestring updated: " +string)
    this._movesString.next(string)}


  /**
   * @param movesString A string of concatenated colors and column number seperated by commas i.e. black1,#36d1bc6
   */
  constructor(movesString: string) {
    this._movesString = new BehaviorSubject(movesString);
    this._movesString.subscribe((movesString) =>{
      console.log("movestring observable updated")
      this.updateGameBoard(movesString)
    })

  }

  private updateGameBoard(movesString: string){
    console.log(movesString)
    var newBoard: string[][] = [
      [],
      [],
      [],
      [],
      [],
      []
    ];;
    var sidewaysBoard: string[][] = [
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ];
    var movesArray = movesString?.split(',')
    movesArray?.forEach(
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
          if (token == "h"){
            token = "red"
          }
          else if (token == "j"){
            token = "black"
          }
          newBoard[5 - row].push(token)
        })
      }
    )
    this.board = newBoard
  }

}
