import { Component, OnInit } from '@angular/core';
import  {  AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


role;

  constructor(private authService: AuthService, private router: Router) {


  }
//, private flashMessagesService: FlashMessagesService
  ngOnInit() {
    console.log('inside nav');
if(this.authService.loggedIn()){
this.authService.getProfile().subscribe(data => {

this.role=data.user.role;
console.log('inside nav  '+this.role);

});

}
  }

  onLogOut(){
    this.authService.logout();
  //  this.flashMessagesService.show('you are logged out', {cssClass: 'alert-info'});
    this.router.navigate(['/']);
  }

}
