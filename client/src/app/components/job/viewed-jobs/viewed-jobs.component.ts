import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { JobService } from '../../../services/job.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-viewed-jobs',
  templateUrl: './viewed-jobs.component.html',
  styleUrls: ['./viewed-jobs.component.css']
})
export class ViewedJobsComponent implements OnInit {


username;
currentUrl;
message;
messageClass;
myViewJobs;
mvj;

  constructor(


    private authService: AuthService,
    private jobService: JobService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute


  ) { }

  ngOnInit() {


        this.authService.getProfile().subscribe(profile => {
          this.username = profile.user.username; // Used when creating new blog posts and comments
          console.log('user role is   ' +profile.user.username);



        });
   this.currentUrl = this.activatedRoute.snapshot.params;

        this.jobService.getSavedJobs(this.currentUrl.username).subscribe(data => {

          if(!data.success){
         console.log('no view found');
            this.messageClass = 'alert-alert-danger';
            this.message = 'No view Jobs found';

          } else {


console.log('view !!!!!!!!!!!!!!!!!!!!');
     this.myViewJobs=data.myViewJobs;

     for(var key in data.myViewJobs) {
     console.log('value of key is !!!!!!!!!!!!!'+key);
             var value = data.myViewJobs[key];
             //do something with value;

             console.log('job id for the jobs that have been viewed !!!!!!!!!'+value.jobID);
            this.myViewJobs[key]=value.jobID;
            console.log('viewed  job ids are  ****************'+ this.myViewJobs[key]);
     }


this.myViewJobs = data.myViewJobs;
console.log('this.myViewJobs    '+data.myViewJobs);

          }

     this.test(this.myViewJobs);

        });



  }



  test(vjobs){

            this.jobService.getViewedJobs(vjobs).subscribe(data => {

              if(!data.success){
              console.log('no view found');
                this.messageClass = 'alert-alert-danger';
                this.message = 'No view Jobs found';

              } else {


       this.mvj=data.jobs;

              }


            });


  }



    goBack() {
      this.location.back();
    }


}
