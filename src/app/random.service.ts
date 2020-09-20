import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomService {

  // Devuelve un numero aleatorio entero o decimal

  number(min: number, max: number, decimalPlaces: number): number {
    let rand = Math.random() < 0.5 ? ((1 - Math.random()) * (max - min) + min) : (Math.random() * (max - min) + min);  // could be min or max or anything in between
    let power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
  }

  constructor() { }

}
