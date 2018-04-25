import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import { RoomService } from '../../services/room.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-room-post',
  templateUrl: './room-post.component.html',
  styleUrls: ['./room-post.component.css']
})
export class RoomPostComponent implements OnInit {



  mForm;
  check1=false;
  check2=false;
  roomList =[];
  timeList = [];
  floorList = [];
  typeList = [];
  floor;
  rtype;
  val=false;
  message;
  messageClass;
  constructor(

    private formBuilder: FormBuilder,
    private authService: AuthService,
    private jobService: JobService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService




  ) {

this.cForm();
  }

  ngOnInit() {

this.typeList = [

"",
"quiet",
"group",
"seminar"

];



    this.timeList = [
    "",
    "8:00 AM - 11:00 AM",
    "11:00 AM - 2:00 PM",
    "2:00 PM - 5:00 PM",
    "5:00 PM - 8:00 PM",
    "8:00 PM - 11:00 PM"



    ];


this.floorList = [

"",
"first",
"second"

];



  }



onType(){

this.rtype=this.mForm.get('rtype').value;
this.check2=true;
this.check1=true;
}


  onSelect() {


this.floor=this.mForm.get('floor').value;

this.val=true;
    this.selectFloor(this.floor);
  }


selectFloor(floor){

//this.floor = this.mForm.get('floor').value;

console.log('floor type is   '+floor);



console.log('value of room type is   '+this.rtype);
if(this.rtype==='quiet'){


    if(floor==='first'){

  console.log('first');
      this.roomList = [
        "",
        "101",
        "102",
        "103"

      ];

    }

    if(floor==='second'){

      console.log('second');
      this.roomList = [
        "",
        "201",
        "202",
        "203"

      ];
    }

}

if(this.rtype==='group'){


    if(floor==='first'){

  console.log('first');
      this.roomList = [
        "",
        "101",
        "102",
        "103"

      ];

    }

    if(floor==='second'){

      console.log('second');
      this.roomList = [
        "",
        "201",
        "202",
        "203"

      ];
    }

}

if(this.rtype==='seminar'){


    if(floor==='first'){

  console.log('first');
      this.roomList = [
        "",
        "101",
        "102",
        "103"

      ];

    }

    if(floor==='second'){

      console.log('second');
      this.roomList = [
        "",
        "201",
        "202",
        "203"

      ];
    }

}




}

  cForm() {
    this.mForm = this.formBuilder.group({
      // Email Input
      mydate: ['', Validators.compose([
        Validators.required // Field is required

      ])],

      floor: ['', Validators.compose([
        Validators.required // Field is required

      ])],

      rtype: ['', Validators.compose([
        Validators.required // Field is required

      ])],
      // Username Input
      time: ['', Validators.compose([
        Validators.required // Field is required

      ])],

      room: ['', Validators.compose([
        Validators.required // Field is required

      ])]

    }

  ); // Add custom validator to form for matching passwords
  }

onSave(){


  const d = this.mForm.get('mydate').value;
  const dd= new Date(d);
  const ddd = dd.toDateString();
   // Create user object form user's inputs
   const post = {
     rtype: this.mForm.get('rtype').value,
     floor: this.mForm.get('floor').value,
     mydate: ddd,
     time: this.mForm.get('time').value,
     room: this.mForm.get('room').value

   }


   console.log(post.rtype+'     '+post.floor+'    '+post.room+'   '+post.mydate+'     '+post.time);




this.roomService.newPost(post).subscribe(data => {

if(!data.success){

  this.message=data.message;
  this.messageClass=data.messageClass;
} else {

  this.message='Room details saved';
  this.messageClass='alert alert-success';
  setTimeout(() => {
  this.router.navigate(['/profile']);
  }, 2000);


}

});



}

  goBack() {
  this.location.back();
  }




}
