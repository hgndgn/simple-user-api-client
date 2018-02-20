import { User } from './../model/user';
import {Component, OnInit} from '@angular/core';

import {UserService} from './../service/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users:User[];

  constructor(private userService: UserService) {
    this.users = this.userService.getAll();
  }
}
