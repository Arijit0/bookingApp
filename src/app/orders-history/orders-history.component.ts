import { Component, OnInit } from '@angular/core';
import{ApicallService} from '../services/apicall.service';
import {AppConstants} from '../AppConstants';
import { Router} from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {
  loginDetails: any;
  orderHistoryList: any=[];
  flightOrderList: any=[];
  hotelOrderList: any=[];

  constructor(private apicall:ApicallService,private router: Router) { }

  ngOnInit(): void {
    this.getOrderHistory();
  }
  getOrderHistory(){
    if(localStorage.loginDetails){
      this.loginDetails=JSON.parse(localStorage.getItem("loginDetails"));
    }
    this.apicall.orderHistoryGet(this.loginDetails.user.email,AppConstants.domainId).subscribe(resp=>{
      let response = JSON.parse(JSON.stringify(resp));
      this.orderHistoryList=response;
      this.orderHistoryList.forEach(e=>{
        if(e.BOOKING_TYPE=="flight"){
          this.flightOrderList.push(e);
        }else if(e.BOOKING_TYPE=="hotels"){
          this.hotelOrderList.push(e);
        }
      })
    })
  }
  dateFormat(timeStamp){
    return moment(timeStamp).format("DD/MM/YYYY");
  }
  numberWithCommas(x: any) {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    else return '';
  }
  gotoDetails(hash){
    this.router.navigate(["/flight-itinerary",hash]);
  }
}
