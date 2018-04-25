import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { JobService } from '../../../services/job.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';


@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

username;
jobApplications;
message;
messageClass;
currentUrl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private jobService: JobService,
    private router: Router,
    private location: Location,
      private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
      console.log('user role is   ' +this.username);
    });


     this.currentUrl = this.activatedRoute.snapshot.params;
   this.jobService.getApplicationsByUser(this.currentUrl.username).subscribe(data => {

console.log('inside apppliatonssssss');

     if(!data.success){
console.log('no applications found');
       this.messageClass = 'alert-alert-danger';
       this.message = data.message;

     }

      else{
        console.log('applications found    '+this.username);
       this.messageClass = 'alert-alert-success';
       this.message = data.message;

       this.jobApplications = data.application;
       if(data.application===undefined){
         console.log('sorry!!!');
       }
       else{
          console.log('test jobs are          '+data.application);
       }




      }



   });



  }

  goBack() {
    this.location.back();
  }


getJobUser(){
     this.currentUrl = this.activatedRoute.snapshot.params;
 this.jobService.getApplicationsByUser(this.currentUrl.username).subscribe(data => {

console.log('inside apppliatonssssss');
     this.jobApplications = data.application;
   });
}

  onDelete(id){

    this.jobService.deleteApplication(id).subscribe(data => {


      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to blog page
        this.getJobUser();
        setTimeout(() => {
          this.router.navigate(['/job']); // Route users to blog page
        }, 2000);
      }

    });
  }






}
