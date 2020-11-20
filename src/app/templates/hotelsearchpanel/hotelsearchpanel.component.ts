import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {AppConstants} from '../../AppConstants'
import * as moment from 'moment';
import { ApicallService } from 'src/app/services/apicall.service';
declare var $: any;



export class HotelObj {

    label: string;
    value: string;
    city_code: string;
    city_name: string;
    country_code: string;
    country_name: string;
    error: string;
    hotel_id: string;
    icon: string;
    location_id: string;
    type: string;
}

@Component({
  selector: 'app-hotelsearchpanel',
  templateUrl: './hotelsearchpanel.component.html',
  styleUrls: ['./hotelsearchpanel.component.css']
})


export class HotelsearchpanelComponent implements OnInit,AfterViewInit {

  @Output()
  reply:EventEmitter<any>= new EventEmitter<any>();


  homepage: boolean;
  adultCount: number=1;
  childCount: number=0;
  roomCount: number=1;
  hotelBooking: any = "1" + ' ' + 'Room' + ' ' + '/' + ' ' + ' ' + "1" + ' ' + 'People';
  hotelsCheckIn: any = ''; 
  hotelsCheckOut: any = '';
  hotelsFrom: any;
  cityNameOnUrl: any;
  countryNameOnUrl: any;
  selectedHotel: any = {};
  typeCode: string;
  currency: any;
  loaderShow:boolean=false;
  hotelSearchJson: any;
  typeName: any;
  searchJson: any;
  Type: any;
  errorMsg: any = [];
  errorsArray: any[];
  validationMsg:any=["Please Enter City!","Please select Checkin Date!","Please select Checkout Date!"];
  errorModalShow: boolean;
  selectedCurrency: any;


  constructor(private router: Router, private route: ActivatedRoute,private apicall: ApicallService) { 

    if(localStorage.selectedCurrency){
      this.selectedCurrency=JSON.parse(localStorage.getItem("selectedCurrency"));
      
    }else{
      this.selectedCurrency=AppConstants.defaultCurrencyCode;
     
    }
    this.currency=this.selectedCurrency.SHORTCUT;
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd ) {
        console.log(event['url'])
        if (this.router.url == '/'||this.router.url == '/hotel'||this.router.url == '/flight') {
          this.homepage=true;
        } else {

          
          this.homepage=false;

      
        
        }
      }
    });
  }
 

  ngOnInit(): void {

    // this.loaderShow = true;
    this.hotelsCheckIn = moment().add(7, 'days').format("D MMM YYYY");
    this.hotelsCheckOut = moment().add(10, 'days').format("D MMM YYYY");

    if(this.homepage){
      if(localStorage.hotelSearchDetail){
        let searchdetl = JSON.parse(localStorage.getItem('hotelSearchDetail'));
        this.Type = searchdetl.type;
        this.typeCode = searchdetl.type_code;
        this.hotelsFrom = searchdetl.type_name;
        this.hotelsCheckIn = moment(searchdetl.checkIn, ['YYYY-MM-DD']).format('D MMM YYYY');
        this.hotelsCheckOut =  moment(searchdetl.checkOut, ['YYYY-MM-DD']).format('D MMM YYYY');
        this.roomCount=searchdetl.roomCount;
        this.adultCount=searchdetl.adult;
        this.childCount=searchdetl.childCount;
        this.currency = this.selectedCurrency.SHORTCUT;
      }

      if(localStorage.selectedHotel){
        this.selectedHotel = JSON.parse(localStorage.getItem('selectedHotel'));

        if(this.Type == "city") this.selectedHotel.city_code = this.typeCode;
        if(this.Type == "hotel") this.selectedHotel.hotel_id = this.typeCode;
        if(this.Type == "location") this.selectedHotel.location_id = this.typeCode;
          
        this.selectedHotel.value = this.hotelsFrom;

        localStorage.setItem('selectedHotel', JSON.stringify(this.selectedHotel));
      }
    } else {
      
        this.Type = this.route.snapshot.paramMap.get('type');
        this.typeCode = this.route.snapshot.paramMap.get('type_code');
        this.hotelsFrom = this.route.snapshot.paramMap.get('type_name');
        this.hotelsCheckIn =  moment(this.route.snapshot.paramMap.get('checkIn'), ['YYYY-MM-DD']).format('D MMM YYYY');
        this.hotelsCheckOut =  moment(this.route.snapshot.paramMap.get('checkOut'), ['YYYY-MM-DD']).format('D MMM YYYY');
        this.roomCount =  parseInt(this.route.snapshot.paramMap.get('rooms'));
        this.adultCount =  parseInt(this.route.snapshot.paramMap.get('adult'));
        this.childCount =  parseInt(this.route.snapshot.paramMap.get('child'));
        this.currency =  this.route.snapshot.paramMap.get('currency');

        if(localStorage.selectedHotel){

          this.selectedHotel = JSON.parse(localStorage.getItem('selectedHotel'));

        if (this.Type=="city") this.selectedHotel.city_code = this.typeCode;
        if (this.Type=="hotel") this.selectedHotel.hotel_id = this.typeCode;
          if(this.Type == "location") this.selectedHotel.location_id = this.typeCode;

        this.selectedHotel.value = this.hotelsFrom;

        //this.selectedHotel.city_name - this.hotelsFrom
        //this.selectedHotel.country_name - this.hotelsFrom

        localStorage.setItem('selectedHotel',JSON.stringify(this.selectedHotel));
    }

    }

     this.hotelBookingCount();

  } 


  ngAfterViewInit(){

    var self = this;
    
    $(function() {
      
      'use strict';
    $('#hotelsFrom').autocomplete({
      minLength: 0,
      delay: 300,
      source: function (request, response) {
        if(request.term.length==0){
          $.getJSON(
            AppConstants.url+"/s/hajaz/jsons/featuredlocationhotel.json",
          function (hotelListResp) {
            
    

            response( $.map( hotelListResp, function( item ) {
                  var object = new HotelObj();
                  object.label = (item.value=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.value);
                  object.value = (item.value=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.value);
                  object.city_code = item.city_code;
                  object.city_name = item.city_name;
                  object.country_code = item.country_code;
                  object.country_name = item.country_name;
                  object.error = item.error;
                  object.hotel_id = item.hotel_id;
                  object.icon = item.icon;
                  object.location_id = item.location_id;
                  object.type = item.type;
                  return object;
              }));
          }
        );
        }else{
          $.getJSON(
            AppConstants.url+'/api/hotelsearch/hotelnamesearch?key='+request.term,
             function (hotelListResp) {
               response( $.map( hotelListResp, function( item ) {
                 
                  var object = new HotelObj();
                  object.label = (item.value=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.value);
                  object.value = (item.value=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.value);
                  object.city_code = item.city_code;
                  object.city_name = item.city_name;
                  object.country_code = item.country_code;
                  object.country_name = item.country_name;
                  object.error = item.error;
                  object.hotel_id = item.hotel_id;
                  object.icon = item.icon;
                  object.location_id = item.location_id;
                  object.type = item.type;
                  return object;
              }));
             }
           );
        }
        
      },
      select: function (event, ui) {

        let selectedHotel = ui.item;
        // console.log(selectedHotel);
        self.getValues(selectedHotel);
      }
  }).focus(function(){          

      $(this).data("uiAutocomplete").search($(this).val());
      // console.log(this.selectedHotel);
  });
  
    // Hotels Check In Date
	 $('#hotelsCheckIn').daterangepicker({
    singleDatePicker: true,
    minDate: moment(),
    locale: {
      format: 'D MMM YYYY',
    },
  });

  $(document).on('change', '#hotelsCheckIn', function () {

    $('#hotelsCheckOut').daterangepicker({
      singleDatePicker: true,
      minDate: moment($('#hotelsCheckIn').val(), "D MMM YYYY"),
      locale: {
        format: 'D MMM YYYY',
      },
    });
  });

  
  // Hotels Check Out Date
  $('#hotelsCheckOut').daterangepicker({
    singleDatePicker: true,
    minDate: moment(),
    locale: {
      format: 'D MMM YYYY',
    },
  });

  });
  
}

 

  hotelIncDec(forField,action){
    if(forField=="adults"){
      if(action=="plus"){
        if(this.adultCount<20){
          this.adultCount+=1;
          this.hotelBookingCount();
        }
        
      }else if(action=="minus"){
        if(this.adultCount>1){
          this.adultCount-=1;
          this.hotelBookingCount();
        }
        
      }//adultCount
    }else if(forField=="children"){
      if(action=="plus"){
        if(this.childCount<17){
          this.childCount+=1;
          this.hotelBookingCount();
        }
        
      }else if(action=="minus"){
        if(this.childCount>0){
          this.childCount-=1;
          this.hotelBookingCount();
        }
        
      }//childCount
    }else if(forField=="room"){
      if(action=="plus"){
        if(this.roomCount<5){
          this.roomCount+=1;

          this.hotelBookingCount();
        }
        
      }else if(action=="minus"){
        if(this.roomCount>1){
          this.roomCount-=1;
          this.hotelBookingCount();
        }
        
      }//roomCount
    }
        
    }
  
  

  hotelBookingCount(){
    let totalPeopleCount = this.adultCount+this.childCount;
    let totalRoomCount = this.roomCount;
    this.hotelBooking = totalRoomCount + ' ' + 'Room' + ' ' + '/' + ' ' + ' ' + totalPeopleCount + ' ' + 'People' ;
  }

  getValues(selectedHotel) {
    this.selectedHotel = selectedHotel;
    this.hotelsFrom = this.selectedHotel.value;

    console.log(this.selectedHotel);

    localStorage.setItem('selectedHotel',JSON.stringify(this.selectedHotel));
  }

  validationCheck(){
    this.errorsArray=[];

    if(!$('#hotelsFrom').val()) this.errorsArray.push(this.validationMsg[0]);
    if(!$('#hotelsCheckIn').val()) this.errorsArray.push(this.validationMsg[1]);
    if(!$('#hotelsCheckOut').val()) this.errorsArray.push(this.validationMsg[2]);
    
    if(this.errorsArray.length!=0){
      this.apicall.errorArrayShow(this.errorsArray);
      this.errorModalShow=true;
      return false;
    }else{
      this.errorModalShow=false;
      return true;
    }
  }

  hotelSearch(){

    let city_code = this.selectedHotel.city_code;
    let hotel_id = this.selectedHotel.hotel_id;
    let location_id = this.selectedHotel.location_id;
    this.hotelsFrom = this.selectedHotel.value;

    

  //  this.errorMsg.push(console.log("Please Select a City"));

      if(this.validationCheck()) {

        // this.searchJson={
        //   "hotelsFrom":$('#hotelsFrom').val(), //this.hotelsFrom
        //   "hotelsCheckIn":moment($('#hotelsCheckIn').val()).format('YYYY-MM-DD'),
        //    "hotelsCheckOut": moment($('#hotelsCheckOut').val()).format('YYYY-MM-DD'),
        //   "adultCount":this.adultCount,
        //   "childCount":this.childCount,
        //   "roomCount":this.roomCount,
        //   "currency": this.currency  //It changes
        // }
      
        
      if(this.selectedHotel.type == "hotel") {
        this.Type = this.selectedHotel.type;
        // this.typeCode = this.selectedHotel.city_code;
        this.hotelsFrom = this.selectedHotel.value;
  
        this.hotelSearchJson = {
          "type": this.Type,
          "type_code": hotel_id,
          "type_name": this.hotelsFrom,
          "checkIn": moment($('#hotelsCheckIn').val()).format('YYYY-MM-DD'),
          "checkOut":  moment($('#hotelsCheckOut').val()).format('YYYY-MM-DD'),
          "roomCount": this.roomCount,
          "childCount": this.childCount,
          "adult": this.adultCount,
          "req_currency": this.currency,
          "currency": "373"
        };
  
        localStorage.setItem('hotelSearchDetail', JSON.stringify(this.hotelSearchJson));
  
      this.router.navigate(['/hotelresults', this.hotelSearchJson.type,this.hotelSearchJson.type_code,this.hotelSearchJson.type_name,this.hotelSearchJson.checkIn,this.hotelSearchJson.checkOut,this.hotelSearchJson.roomCount,this.hotelSearchJson.adult,this.hotelSearchJson.childCount,this.hotelSearchJson.req_currency]); 

       
  
      
      }
  
      if(this.selectedHotel.type == "city") {
        this.Type = this.selectedHotel.type;
        this.hotelsFrom = this.selectedHotel.value;
  
       
        this.hotelSearchJson = {
          "type": this.Type,
          "type_code": city_code,
          "type_name": this.hotelsFrom,
          "checkIn": moment($('#hotelsCheckIn').val()).format('YYYY-MM-DD'),
          "checkOut":  moment($('#hotelsCheckOut').val()).format('YYYY-MM-DD'),
          "roomCount": this.roomCount,
          "childCount": this.childCount,
          "adult": this.adultCount,
          "req_currency": this.currency,
          "currency": "373"
        };
  
        localStorage.setItem('hotelSearchDetail', JSON.stringify(this.hotelSearchJson));
  
        
        this.router.navigate(['/hotelresults', this.hotelSearchJson.type,this.hotelSearchJson.type_code,this.hotelSearchJson.type_name,this.hotelSearchJson.checkIn,this.hotelSearchJson.checkOut,this.hotelSearchJson.roomCount,this.hotelSearchJson.adult,this.hotelSearchJson.childCount,this.hotelSearchJson.req_currency]); 

       
      }
  
      if(this.selectedHotel.type == "location") {
        this.Type = this.selectedHotel.type;
        this.hotelsFrom = this.selectedHotel.value;
       
        this.hotelSearchJson = {
          "type": this.Type,
          "type_code": location_id,
          "type_name": this.hotelsFrom,
          "checkIn": moment($('#hotelsCheckIn').val()).format('YYYY-MM-DD'),
          "checkOut":  moment($('#hotelsCheckOut').val()).format('YYYY-MM-DD'),
          "roomCount": this.roomCount,
          "childCount": this.childCount,
          "adult": this.adultCount,
          "req_currency": this.currency,
          "currency": "373"
        };
  
        localStorage.setItem('hotelSearchDetail', JSON.stringify(this.hotelSearchJson));
  
        this.router.navigate(['/hotelresults', this.hotelSearchJson.type,this.hotelSearchJson.type_code,this.hotelSearchJson.type_name,this.hotelSearchJson.checkIn,this.hotelSearchJson.checkOut,this.hotelSearchJson.roomCount,this.hotelSearchJson.adult,this.hotelSearchJson.childCount,this.hotelSearchJson.req_currency]);  


      }
  
      // 'hotelresults/:type/:type_code/:type_name/:checkIn/:checkOut/rooms/:adult/:child/
  
      //Working Hardcoded URL
  
      // this.router.navigate(['/hotelresults','city',454,'14-01-2021','20-01-2021',1,0,'373']);
  

    }

    }

}
