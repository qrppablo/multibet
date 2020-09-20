import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService { 

  // Variables compartidas

  playerName: string;
  playerId: string = 'anonimo';
  balance: number = 1000;    
  cashOut: boolean = false;
  betButton: boolean = true;
  cashOutButton: boolean = false;
  newBet: boolean;
  startGame: boolean;
  playerBet: number;
  playerPrize: number;
  name: string;
  finished: boolean;
  restart: boolean;
  betHistory: any = [];
  bestBet: number = 0;
  newGame: boolean;
  newRound: boolean;
  finishedRound: boolean;
  multi: number;
  loggedIn: boolean;
  prizes: any = [0];

  constructor() { }
  
}
