import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ApicallService } from './services/apicall.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookCheapWebsite';

  constructor(public router: Router, public apicall: ApicallService) {
   
}
}
