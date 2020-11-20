import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../services/apicall.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  navigateTab: any='Personal-Information';



  constructor(private route: ActivatedRoute) {
    $('.modal').modal('hide');
    this.route.params.subscribe(params =>{
      this.navigateTab=params['tab'];
    });
   }

  loginDetails: any;

  ngOnInit(): void {
  }

  
}
