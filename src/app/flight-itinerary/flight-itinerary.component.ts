import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';

import { ApicallService } from '../services/apicall.service';
import {AppConstants} from '../AppConstants';
declare var $: any;
@Component({
  selector: 'app-flight-itinerary',
  templateUrl: './flight-itinerary.component.html',
  styleUrls: ['./flight-itinerary.component.css']
})
export class FlightItineraryComponent implements OnInit {
  hash: any;
  bookingDetails: any=[];
  flightDetails: any=[];
  travellerDetails: any;
  loaderShow:boolean=false;
  flightClass:any=AppConstants.flightClass;
  statusJsonArray:any=AppConstants.statusJsonArray;
  getTripResp: any=[];
  eachFlightDetails: any=[];
  cancelPassengerArray:any=[];
  eachFareDetails: any=[];
  eachflightSourceCode: any;
  passengerCancelShow: boolean;
  errorModalShow: boolean;
  cancelAmountDetailArray: any=[];
  cancelSuccess: boolean;

  constructor(private myElement: ElementRef,private router: Router, private route: ActivatedRoute,private apicall: ApicallService,private location: Location) { 
    this.route.params.subscribe(params =>{
      this.hash=params['hash'];
    });
    $('.modal').modal('hide');
  }
  startTimer(display,leftTime) {
    
    let obj = this;
    let timerduration=leftTime , minutes, seconds;
    let timer = timerduration;
    let oricountdown = 0;
    if(!localStorage.countdown){
      localStorage.setItem('countdown',moment().unix().toString())
    }
  
    oricountdown = parseInt(localStorage.getItem('countdown'));
  
    let timer1 = setInterval(function () {
      timer=(timerduration - (moment().unix() - oricountdown));
      // console.log(moment().unix());
      if(--timer == 300){
        obj.apicall.errorArrayShow(["Hurry up! You have only 5 minutes to compleate this payment!"])
      }else if (--timer < 0) {
        // timer = duration;
        console.log("timeup"); 
        clearInterval(timer1);
        obj.getTripResp.wcommstatus="f-cancel-booking";
        obj.apicall.presentRoute$.subscribe(page=>{
          if(page=="/flightconfirmation"||page=="/payment"){
            obj.location.back();
          }
        });
        
        // redirect to result page
      } else {
        minutes = Math.floor(timer / 60);
        seconds = Math.floor(timer % 60);
    
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
    
          display.textContent = minutes + ":" + seconds;
          //localStorage.setItem('countdown',((parseInt(minutes)*60) + parseInt(seconds)).toString())
          //console.log((parseInt(minutes)*60) + parseInt(seconds))
          
      }
      
      
    }, 1000);
  
  }
  ngOnInit(): void {
  this.tripDetailsGet();
  }

  ngAfterViewInit() {
    $(function () {
      'use strict';//#hotelsFrom
      $('#goingTo,#leavingFrom')
        .autocomplete({
          minLength: 0,
          delay: 300,
          appendTo: "#goingTo",
          source: function (request, response) {//&& request.term.length < 10
            if (request.term.length == 0) {
              $.getJSON(
                AppConstants.url + '/s/hajaz/jsons/featuredlocation.json',
                function (airportListResp) {
                  this.airportSearchResult = [];
                  console.log(request.term.length)
                  let airportList = airportListResp;
                  airportList.forEach((v) => {
                    let str;
                    if (v.AirportCode == 'NO_RESULT_FOUND') {
                      str = 'NO RESULT FOUND';
                    } else {
                      str =
                        '(' +
                        v.AirportCode +
                        ') ' +
                        v.AirPortName +
                        ', ' +
                        v.cityName +
                        ', ' +
                        v.countryName;
                    }
                    this.airportSearchResult.push(str);
                  });

                  console.log(airportList);
                  response(this.airportSearchResult);
                }//if(request.term.length < 10)
              );
            } else if(!request.term.startsWith('(')) {

              // if (request.term!=localStorage.fromairport) 
              $.getJSON(
                AppConstants.url +
                  '/api/flightApi/airportsearch?key=' +
                  request.term,
                function (airportListResp) {
                  this.airportSearchResult = [];
                  console.log(request.term.length)
                  let airportList = airportListResp;
                  airportList.forEach((v) => {
                    let str;
                    if (v.AirportCode == 'NO_RESULT_FOUND') {
                      str = 'NO RESULT FOUND';
                    } else {
                      str =
                        '(' +
                        v.AirportCode +
                        ') ' +
                        v.AirPortName +
                        ', ' +
                        v.cityName +
                        ', ' +
                        v.countryName;
                    }
                    this.airportSearchResult.push(str);
                  });

                  console.log(airportList);
                  response(this.airportSearchResult);
                }
              );
            }
          },
        })
        .focus(function () {
          $(this).data('uiAutocomplete').search($(this).val());
        });

     
        $('#flightDepart').daterangepicker({
          singleDatePicker: true,
          minDate: moment(),
          locale: {
            format: 'D MMM YYYY',
          },
        });
     
      $(document).on('change', '#flightDepart', function () {

        //$('#flightReturn').data('daterangepicker').setMinDate(moment($('#flightDepart').val(), "D MMM YYYY"));


        $('#flightReturn').daterangepicker({
          singleDatePicker: true,
          minDate: moment($('#flightDepart').val(), "D MMM YYYY"),
          locale: {
            format: 'D MMM YYYY',
          },
        });
      });
      // Flight Return Date
      //$(document).on('focusin', '#flightReturn', function () {
        $('#flightReturn').daterangepicker({
          singleDatePicker: true,
          minDate: moment(),//moment($('#flightDepart').val(), ['D MMM YYYY']).format('YYYY-MM-DD') +'T00:00:00',
          locale: {
            format: 'D MMM YYYY',
          },
        });
      //});
    });
  }


  tripDetailsGet(){
    this.loaderShow=true
    let tripDetailJson={
      "BookingID":"",
      "hash":this.hash,
      
      
    }
    this.apicall.getTripDetails(tripDetailJson).subscribe(
      (resp) => {
        this.loaderShow=false
        let response = JSON.parse(JSON.stringify(resp));
        this.getTripResp=response.data;
        this.bookingDetails = JSON.parse(response.data.BOOKING_DATA)
        this.flightDetails=this.bookingDetails.bookflightInfo;
        console.log(this.bookingDetails);//OriginDestinationOptions
        this.travellerDetails=this.bookingDetails.AirTravelers;
        if(this.getTripResp.wcommstatus=='f-payment-pending'){
          var displayElement = this.myElement.nativeElement.querySelector('#time');
          this.startTimer(displayElement,parseInt(this.getTripResp.secvalid));
        }
        
        
      },
      (error) => {
        console.log(error);
      }
      );
  }
  contactSupport(comment){
    let contactJson={
      booking_id:this.getTripResp.BOOKING_ID,
      comment: comment,//'This is comment',
      cookie:this.bookingDetails.cookie
    }
    this.apicall.supportContact(contactJson).subscribe(
      (resp) => {
        $('.modal').modal('hide');
        // let response = JSON.parse(JSON.stringify(resp));
        // this.getTripResp=response.data;
        // this.bookingDetails = JSON.parse(response.data.BOOKING_DATA)
        // this.flightDetails=this.bookingDetails.bookflightInfo;
        // console.log(this.bookingDetails);//OriginDestinationOptions
        // this.travellerDetails=this.bookingDetails.AirTravelers;
        
        
      },
      (error) => {
        console.log(error);
      }
      );

  }
  editBooking(depart,returnn,comment){

    let editJson={
      'DepartureDate': depart,//this.flightDetails.OriginDestinationOptions[0].DepartureDate,
      'ReturnDate': returnn,//this.flightDetails.OriginDestinationOptions[1]?this.flightDetails.OriginDestinationOptions[0].DepartureDate:"",
      'booking_id': this.getTripResp.BOOKING_ID,
      'comment': comment,//'I want to Edit this flight',
      'cookie': this.bookingDetails.cookie,
      // 'goingTo': going,
      //this.flightDetails.OriginDestinationOptions[0].ArrivalAirport,
      // 'leavingFrom': leaving
      //this.flightDetails.OriginDestinationOptions[0].DepartureAirport
    }
    this.apicall.bookingEdit(editJson).subscribe(
      (resp) => {
        $('.modal').modal('hide');
        // let response = JSON.parse(JSON.stringify(resp));
        // this.getTripResp=response.data;
        // this.bookingDetails = JSON.parse(response.data.BOOKING_DATA)
        // this.flightDetails=this.bookingDetails.bookflightInfo;
        // console.log(this.bookingDetails);//OriginDestinationOptions
        // this.travellerDetails=this.bookingDetails.AirTravelers;
        
        
      },
      (error) => {
        console.log(error);
      }
      );
  }
  cancelBooking(comment,from){
    
    let cancelJson={
     
      'booking_id': this.getTripResp.BOOKING_ID,
      'cookie': this.bookingDetails.cookie
     
    }
    if(from=="passengerCancel"){
      cancelJson['AirTravelers']=this.cancelPassengerArray;
    }else{
      cancelJson['confirm']=true;
    }
    console.log(cancelJson)
    this.apicall.bookingCancel(cancelJson).subscribe(
      (resp) => {
        let response=JSON.parse(JSON.stringify(resp));

        if (response.Success) {
          if(from=="passengerCancel"){
            this.passengerCancelShow=false;
            this.cancelAmountDetailArray=response.Data.VoidQuotes;
          }else{
            this.cancelSuccess=true;
            
          }
        } else {
          this.passengerCancelShow=false;
          this.cancelSuccess=false;
          this.errorModalShow=true;
          this.apicall.errorArrayShow([response.Message]);
        }

        
        // $('.modal').modal('hide');
        // let response = JSON.parse(JSON.stringify(resp));
        // this.getTripResp=response.data;
        // this.bookingDetails = JSON.parse(response.data.BOOKING_DATA)
        // this.flightDetails=this.bookingDetails.bookflightInfo;
        // console.log(this.bookingDetails);//OriginDestinationOptions
        // this.travellerDetails=this.bookingDetails.AirTravelers;
        
        
      },
      (error) => {
        console.log(error);
      }
      );
  }
  showFlightDetails(itineraryInfo, flightDetails, isRefundable) {
    this.eachFlightDetails = flightDetails;
    this.eachFareDetails = itineraryInfo.ItinTotalFare;
    this.eachflightSourceCode=itineraryInfo.FareSourceCode;
    
  }
  goToPayment(){
    localStorage.setItem("flightBookingPendingDetails",JSON.stringify({
      BOOKING_ID:this.getTripResp.BOOKING_ID,
      hash:this.getTripResp.hash,
      amount:this.flightDetails.AirItineraryPricingInfo.ItinTotalFare.TotalFare,
      cookie:this.bookingDetails.cookie
    }))
    this.router.navigate(['/payment']);
  }
  passengerCancel(passengerDetail,event){
    if(event.target.checked){
      this.cancelPassengerArray.push(passengerDetail)
    }else{
      this.cancelPassengerArray = this.cancelPassengerArray.filter(
        (e) => e != passengerDetail
      );
    }
    console.log(this.cancelPassengerArray)
  }
  cancelClick(){
    this.passengerCancelShow=true;
    this.cancelSuccess=false;
  }
}

// http://localhost:4200/flight-itinerary/68f1cd1ee6b48776f41ff533e775fae929daf05902142a0f6bcb40fd2a066297