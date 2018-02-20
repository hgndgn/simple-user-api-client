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
  user$: Observable<User>;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    let username = this.route.snapshot.paramMap.get('username');
    if (username) this.user$ = this.userService.get(username);
  }
}
