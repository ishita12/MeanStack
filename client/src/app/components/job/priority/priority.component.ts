import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { JobService } from '../../../services/job.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent implements OnInit {

myFinalJobs;
appliedJobPosts;
jobPosts;
test=false;
myJobs=[];
message;
messageClass;
username;
jobs=[];
jobId;
myAppliedJobs =[];
processing = false;
job;
loading=true;
apply=false;
currentUrl;
aForm;
myPriorityAppliedJobs=[];
allJobs=false;
  constructor(

    private formBuilder: FormBuilder,
    private authService: AuthService,
    private jobService: JobService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute




  ) { this.applyForm();}



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
        Validators.maxLength(30)// Maximum length is 30 characters

      ])],
      // Username Input
      lname: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15)
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
        Validators.maxLength(30)
      ])]
    }

  ); // Add custom validator to form for matching passwords
  }



  ngOnInit() {


    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
      console.log('user role is   ' +profile.user.username);

  console.log('ishita babel');

  this.test=false;
  console.log('test value is    '+this.test);
      this.currentUrl = this.activatedRoute.snapshot.params;

    //  this.getPriority(this.username);
this.getList(this.username);
    });

  }

  goBack() {
    this.location.back();
  }

  getAllJobs() {
    // Function to GET all blogs from database
    this.jobService.getAllJobs().subscribe(data => {
      this.jobPosts = data.jobs; // Assign array to use in HTML

    });
  }


    getAppliedJobs(username){

  console.log('the user who logged in is    '+username);
  this.jobService.getAppliedJobs(username).subscribe(data => {
  for(var key in data.jobs) {
  console.log('value of key is !!!!!!!!!!!!!'+key);
          var value = data.jobs[key];
          //do something with value;

          console.log('property is !!!!!!!!!'+value.jobID);
         this.myAppliedJobs[key]=value.jobID;
         console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
  }
  if(!this.myAppliedJobs){
    console.log('why is it undefines');
  }
  if(this.myAppliedJobs.length > 0){
    console.log('applied jobs');
    this.test=false;
    this.getActualJobs(this.myAppliedJobs);

  } else if(this.myAppliedJobs===undefined || this.myAppliedJobs.length == 0){
    console.log('all jobs');
    this.test=false;
    this.getAllJobs();
  }



  });

    }



    getActualJobs(ids){
  console.log('the applied ids are     '+this.myAppliedJobs);
      this.jobService.getActualJobs(this.myAppliedJobs).subscribe(data => {
  console.log('test inside function');
  if(!data.success){
    this.message = data.message;
    this.messageClass = 'alert alert-danger';
    console.log('jobs not found !!!!!!');
  } else {
    this.message=data.message;
    this.messageClass = 'alert alert-success';
    console.log('jobs found yayyyyyyyy');
    this.appliedJobPosts=data.post;


  }
      });

    }


applyJob(id){

    this.jobId=id;
    this.apply=true;
    this.allJobs=true;
    this.test=true;
    console.log('apply has been made true      '+this.jobId+'        '+this.apply);


    this.jobService.getSingleJob(this.jobId).subscribe(data => {
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

console.log('application details are!!!!!!!!!!!!!!!!!1'+application.position+'           '+application.companyName+'               '+application.appliedBy+'             '+application.jobID);

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
          console.log('its a success!!!!!!!!!');

          this.messageClass = 'alert alert-success'; // Return success class
          this.message = data.message; // Return success message

          // Clear form data after two seconds

            setTimeout(() => {
            this.processing = false; // Enable submit button
            this.aForm.reset(); // Reset all form fields
            this.enabledForm(); // Enable the form fields
            this.apply=false;
this.allJobs=false;

            this.test=true;
            this.authService.getProfile().subscribe(profile => {
              this.username = profile.user.username; // Used when creating new blog posts and comments
              console.log('user role is   ' +profile.user.username);

              this.currentUrl = this.activatedRoute.snapshot.params;


            });

          //  this.getAllJobs();
              }, 2000);

        }
      });
}




getList(username) {

this.jobService.getPriority(username).subscribe(data => {

console.log('inside get list function');
if(!data.success){
  console.log('failed');
this.message=  data.message;
this.messageClass=data.messageClass;
} else {
  console.log('success');


  for(var key in data.priority) {
  console.log('value of key is !!!!!!!!!!!!!'+key);
          var value = data.priority[key];
          //do something with value;

          console.log('property is !!!!!!!!!'+value.jobID);
          this.myJobs.push(value.jobID);

        // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
  }
this.getPriorityJobsWhichAreNotApplied(this.myJobs);


}

});


}


getJobs(jobArray){

  const jArray = [];
  for(var i in jobArray){
    console.log('inside getJobs   '+jobArray[i]);
    jArray.push(jobArray[i]);
  }


this.jobService.getJobs(jArray).subscribe(data => {

  if(!data.success){
    console.log('failed');
  this.message=  data.message;
  this.messageClass=data.messageClass;
}  else {

console.log('success in getJobs   ');


for(var key in data.jobs){

  var value = data.jobs[key];
  //do something with value;





  console.log('inside getJobs  function '+value.jobID);
  this.jobs.push(value.jobID);
}
this.getFinalJobs(this.jobs);

}

});

}



getFinalJobs(finalJobs) {

  const kArray = [];
  for(var i in finalJobs){
    console.log('inside finalJobs   '+finalJobs[i]);
    kArray.push(finalJobs[i]);
  }

this.jobService.getFinalJobs(kArray).subscribe(data => {

if(!data.success){
  this.message=data.message;
  this.messageClass=data.messageClass;
} else {




this.myFinalJobs=data.finalJobs;

for(var key in data.finalJobs){

  var value = data.finalJobs[key];
  //do something with value;





  console.log('inside getJobs  function '+value._company);
  
}


}


});


}


getPriorityJobsWhichAreNotApplied(pjobs){
const pArray = [];
for(var i in pjobs){
  console.log('inside getPriorityJobsWhichAreNotApplied   '+pjobs[i]);
  pArray.push(pjobs[i]);
}

this.jobService.getPriorityJobsWhichAreNotApplied(pArray).subscribe(data => {
  if(!data.success){
    console.log('failed');
  this.message=  data.message;
  this.messageClass=data.messageClass;
}  else {
  console.log('lets check    ');

console.log('priorityAndAppliedJobs length    '+data.priorityAndAppliedJobs.length);
if(data.priorityAndAppliedJobs.length>0){
  for(var key in data.priorityAndAppliedJobs) {
  console.log('value of key is !!!!!!!!!!!!!'+key);
          var val = data.priorityAndAppliedJobs[key];
          //do something with value;

          console.log('property is !!!!!!!!!'+val.jobID);

          this.myPriorityAppliedJobs.push(val.jobID);

        // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
  }
this.getJobs(this.myPriorityAppliedJobs);
} else {
console.log('no priority job has been applied');
  this.getFinalJobs(pArray);
}



}

});

}





}
