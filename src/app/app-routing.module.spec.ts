import { routes } from './app-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';

describe('app-routing.module', () => {
    
    it('should have a route for login', () => {
        let loginRoute = routes.find(route => route.path == 'login');
        expect(loginRoute).toBeTruthy();
        expect(loginRoute?.component).toEqual(LoginComponent);
    })

    it('should have a route for search', () => {
        let searchRoute = routes.find(route => route.path == 'search');
        expect(searchRoute).toBeTruthy();
        expect(searchRoute?.component).toEqual(SearchComponent);
    })

    it('should have a route for create-account', () => {
        let createAccountRoute = routes.find(route => route.path == 'create-account');
        expect(createAccountRoute).toBeTruthy();
        expect(createAccountRoute?.component).toEqual(CreateAccountComponent);
    })
});