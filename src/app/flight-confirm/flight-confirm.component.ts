import { Component, OnInit , AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ApicallService } from '../services/apicall.service';
import { Location } from '@angular/common';
import {Title} from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { AppConstants } from '../AppConstants';
import { take } from 'rxjs/operators';
declare var $: any;
export class CountryObj {

  COUNTRY_CODE: string
  label: string 
  FLAG: string
  ISO: string
  ISO3: string
  NAME: string
  NATIONALITY: string
  NICENAME: string
  PHONECODE: string
  REGION_CODE: string
  value: string;
}
@Component({
  selector: 'app-flight-confirm',
  templateUrl: './flight-confirm.component.html',
  styleUrls: ['./flight-confirm.component.css']
})
export class FlightConfirmComponent implements OnInit,AfterViewInit {
  
  randomKey: any = moment();
flightDetails:any=[];
searchDetails:any;
config:any=900;
  airlineList: any;
  airportList: any;
  cdnPath:any=AppConstants.cdnPath;
  adultCount: any;
  childCount: any;
  infantCount: any;
  fareChange: boolean=false ;
  fareChangeDetl: any;
  promoCode: any="";
  eachFlightDetails: any= {};
  eachFareDetails: any;
  eachflightSourceCode: any;
  fareRuleList: any= {};
  isFlightValidated: boolean = false;
  adultArray: any=[];
  childArray: any=[];
  infantArray: any=[];
  mealList: any;
  currency:any;
  saveFlightJson:any={};
  loginDetails: any;
  isPassportMandatory: boolean;
  validationErrorArray: any=[];
  AirTravelers: any;
  loggedIn: boolean;
  inloaderShow: boolean;
  selectedNationality: any;
  selectedResidency: any;
  selectedCurrency: any;
  constructor(private titleService:Title,private location: Location,private apicall: ApicallService,private router: Router,private myElement: ElementRef) { 
    $('.modal').modal('hide');
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
    // window.addEventListener("beforeunload", function (e) {
    //   var confirmationMessage = "\o/";
    // console.log("cond");
    //   e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
    //   return confirmationMessage;              // Gecko, WebKit, Chrome <34
    // });
    if(localStorage.currencyCode){
      this.selectedCurrency=JSON.parse(localStorage.getItem("currencyCode"));
      
    }else{
      this.selectedCurrency=AppConstants.defaultCurrencyCode;
     
    }
    this.currency=this.selectedCurrency.SHORTCUT;
    var displayElement = this.myElement.nativeElement.querySelector('#time');
    this.startTimer(displayElement);
    // this.apicall.countdownLeftTime$.subscribe(leftTime=>{
    //   displayElement.textContent = leftTime;
    // });
    
    this.mealList=AppConstants.mealList;
    //this.saveFlightJson.cookie=JSON.parse(localStorage.getItem("loginDetails")).cookie;
    if(localStorage.userDetail){
      this.saveFlightJson.Email=JSON.parse(localStorage.getItem('userDetail')).userEmail;
      this.saveFlightJson.PhoneNumber=JSON.parse(localStorage.getItem('userDetail')).userPhoneNumber;
      this.saveFlightJson.userId=JSON.parse(localStorage.getItem('userDetail')).userEmail;
    }
    if(localStorage.selectedFlight){
      this.flightDetails=JSON.parse(localStorage.getItem("selectedFlight"));
      this.isPassportMandatory=this.flightDetails.IsPassportMandatory;
      // this.currency=this.flightDetails.IsPassportMandatory
      this.airValidationCheck(this.flightDetails.AirItineraryPricingInfo.FareSourceCode);
      this.airRules(this.flightDetails.AirItineraryPricingInfo.FareSourceCode);
    }
    if(localStorage.searchDetail){
      this.searchDetails=JSON.parse(localStorage.getItem("searchDetail"));
      this.titleService.setTitle(this.searchDetails.flightFromCode+' - '+this.searchDetails.flightToCode+" Flight Confirm | "+AppConstants.titelUrl);
      this.adultCount=this.searchDetails.adultCount;
      this.childCount=this.searchDetails.childCount;
      this.infantCount=this.searchDetails.infantCount;
      this.travellerArrayCreate(this.searchDetails.adultCount,this.searchDetails.childCount,this.searchDetails.infantCount) 
    }
    if(localStorage.airlineList){
      this.airlineList=JSON.parse(localStorage.getItem("airlineList"));
    }
    if(localStorage.airportList){
      this.airportList=JSON.parse(localStorage.getItem("airportList"));
    }
    console.log(this.airportList);
    this.getUserDetail();
    
  }
  ngAfterViewInit(){
    var self = this;
    // this.fareChange = true;
    // $("#fareChange").modal();
    $(function () {
      'use strict';//#hotelsFrom
      $(document).on('focusin', '.dob', function () {
        $(this).daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 1901,
          maxDate: moment(),
          locale: {
            format: 'D MMM YYYY',
          }
        }, function(start, end, label) {
          var elemid = $(this.element[0]).attr('id');
          if (elemid.includes("DOBAdult")) {
            self.adultArray[elemid.replace("DOBAdult","")-1].DateOfBirth = moment(start).format('D MMM YYYY');
            self.travellerDetailStore('adult');
          } else if (elemid.includes("DOBChild")) {
            self.childArray[elemid.replace("DOBChild","")-1].DateOfBirth = moment(start).format('D MMM YYYY');
            self.travellerDetailStore('child');
          } else if (elemid.includes("DOBInfant")) {
            self.infantArray[elemid.replace("DOBInfant","")-1].DateOfBirth = moment(start).format('D MMM YYYY');
            self.travellerDetailStore('infant');
          }

        });
      });
      $(document).on('focusin', '.peo', function () {
        $(this).daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          minDate: moment(),
          
          locale: {
            format: 'D MMM YYYY',
          }
        }, function(start, end, label) {
          var elemid = $(this.element[0]).attr('id');
          if (elemid.includes("PassportExpiredOnAdult")) {
            self.adultArray[elemid.replace("PassportExpiredOnAdult","")-1].Passport.ExpiryDate = moment(start).format('D MMM YYYY');
            self.travellerDetailStore('adult');
          } else if (elemid.includes("PassportExpiredOnChild")) {
            self.childArray[elemid.replace("PassportExpiredOnChild","")-1].Passport.ExpiryDate = moment(start).format('D MMM YYYY');
            self.travellerDetailStore('child');
          } else if (elemid.includes("PassportExpiredOnInfant")) {
            self.infantArray[elemid.replace("PassportExpiredOnInfant","")-1].Passport.ExpiryDate = moment(start).format('D MMM YYYY');
            self.travellerDetailStore('infant');
          }

        });
      });
     // $(document).on('keypress.autocomplete', '.nationality', function() {
        $('.nationality').autocomplete({
          minLength: 0,
          delay: 300,
          source: function (request, response) {
            if(request.term.length==0){
              $.getJSON(
                AppConstants.url+'/api/hotelsearch/countrysearch?key=&lang=en',
              function (nationalityResp) {
      
                response( $.map( nationalityResp.countries, function( item ) {
                      var object = new CountryObj();
                      object.label = (item.NAME=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.NAME);
                      object.value = (item.NAME=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.NAME);
      
                      return object;
                  }));
              }
            );
            }else{
              $.getJSON(
                AppConstants.url+'/api/hotelsearch/countrysearch?key='+request.term+'&lang=en',
                 function (nationalityResp) {
                   response( $.map( nationalityResp.countries, function( item ) {
                     
                    var object = new CountryObj();
                    object.label = (item.NAME=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.NAME);
                    object.value = (item.NAME=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.NAME);
                      return object;
                  }));
                 }
               );
            }
            
          },
          select: function (event, ui) {
            //debugger
            let nationality = ui.item;
            var elemid = $(this).attr('id');
            if (elemid.includes("nationalityAdult")) {
              self.adultArray[elemid.replace("nationalityAdult","")-1].PassengerNationality = ui.item.value;
              self.travellerDetailStore('adult');
            } else if (elemid.includes("nationalityChild")) {
              self.childArray[elemid.replace("nationalityChild","")-1].PassengerNationality = ui.item.value;
              self.travellerDetailStore('child');
            } else if (elemid.includes("nationalityInfant")) {
              self.infantArray[elemid.replace("nationalityInfant","")-1].PassengerNationality = ui.item.value;
              self.travellerDetailStore('infant');
            }
           
           // self.getNationality(nationality);
          }
      }).focus(function(){          
      
          $(this).data("uiAutocomplete").search($(this).val());
      });
      $('.issueCountry').autocomplete({
        minLength: 0,
        delay: 300,
        source: function (request, response) {
          if(request.term.length==0){
            $.getJSON(
              AppConstants.url+'/api/hotelsearch/countrysearch?key=&lang=en',
            function (nationalityResp) {
    
              response( $.map( nationalityResp.countries, function( item ) {
                    var object = new CountryObj();
                    object.label = (item.NAME=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.NAME);
                    object.value = (item.NAME=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.ISO);
    
                    return object;
                }));
            }
          );
          }else{
            $.getJSON(
              AppConstants.url+'/api/hotelsearch/countrysearch?key='+request.term+'&lang=en',
               function (nationalityResp) {
                 response( $.map( nationalityResp.countries, function( item ) {
                   
                  var object = new CountryObj();
                  object.label = (item.NAME=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.NAME);
                  object.value = (item.NAME=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.ISO);
                    return object;
                }));
               }
             );
          }
          
        },
        select: function (event, ui) {
          //debugger
          let nationality = ui.item;
          var elemid = $(this).attr('id');
          
          if (elemid.includes("issueCountryAdult")) {
            self.adultArray[elemid.replace("issueCountryAdult","")-1].Passport.Country = ui.item.value;
            self.travellerDetailStore('adult');
          } else if (elemid.includes("issueCountryChild")) {
            self.childArray[elemid.replace("issueCountryChild","")-1].Passport.Country = ui.item.value;
            self.travellerDetailStore('child');
          } else if (elemid.includes("issueCountryInfant")) {
            self.infantArray[elemid.replace("issueCountryInfant","")-1].Passport.Country = ui.item.value;
            self.travellerDetailStore('infant');
          }
         // self.getNationality(nationality);
        }
    }).focus(function(){          
    
        $(this).data("uiAutocomplete").search($(this).val());
    });
    //});
    });
    
  }
 
  numberWithCommas(x:any) {
    if (x)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else
      return '';
  }
  arrayOne(n: number): any[] {
    return Array(n);
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
        if(fareChangeResp.Errors.length || !fareChangeResp.flight){
          this.fareChange = false;
          $("#fareChange").modal();
          
        }else if(fareChangeResp.flight && fareChangeResp.flight.AirItineraryPricingInfo.ItinTotalFare.TotalFare!=this.flightDetails.AirItineraryPricingInfo.ItinTotalFare.TotalFare) {
          this.fareChange = true;
          this.isFlightValidated = true;
          $("#fareChange").modal();
        }
        else {
          this.isFlightValidated = true;
        }

        if (this.isFlightValidated) {
          this.flightDetails.AirItineraryPricingInfo = fareChangeResp.flight.AirItineraryPricingInfo;
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
        this.searchDetails.flightFromCode,
        this.searchDetails.flightToCode,
        this.currency,
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
        this.currency,
      ]);
    }
  }
  promoCodeApply(){
    let promoJson={
      "originDestinationInformation": [{
        "DepartureDateTime": moment(this.flightDetails.OriginDestinationOptions[0].DepartureDate, ['D MMM YYYY']).format('YYYY-MM-DD') +'T00:00:00',
        "DestinationLocationCode": this.flightDetails.OriginDestinationOptions[0].ArrivalAirport,
        "OriginLocationCode": this.flightDetails.OriginDestinationOptions[0].DepartureAirport
      }],
      "AdultQty": this.searchDetails.adultCount,
      "ChildQty": this.searchDetails.childCount,
      "InfantQty": this.searchDetails.infantCount,
      "CabinPreference": this.searchDetails.flightClass,
      "AirTripType": this.searchDetails.tripType == 'round'?"Return":"OneWay",
      "pBookingAmount": this.flightDetails.AirItineraryPricingInfo.ItinTotalFare.TotalFare
    }
    if(this.searchDetails.tripType == 'round'){
      promoJson.originDestinationInformation.push({
        "DepartureDateTime":  moment(this.flightDetails.OriginDestinationOptions[1].DepartureDate, ['D MMM YYYY']).format('YYYY-MM-DD') +'T00:00:00',
        "DestinationLocationCode": this.flightDetails.OriginDestinationOptions[1].ArrivalAirport,
        "OriginLocationCode": this.flightDetails.OriginDestinationOptions[1].DepartureAirport
      })
    }
    this.apicall.checkCoupon(promoJson,this.promoCode).subscribe(
      (resp) => {
        if (resp.id) {
          // add more logic - {"id":1330,"COUPON_VALUE":"10.00","IS_COUPON_PERCENT":0,"minimum_amount":"0.00","maximum_amount":"0.00","date_expires":"2020-09-30T00:00:00"}
        }
        else {
          this.promoCode="";
        }

        let searchDetail = JSON.parse(localStorage.getItem('searchDetail'));
        searchDetail.discountCode = this.promoCode;

        localStorage.setItem('searchDetail', JSON.stringify(searchDetail));
        
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
  airRules(sourceCode){
    this.inloaderShow = true;
    let sourceCodeJson={
      "FareSourceCode":sourceCode
    }
    this.apicall.getAirRules(sourceCodeJson).subscribe(
      (resp) => {
        let fareruleslist=JSON.parse(JSON.stringify(resp))
        this.fareRuleList=fareruleslist.Data.FareRules;
        console.log(this.fareRuleList);
        this.inloaderShow = false;
      },
      (error) => {
        console.log(error);
        this.inloaderShow = false;
      }


      
    );

  }
  travellerArrayCreate(adult,child,infant){
    // let trvlrJson={
    //   "DateOfBirth": "",
    //   "Gender": "",
    //   "PassengerName": {
    //     "PassengerFirstName": "",
    //     "PassengerLastName": "",
    //     "PassengerTitle": ""
    //   },
    //   "PassengerType": "",
    //   "SpecialServiceRequest": {
    //     "MealPreference": "",
    //     "SeatPreference": ""
    //   },
    //   'PassengerNationality' : '',
    //   'Passport' : {
    //     "Country" : "",
    //     "ExpiryDate" : "",
    //     "PassportNumber" : ""
    //   },
    //   "ExtraServices1_1": {}
    // };
    if(localStorage.getItem("adultDetails") && adult==JSON.parse(localStorage.getItem("adultDetails")).length){
      this.adultArray=JSON.parse(localStorage.getItem("adultDetails"));
    }else{
      for(let i=0;i<adult;i++){
        //trvlrJson.PassengerType="ADT";
        this.adultArray.push({
          "DateOfBirth": "",
          "Gender": "",
          "PassengerName": {
            "PassengerFirstName": "",
            "PassengerLastName": "",
            "PassengerTitle": ""
          },
          "PassengerType": "ADT",
          "SpecialServiceRequest": {
            "MealPreference": "",
            "SeatPreference": ""
          },
          'PassengerNationality' : '',
          'Passport' : {
            "Country" : "",
            "ExpiryDate" : "",
            "PassportNumber" : ""
          },
          "ExtraServices1_1": {}
        });
      }
    }
    if(localStorage.getItem("childDetails") && child==JSON.parse(localStorage.getItem("childDetails")).length){
      this.childArray=JSON.parse(localStorage.getItem("childDetails"));
    }else{
    for(let i=0;i<child;i++){
      //trvlrJson.PassengerType="CHD";
      this.childArray.push({
        "DateOfBirth": "",
        "Gender": "",
        "PassengerName": {
          "PassengerFirstName": "",
          "PassengerLastName": "",
          "PassengerTitle": ""
        },
        "PassengerType": "CHD",
        "SpecialServiceRequest": {
          "MealPreference": "",
          "SeatPreference": ""
        },
        'PassengerNationality' : '',
        'Passport' : {
          "Country" : "",
          "ExpiryDate" : "",
          "PassportNumber" : ""
        },
        "ExtraServices1_1": {}
      })
    }
  }
  if(localStorage.getItem("infantDetails") && infant==JSON.parse(localStorage.getItem("infantDetails")).length){
    this.infantArray=JSON.parse(localStorage.getItem("infantDetails"));
  }else{
    for(let i=0;i<infant;i++){
      // trvlrJson.PassengerType="INF";
      this.infantArray.push({
        "DateOfBirth": "",
        "Gender": "",
        "PassengerName": {
          "PassengerFirstName": "",
          "PassengerLastName": "",
          "PassengerTitle": ""
        },
        "PassengerType": "INF",
        "SpecialServiceRequest": {
          "MealPreference": "",
          "SeatPreference": ""
        },
        'PassengerNationality' : '',
        'Passport' : {
          "Country" : "",
          "ExpiryDate" : "",
          "PassportNumber" : ""
        },
        "ExtraServices1_1": {}
      })
    }
  }
  }
  travelersInfoValidation(){
    let obj = this;
    obj.validationErrorArray=[]
    this.AirTravelers=this.adultArray.concat(this.childArray ,this.infantArray);
    console.log(this.AirTravelers);
    this.AirTravelers.forEach((eachtrvlr,i)=>{
      Object.keys(eachtrvlr).forEach(function (eachField) {

      if(obj.isPassportMandatory){
        if(eachField!='SpecialServiceRequest'&&eachField!='ExtraServices1_1'&&eachField!='collapsed'){
          console.log(typeof eachField);
          if(typeof eachtrvlr[eachField] == 'object'){
            Object.keys(eachtrvlr[eachField]).forEach(function (eachFieldofField) {
              if(eachtrvlr[eachField][eachFieldofField]==""){
                obj.validationErrorArray.push("Adult "+(i+1)+" "+eachFieldofField+" is Empty!");
              }
            
            })
          }else{
            if(eachtrvlr[eachField]==""){
            obj.validationErrorArray.push("Adult "+(i+1)+" "+eachField+" is Empty!")
          }
          }
            
        }
      }else{
        if(eachField!='SpecialServiceRequest'&&eachField!='ExtraServices1_1'&&eachField!='PassengerNationality'&&eachField!='Passport'&&eachField!='collapsed'){
          
          if(typeof eachtrvlr[eachField] == 'object'){
            Object.keys(eachtrvlr[eachField]).forEach(function (eachFieldofField) {
              if(eachtrvlr[eachField][eachFieldofField]==""){
                obj.validationErrorArray.push("Adult "+(i+1)+" "+eachFieldofField+" is Empty!");
              }
            })
          }else{
            if(eachtrvlr[eachField]==""){
              obj.validationErrorArray.push("Adult "+(i+1)+" "+eachField+" is Empty!")
            }
          }
            
          }
      }
    })
    })
    console.log(this.validationErrorArray)
    if(!this.saveFlightJson.Email ){
      this.validationErrorArray.push(["User email is empty!"])
    }
    if(!this.saveFlightJson.PhoneNumber){
      this.validationErrorArray.push(["User mobile number is empty!"])
    }
    if(this.validationErrorArray.length!=0){
      
      this.apicall.errorArrayShow(this.validationErrorArray);
      
      return false;
    }else{
      
      return true;
    }
  }
  // userEmailAndPhoneValidat(){
  //   if(this.saveFlightJson.Email&&this.saveFlightJson.PhoneNumber){
  //     this.apicall.errorArrayShow([]);
  //   }
  // }
  proceedToPayment(){
    if(this.travelersInfoValidation()){
    

    this.AirTravelers.forEach(e=>{
      if (e.SpecialServiceRequest.MealPreference=="" && e.SpecialServiceRequest.SeatPreference=="") {
        delete e.SpecialServiceRequest;
      } else if (e.SpecialServiceRequest.MealPreference=="") {
        delete e.SpecialServiceRequest.MealPreference;
      } else if (e.SpecialServiceRequest.SeatPreference=="") {
        delete e.SpecialServiceRequest.SeatPreference;
      }
    })

    // console.log(AirTravelers);
    let flightBookDetails= {
      "CaptchaResponse": "",
      "FareSourceCode": this.flightDetails.AirItineraryPricingInfo.FareSourceCode,
      "AreaCode": "",
      "CountryCode": "",
      "USER_ID": localStorage.loginDetails?this.saveFlightJson.userId:this.saveFlightJson.Email,
      "Email": this.saveFlightJson.Email,
      "BOOKING_TYPE": "flight",
      "PhoneNumber": this.saveFlightJson.PhoneNumber,
      "PostCode": "",
      "CURR_SYMBOL": "AUD",
      "fareRules":this.fareRuleList,
      "AirTravelers": this.AirTravelers,
      "bookflightInfo": this.flightDetails,
      "BreakDown": "",
      "baggagesHtml": "",
      "rulesHtml": [],
      "return": [],
      "airlineList":this.airlineList,
      "airportList":this.airportList,
      "language": "en",
      "miniinfo": [
        JSON.parse(localStorage.getItem('searchDetail'))
      ],
      "flightgoingDestinationFullVal": this.flightDetails.OriginDestinationOptions[0].ArrivalAirport,
      "flightleavingDestinationFullVal": this.flightDetails.OriginDestinationOptions[0].DepartureAirport,
      "paymentType": "",
      "origin": AppConstants.domainId,
      "FareType": this.flightDetails.AirItineraryPricingInfo.FareType,
      "cookie": this.saveFlightJson.cookie
    }
    localStorage.setItem('flightBookDetails', JSON.stringify(flightBookDetails));
    // localStorage.removeItem('countdown');
    this.router.navigate(['/payment']);
  }
  }
 travellerDetailStore(traveller){
  if(traveller=="adult"){
    localStorage.setItem('adultDetails', JSON.stringify(this.adultArray));
  }else if(traveller=="child"){
    localStorage.setItem('childDetails', JSON.stringify(this.childArray));
  }else if(traveller=="infant"){
    localStorage.setItem('infantDetails', JSON.stringify(this.infantArray));
  }
 }
 includeGender(traveller,i){
  if(traveller=="adult"){
    if(this.adultArray[i].PassengerName.PassengerTitle=="Mr"){
      this.adultArray[i].Gender="M";
    }else if(this.adultArray[i].PassengerName.PassengerTitle=="Mrs"){
      this.adultArray[i].Gender="F";
    }else if(this.adultArray[i].PassengerName.PassengerTitle=="Miss"){
      this.adultArray[i].Gender="F";
    }else if(this.adultArray[i].PassengerName.PassengerTitle=="Master"){
      this.adultArray[i].Gender="M";
    }else{
      this.adultArray[i].Gender="";
    }
  }else if(traveller=="child"){
    if(this.childArray[i].PassengerName.PassengerTitle=="Mr"){
      this.childArray[i].Gender="M";
    }else if(this.childArray[i].PassengerName.PassengerTitle=="Mrs"){
      this.childArray[i].Gender="F";
    }else if(this.childArray[i].PassengerName.PassengerTitle=="Miss"){
      this.childArray[i].Gender="F";
    }else if(this.childArray[i].PassengerName.PassengerTitle=="Master"){
      this.childArray[i].Gender="M";
    }else{
      this.childArray[i].Gender="";
    }
  }else if(traveller=="infant"){
    if(this.infantArray[i].PassengerName.PassengerTitle=="Mr"){
      this.infantArray[i].Gender="M";
    }else if(this.infantArray[i].PassengerName.PassengerTitle=="Mrs"){
      this.infantArray[i].Gender="F";
    }else if(this.infantArray[i].PassengerName.PassengerTitle=="Miss"){
      this.infantArray[i].Gender="F";
    }else if(this.infantArray[i].PassengerName.PassengerTitle=="Master"){
      this.infantArray[i].Gender="M";
    }else{
      this.infantArray[i].Gender="";
    }
  }
 }
  getUserDetail(){
    if(localStorage.loginDetails){
    this.apicall.userDetailGet().subscribe(res => {
      this.loggedIn = true;
      if(res.status == 'ok') {
        this.loginDetails = res;

        if (!this.loginDetails.email) this.loginDetails.email = JSON.parse(localStorage.loginDetails).user.email;

        if(!this.saveFlightJson.Email){this.saveFlightJson.Email=this.loginDetails.email;}
        if(!this.saveFlightJson.userId){this.saveFlightJson.userId=this.loginDetails.email;}
        if(!this.saveFlightJson.PhoneNumber){this.saveFlightJson.PhoneNumber=this.loginDetails.phone;}
        // this.saveFlightJson.userId=this.loginDetails.email;
        // this.saveFlightJson.PhoneNumber=this.loginDetails.phone;
        this.saveFlightJson.cookie=JSON.parse(localStorage.getItem("loginDetails")).cookie;
        // this.profileJson.country=this.loginDetails.email;
        // this.profileJson.password=this.loginDetails.email;
        // this.profileJson.revalidPassword=this.loginDetails.email;
        //JSON.parse(localStorage.getItem("airlineList"))
      }
    },
      (err) => {
        // this.alreadyExist = err;
        // console.log( this.alreadyExist.error);
      })
    }else{
      this.loggedIn = false;
    }
  }
  newPrice(){
    this.flightDetails.AirItineraryPricingInfo.ItinTotalFare.TotalFare=this.fareChangeDetl.aPricedItineraries.aPricedItinerary.aAirItineraryPricingInfo.aItinTotalFare.aTotalFare.aAmount;
  }
  countDown(left){
    console.log("countdown");
    console.log(left)
  }
  onNotify(event){
    console.log(event);
  }
  userDetailSave(){
    localStorage.setItem("userDetail",JSON.stringify({
      userEmail:this.saveFlightJson.Email,
      userPhoneNumber:this.saveFlightJson.PhoneNumber
    }))
  }
}
