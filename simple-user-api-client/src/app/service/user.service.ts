import {Injectable, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {User} from './../model/user';

@Injectable()
export class UserService {
  url = 'http://localhost:8080/users';
  users: User[];
  constructor(private http: Http) {
    this.http.get(this.url).subscribe(data => {
      this.users = data.json();
      console.log(this.users);
    })
  }

  getAll() {
    return this.users;
  }
}