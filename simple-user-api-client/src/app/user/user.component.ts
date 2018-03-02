import 'rxjs/add/observable/of';

import {HttpErrorResponse, HttpEventType, HttpResponseBase} from '@angular/common/http';
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
    this.init(username);
  }

  init(username: string) {
    if (username == 'add-user') {
      this.header = this.createUser;
      this.isEdit = false;
    } else if (username) {
      this.userService.getByUsername(username).take(1).subscribe(res => {
        if (res instanceof HttpErrorResponse) {
          this.router.navigate(['user-not-found']);
        } else if (!res['username']) {
          this.header = this.createUser;
          this.userExistsError = true;
        } else {
          this.header = this.editUser;
          this.isEdit = true;

          let jsonUser = res;
          this.user = jsonUser;
          this.username = jsonUser.username;
          this.email = jsonUser.email;
          this.photo = jsonUser['photo'];
        }
      })
    }
  }

  onSubmit(photoInp: HTMLInputElement) {
    if (!this.username || !this.email) return;
    this.user.username = this.username;
    this.user.email = this.email;

    if (this.isEdit) {
      this.update();
    } else {
      this.create();
    }
  }

  private create() {
    this.userService.create(this.user, this.photo).take(1).subscribe(res => {
      switch (res.status) {
        case 200:
          this.action = 'created';
          this.success = true;
          this.userExistsError = false;
          this.resetForm();
          break;
        case 400:
          this.success = false;
          console.error('bad request: create(): user exists already');
          break;
        case 415:
          this.success = false;
          console.error('wrong media type: create()');
          break;
        default:
          this.success = false;
          console.error('create()', res);
          break;
      }
    })
  }

  private update() {
    this.userService.update(this.user, this.photo).subscribe(res => {
      switch (res.status) {
        case 200:
          this.action = 'edited';
          this.success = true;
          this.init(this.user.username);
          break;
        case 415:
          this.success = false;
          console.error('wrong media type: update()');
          break;
        case 500:
          this.success = false;
          console.error('internal server error: update()');
          break;
        default:
          this.success = false;
          console.error('update()', res);
          break;
      }
    })
  }

  private handleError(res: Response) {}

  onPhotoSelected(inp: HTMLInputElement) {
    this.photo = inp.files.item(0);
  }

  resetForm() {
    this.user = {} as User;
    this.username = '';
    this.email = '';
  }
}
