import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.css']
})
export class EditMessageComponent implements OnInit {
  message;
  messageClass;
  foundMessage = false;
  processing = false;
  chat;
  currentUrl;

  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  // Function to delete blogs
  deleteMessage() {
    this.processing = true; // Disable buttons
    // Function for DELETE request
    this.chatService.deleteMessage(this.currentUrl.id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {
        this.messageClass = 'alert alert-success'; // Return bootstrap success class
        this.message = data.message; // Return success message
        // After two second timeout, route to blog page
        setTimeout(() => {
          this.router.navigate(['/message']); // Route users to blog page
        }, 2000);
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL paramaters on page load
    // Function for GET request to retrieve blog
    console.log('message id '+this.currentUrl.id);
    this.chatService.getSingleMessage(this.currentUrl.id).subscribe(data => {
      // Check if request was successfull
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        // Create the blog object to use in HTML
        this.chat = {
          profileUsername: data.message.profileUsername, // Set title
          message: data.message.message,
          loggedInUser:data.message.loggedInUser,
          sentBy:data.message.sentBy
        }

        console.log('chat delelete details  '+this.chat.profileUsername+'    '+this.chat.message+'   '+this.chat.loggedInUser+'    '+this.chat.sentBy   );
        this.foundMessage = true; // Displaly blog window
      }
    });
  }

}
