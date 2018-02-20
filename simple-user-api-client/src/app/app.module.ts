import { UserService } from './service/user.service';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [AppComponent,
    UserComponent,
    UsersComponent
],
  imports: [BrowserModule, HttpModule],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
