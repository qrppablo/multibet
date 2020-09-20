import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-form-bet',
  templateUrl: './form-bet.component.html',
  styleUrls: ['./form-bet.component.css']
})
export class FormBetComponent implements OnInit {

  @Output() playerName = new EventEmitter<any>();
  @Output() playerBet = new EventEmitter<any>();

  betForm = new FormGroup({
    name: new FormControl('Anónimo', [
      Validators.required
    ]),
    bet: new FormControl('50', [
      Validators.required,
      Validators.pattern(/^[1-9][0-9]{0,2}(?:\.[0-9]{1,2})?$|^1000(?:\.00?)?$/)
    ])
  });

  constructor(public store: StoreService) { }

  cashOut() {
    this.store.cashOut = true; 
    this.store.cashOutButton = false;
  }

  ngOnInit(): void {
  }

  onSubmit(e: Event) {
    e.preventDefault();
    this.store.playerBet = parseFloat(this.betForm.get('bet').value);
    this.store.betButton = false;
    this.store.newBet = true;
    this.store.newGame = true;
    localStorage.setItem(`${this.store.playerId}&balance`, this.store.balance.toString());
  }

}
