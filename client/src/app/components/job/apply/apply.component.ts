import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { JobService } from '../../../services/job.service';
import {  Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

  message;
  messageClass;
  job;
  aForm;
  processing = false;
  currentUrl;
  loading = true;
  username;
  apply=false;



  constructor(

    private formBuilder: FormBuilder,
    private authService: AuthService,
    private jobService: JobService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location


  ) {
this.applyForm();
   }


  goBack() {
    this.location.back();
  }


  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  // Function to validate username is proper format
  validatefname(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validatefname': true } // Return as invalid username
    }
  }

  validatelname(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test username against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid username
    } else {
      return { 'validatelname': true } // Return as invalid username
    }
  }


  disabledForm(){
    this.aForm.controls['email'].disable();
    this.aForm.controls['fname'].disable();
    this.aForm.controls['lname'].disable();
    this.aForm.controls['phone'].disable();
      this.aForm.controls['address'].disable();
  }
  enabledForm(){
    this.aForm.controls['email'].enable();
    this.aForm.controls['fname'].enable();
    this.aForm.controls['lname'].enable();
    this.aForm.controls['phone'].enable();
    this.aForm.controls['address'].enable();
  }




  applyForm() {
    this.aForm = this.formBuilder.group({
      // Email Input
      fname: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
         this.validatefname
      ])],
      // Username Input
      lname: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validatelname
      ])],

      // Password Input
      address: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35)
      ])],
      // Confirm Password Input
      phone: ['', Validators.compose([
        Validators.required // Field is required

      ])],
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmail // Custom validation
      ])]
    }

  ); // Add custom validator to form for matching passwords
  }


  onApply(){



    this.processing = true; // Disable submit button
    this.disabledForm(); // Lock form
    // Create blog object from form fields

    const application = {

      position: this.job.title, // Title field
      companyName: this.job.company, // Body field
      appliedBy: this.username, // CreatedBy field
      jobID: this.job._id
    }


    // Function to save blog into database
    this.jobService.newApply(application).subscribe(data => {
      // Check if blog was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message ='category error'; // Return error message
        console.log('category not saved');
        this.processing = false; // Enable submit button
        this.enabledForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message

        // Clear form data after two seconds
        setTimeout(() => {

          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.aForm.reset(); // Reset all form fields
          this.enabledForm(); // Enable the form fields
          this.apply=true;
          this.router.navigate(['/job']);
        }, 2000);
      }
    });



  }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments

    });

    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current blog with id in params
    this.jobService.getSingleJob(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        console.log('job not***************8');
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'Job not found.'; // Set error message
      } else {
        console.log('job yayyyyyyyyyyyyyyy');
        this.job = data.job; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });

  }

}
