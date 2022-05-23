import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  allCells: any[] = [];
  usedCells: number[] = [];

  gameSpeed: number = 0;
  playerScore!: number;
  computerScore!: number;
  currentCell: number = -1;

  timeOut!: any;

  loading: boolean = false;
  inGame: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
   this.loading = true;

    this.initializePlayGround();

    setTimeout(()=> {
      this.loading = false;
    }, 200);
  }

  initializePlayGround() {
    this.playerScore = 0;
    this.computerScore = 0;

    for( let i = 0; i < 100; i++) {
      let cell = { id: i, win: false, lose: false }
      this.allCells.push(cell);
    }

  }

  updateInputValue(event:any) {
    if (event.target.value < 1) {
      this.gameSpeed = 0;
      return;
    }

    this.gameSpeed = event.target.value;
  }

  cellClick ( event:any ) {
    if (event.target.getAttribute("data-cell") == this.currentCell) {
      this.allCells[this.currentCell].win = true;
      this.playerScore++;
      clearTimeout(this.timeOut);
      this.choseCell();
    }
  }

  startGame () {
    this.inGame = true;
    if (this.gameSpeed <= 0) {
      this.inGame = false;
      return;
    }

    this.choseCell();
  }

  choseCell () {

    if (this.computerScore === 10 || this.playerScore === 10) {
      this.inGame = false;
      return;
    }

    this.currentCell = this.newCellNumber(this.allCells);
    this.timeOut = setTimeout(() => {
      if (!this.allCells[this.currentCell].win) {
        this.allCells[this.currentCell].lose = true;
        this.computerScore++;
        this.currentCell = -1;
        this.choseCell();
      }
    }, this.gameSpeed)
  }

  newCellNumber(cells:any[]): number {
    let randomNumber = Math.floor(Math.random() * this.allCells.length);
    let rValue: any = this.allCells[randomNumber];
    if (!this.compareNums(this.usedCells, rValue.id)) {
      this.usedCells.push(rValue);
      console.log(rValue)
      return rValue.id;
    }
    return this.newCellNumber(cells);
  }

  compareNums(usedNums: any[], currentElement:number ) {
    for (let i = 0; i < usedNums.length; i++ ) {
      if( usedNums[i].id === currentElement ) {
        return true;
      }
    }
    return false;
  }
}
