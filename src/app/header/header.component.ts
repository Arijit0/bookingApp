import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppConstants } from '../AppConstants';
import { ApicallService } from '../services/apicall.service';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  homepage: boolean;

  isLogin: boolean = false;

  constructor(private apicall: ApicallService, private router: Router,private route: ActivatedRoute) {
    if(!localStorage.selectedCurrency){
      localStorage.setItem('selectedCurrency', JSON.stringify(
        {
          "NAME": "Australian Dollar",
          "CODE": "036",
          "SYMBOL": "$",
          "SHORTCUT": "AUD",
          "FLAG": "au.png",
          "STATUS": "1"
        }
      ));
    }
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(res => {
      this.apicall.presentRouteIs(this.router.url)
      this.apicall.setData(this.router.url)
      if (this.router.url == '/'||this.router.url == '/hotel'||this.router.url == '/flight') {
        this.homepage = true;
      }else {
        this.homepage = false;
      }
    });
   }


  ngOnInit(): void {
    if(localStorage.loginDetails){
      this.isLogin = true;
    }
    
  }

  hotelInfoGet() {
    if(localStorage.loginDetails){
      this.isLogin = true;
    }
  }
  logout(){
    localStorage.removeItem('loginDetails');
    this.isLogin = false;
  }
  OnApplyFilter(event) {
    if (event.action=='loggedin') {
      if(localStorage.loginDetails){
        this.isLogin = true;
      }
    }
  }



}
