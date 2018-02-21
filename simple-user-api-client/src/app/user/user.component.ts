import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {User} from '../model/user';

import {UserService} from './../service/user.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: User;
  username:string = '';
  email:string = '';

  constructor(private userService: UserService, private route: ActivatedRoute) {
    let username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.userService.get(username).subscribe(user => {
        this.user = user;
        this.username = user.username;
        this.email = user.email;
      })
    }
  }

  onSubmit() {
    this.user.username = this.username;
    this.user.email = this.email;
    this.userService.update(this.user);
  }
}
