import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  constructor(

      private location: Location
  ) { }

  ngOnInit() {
  }



      goBack() {
        this.location.back();
      //    window.location.reload();
      }
}
