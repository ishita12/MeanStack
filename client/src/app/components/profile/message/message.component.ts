import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { BlogService } from '../../../services/blog.service';
import { ChatService } from '../../../services/chat.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

loggedInUser;
message;
messageClass;
uuu=false;
usersList=[];
processing=false;
userFound=false;
user;
cForm;
receiver;
meUser=false;
notUser=false;
msg=false;
  constructor(

    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private chatService: ChatService



  ) { this.createChatForm();}

  ngOnInit() {

    this.authService.getProfile().subscribe(profile => {
    //  console.log('user role is  '+profile.user.role);
      this.loggedInUser = profile.user.username; // Set username
   console.log('logged in  username is    '+this.loggedInUser);
   this.getMyChatUsers(this.loggedInUser);
    });





  }



  goBack() {
    this.location.back();
  }





  onSubmit(tUser){
  this.msg=false;
  this.processing=true;
  this.receiver=tUser
console.log('receiver is   '+this.receiver);
  const chat = {
  profileUsername: this.receiver ,
  message: this.cForm.get('chat').value,
  loggedInUser: this.loggedInUser,
  sentBy: this.loggedInUser
  }

  console.log('chat details    '+chat.profileUsername+'     '+chat.message+'      '+chat.loggedInUser+ '    '+chat.sentBy);

  // Function to save blog into database
  this.chatService.newChat(chat).subscribe(data => {
    // Check if blog was saved to database or not
    if (!data.success) {
      this.messageClass = 'alert alert-danger'; // Return error class
      this.message ='category error'; // Return error message

    } else {
      this.messageClass = 'alert alert-success'; // Return success class
      this.message = data.message; // Return success message
      this.msg=false;
      this.userFound=true;
      // Clear form data after two seconds
      setTimeout(() => {

    this.getMyChatHistory(this.loggedInUser,tUser);

      }, 2000);
    }
  });






  }


  onReply(tUser){
this.receiver=tUser;
this.msg=true;
  }




    createChatForm() {
      this.cForm = this.formBuilder.group({
        chat: ['', Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200)
        ])]
      })
    }

takeUser(tUser){

this.receiver=tUser;
console.log('takeuser    is    '+tUser);
  this.authService.getProfile().subscribe(profile => {
  //  console.log('user role is  '+profile.user.role);
    this.user = profile.user.username; // Set username
 console.log('logged in  username is    '+this.user);

 this.getMyChatHistory(this.user, tUser);

  });



  console.log('chatting user is   '+tUser);
  console.log()








}

myChats;
uu;

getMyChatHistory(user, tUser){
this.uuu=true;
this.userFound=true;
this.uu=user;
    console.log('chatting user is   '+tUser);

      console.log('chatting user is   '+user);


this.chatService.getMyChatHistory(user, tUser).subscribe(data => {

  if (!data.success) {

    this.messageClass = 'alert alert-danger'; // Return bootstrap error class
      this.message = 'chat history not FOUND'; // Return error message
  } else {

       this.myChats=data.chats;

        for(var key in data.chats) {
        console.log('value of key is !!!!!!!!!!!!!'+key);
               var value = data.chats[key];

/*
            if(user===value.sentBy){
             console.log('users are   '+user+'    '+value.sentBy);
             this.meUser=true;
             this.notUser=false
             console.log('boolans  '+this.meUser+ '    '+this.notUser);
           }

if(tUser===value.sentBy){
     console.log('users are   '+tUser+'    '+value.sentBy);
  this.notUser=true;
  this.meUser=false;
   console.log('boolans  '+this.meUser+ '    '+this.notUser);
}

*/


        }





  }




});


}



getMyChatUsers(username){

console.log('user is '+username);
this.chatService.getMyChatUsers(username).subscribe(data => {
  if (!data.success) {

    this.messageClass = 'alert alert-danger'; // Return bootstrap error class
      this.message = 'USERS NOT FOUND'; // Return error message
  } else {


    for(var key in data.users) {
    console.log('value of key is !!!!!!!!!!!!!'+key);
           var value = data.users[key];
            //do something with value;
    //console.log('time is    '+value);
console.log('value of value is   '+value);
          this.usersList.push(value);
         //this.myTimes.push(value.time);
          // console.log('ishita job id are  ****************'+ this.myAppliedJobs[key]);
    }


  }





});

}










}
