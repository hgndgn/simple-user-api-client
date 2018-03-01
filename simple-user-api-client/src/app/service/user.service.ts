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
    return this.http.get(this.url + username).map(res => res);
  }

  createFormData(user: User) {
    let formData = new FormData();
    formData.append('jsonUser', JSON.stringify(user));
    return formData;
  }

  create(user: User, photo?: File) {
    let formData = this.createFormData(user);
    if (photo) formData.append('file', photo);
    return this.http.post(this.url + 'add-user', formData).map(res => res);
  }

  update(user: User, photo?: File) {
    let formData = this.createFormData(user);
    if (photo) formData.append('file', photo);
    return this.http.put(this.url + user.username, formData).map(res => res);
  }

  deleteByUsername(username) {
    return this.http.delete(this.url + username).map(res => res);
  }
}