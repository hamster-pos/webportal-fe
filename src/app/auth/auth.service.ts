import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
    constructor() { }
    // ...
    public isAuthenticated() {
        console.log('AuthGuard');
        const user = localStorage.getItem('currentUser');

        if (user) {
            return true;
        }
        else {
            return false;
        }
    }
}