import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { JobService } from '../../../../services/job.service';
import { RoomService } from '../../../../services/room.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-group-events',
  templateUrl: './group-events.component.html',
  styleUrls: ['./group-events.component.css']
})
export class GroupEventsComponent implements OnInit {


username;
currentUrl;
message;
messageClass;
  constructor(

    private formBuilder: FormBuilder,
    private authService: AuthService,
    private jobService: JobService,
    private roomService: RoomService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute



  ) { }
 dd;
 ddd;
 date1;
 date2;
 dateCheck;
 myReservations=[];
 myReservations1=[];
 myReservations2=[];
 dates1=[];
 dates2=[];
 past=false;
 future=false;
 state=false;
  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new blog posts and comments
      console.log('user role is   ' +profile.user.username);

      this.currentUrl = this.activatedRoute.snapshot.params;
      this.testMethod(this.username);

    });




  }


  testMethod(username){


           this.dd=new Date(Date.now());
         this.ddd = this.dd.toDateString();
         this.date1=new Date(this.ddd);
           console.log('date is   '+this.ddd);


           this.roomService.findMyReservations(username).subscribe(data => {


           if(!data.success){
             this.message=data.message;
             this.messageClass=data.messageClass;
           } else {

             for(var key in data.myReservations) {

                    var value = data.myReservations[key];
                     //do something with value;
   this.dateCheck= new Date(value.date);
           if(this.dateCheck>=this.date1) {
       console.log('current or future date'+ this.dates1);
            this.dates1.push(this.dateCheck);
        //    console.log('line 79   '+this.dates1);

           } else {

       console.log('past date'+ this.dates2);
              this.dates2.push(this.dateCheck);
          //    console.log('line 85   '+this.dates2);

           }

             }
             this.selectFuture(this.dates1);
             this.selectPast(this.dates2);

           }


           });
  }


 d1=[];
 d2=[];
  selectPast(dates2){

console.log('past username '+this.username);
console.log('inside selectPast '+dates2);


for(var i in dates2){
const d = dates2[i].toDateString();
this.d2.push(d);
console.log('line 123   '+d);

}


this.roomService.getReservations2(this.d2, this.username).subscribe(data => {


  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  } else {

console.log('successs 2');
console.log('successs 2   !!!!!!!!!!!!!    '+data.madeReservations2);
    for(var key in data.madeReservations2) {
    console.log('value of key is !!!!!!!!!!!!!'+key);
           var value = data.madeReservations2[key];
            //do something with value;

this.myReservations2=data.madeReservations2;


console.log('Reservations     '+value.roomType+'   '+value.floor+'   '+value.date+'   '+value.room+'   '+value.time);

    }


  }



});




  }


  selectFuture(dates1){
console.log('future username '+this.username);
console.log('inside selectFuture '+dates1);

for(var i in dates1){
const d = dates1[i].toDateString();
this.d1.push(d);
console.log('line 123   '+d);

}

this.roomService.getReservations1(this.d1, this.username).subscribe(data => {



    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    } else {

console.log('successs 1');
console.log('successs 1   !!!!!!!!!!!!!    '+data.madeReservations1);

          for(var key in data.madeReservations1) {
          console.log('value of key is !!!!!!!!!!!!!'+key);
                 var value = data.madeReservations1[key];
                  //do something with value;


this.myReservations1=data.madeReservations1;

console.log('Reservations     '+value.roomType+'   '+value.floor+'   '+value.date+'   '+value.room+'   '+value.time);

          }


    }


});


  }







onPast(){

  this.past=true;
  this.future=false;
  this.state=true;
  console.log('value of past '+this.past);
}

onFuture(){
  this.future=true;
  this.past=false;
  this.state=true;
    console.log('value of future '+this.future);
}

/*
getReservationUser(){
     this.currentUrl = this.activatedRoute.snapshot.params;
 this.jobService.getReservationUser(this.currentUrl.username).subscribe(data => {

console.log('inside apppliatonssssss');
     this.jobApplications = data.application;
   });
}
*/



    goBack() {
      this.location.back();
    //    window.location.reload();
    }

onDelete(id){

  this.roomService.deleteReservation(id).subscribe(data => {


    if (!data.success) {
      this.messageClass = 'alert alert-danger'; // Return error bootstrap class
      this.message = data.message; // Return error message
    } else {
      console.log(' line 255            inside else success');
      this.messageClass = 'alert alert-success'; // Return bootstrap success class
      this.message = data.message; // Return success message
      // After two second timeout, route to blog page
    //  this.getReservationUser();
      setTimeout(() => {
        this.router.navigate(['/group']); // Route users to blog page
      }, 2000);
    }

  });
}





}
