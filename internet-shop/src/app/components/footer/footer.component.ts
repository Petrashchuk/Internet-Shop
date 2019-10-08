import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {EmailNotificationsService} from '../../shared/services/email-notifications.service';
import {of} from 'rxjs';
import {takeWhile, filter} from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  public status: boolean = true;
  public id: number | string;
  public url: string;
  public myForm;

  show: boolean = true;
  show1: boolean = false;
  show2: boolean = false;
  show3: boolean = false;

  constructor(private router: Router, private notifEmail: EmailNotificationsService) {
    this.checkUrl(location.pathname);
  }

  @ViewChild('btn', {static: false}) btn;

  emails: FormControl = new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]);


  ngOnInit() {




    this.myForm = new FormGroup({
      'login': new FormControl(),
      'password': new FormControl()
    });

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.checkUrl(event.url);
      }
    });
  }

  showWriteData(target) {
    if (target.firstChild.innerHTML === 'SHOP') {
      this.show = !this.show;
    }
    else if (target.firstChild.innerHTML === 'SUPPORT') {
      this.show1 = !this.show1;
    }
    else if (target.firstChild.innerHTML === 'INFORMATION') {
      this.show2 = !this.show2;
    }
    else if (target.firstChild.innerHTML === 'ABOUT US') {
      this.show3 = !this.show3;
    }
  }

  showbyText(target) {
    if (target.innerHTML === 'ABOUT US') {
      this.show3 = !this.show3;
    }
    else if (target.innerHTML === 'INFORMATION') {
      this.show2 = !this.show2;
    }
    else if (target.innerHTML === 'SUPPORT') {
      this.show1 = !this.show1;
    }
    else {
      this.show = !this.show;
    }
  }

  showbyPhoto(target) {
    if (target.id === 'about') {
      this.show3 = !this.show3;
    }
    else if (target.id === 'info') {
      this.show2 = !this.show2;
    }
    else if (target.id === 'support') {
      this.show1 = !this.show1;
    }
    else {
      this.show = !this.show;
    }
  }


  checkvalue(event) {
    if (event.target.value) {
      this.btn.nativeElement.classList.add('disFalse');
      this.btn.nativeElement.classList.remove('inbtn')
      this.status = false;
    }
    else {
      this.status = true;
      this.btn.nativeElement.classList.remove('disFalse');
    }
  }

  sendEmail() {
    if (this.emails.valid) {
      const obj = {
        value: this.emails.value
      };
      this.notifEmail.setEmail(obj).subscribe();
      this.emails.reset();
    }
  }

  btnSmothScroll() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  @ViewChild('dis', {static: false}) dis;
  @ViewChild('adminBtn', {static: false}) adminBtn;


  checkisAdmin() {
    if (JSON.parse(localStorage.getItem('key'))) {
      this.adminBtn.nativeElement.removeAttribute('data-target');
      this.router.navigate(['/admin']);
    }
    else {
      this.adminBtn.nativeElement.setAttribute('data-target', '#AdminModal');
    }
  }

  signInLogin() {
    const login = JSON.parse(localStorage.getItem('loggedIn')).login;
    const pass = JSON.parse(localStorage.getItem('loggedIn')).pass;
    if (this.myForm.value.login === login && this.myForm.value.password === pass) {
      localStorage.setItem('key', JSON.stringify('true'));
      this.status = false;
      document.body.removeAttribute('class');
      document.body.lastElementChild.remove();
      this.adminBtn.nativeElement.removeAttribute('data-target');
      this.router.navigate(['/admin']);
      this.myForm.reset();
    }
    else {
      localStorage.setItem('key', JSON.stringify('false'));
    }
  }


  checkUrl(url: any) {
    const arr = this.router.routerState.snapshot.url.split('/');
    const id = arr[arr.length - 1];
    if (parseFloat(id)) {
      this.id = id;
    }
    if (url.match(`/user/products/${this.id}`)) {
      this.url = `/user/products/${this.id}`;
    }
    else if (url.match('/user/watch')) {
      this.url = '/user/watch';
    }
    else if (url.match('/user/home')) {
      this.url = '/user/home';
    }
    else if (url.match('/user/size_Info')) {
      this.url = '/user/size_Info';
    }
    else if (url.match('/user/contact')) {
      this.url = '/user/contact';
    }
    else if (url.match('/user/our_story')) {
      this.url = '/user/our_story';
    }
    else if (url.match('/user/mens')) {
      this.url = '/user/mens';
    }
    else if (url.match('/user/womens')) {
      this.url = '/user/womens';
    }
    else if (url.match('/user/check_out')) {
      this.url = '/user/check_out';
    }
  }
}
