import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private authService: AuthService,
   private router: Router
 ) {}

 canActivate(
   router: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
 ) {
   // Check if user is logge din
   if (this.authService.loggedIn()) {
     this.router.navigate(['/login']); // Return error and route to login page
     return false; // Return false: user not authorized to view page
  } else {
        return true; // Return false: user not authorized to view page
   }
 }

}
