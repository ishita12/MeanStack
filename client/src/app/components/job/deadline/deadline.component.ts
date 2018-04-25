import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { JobService } from '../../../services/job.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-deadline',
  templateUrl: './deadline.component.html',
  styleUrls: ['./deadline.component.css']
})
export class DeadlineComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private jobService: JobService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute



  ) { }

  ngOnInit() {
  }

/*
  deadlineJobsToday(){
console.log('inside deadlineJobsToday function  ');

this.jobService.getTodayDeadlineJobs().subscribe(data => {


if(!data.success){
  this.message=data.message;
  this.messageClass=data.messageClass;
} else {
this.today=true;
this.todayDeadlineJobs=data.todayDeadlineJobs;
}

});


}*/

}
