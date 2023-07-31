import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title: string = 'GigLocal';
  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.isAuthenticated = false;
  }

/*
  public ngOnInit(): void {
    this.authService.isAuthenticated()
    .then((success: boolean) => {
      this.isAuthenticated = success;
    });
  }
*/

  public signOut(): void {
    this.authService.signOut()
    .then(() => {
      this.router.navigate(['']);
    })
  }
}