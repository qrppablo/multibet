import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  getNames() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
    .pipe(
      map((users: any) => {
        return users.map(user => { 
          return {
            name: user.name
          }
        })
      })
    );
  }

}