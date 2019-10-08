import {Component, OnInit} from '@angular/core';
import {EmailNotificationsService} from '../../shared/services/email-notifications.service';

@Component({
  selector: 'app-customers-email',
  templateUrl: './customers-email.component.html',
  styleUrls: ['./customers-email.component.scss']
})
export class CustomersEmailComponent implements OnInit {

  emails: Array<any>[] = [];

  constructor(private emailsNotif: EmailNotificationsService) {
  }

  ngOnInit() {
    this.emailsNotif.getEmail().subscribe(email => {
      if (email) {
        email.map(item => {
          console.log(item);
          this.emails.push(item);
        });
      }
    });
  }


}
