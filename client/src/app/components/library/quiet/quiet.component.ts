import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiet',
  templateUrl: './quiet.component.html',
  styleUrls: ['./quiet.component.css']
})
export class QuietComponent implements OnInit {

  constructor(  private location: Location) { }




  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }


}
