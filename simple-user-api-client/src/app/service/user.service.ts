import 'rxjs/add/operator/map';

import {Injectable, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {User} from './../model/user';

@Injectable()
export class UserService {
  url = 'http://localhost:8080/users/';
  users: User[];
  constructor(private http: Http) {}

  getAll() {
    return this.http.get(this.url).map(data => {
      this.users = data.json();
      return this.users;
    })
  }

  get(username:string) {
    return this.http.get(this.url + username).map(user => {
      return (user.json() as User);
    })
  }
}