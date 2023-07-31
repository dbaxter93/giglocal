import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  ngOnInit(): void {
  }

  public signUp(): void {
    this.loading = true;
    this.authService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch(() => {
      this.loading = false;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.authService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/login']);
    }).catch(() => {
      this.loading = false;
    });
  }

}
