import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.pug'
})
export class AppComponent implements OnInit {

  constructor(
  ) {}

  public ngOnInit() {

  }

}
