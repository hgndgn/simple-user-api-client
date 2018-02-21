import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

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

  get(username: string) {
    return this.http.get(this.url + username).map(user => {
      return (user.json() as User);
    })
  }

  create(user: User) {
    this.http.post(this.url, user).take(1).subscribe(res => console.log(res));
  }

  update(user: User) {
    this.http.put(this.url + user.username, user)
        .take(1)
        .subscribe(res => console.log(res));
  }

  delete(username: string) {
    this.http.delete(this.url + username)
        .take(1)
        .subscribe(res => console.log(res));
  }
}