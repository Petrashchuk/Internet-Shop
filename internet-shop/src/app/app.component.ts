import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as AOS from 'aos';
import {NgScrollbar} from 'ngx-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(NgScrollbar, {static: false}) scrollRef: NgScrollbar;

  ngOnInit() {
    localStorage.setItem('loggedIn', JSON.stringify({login: 'admin', pass: 'admin'}));

  }
}
