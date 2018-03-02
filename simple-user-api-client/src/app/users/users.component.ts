import 'rxjs/add/operator/take';

import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  refreshList() {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  onDelete(user) {
    if (confirm('Do you want to delete user ?')) {
      let index = this.users.indexOf(user);
      if (index === -1) {
        console.error('user not in array');
        return;
      }
      this.users.splice(index, 1);

      this.userService.deleteByUsername(user.username).subscribe(res => {
        switch (res['status']) {
          case 200:
            console.log('user deleted');
            break;
          case 400:
            console.error('bad request: delete()', res);
            this.users.splice(index, 0, user);
            break;
          default:
            break;
        }
      })
    }
  }
}
