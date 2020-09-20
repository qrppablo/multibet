
import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { timer } from 'rxjs';
import { RandomService } from '../random.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-game-chart',
  templateUrl: './game-chart.component.html',
  styleUrls: ['./game-chart.component.css']
})
export class GameChartComponent implements OnInit {

  @Input() newGame: boolean;

  boom: number;
  maxY: number = 5;
  rxTimer: any;
  interval: any;
  intervalBet: any;
  betTime: boolean = false;
  timeIsUp: boolean = false;
  counter: number = 1.0;
  seconds: number = 0;
  tick: number = 0;
  ticks: number = this.random.number(1, 5, 0);
  speed: number;
  gameChartOptions: {};
  player: { [key: string]: any } = {};
  result: number;
  results: any = [];
  winner: boolean;
  prize: number = 0;
  prizes: any = [0];
  date: number;

  constructor(private random: RandomService, public store: StoreService) { }

  // Settings del grafico

  setCharOptions(maxY: number) {

    this.gameChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 1
        }
      },
      animation: {
        duration: 0
      },
      hover: {
        animationDuration: 0, 
      },
      responsiveAnimationDuration: 0, 
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            min: 1,
            max: maxY,
            callback: (value: string) => `${value}x`,
          }
        }]
      }
    };
  }

  gameChartData: ChartDataSets[] = [
    { data: [this.counter] },
  ];

  gameChartLabels: Label[] = [`${this.seconds}s`];

  gameChartColors: Color[] = [
    {
      borderColor: 'rgb(59, 59, 59)',
      backgroundColor: 'transparent',
    },
  ];

  gameChartPlugins = [];
  gameChartType = 'line';
  
  startGame(): void {  // Comienza el juego
    
    this.betTime = false;

    // Graba los datos en localStorage

    localStorage.setItem(`${this.store.playerId}&balance`, this.store.balance.toString());

    this.store.startGame = true;

    this.date = Date.now();

    this.player.money = this.store.balance;

    this.store.betButton = false;

    this.store.cashOut = false;

    // Si el usuario ha comenzado una nueva apuesta, se habilita el boton de cobrar

    this.store.newBet ? this.store.cashOutButton = true : this.store.cashOutButton = false;
    
    this.counter = 1.0;

    // Se obtiene un numero aleatorio que indica cuando estalla la curva

    this.boom = this.random.number(1, 10, 2);

    this.winner = false;

    this.gameChartColors = [{ borderColor: 'rgb(59, 59, 59)' }];
    this.gameChartLabels = [`${this.seconds}s`];
    this.gameChartData[0].data = [this.counter];

    this.store.finishedRound = false;

    this.startRxTimer();
    this.startInterval();

  }

  startRxTimer(): void {
    this.rxTimer = timer(1000, 1000)
      .subscribe(val => {
        // console.log(val);
        // El limite de tiempo de tiempo de la partida es de 30 segundos
        if (val === 29) {   
          this.timeIsUp = true;
        }
        this.gameChartLabels.push(`${val + 1}s`);
        this.gameChartData[0].data.push(this.counter);
      });
    }

  startInterval(): void {

    this.store.newRound = false;

    this.interval = setInterval(() => {

    this.tick++;

      if (this.tick > this.ticks) {

        this.tick = 0;
        clearInterval(this.interval);

        // Velocidad aleatoria de la curva

        this.speed = this.random.number(10, 100, 0);  
        this.ticks = this.random.number(10, 100, 0);

        this.startInterval();

      }

      if (this.counter < 10) {  // Si el multiplicador no supera los 10x

        this.counter = parseFloat((this.counter + 0.01).toFixed(2));  // Aumenta en pasos de 0.01x

        this.store.multi = this.counter;

        // Si se llega al limite superior del grafico, se escala

        if (this.counter === this.maxY) {   
          this.setCharOptions(this.maxY = this.maxY * 2);
        }

        if (this.store.cashOut) { // El jugador gana la partida

          this.winner = true;

          this.prize = parseFloat((this.store.playerBet * this.counter).toFixed(2)); 

          this.store.prizes.push(this.prize); // Se agrega al historial de apuestas ganadas

          this.player.money = parseFloat((this.player.money + this.prize).toFixed(2));

          this.store.balance = this.player.money; // Se actualiza el balance

          this.store.bestBet = Math.max(...this.store.prizes);  // Obtiene el valor de la apuesta mejor pagada

          this.store.cashOut = false;

          // Se añade un registro al historial de apuestas

          this.store.betHistory.push({ 
              hour: this.date, 
              value: this.store.playerBet, 
              multi: this.counter.toFixed(2), 
              result: `+ $${this.prize.toFixed(2)}`, 
              balance: this.player.money, 
              class: this.winner ? 'success' : 'danger' 
          });

        }

        if (this.counter === this.boom || this.timeIsUp) { 

          if (this.store.newBet && !this.winner) {  // El jugador pierde la partida
            
            // Se añade un registro al historial de apuestas

            this.player.money = parseFloat((this.player.money - this.store.playerBet).toFixed(2));
            this.store.betHistory.push({ 
                hour: this.date, 
                value: this.store.playerBet, 
                multi: this.counter, 
                result: `- $${(this.store.balance - this.player.money).toFixed(2)}`, 
                balance: this.player.money, 
                class: this.winner ? 'success' : 'danger' 
            });
            this.store.balance = this.player.money; // Se actualiza el balance
          }

          this.result = this.counter;
          this.timeIsUp = false;
          this.rxTimer.unsubscribe(); 
          this.gameOver();

        }

      } else {

        this.rxTimer.unsubscribe(); 
        this.gameOver();

      }

      // Graba los datos en localStorage

      localStorage.setItem(`${this.store.playerId}&balance`, this.store.balance.toString());

    }, this.speed)
  }

  gameOver(): void {  // Fin de la partida

    this.store.cashOutButton = false;

    this.store.newBet = false;
    
    clearInterval(this.interval);

    this.gameChartColors = [{ borderColor: 'red' }];

    this.store.finishedRound = true;

    // Mantiene el historial con los ultimos 11 multiplicadores

    if (this.results.length > 10) {
      this.results.splice(0, 1);
    } 
    
    // Agrega el multiplicador al historial

    this.results.push(this.result);

    this.startIntervalBet();

  }

  startIntervalBet(): void { // Conteo de 5 segundos para realizar apuesta

    this.betTime = true;

    this.counter = 5;

    this.store.betButton = true;

    this.intervalBet = setInterval(() => {

      if (this.counter < 0.05) {
        this.store.newRound = true;
      }

      if (this.counter > 0) {

        this.counter = parseFloat((this.counter - 0.01).toFixed(2));

      } else {

        clearInterval(this.intervalBet);
        
        this.startGame();
        
      }

    }, 10)
  }

  ngOnInit(): void {  // Inicia el grafico
    this.setCharOptions(this.maxY);
  }

  ngOnChanges(): void { // Inicia nueva partida
    if (this.newGame) {
      this.startGame();
      this.newGame = false;
    }
  }

}
