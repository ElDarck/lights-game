import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  allCells: any[] = [];
  usedCells: number[] = [];

  gameSpeed!: number;
  playerScore!: number;
  computerScore!: number;
  currentCell!: number;

  timeOut!: any;

  loading: boolean = false;
  inGame: boolean = false;
  win: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
   this.loading = true;

    this.initializePlayGround();

    setTimeout(()=> {
      this.loading = false;
    }, 200);
  }

  /*Начальные параметры*/
  initializePlayGround() {
    this.win = false;
    this.playerScore = 0;
    this.computerScore = 0;

    this.allCells = [];
    this.usedCells = [];
    this.gameSpeed = 0;
    this.currentCell = -1;

    for( let i = 0; i < 100; i++) {
      let cell = { id: i, win: false, lose: false }
      this.allCells.push(cell);
    }
  }

  /*Начало игры*/
  startGame () {
    this.inGame = true;
    if (this.gameSpeed <= 0) {
      this.inGame = false;
      return;
    }

    this.choseCell();
  }

  /*Выбор клетки*/
  choseCell () {
    if (this.computerScore === 10 || this.playerScore === 10) {
      this.inGame = false;
      this.win = true;
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

  /*Генератор не повторяющихся чисел*/
  newCellNumber(cells:any[]): number {
    let randomNumber = Math.floor(Math.random() * this.allCells.length);

    let rValue: any = this.allCells[randomNumber];

    if (!this.compareNums(this.usedCells, rValue.id)) {
      this.usedCells.push(rValue);

      return rValue.id;
    }
    return this.newCellNumber(cells);
  }
  /*Сравнение повторяющихся чисел*/
  compareNums(usedNums: any[], currentElement:number ) {
    for (let i = 0; i < usedNums.length; i++ ) {
      if( usedNums[i].id === currentElement ) {
        return true;
      }
    }

    return false;
  }

  /*Задать значение времени*/
  updateInputValue(event:any) {
    if (event.target.value < 1) {
      this.gameSpeed = 0;
      return;
    }

    this.gameSpeed = event.target.value;
  }

  /*Выбор клетки*/
  cellClick ( event:any ) {
    if (event.target.getAttribute("data-cell") == this.currentCell) {
      this.allCells[this.currentCell].win = true;
      this.playerScore++;
      clearTimeout(this.timeOut);
      this.choseCell();
    }
  }

  /*Рестарт игры*/
  restart() {
    this.initializePlayGround();
  }
}
