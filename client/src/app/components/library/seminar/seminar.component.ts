import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-seminar',
  templateUrl: './seminar.component.html',
  styleUrls: ['./seminar.component.css']
})
export class SeminarComponent implements OnInit {

  constructor(  private location: Location) { }




  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }


}
