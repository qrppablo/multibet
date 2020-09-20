import { Component, OnInit } from '@angular/core';
import { RandomService } from '../random.service';
import { UsersService } from '../users.service';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  users: any = [];

  constructor(private random: RandomService, private fakeUsers: UsersService, public store: StoreService) { }

  ngOnInit(): void {
    this.fakeUsers.getNames().subscribe((response: string) => {
      this.users = response;
      this.users.length = 6; // Cantidad de jugadores a mostrar en la lista
    });
  }

}
