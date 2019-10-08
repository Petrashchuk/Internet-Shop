import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router} from "@angular/router";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  {



  constructor(private route: Router) {}

@ViewChild('table', {static: false })table;

  goBack(){
    this.route.navigate(['user/home']);
  }
}
