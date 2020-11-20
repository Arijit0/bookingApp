import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { paymentOptions } from '../../assets/paymentOptions';
import { Location } from '@angular/common';
import { ApicallService } from '../services/apicall.service';
import { Router} from '@angular/router';
import { AppConstants } from '../AppConstants';
import {Title} from "@angular/platform-browser";
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @ViewChild('frmFirstDate') frmFirstDate : ElementRef;
  @ViewChild('frmWireCard') frmWireCard : ElementRef;
  @ViewChild('frmPaypal') frmPaypal : ElementRef;
  @ViewChild('frmPoli') frmPoli : ElementRef;
  paymentOptionList: any=[];
  flightDetails: any=[];
  loaderShow:boolean=false;
  fareChangeDetl: any;
  fareChange: boolean;
  searchDetails: any;
  bookingErrors: any=[];
  flightBookDetails: any;
  payLang: any;
  currency:any;
  cookie:any=(localStorage.getItem('loginDetails')?JSON.parse(localStorage.getItem('loginDetails')).cookie:'')
  formFields:any={
    "TimeZone":"",
    "txnDateTime":"",
    "HashCode":"",
    "Storename":"",
    "total":"",
    "bookingID":"",
    "Currencies":"",
    "commonUrl":AppConstants.commonUrl,
    "domainId":AppConstants.domainId,
    "hash":"",
    "mainUrl":AppConstants.mainUrl,
    "selectedlang":"",
    "request_time_stamp":"",
    "merchant_account_id":"",
    "payment_method_opt":"",
    "transaction_type_opt":"",
    "ip_address":"",
    "request_signature":"",
    "business":"",
    "Email":"",
    "adult_fname":"",
    "adult_lname":"",
    "FirstPaymentUrl":AppConstants.FirstPaymentUrl,
    "WirecardPaymentUrl":AppConstants.WirecardPaymentUrl,
    "PaypalPaymentUrl":AppConstants.PaypalPaymentUrl,
    "PoliPaymentUrl":AppConstants.PoliPaymentUrl
  }
  config: any;
  durationInMinutes: number=0;
  selectedCurrency: any;
  flightAmount: any;

  constructor(private titleService:Title,private location: Location,private apicall: ApicallService,private router: Router,private myElement: ElementRef) {
    // this.payLang=AppConstants.payLang;
    // console.log(this.payLang)
    this.config=900;
    $('.modal').modal('hide');
  //this.durationInMinutes=parseInt(this.apicall.getData());
   }
   startTimer(display) {
    
    let obj = this;
    let timerduration=60 * 10 , minutes, seconds;
    let timer = timerduration;
    let oricountdown = 0;
    if(!localStorage.countdown){
      localStorage.setItem('countdown',moment().unix().toString())
    }
  
    oricountdown = parseInt(localStorage.getItem('countdown'));

    let timer1 = setInterval(function () {
      let sub = obj.apicall.getData();
      timer=(timerduration - (moment().unix() - oricountdown));
      // console.log(moment().unix());
      if(--timer == 300){
        if(sub=="/flightconfirmation"||sub=="/payment"){
          obj.apicall.errorArrayShow(["Hurry up! You have only 5 minutes to compleate this payment!"])
          }
      }else if (--timer < 0) {
        // timer = duration;
        console.log("timeup"); 
        clearInterval(timer1);
        
      if(sub=="/flightconfirmation"||sub=="/payment"){
            obj.location.back();
              //sub.unsubscribe();
          }
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
    if(localStorage.selectedCurrency){
      this.selectedCurrency=JSON.parse(localStorage.getItem("selectedCurrency"));
      
    }else{
      this.selectedCurrency=AppConstants.defaultCurrencyCode;
     
    }
    this.currency=this.selectedCurrency.SHORTCUT;
    //var durationInMinutes = 60 * 10;
    var displayElement = this.myElement.nativeElement.querySelector('#time');
    this.startTimer(displayElement);
    // this.startTimer(displayElement);
    // console.log(paymentOptions.paymentGateway);
    // this.paymentOptionList=paymentOptions.paymentGateway;
    
    if(localStorage.selectedFlight){
      this.flightDetails=JSON.parse(localStorage.getItem("selectedFlight"));
      //this.airValidationCheck(this.flightDetails.AirItineraryPricingInfo.FareSourceCode);
    }
    if(localStorage.searchDetail){
      this.searchDetails=JSON.parse(localStorage.getItem("searchDetail"));
      this.titleService.setTitle(this.searchDetails.flightFromCode+' - '+this.searchDetails.flightToCode+" Payment | "+AppConstants.titelUrl);
    }
    if(localStorage.flightBookDetails){
      this.flightBookDetails=JSON.parse(localStorage.getItem("flightBookDetails"));
      this.formFields.adult_fname=this.flightBookDetails.AirTravelers[0].PassengerName.PassengerFirstName;
      this.formFields.adult_lname=this.flightBookDetails.AirTravelers[0].PassengerName.PassengerLastName;
    }
    this.getpaymentOptions();
  }
  newPrice(){
    $('#fareChange').modal('hide');
    this.flightDetails.AirItineraryPricingInfo.ItinTotalFare.TotalFare=this.fareChangeDetl.aPricedItineraries.aPricedItinerary.aAirItineraryPricingInfo.aItinTotalFare.aTotalFare.aAmount;
  }
  getpaymentOptions(){
    this.apicall.getPaymentOptionsFromJson().subscribe(
      (resp) => {
        console.log(resp);
        this.paymentOptionList=[];
        resp.paymentOptions.forEach(v=>{
          if(v.status==1){
            // if(this.flightDetails.AirItineraryPricingInfo.FareType=='WebFare'){
            //   if(v.name!='paybycash'){
            //     this.paymentOptionList.push(v)
            //   }

            // }else{
            this.paymentOptionList.push(v)
            //}
           
          }
        })
        // this.paymentOptionList=resp.paymentOptions;
        this.payLang=resp.payLang;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  airValidationCheck(sourceCode){
    let sourceCodeJson={
      "Currency":this.currency,
      "FareSourceCode":sourceCode
    }
    this.apicall.reValidateAirFare(sourceCodeJson).subscribe(
      (resp) => {
        let fareChangeResp=JSON.parse(JSON.stringify(resp));
        this.fareChangeDetl=fareChangeResp;
        if(fareChangeResp.aError){
          this.fareChange = false;
          $("#fareChange").modal();
          
        }else if(parseFloat(fareChangeResp.aPricedItineraries.aPricedItinerary.aAirItineraryPricingInfo.aItinTotalFare.aTotalFare.aAmount)!=this.flightDetails.AirItineraryPricingInfo.ItinTotalFare.TotalFare) {
          this.fareChange = true;
          $("#fareChange").modal();
        }

        
      },
      (error) => {
        console.log(error);
      }
    );

  }
  backToFlightResult(){
    $('#fareChange').modal('hide');
    //$("#fareChange").modal();
    if (this.searchDetails.tripType == 'oneWay') {
      //:tripType/:adult/:child/:infant/:class/:depart/:return/:from/:to
      this.router.navigate([
        '/flightresults',
        'oneWay',
        this.searchDetails.adultCount,
        this.searchDetails.childCount,
        this.searchDetails.infantCount,
        this.searchDetails.flightClass,
        this.searchDetails.departDate,
        this.searchDetails.departDate,
        this.searchDetails.flightFromCode,
        this.searchDetails.flightToCode,
        'AUD',
      ]);
    } else if (this.searchDetails.tripType == 'round') {
      this.router.navigate([
        '/flightresults',
        'round',
        this.searchDetails.adultCount,
        this.searchDetails.childCount,
        this.searchDetails.infantCount,
        this.searchDetails.flightClass,
        this.searchDetails.departDate,
        this.searchDetails.returnDate,
        this.searchDetails.flightFromCode,
        this.searchDetails.flightToCode,
        'AUD',
      ]);
    }
  }
  numberWithCommas(x: any) {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    else return '';
  }

  paymentSubmit(paymentOption){
    if(localStorage.flightBookingPendingDetails){
      this.formFields.hash=JSON.parse(localStorage.getItem('flightBookingPendingDetails')).hash;
      this.formFields.bookingID=JSON.parse(localStorage.getItem('flightBookingPendingDetails')).BOOKING_ID;

      this.flightAmount=JSON.parse(localStorage.getItem('flightBookingPendingDetails')).amount;
      this.cookie=JSON.parse(localStorage.getItem('flightBookingPendingDetails')).cookie;
      this.gotopayment(paymentOption);

    }else{
    console.log(paymentOption.name);
    this.loaderShow = true;
    this.flightBookDetails.paymentType=paymentOption.name;

    for (let k in this.flightBookDetails.AirTravelers) {
      
      if (this.flightBookDetails.AirTravelers[k].Passport.Country=='' || this.flightBookDetails.AirTravelers[k].Passport.ExpiryDate=='' || this.flightBookDetails.AirTravelers[k].Passport.PassportNumber=='') {
        delete this.flightBookDetails.AirTravelers[k].Passport;
      }
    }

    this.apicall.saveFlightBooking(this.flightBookDetails).subscribe(
      (resp) => {

        if (resp.booking_id!=null) {
          this.formFields.hash=resp.hash;
          this.formFields.bookingID=resp.booking_id;
          this.flightAmount=this.flightDetails.AirItineraryPricingInfo.ItinTotalFare.TotalFare;
          this.gotopayment(paymentOption);
        } else {

          this.bookingErrors = resp;

          $("#errorModal").modal();
          this.loaderShow = false;
        }

        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  }
  gotopayment(paymentOption){
    let valToPass = this.flightAmount;
      if (AppConstants.testEnv.toString() == "true") {
        valToPass = 1.1;
      }
    
    if(paymentOption.gateway=="firstdata"){
      let paymentCallJson={
        Amount: valToPass,
        currencycode: "036",
        cookie: this.cookie,
      }
      this.apicall.paymentCall(AppConstants.commonUrl + "/firstDataPayment/createHash",paymentCallJson).subscribe(
        (resp) => {
          let response = JSON.parse(JSON.stringify(resp));
          this.formFields.HashCode = response.HashCode;
          this.formFields.Storename = response.Storename;
          this.formFields.TimeZone = response.TimeZone;
          this.formFields.txnDateTime = response.txnDateTime;
          this.formFields.total = valToPass;
          this.formFields.Currencies = "036";
          setTimeout(() => {
            this.frmFirstDate.nativeElement.submit();
          }, 1000);
          
          
        },
        (error) => {
          console.log(error);
        }
      );
    }else if(paymentOption.gateway=="wirecard"){
      this.formFields.transaction_type_opt=paymentOption.transaction_type;
      this.formFields.payment_method_opt=paymentOption.paramvalue;
      let paymentCallJson={
        Amount: valToPass,
        currencycode: "AUD",
        cookie: this.cookie,
        redirect_url:this.formFields.mainUrl +"/flight-itinerary/" +this.formFields.hash,
        oid: this.formFields.bookingID,
        requestid: this.formFields.domainId + this.formFields.bookingID,
        transaction_type: this.formFields.transaction_type_opt,
      };
      this.apicall.paymentCall(AppConstants.commonUrl + "/WireCardPayment/createHash",paymentCallJson).subscribe(
        (resp) => {
          let response = JSON.parse(JSON.stringify(resp));
          this.formFields.merchant_account_id = response.merchant_account_id;
            this.formFields.ip_address = response.ip_address;
            this.formFields.request_signature = response.request_signature;
            this.formFields.request_time_stamp = response.request_time_stamp;
            this.formFields.total = valToPass;
            this.formFields.Currencies = "AUD";
          setTimeout(() => {
            this.frmWireCard.nativeElement.submit();
          }, 1000);
          
          
        },
        (error) => {
          console.log(error);
        }
        );
    } else if(paymentOption.gateway=="paypal"){
      this.formFields.transaction_type_opt=paymentOption.transaction_type;
      this.formFields.payment_method_opt=paymentOption.paramvalue;
      let paymentCallJson={
        Amount: valToPass,
        currencycode: "AUD",
        cookie: this.cookie,
        redirect_url:this.formFields.mainUrl +"/flight-itinerary/" +this.formFields.hash,
        oid: this.formFields.bookingID,
        requestid: this.formFields.domainId + this.formFields.bookingID,
        transaction_type: this.formFields.transaction_type_opt,
      };
      this.apicall.paymentCall(AppConstants.commonUrl + "/PaypalPayment/getInfo",paymentCallJson).subscribe(
        (resp) => {
          let response = JSON.parse(JSON.stringify(resp));
          this.formFields.merchant_account_id = response.merchant_account_id;
            this.formFields.ip_address = response.ip_address;
            this.formFields.business = response.business;

            this.formFields.PaypalPaymentUrl = response.url;
           
            this.formFields.total = valToPass;
            this.formFields.Currencies = "AUD";
          setTimeout(() => {
            this.frmPaypal.nativeElement.submit();
          }, 1000);
          
          
        },
        (error) => {
          console.log(error);
        }
        );
    }else if(paymentOption.gateway=="poli"){
      this.formFields.transaction_type_opt=paymentOption.transaction_type;
      this.formFields.payment_method_opt=paymentOption.paramvalue;
      this.formFields.total = valToPass;
      this.formFields.Currencies = "AUD";
      setTimeout(() => {
        this.frmPoli.nativeElement.submit();
      }, 1000);
          
          
        
    
    }else {
      this.router.navigate(["/flight-itinerary",this.formFields.hash]);
      
    }
    localStorage.setItem("flightBookDetails",JSON.stringify(this.flightBookDetails));
  }
}
