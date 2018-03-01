import {Component} from '@angular/core';
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
  editUser: string = 'Edit User';
  createUser: string = 'Create User';

  user: User = {} as User;
  username: string = '';
  email: string = '';
  photo: File = null;

  header: string = '';
  action: string = '';

  isEdit: boolean = false;
  success: boolean = false;
  userExistsError: boolean = false;

  constructor(
      private userService: UserService, private route: ActivatedRoute,
      private router: Router) {
    let username = this.route.snapshot.paramMap.get('username');

    if (username == 'add-user') {
      this.header = this.createUser;
      this.isEdit = false;
    } else if (username) {
      this.userService.getByUsername(username).subscribe(res => {
        if (res['_body']) {
          this.header = this.editUser;
          this.isEdit = true;

          let jsonUser = res.json();
          this.user = jsonUser;
          this.username = jsonUser.username;
          this.email = jsonUser.email;
          this.photo = jsonUser['photo'];
        } else {
          this.header = this.createUser;
          this.userExistsError = true;
        }
      })
    }
  }

  onSubmit(photoInp: HTMLInputElement) {
    if (!this.username || !this.email) return;
    this.user.username = this.username;
    this.user.email = this.email;

    if (this.isEdit) {
      this.userService.update(this.user, this.photo).subscribe(res => {
        if (res['status'] === 200) {
          this.action = 'edited';
          this.success = true;
        } else {
          this.success = false;
          // handle error
        }
      })
    } else {
      this.userService.create(this.user, this.photo).subscribe(res => {
        if (res['status'] === 200) {
          this.action = 'created';
          this.success = true;
          this.userExistsError = false;
          this.resetForm();
        } else {
          this.success = false;
          // handle error
        }
      })
    }
  }

  onPhotoSelected(inp: HTMLInputElement) {
    this.photo = inp.files.item(0);
  }

  resetForm() {
    this.user = {} as User;
    this.username = '';
    this.email = '';
  }
}
