import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {UserService} from './service/user.service';
import {UserComponent} from './user/user.component';
import {UsersComponent} from './users/users.component';


@NgModule({
  declarations: [AppComponent, UserComponent, UsersComponent],
  imports: [
    BrowserModule, HttpModule, FormsModule, RouterModule.forRoot([
      {path: 'users/:username', component: UserComponent},
      {path: 'users', component: UsersComponent},
      {path: '**', redirectTo: 'users'}
    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
