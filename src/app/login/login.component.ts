import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService, IUser } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: IUser;
  loading: boolean;
  loginError: boolean = false;
  loginErrorMessage: string = "";
  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get username(): string{return this.loginForm.get('username')?.value}
  get password(): string{return this.loginForm.get('password')?.value}

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
      this.loading = false;
      this.user = {} as IUser;
    }

  ngOnInit(): void {
  }
  
  signIn(): void {
    this.user.email = this.username;
    this.user.password = this.password;

    this.authService.signIn(this.user)
    .then(() => {
      this.router.navigate(['/profile']);
    }).catch(error => {
      this.loading = false;
      this.loginError = true;
      this.loginErrorMessage = error.toString();
    });
  }

}
