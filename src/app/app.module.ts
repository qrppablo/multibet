import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { GameChartComponent } from './game-chart/game-chart.component';
import { ChartsModule } from 'ng2-charts';
import { FakeUserComponent } from './players-list/fake-user/fake-user.component';
import { InputComponent } from './input/input.component';
import { FormBetComponent } from './form-bet/form-bet.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { PlayersListComponent } from './players-list/players-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GameChartComponent,
    InputComponent,
    FakeUserComponent,
    FormBetComponent,
    BetHistoryComponent,
    PlayersListComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '743531758411-po0uuffkd5k2marfrg508itiue3ddmae.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
