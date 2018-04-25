import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

messageClass;
processing= false;
message;
form: FormGroup;
previousUrl;
role;


  constructor(private formBuilder:  FormBuilder, private authService: AuthService, private router: Router, private authGuard: AuthGuard) {
  this.createForm();

  }

createForm(){
  this.form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
}

enabledForm(){

    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
}
disabledForm(){
  this.form.controls['username'].disable();
  this.form.controls['password'].disable();
}



onLoginSubmit(){
  console.log('logged in ****');
  this.processing = true;
  this.disabledForm();
  const user = {
    username: this.form.get('username').value,
    password: this.form.get('password').value,
  //  role: this.form.get('role').value
  }

  //this.authService.setUser(user);

   this.authService.login(user).subscribe(data => {
     console.log('tokentest is '+ data.token);
     if(!data.success){
       this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enabledForm(); // Enable form for editting
     } else {
       this.messageClass = 'alert alert-success'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.authService.storeUserData(data.token, data.user);
        setTimeout(() => {
       if(this.previousUrl){

        this.router.navigate([this.previousUrl]);
          }
          else {
            this.router.navigate(['/profile']);

          }
            }, 2000);
       }
   });

}

  ngOnInit() {
    if(this.authGuard.redirectUrl){
  this.messageClass = 'alert alert-danger';
  this.message = 'You must be logged in to view this page';
  this.previousUrl = this.authGuard.redirectUrl;

  this.authGuard.redirectUrl = undefined;

    }

  }

}
