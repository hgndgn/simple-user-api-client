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
  header: string;
  isEdit: boolean;

  constructor(
      private userService: UserService, private route: ActivatedRoute,
      private router: Router) {
    let username = this.route.snapshot.paramMap.get('username');
    if (username == 'create-user') {
      this.header = 'Create User';
      this.isEdit = false;
    } else if (username) {
      this.header = 'Edit User';
      this.isEdit = true;
      this.userService.getByUsername(username).subscribe(user => {
        this.user = user;
        this.username = user.username;
        this.email = user.email;
      })
    }
  }

  onSubmit() {
    if (!this.username || !this.email) return;
    this.user.username = this.username;
    this.user.email = this.email;

    if (this.isEdit)
      this.userService.update(this.user);
    else
      this.userService.create(this.user);

    this.router.navigate(['/users']);
  }
}
