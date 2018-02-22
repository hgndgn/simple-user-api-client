import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {User} from './../model/user';

@Injectable()
export class UserService {
  url = 'http://localhost:8080/users/';
  users: User[] = [];
  constructor(private http: Http) {
    this.getAll();
  }

  getAll() {
    return this.http.get(this.url).map(data => {
      this.users = data.json();
      return this.users;
    })
  }

  getByUsername(username: string) {
    return this.http.get(this.url + username).map(res => {
      return res;
    })
  }

  create(user: User) {
    return this.http.post(this.url, user).map(res => {
      if (res.status == 200) {
        this.users.push(user);
      } else {
        // handle error
        console.log(res);
      }
      return res;
    })
  }

  update(user: User) {
    return this.http.put(this.url + user.username, user).map(res => res);
  }

  deleteByUsername(username) {
    return this.http.delete(this.url + username).map(res => res);
  }
}