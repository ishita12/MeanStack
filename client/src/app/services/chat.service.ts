
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BlogService } from './blog.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class ChatService {

  constructor(


    private authService: AuthService,
     private http: Http,
    private blogService: BlogService


   ) { }





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







newChat(chat){


  this.createAuthenticationHeaders();
  console.log('chat is   '+chat.message+'   '+chat.profileUsername+'     '+chat.loggedInUser);
  return this.http.post(this.domain + '/chats/newChat', chat, this.options).map(res => res.json());
}

getMyChatUsers(username){

  this.createAuthenticationHeaders();
  console.log('user is   '+ username);
  return this.http.get(this.domain + '/chats/getMyChatUsers/' + username, this.options).map(res => res.json());


}



getMyChatHistory(user, takeUser){

  this.createAuthenticationHeaders();
  console.log('users are   '+ user +'    '+takeUser);
  return this.http.get(this.domain + '/chats/getMyChatHistory/' + user +'/' + takeUser, this.options).map(res => res.json());



}



deleteMessage(id){
  console.log('id is  '+id);
  this.createAuthenticationHeaders(); // Create headers


    return this.http.delete(this.domain +'/chats/deleteMessage/' + id, this.options).map(res => res.json());
}


getSingleMessage(id){
console.log('id is  '+id);
this.createAuthenticationHeaders(); // Create headers
console.log('inside');
return this.http.get(this.domain + '/chats/getSingleMessage/' + id, this.options).map(res => res.json());


}






}
