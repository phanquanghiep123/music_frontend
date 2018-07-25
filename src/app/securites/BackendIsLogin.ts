import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Auth } from '../models/auth';
@Injectable()
export class BackendIsLogin implements CanActivate {
    constructor(private router: Router,private auth : Auth) { }
    canActivate(route: ActivatedRouteSnapshot) {
        if(this.auth.check(1)){
            this.router.navigate(['dashboard']);
            return false;
        } 
        return true;  
    }
}