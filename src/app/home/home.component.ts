import { Component, OnInit,Renderer2,AfterViewInit } from '@angular/core';
import {Router,NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { ApicallService } from '../services/apicall.service';
import {AppConstants} from '../AppConstants';
import {Title} from "@angular/platform-browser";
import * as moment from 'moment';
import {switchMap, debounceTime,distinctUntilChanged} from 'rxjs/operators';
import {openClose,fade} from './../animations';
import { filter } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    openClose
  ],
})
export class HomeComponent implements OnInit,AfterViewInit {

  selectedAction: string = 'flights';
  popularHotels: any=[];
  popularFlights: any=[];

  constructor(private titleService:Title,private router: Router,private route: ActivatedRoute, private apicall:ApicallService,private renderer: Renderer2 ) { 
    this.titleService.setTitle("Book Cheap Flights and Hotels Online | "+AppConstants.titelUrl);
    $('.modal').modal('hide');
    if (localStorage.getItem('selectedAction')) {
        this.selectedAction = localStorage.getItem('selectedAction');
    }else{
      if(this.router.url!="/"){
        if(this.router.url=="/hotel"){
          this.selectedAction='hotels';
        }else if(this.router.url=="/flight"){
          this.selectedAction='flights';
      }
        
      }
      
    }
    
  }

  ngOnInit(): void {
    this.apicall.getPopularRoutesFromJson().subscribe(resp=>{
      let response=JSON.parse(JSON.stringify(resp));
      this.popularHotels=response.popularHotels;
      this.popularFlights=response.popularFlights;
    })
  }
  ngAfterViewInit(){
    
}
hotelSearch(eachHotels){
  $('#hotelsFrom').val(eachHotels.Location);
}
flightSearch(eachFlights){
  $('#flightFrom').val(eachFlights.From);
  $('#flightTo').val(eachFlights.To);
}
  

}
