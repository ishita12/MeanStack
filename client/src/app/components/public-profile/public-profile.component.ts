import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {

currentUrl;
username='';
email='';
foundProfile=false;
message;
messageClass;
msg=false;
loggedInUser;
cForm;
processing=false;

  constructor(

    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private blogService: BlogService,
    private chatService: ChatService

  ) {
this.createChatForm();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL parameters on page load
    console.log('profile username is    '+this.currentUrl.username);
      this.authService.getPublicProfile(this.currentUrl.username).subscribe(data => {
      // console.log('user is  '+data.user.username);
        if (!data.success) {
            console.log('errrrrrr');
          this.messageClass = 'alert alert-danger'; // Return bootstrap error class
            this.message = 'USER NOT FOUND'; // Return error message
        } else {
          console.log('data ');
          this.messageClass = 'alert alert-success';

          console.log('message is   '+data);
          this.username = data.user.username; // Save the username for use in HTML
          this.email = data.user.email; // Save the email for use in HTML
          this.foundProfile = true;
        }
      });



      this.authService.getProfile().subscribe(profile => {
      //  console.log('user role is  '+profile.user.role);
        this.loggedInUser = profile.user.username; // Set username
     console.log('logged in  username is    '+this.loggedInUser);
      });


  }


  goBack() {
    this.location.back();
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


onSubmit(){
this.msg=false;
this.processing=true;

const chat = {
profileUsername: this.currentUrl.username,
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

    // Clear form data after two seconds
    setTimeout(() => {

      this.cForm.reset(); // Reset all form fields

    }, 2000);
  }
});






}



chat(){
this.msg=true;
this.processing=false;

}

}
