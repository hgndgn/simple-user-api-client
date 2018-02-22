import {Location} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {User} from '../model/user';

import {UserService} from './../service/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: User = {} as User;
  username: string = '';
  email: string = '';
  header: string = '';
  action: string = '';
  isEdit: boolean;
  success: boolean;
  error: boolean;

  constructor(
      private userService: UserService, private route: ActivatedRoute,
      private router: Router, private location: Location) {
    let username = this.route.snapshot.paramMap.get('username');

    if (username == 'create-user') {
      this.header = 'Create User';
      this.isEdit = false;
    } else if (username) {
      this.userService.getByUsername(username).subscribe(res => {
        if (res['_body']) {
          this.header = 'Edit User';
          this.isEdit = true;

          let tmpUser = res.json();
          this.user = tmpUser;
          this.username = tmpUser.username;
          this.email = tmpUser.email;
        } else {
          this.header = 'Create User';
          this.error = true;
        }
      })
    }
  }

  onSubmit() {
    if (!this.username || !this.email) return;
    this.user.username = this.username;
    this.user.email = this.email;

    if (this.isEdit) {
      this.userService.update(this.user).take(1).subscribe(res => {
        if (res.status === 200) {
          this.action = 'updated';
          this.success = true;
          this.updateURL(this.username);
        } else {
          this.success = false;
          // handle error
        }
      })
    } else {
      this.userService.create(this.user).take(1).subscribe(res => {
        if (res.status === 200) {
          this.action = 'created';
          this.success = true;
          this.error = false;
          this.resetForm();
        } else {
          this.success = false;
          // handle error
        }
      })
    }
  }

  resetForm() {
    this.user = {} as User;
    this.username = '';
    this.email = '';
  }

  updateURL(url:string) {
    this.location.go('/users/' + this.username);
  }
}
