import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../AppConstants';
import { ApicallService } from '../services/apicall.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  flightClass:any=AppConstants.flightClass;
  constructor(private apicall: ApicallService,private router: Router,) { }

  wishListData: any;
  loaderShow:boolean=false;

  ngOnInit(): void { 
    this.getFavInfo();
  }

  getFavInfo() {
    this.loaderShow = true;
    let userEmail = JSON.parse(localStorage.getItem('loginDetails')).user.email;
    this.apicall.getWishList(userEmail).subscribe(res => {
      this.wishListData = JSON.parse(res.wishlist[0].WISHLIST_DATA);
      console.log(this.wishListData);
      this.loaderShow = false;
    },
    (error) => {
      console.log(error);
    })
  }
  searchAgain(details){
    localStorage.setItem("favioriteFlightDetail",JSON.stringify({
      adultCount: details.flightAdultOption,
      childCount: details.flightChildOption,
      flightClass: details.flightClassOpt,
      flightFrom: details.leavingFrom,
      flightFromCode: details.leavingFrom,
      flightTo: details.goingTo,
      flightToCode: details.goingTo,
      infantCount: details.flightInfantOption,
      tripType: details.flightOpt,
      airline:details.flightAirlineOpt
    }))
    localStorage.setItem("searchDetail",JSON.stringify({
      adultCount: details.flightAdultOption,
      childCount: details.flightChildOption,
      departDate:  moment().add(7, 'days').format("'YYYY-MM-DD'"),
      returnDate:  moment().add(10, 'days').format("'YYYY-MM-DD'"),
      flightClass: details.flightClassOpt,
      flightFrom: details.leavingFrom,
      flightFromCode: details.leavingFrom,
      flightTo: details.goingTo,
      flightToCode: details.goingTo,
      infantCount: details.flightInfantOption,

      tripType: details.flightOpt,
    }))
    this.router.navigate(['/']);
  }
}
