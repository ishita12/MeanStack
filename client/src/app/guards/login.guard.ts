import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';




@Injectable()
export class LoginGuard implements CanActivate, OnInit {

redirectUrl;
role;
user;

ngOnInit(){
  console.log('test role');

}



constructor(private authService: AuthService,
 private router: Router){
/*
this.authService.getProfile().subscribe(profile => {
  console.log('my user is  '+profile.user.role);
   this.role = profile.user.role; // Set usernam

});
*/


 }

 canActivate(
   router: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
 ) {
   // Check if user is logge din
   // Check if user is logge din



   if (this.authService.loggedIn()) {
//console.log('my user is !!!!!!!! '+user.username);
this.authService.setUser().subscribe(data => {

  this.role= data.user;
});

//this.role=this.user.role;
    console.log('your role is *******'+this.role);
     if(this.role==='admin'){
       console.log('you are an admin');
        return true;
     }
     else{
       this.router.navigate(['/profile']);
     }
     // Return true: User is allowed to view route
   } else {
     this.redirectUrl=state.url;
     console.log('state url is   '+state.url);
     this.router.navigate(['/login']); // Return error and route to login page
     return false; // Return false: user not authorized to view page
   }

 }


}
