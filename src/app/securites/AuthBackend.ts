import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from '../models/auth';
@Injectable()
export class AuthBackend implements CanActivate {
    constructor(private router: Router,private auth : Auth) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // not logged in so redirect to login page with the return url
        if(!this.auth.check(1)){
            this.router.navigate(['login']);
            return false;
        } 
        return true;  
    }
}