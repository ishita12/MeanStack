import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.css']
})
export class JobPostComponent implements OnInit {

jobForm: FormGroup;
message;
username;
messageClass;
processing;
userId;
jobPosts;
newJobPost=false;
min;

  constructor(

 private formBuilder: FormBuilder,
 private authService: AuthService,
 private jobService: JobService,
 private router: Router


 ) {
  this.createJobForm();
   }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
      console.log('user id is   ' +profile.user._id);
      this.userId= profile.user._id;
          this.getAllJobsByUser(this.username);
    });
var tt=Date.now();

//this.formatDate(tt);
var d = new Date(tt);
var month = '' + (d.getMonth() + 1);
  var  day = '' + d.getDate();
  var  year = d.getFullYear();

  console.log('inside formate date function   '+d);

if (month.length < 2){
  month = '0' + month;
}
if (day.length < 2)

{day = '0' + day;}
console.log('formatted date   '+ [year, month, day].join('-'));
this.min= [year, month, day].join('-');


console.log('min value is   '+this.min);
    }


    formatDate(date) {
        var d = new Date(date);
        var month = '' + (d.getMonth() + 1);
          var  day = '' + d.getDate();
          var  year = d.getFullYear();

          console.log('inside formate date function   '+d);

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
      console.log('formatted date   '+ [year, month, day].join('-'));
        return [year, month, day].join('-');
    }


  getJobs(){
    this.getAllJobsByUser(this.username);
  }

  goBack() {
    window.location.reload(); // Clear all variable states
  }
//get all jobSchema
getAllJobsByUser(username) {
  // Function to GET all blogs from database
  this.jobService.getAllJobsByUser(this.username).subscribe(data => {


//console.log('data length is     '+data.job.title);





   this.jobPosts = data.job // Assign array to use in HTML



   for(var key in  this.jobPosts) {
   console.log('value of key is !!!!!!!!!!!!!'+key);
           var value =  this.jobPosts[key];
           //do something with value;
        //   value.deadline.toDateString();
          // console.log('property is !!!!!!!!!'+value.deadline.toDateString());


         // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
   }
//  console.log('data job    '+data.job.deadline);
//console.log('test job !!!   '+ this.jobPosts[1]);

//    console.log('jobs are !!!!!!!!!!       '+this.jobPosts.title);
  });
}



  disabledForm(){
    this.jobForm.controls['title'].disable();
    this.jobForm.controls['company'].disable();
    this.jobForm.controls['description'].disable();
    this.jobForm.controls['deadline'].disable();

  }
  enabledForm(){
    this.jobForm.controls['title'].enable();
    this.jobForm.controls['company'].enable();
    this.jobForm.controls['description'].enable();
    this.jobForm.controls['deadline'].enable();

  }


onJobSubmit(){
  this.processing = true;
  this.disabledForm();

  const d = this.jobForm.get('deadline').value;
  const dd= new Date(d);
  const ddd = dd.toDateString();
   // Create user object form user's inputs
   const job = {
     title: this.jobForm.get('title').value, // E-mail input field
     company: this.jobForm.get('company').value, // Username input field
     description: this.jobForm.get('description').value, // Password input field
     deadline: ddd,
     createdBy: this.username
   }
console.log('date is    '+job.deadline);
console.log(this.jobForm.get('title').value);
console.log('user name is    '+job.createdBy);
   // Function from authentication service to register user
   this.jobService.newJob(job).subscribe(data => {
     // Resposne from registration attempt
     //console.log('ishita '+data);
    if(!data.success){
      this.messageClass = 'alert-alert-danger';
      this.message = data.message;
      this.processing = false;
      this.enabledForm();
    }

     else{
      this.messageClass = 'alert-alert-success';
      this.message = data.message;
        this.getAllJobsByUser(this.username);
        console.log('job has been posted by    '+this.username);
      setTimeout(() => {
        this.processing = false;
        this.newJobPost = false;
        this.jobForm.reset();
          this.enabledForm();

      }, 2000);

     }

   });
}



  createJobForm() {
    this.jobForm = this.formBuilder.group({
      // Email Input
      title: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateTitle // Custom validation
      ])],
      // Username Input
      company: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validateCompany // Custom validation
      ])],
      // Password Input
      description: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(200)
      ])],
      deadline: ['', Validators.compose([
        Validators.required
      ])

    ]
    })
}


validateTitle(controls) {
  // Create a regular expression
  const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
  // Test username against regular expression
  if (regExp.test(controls.value)) {
    return null; // Return as valid username
  } else {
    return { 'validateTitle': true } // Return as invalid username
  }
}


validateCompany(controls) {
  // Create a regular expression
  const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
  // Test username against regular expression
  if (regExp.test(controls.value)) {
    return null; // Return as valid username
  } else {
    return { 'validateCompany': true } // Return as invalid username
  }
}


newJobForm(){
  this.newJobPost=true;
}


}
