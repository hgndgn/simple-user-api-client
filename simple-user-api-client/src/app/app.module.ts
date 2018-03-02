import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {AppComponent} from './app.component';
import {UserService} from './service/user.service';
import {UserComponent} from './user/user.component';
import {UsersComponent} from './users/users.component';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';

@NgModule({
  declarations: [AppComponent, UserComponent, UsersComponent,
    UserNotFoundComponent
],
  imports: [
    BrowserModule, HttpModule, HttpClientModule, FormsModule, AngularFontAwesomeModule,
    RouterModule.forRoot([
      {path: 'users/:username', component: UserComponent},
      {path: 'users/add-user', component: UserComponent},
      {path: 'users', component: UsersComponent},
      {path: 'user-not-found', component: UserNotFoundComponent},
      {path: '**', redirectTo: 'users'}
    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
