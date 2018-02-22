import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';

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
  }

  ngOnInit() {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  refreshList() {
    this.userService.getAll().subscribe(users => this.users = users);    
  }

  onDelete(user) {
    if (confirm('Do you want to delete user ?')) {
      let index = this.users.indexOf(user);
      this.users.splice(index, 1);

      this.userService.deleteByUsername(user.username)
      .take(1).subscribe(res => {
        if (res.status !== 200) {
          this.users.splice(index, 0, user);
        };
      })
    }
  }
}
