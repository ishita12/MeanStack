import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = '';
  email = '';
  role='';
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    this.authService.getProfile().subscribe(profile => {
    //  console.log('user role is  '+profile.user.role);
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
      this.role = profile.user.role;
    });
  }

}
