import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { JobService } from '../../../../services/job.service';
import { RoomService } from '../../../../services/room.service';
import {  Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-group-reservation',
  templateUrl: './group-reservation.component.html',
  styleUrls: ['./group-reservation.component.css']
})
export class GroupReservationComponent implements OnInit {


  roomType='group';
  floorType=false;
  restDetail=false;
  test=false;
  processing=true;
  myForm;
  ddDate;
  floor;
  roomList =[];
  timeList = [];
  username;
  myRooms=[];
  myTimes=[];
  myRoomsTaken=[];
  myTimesTaken=[];
  currentUrl;
  message;
  selectedDate;
  messageClass;
  dateSelect=false;
  rest=false;
  bookedRooms;
  true1=false;
  selectedRoom;
  availableRooms=[];
  notAvailableTimes=[];
  rest1=false;
  restDetail1=false;

    constructor(

      private formBuilder: FormBuilder,
      private authService: AuthService,
      private jobService: JobService,
      private roomService: RoomService,
      private router: Router,
      private location: Location,
      private activatedRoute: ActivatedRoute



    ) {

  this.checkForm();

    }

    ngOnInit() {

      this.authService.getProfile().subscribe(profile => {
        this.username = profile.user.username; // Used when creating new blog posts and comments
        console.log('user role is   ' +profile.user.username);

        this.currentUrl = this.activatedRoute.snapshot.params;

      });




    }


  selectDate(){


  }
  onSubmit1(){

    const finalData = {

    username: this.username,
    date: this.ddDate,
    roomType: this.roomType,
    room: this.selectedRoom,
    floor: this.floor,
    time: this.myForm.get('time').value


    }


    this.roomService.saveData(finalData).subscribe(data => {

      if(!data.success){
        this.message=data.message;
        this.messageClass=data.messageClass;
      } else {

  console.log('reservation saved');
  this.message='Reservation made';

  this.messageClass='alert alert-success';
  setTimeout(() => {
    this.router.navigate(['/group']); // Route users to blog page
  }, 3000);
      }




    });


  }



  onSubmit3(){

    const finalData = {

    username: this.username,
    date: this.selectedDate,
    roomType: this.roomType,
    room: this.myroom,
    floor: this.floor,
    time: this.myForm.get('time').value


    }



    this.roomService.saveData1(finalData).subscribe(data => {

      if(!data.success){
        this.message=data.message;
        this.messageClass=data.messageClass;
      } else {

  this.message='Reservation made';

  this.messageClass='alert alert-success';
  setTimeout(() => {
    this.router.navigate(['/group']); // Route users to blog page
  }, 3000);

      }




    });


  }



  // to get rooms







  onSubmit(){

  this.rest=false;
  this.restDetail=true;
  const reserveData = {

  username: this.username,
  date: this.selectedDate,
  roomType: this.roomType,
  room: this.myForm.get('room').value,
  floor: this.floor


  }
  this.ddDate=reserveData.date;
  this.selectedRoom=reserveData.room;

  console.log('values of final reservation are     '+ reserveData.username+'   '+reserveData.date+'    '+reserveData.room+'      '+reserveData.floor+'   '+reserveData.roomType);



  this.roomService.getTimeSlots(reserveData.roomType, reserveData.floor, reserveData.date, reserveData.room).subscribe(data => {


    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    } else {

      for(var key in data.result) {
      console.log('value of key is !!!!!!!!!!!!!'+key);
             var value = data.result[key];
              //do something with value;
      console.log('time is    '+value);

            this.myTimes.push(value);
           //this.myTimes.push(value.time);
            // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
      }

    }



  });



  }

  // submit reservation when rooms have been booked previously




  onSubmit2(){



    const finalData = {

    username: this.username,
    date: this.selectedDate,
    roomType: this.roomType,
    room: this.myForm.get('room').value,
    floor: this.floor,
    time: this.myForm.get('time').value


    }


    this.roomService.saveData1(finalData).subscribe(data => {

      if(!data.success){
        this.message=data.message;
        this.messageClass=data.messageClass;
      } else {

  console.log('reservation saved');

      }




    });





  }

  t1=[];
  myroom;
  a1;
  a2;
  a3
  a4;

  onSubmit11(){

  this.true1=false;
    this.restDetail1=true;

    const finalData = {

    username: this.username,
    date: this.selectedDate,
    roomType: this.roomType,
    room: this.myForm.get('room').value,
    floor: this.floor
  //  time: this.myForm.get('time').value


    }

  console.log('line 281  '+finalData.date+'   '+finalData.roomType+'   '+finalData.room+'   '+finalData.floor);
  this.a1=finalData.roomType;
  this.a2=finalData.floor;
  this.a3=finalData.date;
  this.a4=finalData.room;
  console.log('line 290  '+this.a1+'   '+this.a2+'   '+this.a3+'   '+this.a4);

  this.myroom=finalData.room;
  this.getBookedTimesForDistinctRooms1(finalData.roomType,finalData.floor,finalData.date,finalData.room);



  }



  timesAvailable=[];
  getFinalTime(roomType, floor, date, room){


    this.roomService.getTime(roomType, floor, date, room).subscribe(data => {

      if(!data.success){
        this.message=data.message;
        this.messageClass=data.messageClass;
      } else {


      }



    });

  }




    getRooms(){

  console.log("thedate selected is    "+this.selectedDate);
  this.roomService.getRooms(this.roomType, this.floor, this.selectedDate).subscribe(data => {

  if(!data.success){
    this.message=data.message;
    this.messageClass=data.messageClass;
  } else {
  this.rest=true;

  console.log('found the rooms   ');
  console.log('rooms are   '+data.result);
  for(var key in data.result) {
  console.log('value of key is !!!!!!!!!!!!!'+key);
         var value = data.result[key];
          //do something with value;
  console.log('value is    '+value);

        this.myRooms.push(value);
       //this.myTimes.push(value.time);
        // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
  }



  //console.log('rooms are   '+data.rooms);

  }


  });

    }








        checkForm() {
          this.myForm = this.formBuilder.group({
            // Email Input
            mydate: ['', Validators.compose([
              Validators.required // Field is required

            ])],

            floor: [''],
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



      goBack() {
        this.location.back();
      //    window.location.reload();
      }

  allRooms=[];



  ifRooms=[];


  checkIfRoomsAreAvailableOrNot(roomType, floor, date){

    console.log(roomType+'    '+this.username+'   '+floor+'    '+'   '+date);



  this.roomService.checkIfRoomsAreAvailableOrNot(roomType, floor, date).subscribe(data => {


    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    } else {

  console.log('checkIfRoomsAreAvailableOrNot  function');

  for(var key in data.ifRooms) {
  console.log('value of key in booked room is !!!!!!!!!!!!!'+key);
         var value = data.ifRooms[key];
          //do something with value;

          console.log('Booked room numbers  are ------------ !!!!!!!!!        '+value.room +'and booked times are  '+value.time);
        this.ifRooms.push(value.room);
      //  this.myTimesTaken.push(value.time);
        // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
  }
  if(this.ifRooms.length===0){
  console.log("rooms haven't been posted for this date yet");
    this.router.navigate(['/group']);
  } else {



    this.roomService.getBookedRooms(roomType,floor,date).subscribe(data => {
    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    } else {

    console.log('got booked rooms');

    for(var key in data.bookedRooms) {
    console.log('value of key in booked room is !!!!!!!!!!!!!'+key);
           var value = data.bookedRooms[key];
            //do something with value;

            console.log('Booked room numbers  are ------------ !!!!!!!!!        '+value.room +'and booked times are  '+value.time);
          this.myRoomsTaken.push(value.room);
        //  this.myTimesTaken.push(value.time);
          // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
    }

    if(this.myRoomsTaken.length===0){
    // no rooms have been booked for Quiet room and whatever floor has been selected.

    this.messageClass='alert alert-danger';
    console.log("no rooms have been booked for Group room and whatever floor has been selected.");
    this.rest=true;
    this.dateSelect=true;
    this.getRooms();


    } else {

    //rooms have been booked and we need to find the ones that are still available.
    console.log("rooms have been booked and we need to find the ones that are still available.");
    this.rest=false;

    this.dateSelect=true;
    //this.true1=false;
    //this.restDetail1=true;


    console.log('sending not booked rooms  '+this.allRooms);
    this.getNotBookedRooms(roomType, floor, date, this.myRoomsTaken);



    }
    }
    });

  }


    }

  });


  }







  onSelect(){
  console.log('first floor');
  this.processing=false;
  this.floorType=false;

  const d = this.myForm.get('mydate').value;
  const dd= new Date(d);
  const ddd = dd.toDateString();
  this.selectedDate=ddd;
   // Create user object form user's inputs

  const todayDate = new Date(Date.now());






























  console.log('the date that you have selected right now is                        '+dd );
  console.log('todays date is         '+todayDate);


  if(dd>=todayDate){
    const reserve = {
      username: this.username,
      roomType: this.roomType,
      floor: this.floor,
      date: ddd,
      //time: this.myForm.get('time').value,
      //room: this.myForm.get('room').value

    }

    console.log(reserve.roomType+'    '+reserve.username+'   '+reserve.floor+'    '+'   '+reserve.date);

   this.checkIfRoomsAreAvailableOrNot(reserve.roomType, reserve.floor, reserve.date);
  } else {

    this.message='You can not book room for the date already passed';
    this.messageClass='alert alert-danger';
    setTimeout(() => {
      this.router.navigate(['/group']); // Route users to blog page
    }, 2000);
  }


  }
  //////////////////////////

  ///////


  //////////////////////////////////////////////////////

  getNotBookedRooms(roomType,floor, date, roomsTaken){
    this.roomService.getNotTakenRooms(roomType,floor, date, roomsTaken).subscribe(data => {
      if(!data.success){
        this.message=data.message;
        this.messageClass=data.messageClass;
      } else {

        for(var key in data.notTakenRooms) {
        console.log('value of key in not booked  room is !!!!!!!!!!!!!'+key);
               var value = data.notTakenRooms[key];
                //do something with value;

                console.log('All not booked room numbers  are ------------ !!!!!!!!!        '+value);
              this.allRooms.push(value);

            //  this.myTimesTaken.push(value.time);
              // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
        }
        this.getAvailableRooms(roomsTaken, this.allRooms);
      }


    });

  }

  distinctRoomArray=[];
  arr2=[];
  getAvailableRooms(roomsTaken, aRooms){

  console.log('not booked rooms are   '+aRooms);
  console.log('room and time taken are    '+roomsTaken+'       '+ '    '+this.selectedDate+ '     '+this.roomType+'    '+this.floor);


  //for(var i in roomsTaken){

    this.roomService.getDistinctBookedRooms(this.roomType,this.floor,this.selectedDate).subscribe(data => {

      if(!data.success){
        this.message=data.message;
        this.messageClass=data.messageClass;
      }  else {

         console.log('we have some available rooms and times');
    //this.rest1=true;
    //this.true1=true;
  //console.log('value of data.result     '+data.bookedRooms);
         for(var key in data.distinctBookedRooms) {
         console.log('value of key is !!!!!!!!!!!!!'+key);
                var value = data.distinctBookedRooms[key];
                 //do something with value;
         console.log(' room and times taken  are       '+value);
    this.distinctRoomArray.push(value);
              // this.availableRooms.push(value.room);
          //     this.notAvailableTimes.push(value.time);

              //this.myTimes.push(value.time);
          //      console.log('the times lready booked  are  ****************'+ this.notAvailableTimes);

  console.log('distinct room array is    '+this.distinctRoomArray);
  this.getBookedTimesForDistinctRooms(this.roomType,this.floor,this.selectedDate,value, aRooms);

        //this.getNotBookedTimes(this.roomType,this.floor,this.selectedDate,value.room,value.time);


         }




      }


    });

  //}


  }

  bookedTimesArray=[];
  timePerRoom=[];
  getBookedTimesForDistinctRooms(roomType,floor,date,dra, aRooms){


  console.log('dra is   '+dra);

  console.log('dra is   '+aRooms);

  this.roomService.getBookedTimesForDistinctRooms(roomType,floor,date,dra).subscribe(data => {

    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    }  else {


      console.log('got booked times for distinct rooms');


  // bookedTimes


  for(var key in data.bookedTimesArray) {
  console.log('value of key is !!!!!!!!!!!!!'+key);
         var value = data.bookedTimesArray[key];
          //do something with value;


          this.timePerRoom.push(value.time);


  this.bookedTimesArray.push(value.time);


  }
  console.log(' room and times taken  are       '+dra +'     '+this.timePerRoom);
  console.log('length of array is   '+this.timePerRoom.length);

  // send to function for getting the available time


  this.getAvailableTimesForEachBookedRoom(roomType, floor, date, dra, this.timePerRoom, aRooms);



  this.timePerRoom.length=0;
    }

  });




  }

  getBookedTimesForDistinctRooms1(roomType,floor,date,dra){


  console.log('dra is   '+dra);

  this.roomService.getBookedTimesForDistinctRooms(roomType,floor,date,dra).subscribe(data => {

    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    }  else {


      console.log('got booked times for distinct rooms');


  // bookedTimes


  for(var key in data.bookedTimesArray) {
  console.log('value of key is !!!!!!!!!!!!!'+key);
         var value = data.bookedTimesArray[key];
          //do something with value;


          this.timePerRoom.push(value.time);


  this.bookedTimesArray.push(value.time);


  }
  console.log(' room and times taken  are       '+dra +'     '+this.timePerRoom);
  console.log('length of array is   '+this.timePerRoom.length);

  // send to function for getting the available time


  this.getAvailableTimesForEachBookedRoom1(roomType, floor, date, dra, this.timePerRoom);



  this.timePerRoom.length=0;
    }

  });




  }



  //function to get the available times per each booked rooom

  availableTimesArray=[];
  tot=[];


  roomm =[];
  getAvailableTimesForEachBookedRoom(roomType,floor,date,room, times, aRooms){
  this.true1=true;
  console.log('aRooms    '+aRooms);
  this.roomService.getAvailableTimesForEachBookedRoom(roomType,floor,date,room, times).subscribe(data => {

  console.log('okay so the room is     '+room);
    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    }  else {

      console.log('value of true1 is   '+this.true1);

      console.log('getAvailableTimesForEachBookedRoom function');


  //availableTimesArray



  console.log('room is    '+this.roomm);
  for(var key in data.availableTimesArray) {
  console.log('value of key is !!!!!!!!!!!!!'+key);
         var value = data.availableTimesArray[key];
          //do something with value;


  this.availableTimesArray.push(value.time);

  //this.tot.push(value.time);

  }

  this.roomm.push(room);
  this.getTimesForNotBookedRooms(roomType,floor,date, this.roomm,room,this.availableTimesArray, aRooms);
  console.log(' room and times available  are       '+room +'     '+this.availableTimesArray);

  this.availableTimesArray.length=0;

    }


  });


  }




  aroomtime=[];
  getTimesForNotBookedRooms(roomType,floor,date,roomm,room,availableTimesArray, aRooms){


  console.log('line 747   '+roomm + '    '+availableTimesArray);




    for(var i in this.roomm){
    this.aroomtime.push(availableTimesArray);

    }


    for(var i in this.roomm){

    console.log('a room   '+this.roomm[i]);
    console.log('a time   '+ this.aroomtime[i]);
    }



    for(var i in aRooms){

      this.roomm.push(aRooms[i]);


    }

    for(var i in this.roomm){

    console.log('a room   '+this.roomm[i]);

    }

  for(var i in aRooms){

  this.roomService.getTimesForNotBookedRooms(roomType,floor,date,aRooms[i]).subscribe(data => {

    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    } else {
      this.rest1=false;
      this.true1=true;


    //console.log('line 773    '+this.roomm+'    '+availableTimesArray);

      for(var key in data.aroomtime) {
      console.log('value of key is !!!!!!!!!!!!!'+key);
             var value = data.aroomtime[key];
              //do something with value;

  console.log('line 798    '+value.time);
    this.aroomtime.push(value.time);

  console.log('line 801   '+this.aroomtime);


      //this.tot.push(value.time);

      }


      for(var i in this.roomm){
        console.log('line 771    '+this.roomm[i]+'    '+this.aroomtime[i]);

      }
    }

  });

  }



  }

  getAvailableTimesForEachBookedRoom1(roomType,floor,date,room, times){

  console.log('line 825 room is   '+room);
  console.log('line 826    '+ times.length);


  if(times.length!=0){
    this.roomService.getAvailableTimesForEachBookedRoom(roomType,floor,date,room, times).subscribe(data => {


      if(!data.success){
        this.message=data.message;
        this.messageClass=data.messageClass;
      }  else {
        this.rest1=false;
      this.true1=false;
        console.log('value of true1 is   '+this.true1);

        console.log('getAvailableTimesForEachBookedRoom function');


    //availableTimesArray



    for(var key in data.availableTimesArray) {
    console.log('value of key is !!!!!!!!!!!!!'+key);
           var value = data.availableTimesArray[key];
            //do something with value;

    console.log('availale time iss     '+ value.room +'     '+value.time);
    this.availableTimesArray.push(value.time);
    //this.roomm.push(value.room);
    this.tot.push(value.time);

    }
  if(this.tot.length===0){
  this.restDetail1=false;
    this.message='No empty slots availale for this room';
    console.log('message   '+this.message);
    this.messageClass='alert alert-danger';
    setTimeout(() => {
      this.router.navigate(['/group']); // Route users to blog page
    }, 2000);
  }
    console.log(' room and times available  are       '+room +'     '+this.tot);

    this.availableTimesArray.length=0;

      }


    });


  } else {

  // you have selected a room that has never been booked



  this.roomService.getTimesForNotBookedRooms(roomType,floor,date,room).subscribe(data => {
    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    } else {

  console.log('you have selected a room that has never been booked ');

  // aroomtime


  for(var key in data.aroomtime) {
  console.log('value of key is !!!!!!!!!!!!!'+key);
         var value = data.aroomtime[key];
          //do something with value;

  console.log('availale time iss     '+ value.room +'     '+value.time);
  this.availableTimesArray.push(value.time);
  //this.roomm.push(value.room);
  this.tot.push(value.time);

  }

    }


  });




  }


  }






  ttt=[];
  resultTimes=[];

  getNotBookedTimes(roomType, floor, date,room,time){



  this.ttt.push(time);
    console.log('room and time taken are    '+roomType+'       '+ '    '+floor+ '     '+date+'    '+room+'    '+time);


  this.roomService.getNotBookedTimes(roomType, floor, date,room,time).subscribe(data => {


    if(!data.success){
      this.message=data.message;
      this.messageClass=data.messageClass;
    } else {


      console.log('get not booked times success      !!!!!!!!!! ');

  // notBookedTimes

  if(data.notBookedTimes===undefined){

    console.log('its undefined');
  }


  if(data.notBookedTimes!==undefined){
    console.log('it is not undefined');
  }



  //console.log('not booked times are   '+data.notBookedTimes);

  //console.log('time that is available is     '+ 'room is   '+room + '=>   '+data.notBookedTimes.time);

  for(var key in data.notBookedTimes) {
  console.log('value of key is !!!!!!!!!!!!!'+key);
         var value = data.notBookedTimes[key];
          //do something with value;
  console.log(' room nd times available   are       '+room+'       '+value.time);

       // this.availableRooms.push(value.room);
   //     this.notAvailableTimes.push(value.time);

       //this.myTimes.push(value.time);
   //      console.log('the times lready booked  are  ****************'+ this.notAvailableTimes);





  }


    }


  });

  }


  selectFloor(){

  this.floor='first';
  this.test=true;
  this.floorType=true;
  //  this.getRooms();



  }

  selectFloor1(){
  this.test=true;
  this.floor='second';
  this.floorType=true;
  //  this.getRooms();
  }




}
