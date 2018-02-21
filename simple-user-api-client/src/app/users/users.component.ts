import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {User} from './../model/user';
import {UserService} from './../service/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: User[];

  constructor(private userService: UserService) {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  onDelete(user) {
    if (confirm('Do you want to delete user ?')) {
      this.userService.delete(user);
    }
  }
}
