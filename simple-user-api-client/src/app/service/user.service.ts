import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {Injectable, OnInit} from '@angular/core';
import {Http} from '@angular/http';

import {User} from './../model/user';

@Injectable()
export class UserService implements OnInit {
  url = 'http://localhost:8080/users/';
  users: User[];
  constructor(private http: Http) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    return this.http.get(this.url).map(data => {
      this.users = data.json();
      return this.users;
    })
  }

  getByUsername(username: string) {
    return this.http.get(this.url + username).map(user => {
      return (user.json() as User);
    })
  }

  create(user: User) {
    this.http.post(this.url, user).take(1).subscribe(res => {
      if (res.status == 200) {
        this.users.push(user);
      };
    })
  }

  update(user: User) {
    this.http.put(this.url + user.username, user)
        .take(1)
        .subscribe(res => console.log(res));
  }

  delete(user) {
    this.http.delete(this.url + JSON.stringify(user.id)).take(1).subscribe(res => {
      console.log(res);
    })
  }

  deleteByUsername(username) {
    this.http
        .delete(
            'http://localhost:8080/users' +
            '?username=' + username)
        .take(1)
        .subscribe(res => console.log(res));
  }
}