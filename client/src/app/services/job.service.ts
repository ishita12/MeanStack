import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class JobService {

  constructor(private authService: AuthService, private http: Http) { }

  domain = "http://localhost:8080";
  options;

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
  //  console.log('auth service blog token is   '+this.authToken);
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }


  newJob(job){
    this.createAuthenticationHeaders();
    console.log('inside newJob service    '+job.deadline);
    return this.http.post(this.domain + '/jobs/newJob', job, this.options).map(res => res.json());


  }


  getTodayDeadlineJobs(){

    this.createAuthenticationHeaders();
    console.log('inside getTodayDeadlineJobs service    ');
    return this.http.get(this.domain + '/jobs/getTodayDeadlineJobs', this.options).map(res => res.json());


  }


  getDeadlineJobsWithin10Days(){

    this.createAuthenticationHeaders();
    console.log('inside getDeadlineJobsWithin10Dayss service    ');
    return this.http.get(this.domain + '/jobs/getDeadlineJobsWithin10Days', this.options).map(res => res.json());


  }

  searchById(aJobs){
    this.createAuthenticationHeaders();
    console.log('inside searchById service    ');
    return this.http.get(this.domain + '/jobs/searchById/' + aJobs, this.options).map(res => res.json());



  }


  searchByIdNew(ids){
    this.createAuthenticationHeaders();
    console.log('inside searchByIdNew service    ');
    return this.http.get(this.domain + '/jobs/searchByIdNew/' + ids, this.options).map(res => res.json());



  }


searchById10(aJobs){
  this.createAuthenticationHeaders();
  console.log('inside searchById10 service    ');
  return this.http.get(this.domain + '/jobs/searchById10/' + aJobs, this.options).map(res => res.json());



}



searchJobsWithID(ids){
  this.createAuthenticationHeaders();
  console.log('inside searchById service    ');
  return this.http.get(this.domain + '/jobs/searchJobsWithID/' + ids, this.options).map(res => res.json());



}


/*
getTodayDeadlineJobsApplied(todayDeadlineJobsID){

  this.createAuthenticationHeaders();
  console.log('inside getTodayDeadlineJobsApplied service    ');
  return this.http.get(this.domain + '/jobs/getTodayDeadlineJobsApplied/', +todayDeadlineJobsID, this.options).map(res => res.json());


}


getTodayDeadlineJobsNotApplied(todayDeadlineJobsIDApplied){


  this.createAuthenticationHeaders();
  console.log('inside getTodayDeadlineJobsNotApplied service    ');
  return this.http.get(this.domain + '/jobs/getTodayDeadlineJobsNotApplied/', +todayDeadlineJobsIDApplied, this.options).map(res => res.json());


}
*/


deleteJob(id){
  this.createAuthenticationHeaders();
  return this.http.delete(this.domain +'/jobs/deleteJob/' + id, this.options).map(res => res.json());


}


saveViewedJob(viewJob){
  this.createAuthenticationHeaders();

  console.log('inside saveViewedJob service   '+viewJob.jobID+ '       '+viewJob.username);
  return this.http.post(this.domain + '/jobs/saveViewJob', viewJob, this.options).map(res => res.json());

}

deleteApplication(id){
  this.createAuthenticationHeaders();
  return this.http.delete(this.domain +'/jobs/deleteApplication/' + id, this.options).map(res => res.json());

}

getJobs(jobArray){

  this.createAuthenticationHeaders();
  for(var i in jobArray){
    console.log('inside getJobs  service   '+jobArray[i]);
  }

  return this.http.get(this.domain + '/jobs/getJobs/' + jobArray, this.options).map(res => res.json());

}




getFinalJobs(finalJobs){

  this.createAuthenticationHeaders();

  for(var i in finalJobs){
    console.log('inside getFinalJobs  service   '+finalJobs[i]);
  }


  return this.http.get(this.domain + '/jobs/finalJobs/' + finalJobs, this.options).map(res => res.json());

}


getPriorityJobsWhichAreNotApplied(pArray){
  this.createAuthenticationHeaders();

  for(var i in pArray){
    console.log('inside getPriorityJobsWhichAreNotApplied  service   '+pArray[i]);
  }

  return this.http.get(this.domain + '/jobs/pArray/' + pArray, this.options).map(res => res.json());

}


  addPriority(priority){
      this.createAuthenticationHeaders();
      console.log('priority added     ');
      return this.http.post(this.domain + '/jobs/addPriority', priority, this.options).map(res => res.json());
  }

  removePriority(id, username){
      this.createAuthenticationHeaders();
      console.log('priority being removed     '+id);
      return this.http.delete(this.domain + '/jobs/removePriority/' +id + '/' + username, this.options).map(res => res.json());
  }


newApply(application){

  this.createAuthenticationHeaders();
console.log('new job applied');
  return this.http.post(this.domain + '/jobs/newApply', application, this.options).map(res => res.json());

}


getSingleJob(id) {
    this.createAuthenticationHeaders(); // Create headers
    console.log('inside single job');
    return this.http.get(this.domain + '/jobs/singleJob/' + id, this.options).map(res => res.json());
  }


getAllJobs(){
  this.createAuthenticationHeaders();
   return this.http.get(this.domain + '/jobs/allJobs', this.options).map(res => res.json());

}


getPriority(username){


  this.createAuthenticationHeaders();
  console.log('username is !!!!   '+username);
  return this.http.get(this.domain + '/jobs/getPriority/' + username, this.options).map(res => res.json());

}


getViews(username){

  this.createAuthenticationHeaders();
  console.log('username is !!!!   '+username);
  return this.http.get(this.domain + '/jobs/getViews/' + username, this.options).map(res => res.json());


}


getViewedJobs(arr) {
  this.createAuthenticationHeaders();

  return this.http.get(this.domain + '/jobs/viewedJobs/' + arr, this.options).map(res => res.json());


}



getSavedJobs(username){

  this.createAuthenticationHeaders();
  console.log('username is !!!!   '+username);
  return this.http.get(this.domain + '/jobs/getSavedJobs/' + username, this.options).map(res => res.json());


}


getAppliedJobs(username){
  this.createAuthenticationHeaders();
  console.log('username is !!!!   '+username);
  return this.http.get(this.domain + '/jobs/appliedJobs/' + username, this.options).map(res => res.json());
}




getAppliedJobs10(username){
  this.createAuthenticationHeaders();
  console.log('username is !!!!   '+username);
  return this.http.get(this.domain + '/jobs/appliedJobs10/' + username, this.options).map(res => res.json());
}



getActualJobs(appliedJobs){
  this.createAuthenticationHeaders();
  console.log('inside method');
  console.log('applied job ids are    '+appliedJobs);
  return this.http.get(this.domain + '/jobs/actualJobs/' + appliedJobs, this.options).map(res => res.json());


}


notAppliedJobs(jobs1){

  this.createAuthenticationHeaders();
  console.log('inside notAppliedJobs service    '+jobs1);
  return this.http.get(this.domain + '/jobs/notAppliedJobs/' + jobs1, this.options).map(res => res.json());


}




notAppliedJobs10(jobs10){

  this.createAuthenticationHeaders();
  console.log('inside notAppliedJobs10 service    '+jobs10);
  return this.http.get(this.domain + '/jobs/notAppliedJobs10/' + jobs10, this.options).map(res => res.json());


}



//deadlineAvailJobs

deadlineAvailJobs(availJobs){

  this.createAuthenticationHeaders();
  console.log('inside deadlineAvailJobs service    '+availJobs);
  return this.http.get(this.domain + '/jobs/deadlineAvailJobs/' + availJobs, this.options).map(res => res.json());


}



deadlineAvailJobs10(availJobs10){

  this.createAuthenticationHeaders();
  console.log('inside deadlineAvailJobs10 service    '+availJobs10);
  return this.http.get(this.domain + '/jobs/deadlineAvailJobs10/' + availJobs10, this.options).map(res => res.json());


}






getApplicationsByUser(username){
  this.createAuthenticationHeaders();
   return this.http.get(this.domain + '/jobs/myJobs/' + username, this.options).map(res => res.json());

}


  getAllJobsByUser(username){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/jobs/allJobByUser/' + username, this.options).map(res => res.json());

  }



}
