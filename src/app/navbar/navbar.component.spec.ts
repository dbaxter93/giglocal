import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let loginObservable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'signOut']);
    authServiceSpy.isAuthenticated.and.returnValue(loginObservable);
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    loginObservable.next(false);
  })

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('login link should change to logout when a user logs in, and change back to login after selecting "logout"', async() => {
    loginObservable.next(true);
    await fixture.whenStable(); // async operation subscription broadcast
    fixture.detectChanges(); // it's the change of ngIf that we're detecting here
    let logout = fixture.nativeElement.querySelector('[data-test-id="logout"]');

    expect(logout).toBeTruthy();
    expect(logout.textContent).toEqual("Sign Out");

    // logout
    logout.dispatchEvent(new Event('click'));
    loginObservable.next(false);
    await fixture.whenStable(); // async operation subscription broadcast
    fixture.detectChanges(); // it's the change of ngIf that we're detecting here

    // try to access links again
    logout = fixture.nativeElement.querySelector('[data-test-id="logout"]');

    expect(authServiceSpy.signOut).toHaveBeenCalled();
    expect(logout).toBeFalsy();
  });

  it('should have pointer cursor image on all links', () => {
    const links = fixture.debugElement.query(By.css(".nav-link")).nativeElement;
    expect(getComputedStyle(links).cursor).toEqual('pointer');
  });

});
