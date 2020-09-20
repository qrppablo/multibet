import { Component, Input } from '@angular/core';
import { StoreService } from './store.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn: boolean;
  windowContext: any = window;
  auth: any;
  user: SocialUser;

  constructor(public store: StoreService, private authService: SocialAuthService) { }

  getBalance(): number {  // Obtiene el balance del localStorage
    if (localStorage.getItem('balance')) {
      return parseFloat(localStorage.getItem('balance'));
    } else {
      return this.store.balance;
    }
  }

  onSignInClick(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.store.cashOutButton = false;
  };

  onSignOutClick(): void {
    this.auth.signOut();
    this.store.loggedIn = false;
    this.store.cashOutButton = false;
    this.store.playerId = 'anonimo';
    this.store.balance = 1000;
    this.store.betHistory.length = 0;
    this.store.prizes.length = 0;
    this.store.bestBet = 0.00;
  };

  isSignedIn() {
    this.store.playerId = this.auth.currentUser.get().getId()
    this.store.playerName = this.auth.currentUser.get().getBasicProfile().getName();
    if (localStorage.getItem(`${this.store.playerId}&balance`)) {
      this.store.balance = parseFloat(localStorage.getItem(`${this.store.playerId}&balance`));
    }
  }

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        this.isSignedIn();
      }
      this.store.loggedIn = (user != null);
      if (!this.loggedIn) {
        this.store.playerId = 'anonimo';
        this.store.balance = 1000;
      }
    });
    
    this.windowContext.gapi.load('client:auth2', () => {
      this.windowContext.gapi.client.init({
          clientId: '743531758411-po0uuffkd5k2marfrg508itiue3ddmae.apps.googleusercontent.com',
          scope: 'email'
      }).then(() => {
          this.auth = this.windowContext.gapi.auth2.getAuthInstance();
          this.loggedIn = this.auth.isSignedIn.get();
          this.store.loggedIn = this.loggedIn;
          if (this.auth.isSignedIn.get()) {
           this.isSignedIn();
          }
      });
    });
  }

}
