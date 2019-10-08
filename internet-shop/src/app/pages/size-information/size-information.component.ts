import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-size-information',
  templateUrl: './size-information.component.html',
  styleUrls: ['./size-information.component.scss']
})
export class SizeInformationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0,0)
  }

}
