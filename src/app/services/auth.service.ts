import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';

import { environment } from 'src/environments/environment';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    Amplify.configure({
      Auth: environment.cognito
    });
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      this.authSubject.next(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authSubject.next(false);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return from(Auth.currentUserInfo().then(
      user => {
        if(user){
          return this.authSubject.value;
        } else {
          return this.authSubject.value;
        }
      }
    ));
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public getUserRoles() {
    Auth.currentAuthenticatedUser({ bypassCache: true });
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    })
  }

}
