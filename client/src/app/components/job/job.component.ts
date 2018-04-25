import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
jojo;
hasViewed=false;
viewedJobs=[];
jobPosts;
viewed=false;
myAppliedJobs =[];
testID;
jForm: FormGroup;
message;
priorityID;
username;
messageClass;
allJobs=false;
userId;
hasApplied=false;
jobId;
job;
today=false;
aForm;
processing = false;
currentUrl;
loading = true;
apply=false;
cantApply=false;
test=false;
priority=false;
appliedJobPosts;
priorityArray = [];
prio=false;
ppp=false;
jpost;
idArray = [];
todayDeadlineJobs;
todayDeadlineJobsID;
todayDeadlineJobsIDApplied;
jobsYouCanApply=[];
jobsYouCanApply1=[];
jobs10Days=[];;
job10=[];
  constructor(

  private formBuilder: FormBuilder,
  private authService: AuthService,
  private jobService: JobService,
  private router: Router,
  private location: Location,
  private activatedRoute: ActivatedRoute


  ) {

this.applyForm();
  }

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
      console.log('user role is   ' +profile.user.username);
console.log('priority value is     '+this.priority);
console.log('ishita babel');

this.test=false;
console.log('test value is    '+this.test);
      this.currentUrl = this.activatedRoute.snapshot.params;
      this.getAppliedJobs(this.username);
      this.getPriority(this.username);
     this.getViews(this.username);
    });

//console.log('inside init     '+this.currentUrl);
    //this.getAllJobs();







  }

  goBack() {
    this.location.back();
  }





deadlineMyAppliedJobs(){
  this.allJobs=true;
  this.test=true;


  this.authService.getProfile().subscribe(profile => {
    this.username = profile.user.username; // Used when creating new blog posts and comments

  });


this.getMyAppliedJobs(this.username);



}



deadlineMyAppliedJobs10(){

console.log('deadline within 10 days ');

this.allJobs=true;
this.test=true;
this.today=false;
this.days10=true;

this.authService.getProfile().subscribe(profile => {
  this.username = profile.user.username; // Used when creating new blog posts and comments

});


this.getMyAppliedJobs10(this.username);





}


jobs1=[];
getMyAppliedJobs(username){

this.jobService.getAppliedJobs(username).subscribe(data => {

  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  } else {

//this.jobs1=data.jobs;

for(var key in data.jobs) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.jobs[key];
        //do something with value;

        console.log('Applied jobs are ------------ !!!!!!!!!        '+value.jobID);
        this.jobs1.push(value.jobID);

      // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
}

if(this.jobs1.length>0) {
  this.notAppliedJobs(this.jobs1);
} else {

  this.deadlineJobsToday();
}

  }




});

}







jobs10=[];
getMyAppliedJobs10(username){

this.jobService.getAppliedJobs10(username).subscribe(data => {

  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  } else {

//this.jobs1=data.jobs;

for(var key in data.jobs10) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.jobs10[key];
        //do something with value;

        console.log('Applied jobs are ------------ !!!!!!!!!        '+value.jobID);
        this.jobs10.push(value.jobID);

      // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
}

if(this.jobs10.length>0) {
  this.notAppliedJobs10(this.jobs10);
} else {

  this.getDeadlineJobsWithin10Days();
}

  }




});

}

availJobs = [];

notAppliedJobs(jobs1){


//availJobs


this.jobService.notAppliedJobs(jobs1).subscribe(data => {

  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  } else {

//this.availJobs=data.availJobs;


for(var key in data.availJobs) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.availJobs[key];
        //do something with value;

        console.log('not applied jobs are ------------ !!!!!!!!!        '+value._id);
        this.availJobs.push(value._id);

      // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
}


this.deadlineAvailJobs(this.availJobs);
  }

});

}



availJobs10 =[];
notAppliedJobs10(jobs10){


//jobs10 -   applied job ids


this.jobService.notAppliedJobs10(jobs10).subscribe(data => {

  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  } else {

//this.availJobs=data.availJobs;


for(var key in data.availJobs10) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.availJobs10[key];
        //do something with value;
// jobs which have not been applied
        console.log('not applied jobs are ------------ !!!!!!!!!        '+value._id);
        this.availJobs10.push(value._id);

      // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
}


this.deadlineAvailJobs10(this.availJobs10);
  }

});

}




deadlineAvailJobs(availJobs){

this.jobService.deadlineAvailJobs(availJobs).subscribe(data => {
  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  } else {
console.log('inside deadlineAvailJobs success yayyyyy      ');

for(var key in data.jobsYouCanApply) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.jobsYouCanApply[key];
        //do something with value;

        console.log('Not applied jobs with todays deadline ------------ !!!!!!!!!        '+value.title);
this.jobsYouCanApply.push(value._id);

    this.searchById(this.jobsYouCanApply);
}



  }

});


}

/*
const date = new Date(Date.now());
const dateNow= date.toDateString();
const date1 = new Date(dateNow);
const dateNow1= date1;



////birthday.setDate(birthday.getDate()+10);


console.log('now date is  '+dateNow1);
const date2 = date1.setDate(date1.getDate()+10);
console.log('date after 10 days is   '+date1);


*/




deadlineAvailJobs10(availJobs10){

this.jobService.deadlineAvailJobs10(availJobs10).subscribe(data => {
  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  } else {
console.log('inside deadlineAvailJobs10 success yayyyyy      ');


const date = new Date(Date.now());
const dateNow= date.toDateString();
const date1 = new Date(dateNow);

//    console.log('now date is  '+dateNow1);
const date2 = date1.setDate(date1.getDate()+10);
const date3 = new Date(date2);
//        console.log('date after 10 days is   '+date3);




/*
for(var key in data.jobsYouCanApply10) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.jobsYouCanApply10[key];
        //do something with value;










        console.log('Not applied jobs with todays deadline ------------ !!!!!!!!!        '+value.title);
//this.job10.push(value._id);

//    this.searchById10(this.job10);
}

*/






for(var key in data.jobsYouCanApply10) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.jobsYouCanApply10[key];
        //do something with value;

        console.log('Jobs with deadline in coming 10 days ------------ !!!!!!!!!        '+value.title);
const dead = new Date(value.deadline);

if((dead >=date) && (dead <= date3)){


this.job10.push(value._id);
}




}



if(this.job10.length>0){
  console.log('inside if length of array is   '+this.job10.length);

  this.searchByIdNew(this.job10);

} else {
  console.log('inside else');
  this.router.navigate(['/profile']);
}


  }

});


}

gJobs;
testArr=[];
searchById10(aJobs){

this.jobService.searchById10(aJobs).subscribe(data => {

  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  }  else {
console.log('i have got the final jobs   ');
this.today=true;
//this.gJobs=data.myFinalJobs;










for(var key in data.myFinalJobs) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.myFinalJobs[key];
        //do something with value;

        const date = new Date(Date.now());
       const dateNow= date.toDateString();
        const date1 = new Date(dateNow);

    //    console.log('now date is  '+dateNow1);
        const date2 = date1.setDate(date1.getDate()+10);
        const date3 = new Date(date2);
//        console.log('date after 10 days is   '+date3);

const dead = new Date(value.deadline);

//console.log('deadline is !!!!!!!!!'+dead);





if((dead >=date) && (dead <= date3)){

  console.log('deadline is    '+dead);
console.log('todays date  is    '+date);
console.log('date after 10 days  is    '+date3);
console.log('line   439          ');
this.testArr.push(value._id);


}





}



if(this.testArr.length>0){
  console.log('inside if length of array is   '+this.testArr.length);

  this.searchByIdNew(this.testArr);

} else {
  console.log('inside else');
  this.router.navigate(['/profile']);
}





  }


});


}






myFinalJobs;

searchById(aJobs){

console.log(aJobs);

this.jobService.searchById(aJobs).subscribe(data => {

  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  }  else {
console.log('i have got the final jobs   ');
this.today=true;
this.myFinalJobs=data.myFinalJobs;

  }


});


}


days10=false;

myFinalJobs10;

searchByIdNew(ids){

console.log(ids);

this.jobService.searchByIdNew(ids).subscribe(data => {

  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  }  else {
console.log('i have got the final jobs   ');
this.today=false;
this.days10=true;
this.myFinalJobs10=data.finalJobs;

  }


});


}


  deadlineJobsToday(){

console.log('inside deadlineJobsToday function  ');

this.jobService.getTodayDeadlineJobs().subscribe(data => {


if(!data.success){
  this.message=data.message;
  this.messageClass=data.messageClass;
} else {
  console.log('yes found jobs');

//this.jobsYouCanApply=data.todayDeadlineJobs;

for(var key in data.todayDeadlineJobs) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.todayDeadlineJobs[key];
        //do something with value;

        console.log('Not deadlineJobsToday jobs with todays deadline ------------ !!!!!!!!!        '+value.title);
this.jobsYouCanApply1.push(value._id);

    this.searchById(this.jobsYouCanApply1);
}


}

});


  }









  getDeadlineJobsWithin10Days(){

console.log('inside getDeadlineJobsWithin10Days function  ');

this.jobService.getDeadlineJobsWithin10Days().subscribe(data => {


if(!data.success){
  this.message=data.message;
  this.messageClass=data.messageClass;
} else {
  console.log('yes found jobs');





    const date = new Date(Date.now());
   const dateNow= date.toDateString();
    const date1 = new Date(dateNow);

  //    console.log('now date is  '+dateNow1);
    const date2 = date1.setDate(date1.getDate()+10);
    const date3 = new Date(date2);
  //        console.log('date after 10 days is   '+date3);










for(var key in data.getDeadlineJobsWithin10Days) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.getDeadlineJobsWithin10Days[key];
        //do something with value;

        console.log('Jobs with deadline in coming 10 days ------------ !!!!!!!!!        '+value.title);
const dead = new Date(value.deadline);

if((dead >=date) && (dead <= date3)){


this.jobs10Days.push(value._id);
}




}



if(this.jobs10Days.length>0){
  console.log('inside if length of array is   '+this.jobs10Days.length);

  this.searchByIdNew(this.jobs10Days);

} else {
  console.log('inside else');
  this.router.navigate(['/profile']);
}


}

});


  }







/*

  getTodayDeadlineJobsApplied(todayDeadlineJobsID){



this.jobService.getTodayDeadlineJobsApplied(todayDeadlineJobsID).subscribe(data => {

  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  } else {


this.todayDeadlineJobsIDApplied=data.todayDeadlineJobsIDApplied;
this.getTodayDeadlineJobsNotApplied(this.todayDeadlineJobsIDApplied);

  }


});
  }


  getTodayDeadlineJobsNotApplied(todayDeadlineJobsIDApplied){

this.jobService.getTodayDeadlineJobsNotApplied(todayDeadlineJobsIDApplied).subscribe(data => {

  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  } else {

      this.jobsYouCanApply=data.jobsYouCanApply;

  }


});

  }
*/


getPriorityJobs(){
this.test=true;

this.authService.getProfile().subscribe(profile => {
  this.username = profile.user.username; // Used when creating new blog posts and comments

});


this.jobService.getPriority(this.username).subscribe(data => {

this.jpost=data.priority;
console.log('********************     '+this.jpost);
this.ppp=true;

});

}

getApply(id){


  this.prio=true;
  this.jobId=id;
  this.test=true;
  console.log('apply has been made true      '+this.jobId+'        '+this.apply);
  this.allJobs=true;

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






  getViews(username){
    this.jobService.getViews(username).subscribe(data => {

   if(!data.success){
     this.message=data.message;
     this.messageClass=data.messageClass;
   } else {

     this.message=data.message;
     this.messageClass=data.messageClass;



for(var key in data.views) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.views[key];
        //do something with value;

        console.log('property is !!!!!!!!!'+value.jobID);
        this.idArray.push(value.jobID);

      // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
}

for(var i in this.idArray){
  console.log('ok the priority ids are   '+this.idArray[i]);
}

   }




    });
  }




  getPriority(username){
    this.jobService.getPriority(username).subscribe(data => {

   if(!data.success){
     this.message=data.message;
     this.messageClass=data.messageClass;
   } else {

     this.message=data.message;
     this.messageClass=data.messageClass;


console.log('data priority   '+data.priority);

for(var key in data.priority) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.priority[key];
        //do something with value;

        console.log('property is !!!!!!!!!'+value.jobID);
        this.priorityArray.push(value.jobID);

      // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
}

for(var i in this.priorityArray){
  console.log('ok the priority ids are   '+this.priorityArray[i]);
}

   }




    });
  }


  initialCheckForPriority(leftJobs){
console.log('inside initialCheckForPriority');

//console.log('job posts ooookkkkk    '+this.jobPosts);
for(var i in leftJobs){


console.log('var i is    '+leftJobs[i]._id);
this.checkArray(leftJobs[i]._id);

}


  }


addPriority(id){
this.testID=id;
  this.jobService.getSingleJob(this.testID).subscribe(data => {
    // Check if GET request was success or not
    console.log('priority1');
    if (!data.success) {
console.log('priority2');
      this.messageClass = 'alert alert-danger'; // Set bootstrap error class
      this.message = 'Job not found.'; // Set error message
    } else {
      console.log('priority3');
      console.log('job yayyyyyyyyyyyyyyy');
      this.job = data.job; // Save blog object for use in HTML
      this.priorityArray.push(id);
      this.checkArray(id);
     this.onPriority(this.job);
    }
  });
}






checkArray(id){
//  console.log('check array id are !!!!!!!!!!!'+ id);
//  console.log('index of priorityArray is !!!!!!!!!!!    '+this.priorityArray.indexOf(id));
console.log('inside checkArray function        ' + this.priorityArray.length   );
if(this.priorityArray.length ==0){
  console.log('length is not zero');
}

  return this.priorityArray.indexOf(id) !== -1;
}

onPriority(job){


  this.authService.getProfile().subscribe(profile => {
    this.username = profile.user.username; // Used when creating new blog posts and comments
    console.log('user role is   ' +profile.user.username);

    this.currentUrl = this.activatedRoute.snapshot.params;

  //  this.getAppliedJobs(this.username);
  });

  const priority = {

    position: job.title, // Title field
    companyName: job.company, // Body field
    username: this.username, // CreatedBy field
    jobID: job._id
  }

console.log('priority job is       !!!!!!!!!'+priority.companyName);

this.jobService.addPriority(priority).subscribe(data => {
if(!data.success){
  console.log('priority5');
  this.message=data.message;
  this.messageClass = 'alert alert-danger';
} else {

  console.log('priority6');
this.priorityID=data.priority._id;
console.log('priority id is   '+data.priority._id);
  this.priority=true;
  this.router.navigate(['/job']);

}

});

}

/*removePriority(id){
this.testID=id;
  this.jobService.getSingleJob(this.testID).subscribe(data => {
    // Check if GET request was success or not
    if (!data.success) {
      console.log('priority3');
      this.messageClass = 'alert alert-danger'; // Set bootstrap error class
      this.message = 'Job not found.'; // Set error message
    } else {
      console.log('priority4');
      this.job = data.job; // Save blog object for use in HTML

    }
  });
} */
removePriority(id) {

console.log('priority id is    '+id);
console.log('user in removePriority function is   '+this.username);

  this.jobService.removePriority(id, this.username).subscribe(data => {
  if(!data.success){
    this.message=data.message;
    console.log('priority7');
    this.messageClass = 'alert alert-danger';
  } else {

    console.log('priority8');

    this.priority=false;
      const index = this.priorityArray.indexOf(id);
    this.priorityArray.splice(index,1);
    this.router.navigate(['/job']);
  }

  });


}


/*

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

*/

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



onId(id){
  this.jobId=id;
  this.apply=true;
  this.test=true;
  this.days10=false;
this.today=false;
  console.log('apply has been made true      '+this.jobId+'        '+this.apply);
  this.allJobs=true;

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
    //  this.saveViewedJob(id);
    }
  });

}




hideView(id){



  this.hasViewed=false;
}


onMyId(id){

this.hasViewed=true;
  console.log('apply has been made true      '+this.jobId+'        '+this.apply);

  this.jobService.getSingleJob(id).subscribe(data => {
    // Check if GET request was success or not
    console.log('priority1');
    if (!data.success) {
console.log('priority2');
      this.messageClass = 'alert alert-danger'; // Set bootstrap error class
      this.message = 'Job not found.'; // Set error message
    } else {
    this.jojo=data.job;
      console.log('priority3');
      console.log('job yayyyyyyyyyyyyyyy');
      this.idArray.push(id);
    this.saveViewedJob(id);
   this.checkID(id);
    }
  });

}



checkID(id){
//  console.log('check array id are !!!!!!!!!!!'+ id);
//  console.log('index of priorityArray is !!!!!!!!!!!    '+this.priorityArray.indexOf(id));
console.log('inside checkArray function        ' + this.priorityArray.length   );
if(this.idArray.length ==0){
  console.log('length is not zero');
}

  return this.idArray.indexOf(id) !== -1;
}




saveViewedJob(id){

const viewJob = {

jobID: id,
username: this.username

}


console.log('insie saveViewedJob function   '+viewJob.jobID+ '         '+viewJob.username);

this.jobService.saveViewedJob(viewJob).subscribe(data => {

if(!data.success){
  this.message=data.message;
  this.messageClass=data.messageClass;
} else {


/*
for(var key in data.viewJob) {
console.log('value of key is !!!!!!!!!!!!!'+key);
        var value = data.viewJob[key];
        //do something with value;

        console.log('property is !!!!!!!!!'+value.jobID);
       this.viewedJobs[key]=value.jobID;
       console.log('viewed  job ids are  ****************'+ this.viewedJobs[key]);
}
*/

}


});




}






onApply(){
  //this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
  // Function to GET current blog with id in params





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
            this.hasApplied=true;
            this.cantApply=true;
            this.test=true;
            this.prio=false;
            this.authService.getProfile().subscribe(profile => {
              this.username = profile.user.username; // Used when creating new blog posts and comments
              console.log('user role is   ' +profile.user.username);

              this.currentUrl = this.activatedRoute.snapshot.params;
              this.getAppliedJobs(this.username);
              this.getViews(this.username);
              this.removePriority(this.job._id);

            });

          //  this.getAllJobs();
              }, 2000);

        }
      });
}


deadlineArray = [];
jobIdArray = [];

  getAllJobs() {
    // Function to GET all blogs from database
    this.jobService.getAllJobs().subscribe(data => {
/*
      const d = this.myForm.get('mydate').value;
      const dd= new Date(d);
      const ddd = dd.toDateString();
*/
       // Create user object form user's inputs

      const todayDate = new Date(Date.now());




    //  console.log('deadline of the job is                        '+dd );
      console.log('todays date is         '+todayDate);



      for(var key in data.jobs) {
      console.log('value of key is !!!!!!!!!!!!!'+key);
              var value = data.jobs[key];
              //do something with value;


             this.deadlineArray.push(value.deadline);
            // console.log(' line 929         ishita job deadlines are  ****************'+ this.deadlineArray);

const dead = new Date(value.deadline);

console.log('deadline is !!!!!!!!!'+dead);


if(dead >=todayDate){

console.log('deadline is  '+dead);
this.jobIdArray.push(value._id);


}





      }

if(this.jobIdArray.length>0){
  this.searchJobsWithID(this.jobIdArray);

} else {
  this.router.navigate(['/profile']);
}








    //  this.jobPosts = data.jobs; // Assign array to use in HTML

    });
  }



  searchJobsWithID(ids){

  this.jobService.searchJobsWithID(ids).subscribe(data => {

    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    }  else {
  console.log(' line 984     and I am only displaying those jobs which have not past the deadline   ');
  this.today=false;
  this.days10=true;
  this.jobPosts=data.jobPosts;
  this.initialCheckForPriority(this.jobPosts);
    }


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



idJobArray=[];
  getActualJobs(ids){
    const todayDate = new Date(Date.now());




  //  console.log('deadline of the job is                        '+dd );
    console.log('todays date is         '+todayDate);


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

  for(var key in data.post) {
  console.log('value of key is !!!!!!!!!!!!!'+key);
          var value = data.post[key];
          //do something with value;



const dead = new Date(value.deadline);

console.log('deadline is !!!!!!!!!'+dead);


if(dead >=todayDate){


this.idJobArray.push(value._id);


}





  }



  if(this.idJobArray.length>0){
    console.log('greater');
    this.searchJobsWithID1(this.idJobArray);

  } else {
    console.log('redirect');
    this.router.navigate(['/job']);
  }




  //this.appliedJobPosts=data.post;


}
    });

  }



    searchJobsWithID1(ids){
console.log('line 1107   ');
    this.jobService.searchJobsWithID(ids).subscribe(data => {

      if(!data.success){
        this.message=data.message;
        this.messageClass=data.messageClass;
      }  else {
    console.log(' line 1112   ');
    this.today=true;
    this.appliedJobPosts=data.jobPosts;
   this.initialCheckForPriority(this.appliedJobPosts);
      }


    });


    }


}
