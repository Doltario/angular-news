import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor} from './interceptors/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BemonadFooterComponent } from './components/bemonad-footer/bemonad-footer.component';
import { NavComponent } from './components/nav/nav.component';

import { UserService } from './services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    BemonadFooterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
    AppRoutingModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private userService: UserService) {
    if (this.userService.isAuthenticated()) {
      this.userService.getUser(tokenGetter());
    }
  }
}
