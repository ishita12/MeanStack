import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class RoomService {

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




  newPost(post){
    this.createAuthenticationHeaders();
    console.log('inside newPost service    '+post.rtype);
    return this.http.post(this.domain + '/rooms/newPost', post, this.options).map(res => res.json());


  }

  saveData(finalData){
    this.createAuthenticationHeaders();
    console.log('inside saveData service    '+finalData.time);
    return this.http.post(this.domain + '/rooms/saveData', finalData, this.options).map(res => res.json());

  }


  saveData1(finalData){
    this.createAuthenticationHeaders();
    console.log('inside saveData1 service    '+finalData.date);
    return this.http.post(this.domain + '/rooms/saveData1', finalData, this.options).map(res => res.json());

  }


  getAvailableRooms(roomsTaken, selectedDate, roomType, floor){

    this.createAuthenticationHeaders();
    console.log('inside getAvailableRooms service    '+roomsTaken+'     '+' '+selectedDate+'   '+roomType+'   '+floor);


    return this.http.get(this.domain + '/rooms/getAvailableRooms/'+ roomsTaken +'/' + selectedDate + '/'+ roomType + '/'+ floor, this.options).map(res => res.json());

  }



getTime(roomType, floor, date, room){

  this.createAuthenticationHeaders();
  console.log('inside getTime service    '+roomType+'     '+' '+floor+'   '+date+'   '+room);


  return this.http.get(this.domain + '/rooms/getTime/'+ roomType +'/' + floor + '/'+ date + '/'+ room, this.options).map(res => res.json());


}

getRooms(roomType, floor, selectedDate){

console.log('room type and floor are   '+ roomType+  '   '+ floor);
  this.createAuthenticationHeaders();
  return this.http.get(this.domain + '/rooms/getRooms/' + roomType + '/' + floor + '/' + selectedDate, this.options).map(res => res.json());

}


getTimeSlots(roomType, floor, date, room){

  console.log('room type and floor are   '+ roomType+  '   '+ floor+'  '+date+'   '+room);
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/rooms/getTimeSlots/' + roomType + '/' + floor + '/' + date + '/' + room, this.options).map(res => res.json());

}


getBookedRooms(roomType,floor,date){
console.log('room type and floor and date are   '+ roomType+  '   '+ floor + '    '+date);
this.createAuthenticationHeaders();
return this.http.get(this.domain + '/rooms/getBookedRooms/' + roomType + '/' + floor + '/'+ date, this.options).map(res => res.json());



}

getDistinctBookedRooms(roomType,floor,date){

  console.log('room type and floor and date are   '+ roomType+  '   '+ floor + '    '+date);
  this.createAuthenticationHeaders();

  return this.http.get(this.domain + '/rooms/getDistinctBookedRooms/' + roomType + '/' + floor + '/'+ date, this.options).map(res => res.json());


}
/*
getAllRooms(roomType, floor, date){

  console.log('getAllRooms  '+ roomType+  '   '+ floor + '    '+date);
  this.createAuthenticationHeaders();

  return this.http.get(this.domain + '/rooms/getAllRooms/' + roomType + '/' + floor + '/'+ date + '/' + myRoomsTaken, this.options).map(res => res.json());

}
*/


getNotTakenRooms(roomType, floor, date, myRoomsTaken){

  console.log('getAllRooms  '+ roomType+  '   '+ floor + '    '+date);
  this.createAuthenticationHeaders();

  return this.http.get(this.domain + '/rooms/getNotTakenRooms/' + roomType + '/' + floor + '/'+ date + '/' + myRoomsTaken, this.options).map(res => res.json());

}
getBookedTimesForDistinctRooms(roomType,floor,date,dra){

  console.log('room type and floor and date are   '+ roomType+  '   '+ floor + '    '+date+ '   '+dra);
  this.createAuthenticationHeaders();

  return this.http.get(this.domain + '/rooms/getBookedTimesForDistinctRooms/' + roomType + '/' + floor + '/'+ date + '/' + dra, this.options).map(res => res.json());


}


getAvailableTimesForEachBookedRoom(roomType,floor,date,room, times){


    console.log(' getAvailableTimesForEachBookedRoom service  '+ roomType+  '   '+ floor + '    '+date+ '   '+room + '  '+times);

    this.createAuthenticationHeaders();

    return this.http.get(this.domain + '/rooms/getAvailableTimesForEachBookedRoom/' + roomType + '/' + floor + '/'+ date + '/' + room + '/' + times, this.options).map(res => res.json());



}


getTimesForNotBookedRooms(roomType,floor,date,aroom){
  console.log(' getAvailableTimesForEachBookedRoom service  '+ roomType+  '   '+ floor + '    '+date+ '   '+aroom);

  this.createAuthenticationHeaders();

  return this.http.get(this.domain + '/rooms/getTimesForNotBookedRooms/' + roomType + '/' + floor + '/'+ date + '/' + aroom , this.options).map(res => res.json());




}



checkIfRoomsAreAvailableOrNot(roomType, floor, date){
  console.log(' checkIfRoomsAreAvailableOrNot service  '+ roomType+  '   '+ floor + '    '+date);

  this.createAuthenticationHeaders();

  return this.http.get(this.domain + '/rooms/checkIfRoomsAreAvailableOrNot/' + roomType + '/' + floor + '/'+ date , this.options).map(res => res.json());




}


getBookedTimesForRooms(roomsTaken,roomType,floor,date){


  console.log('room type and floor and date are   '+ roomType+  '   '+ floor + '    '+date+'   '+roomsTaken);
  this.createAuthenticationHeaders();
  return this.http.get(this.domain + '/rooms/getBookedTimesForRooms/' + roomType + '/' + floor + '/'+ date + '/' + roomsTaken, this.options).map(res => res.json());


}


getNotBookedTimes(roomType, floor, date,room,times){


console.log('inside getNotBookedTimes  service    '+roomType+'   '+ floor+ '   '+ date+ '   '+room+ '    '+ times);

this.createAuthenticationHeaders();
return this.http.get(this.domain + '/rooms/getNotBookedTimes/' + roomType + '/' + floor + '/'+ date + '/' + room + '/' +times, this.options).map(res => res.json());



}



findMyReservations(username){

console.log('inside findMyFutureReservations service '+username);
this.createAuthenticationHeaders();


return this.http.get(this.domain+ '/rooms/findMyReservations/'+ username, this.options).map(res => res.json());


}

getReservations1(dates1, username){

  console.log('inside getReservations service '+username);
  this.createAuthenticationHeaders();
console.log('inside getReservations service '+dates1);

  return this.http.get(this.domain+ '/rooms/getReservations1/'+ username + '/' + dates1, this.options).map(res => res.json());


}


getReservations2(dates2, username){

  console.log('inside getReservations service '+username);
  this.createAuthenticationHeaders();
console.log('inside getReservations service '+dates2);

  return this.http.get(this.domain+ '/rooms/getReservations2/'+ username + '/' + dates2, this.options).map(res => res.json());


}


deleteReservation(id){
  console.log('inside deleteReservation service ');
  this.createAuthenticationHeaders();
  return this.http.delete(this.domain +'/rooms/deleteReservation/' + id, this.options).map(res => res.json());

}


}
