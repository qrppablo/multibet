import { Component, OnInit, Input } from '@angular/core';
import { RandomService } from '../../random.service';

@Component({
  selector: 'app-fake-user',
  templateUrl: './fake-user.component.html',
  styleUrls: ['./fake-user.component.css']
})
export class FakeUserComponent implements OnInit {

  @Input() name: string;
  @Input() multi: any;
  @Input() finishedRound: any;
  @Input() newRound: any;

  fakePlayer: {[key: string]: any} = {};

  constructor(private random: RandomService) { }

  // Construye los jugadores falsos

  ngOnInit(): void { 
    this.fakePlayer.balance = this.random.number(100, 1000, 2);
    this.fakePlayer.bet = this.random.number(1, 10, 2);
    this.fakePlayer.name = this.name;
    this.fakePlayer.status = 'pending';
    this.fakePlayer.showBet = false;
  }

  // Cada resultado tendrá un estilo dependiendo de su estado

  ngOnChanges(): void {
    if (this.multi === this.fakePlayer.bet) {
      this.fakePlayer.balance = this.fakePlayer.balance * this.fakePlayer.bet;
      this.fakePlayer.status = 'winner';
      this.fakePlayer.showBet = true; 
    }
    if (this.multi < this.fakePlayer.bet && this.finishedRound) {
      this.fakePlayer.status = 'loser'; 
      this.fakePlayer.showBet = false;
    }    
    if (this.newRound) {
      this.fakePlayer.balance = this.random.number(100, 1000, 2);
      this.fakePlayer.bet = this.random.number(1, 10, 2);
      this.fakePlayer.status = 'pending'; 
      this.fakePlayer.showBet = false;
    }
  }

}
