import { Component, OnInit } from '@angular/core';

import { JobService } from '../../../services/job.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-job-delete',
  templateUrl: './job-delete.component.html',
  styleUrls: ['./job-delete.component.css']
})
export class JobDeleteComponent implements OnInit {
  message;
  messageClass;
  foundJob = false;
  processing = false;
  job;
  currentUrl;
  username;

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  // Function to delete blogs
  deleteJob() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.jobService.deleteJob(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to blog page
        setTimeout(() => {
          this.router.navigate(['/jobPost']); // Route users to blog page
        }, 2000);
      }
    });
  }

  ngOnInit() {


    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
      console.log('user id is   ' +profile.user._id);

    });
    this.jobService.getAllJobsByUser(this.username);


    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve blog
    this.jobService.getSingleJob(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        // Create the blog object to use in HTML
        this.job = {
          title: data.job.title, // Set title
          company: data.job.company, // Set body
          createdBy: data.job.createdBy, // Set created_by field

        }
        this.foundJob = true; // Displaly blog window
      }
    });
  }

}
