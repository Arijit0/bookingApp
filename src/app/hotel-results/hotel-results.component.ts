import {AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router,Event,NavigationEnd } from '@angular/router';
import { AppConstants } from '../AppConstants';
import { ApicallService } from '../services/apicall.service';
import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
declare var $: any;


@Component({
  selector: 'app-hotel-results',
  templateUrl: './hotel-results.component.html',
  styleUrls: ['./hotel-results.component.css']
})
export class HotelResultsComponent implements OnInit,AfterViewInit  {
 
  homepage: boolean;
  adultCount: number=1;
  childCount: number=0;
  roomCount: number=1;
  hotelBooking: number;
  hotelsCheckIn: any = '';
  hotelsCheckOut: any = '';
  hotelsFrom: any;
  cityNameOnUrl: any;
  hotelSearchResults: any = [];
  cityName: any = [];
  loaderShow:boolean=false;
  searchJson: any = [];
  // filterHotelList: any = [];
  currency: any;
  // type: any = "";
  // type_code: any = "";
  // type_name: any = "";
  city: any;
  hotelListResp: any;
  fiveStar: any;
  fourStar: any;
  threeStar: any;
  twoStar: any;
  oneStar: any;
  roomsArray: any = [];
  Type: string;
  typeCode: string = '';
  typeName: string;
  hotelSearchJson: any;
  selectedCurrency: any;
  errorShow: boolean = false;
  errormsg: any;
  isLogin: boolean = false;
  favArr: any = [];
  isFavIconClicked: boolean = true;
  hotelCity: any;
  hotelCountry: any;

  constructor(private router: Router, private route: ActivatedRoute, private apicall: ApicallService) {

     $('.modal').modal('hide');
    if(localStorage.selectedCurrency){
      this.selectedCurrency=JSON.parse(localStorage.getItem("selectedCurrency"));
      
    }else{
      this.selectedCurrency=AppConstants.defaultCurrencyCode;
     
    }
    this.currency=this.selectedCurrency.SHORTCUT;
    route.params.subscribe(val => {
      this.hotelInfoGet();
    });
    
    localStorage.setItem('selectedAction','hotels');

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {

        this.apicall.setTitle(this.hotelsFrom);
      
        
    }
    });


   }
 

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }


  hotelInfoGet() {
    
    this.loaderShow = true;

    // this.selectedCurrency = JSON.parse(localStorage.getItem('selectedCurrency'));

    // if(localStorage.hotelSearchDetail) {
    //   let searchdetl = JSON.parse(localStorage.getItem('hotelSearchDetail'));
    //   if(this.route.snapshot.paramMap.get('type')==searchdetl.type ){
    //     this.Type = searchdetl.type;
    //   }else{
    //     this.Type = this.route.snapshot.paramMap.get('type');
    //   }
    //   if(this.route.snapshot.paramMap.get('type_code')==searchdetl.type_code ){
    //     this.typeCode = searchdetl.type_code;
    //   }else{
    //     this.typeCode = this.route.snapshot.paramMap.get('type_code');
    //   }
    //   if(this.route.snapshot.paramMap.get('type_name')==searchdetl.type_name ){
    //     this.hotelsFrom = searchdetl.type_name;
    //   }else{
    //     this.hotelsFrom = this.route.snapshot.paramMap.get('type_name');
    //   }
    //   if(this.route.snapshot.paramMap.get('checkIn')==searchdetl.checkIn){
    //     this.hotelsCheckIn = moment(searchdetl.checkIn, ['YYYY-MM-DD']).format('D MMM YYYY');
    //   }else{
    //     this.hotelsCheckIn =  moment(this.route.snapshot.paramMap.get('checkIn'), ['YYYY-MM-DD']).format('D MMM YYYY');
    //   }
    //   if(this.route.snapshot.paramMap.get('checkOut')==searchdetl.checkOut){
    //     this.hotelsCheckOut = moment(searchdetl.checkOut, ['YYYY-MM-DD']).format('D MMM YYYY');
    //   }else{
    //     this.hotelsCheckOut =  moment(this.route.snapshot.paramMap.get('checkOut'), ['YYYY-MM-DD']).format('D MMM YYYY');
    //   }
    //   if(this.route.snapshot.paramMap.get('rooms')==searchdetl.roomCount){
    //     this.roomCount =searchdetl.roomCount;
    //   }else{
    //     this.roomCount =  parseInt(this.route.snapshot.paramMap.get('rooms'));
    //   }
    //   if(this.route.snapshot.paramMap.get('adult')==searchdetl.adult){
    //     this.adultCount =searchdetl.adult;
    //   }else{
    //     this.adultCount =  parseInt(this.route.snapshot.paramMap.get('adult'));
    //   }
    //   if(this.route.snapshot.paramMap.get('child')==searchdetl.child){
    //     this.childCount =searchdetl.child;
    //   }else{
    //     this.childCount =  parseInt(this.route.snapshot.paramMap.get('child'));
    //   }
    //   if(this.route.snapshot.paramMap.get('currency')==this.selectedCurrency.SHORTCUT){
    //     this.currency =this.selectedCurrency.SHORTCUT;
    //   }else{
    //     this.currency =  this.route.snapshot.paramMap.get('currency');
    //   }
    // } else {
      
      this.Type = this.route.snapshot.paramMap.get('type');
      this.typeCode = this.route.snapshot.paramMap.get('type_code');
      this.hotelsFrom = this.route.snapshot.paramMap.get('type_name');
      this.hotelsCheckIn =  moment(this.route.snapshot.paramMap.get('checkIn'), ['YYYY-MM-DD']).format('D MMM YYYY');
      this.hotelsCheckOut =  moment(this.route.snapshot.paramMap.get('checkOut'), ['YYYY-MM-DD']).format('D MMM YYYY');
      this.roomCount =  parseInt(this.route.snapshot.paramMap.get('rooms'));
      this.adultCount =  parseInt(this.route.snapshot.paramMap.get('adult'));
      this.childCount =  parseInt(this.route.snapshot.paramMap.get('child'));
      this.currency =  this.route.snapshot.paramMap.get('currency');

      





      this.search()
  // }
   
    this.hotelSearch();
    this.hotelBookingCount();

    
  }

  search() {

    debugger
  //  this.errorMsg.push(console.log("Please Select a City"));

      if(!this.hotelsFrom) {
        console.log("Please Select a City");
      }else {
        
      if(this.Type == "hotel") {
  
        this.hotelSearchJson = {
          "type": this.Type,
          "type_code": this.typeCode,
          "type_name": this.hotelsFrom,
          "checkIn": moment(this.hotelsCheckIn).format('YYYY-MM-DD'),
          "checkOut":  moment(this.hotelsCheckOut).format('YYYY-MM-DD'),
          "roomCount": this.roomCount,
          "childCount": this.childCount,
          "adult": this.adultCount,
          "req_currency": this.currency,
          "min_data": true,
          "currency": "373"
        };
  
        localStorage.setItem('hotelSearchDetail', JSON.stringify(this.hotelSearchJson));
        if(this.currency!=""){this.selectedCurrency.SHORTCUT=this.currency;}
        localStorage.setItem('selectedCurrency', JSON.stringify(this.selectedCurrency));
 
      }
  
      if(this.Type == "city") {
       
        this.hotelSearchJson = {
          "type": this.Type,
          "type_code": this.typeCode,
          "type_name": this.hotelsFrom,
          "checkIn": moment(this.hotelsCheckIn).format('YYYY-MM-DD'),
          "checkOut":  moment(this.hotelsCheckOut).format('YYYY-MM-DD'),
          "roomCount": this.roomCount,
          "childCount": this.childCount,
          "adult": this.adultCount,
          "req_currency": this.currency,
          "min_data": true,
          "currency": "373"
        };
  
        localStorage.setItem('hotelSearchDetail', JSON.stringify(this.hotelSearchJson));
        if(this.currency!=""){this.selectedCurrency.SHORTCUT=this.currency;}
        localStorage.setItem('selectedCurrency', JSON.stringify(this.selectedCurrency));
 
      }
  
      if(this.Type == "location") {
       
        this.hotelSearchJson = {
          "type": this.Type,
          "type_code": this.typeCode,
          "type_name": this.hotelsFrom,
          "checkIn": moment(this.hotelsCheckIn).format('YYYY-MM-DD'),
          "checkOut":  moment(this.hotelsCheckOut).format('YYYY-MM-DD'),
          "roomCount": this.roomCount,
          "childCount": this.childCount,
          "adult": this.adultCount,
          "req_currency": this.currency,
          "min_data": true,
          "currency": "373"
        };
  
        localStorage.setItem('hotelSearchDetail', JSON.stringify(this.hotelSearchJson));
        if(this.currency!=""){this.selectedCurrency.SHORTCUT=this.currency;}
        localStorage.setItem('selectedCurrency', JSON.stringify(this.selectedCurrency));
  
      } 

    }

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
    
    let totalCount=this.adultCount+this.childCount+this.roomCount;
    this.hotelBooking=totalCount;
    
  }

   // 'details/:checkin/:checkout/:cityid/:currency/:hotelid/:language/:locationid/:pagenumber/:perpagevalue/:rooms'

  hotelSearch(){ 

    this.loaderShow = true;

    let city_code = '';
    let hotel_id = '';
    let location_id = '';

    if(this.Type == "city") {
      city_code = this.typeCode;
    } else if(this.Type == "hotel") {
      hotel_id = this.typeCode;
    } else {
      location_id = this.typeCode;
    }
    
    for (let index = 0; index < this.roomCount; index++) {

      this.roomsArray.push( {
        "adults": this.adultCount, 
        "age": [], 
        "children": this.childCount,
        "nationality": 20,
        "residency": 20
      });

    }
    

    this.searchJson = {
      "checkin":moment(this.hotelsCheckIn).format('YYYY-MM-DD'),
      "checkout":moment(this.hotelsCheckOut).format('YYYY-MM-DD'),
      "city_id": city_code,
      "cookie": "",
      "currency": "373",
      "req_currency": this.currency,
      "min_data": true,
      "hotel_id": hotel_id,
      "language":"en",
      "location_id": location_id,
      "pagenumber":0,
      "perpagevalue":250,
      "rooms": this.roomsArray
     
    }

    

    this.apicall.hotelSearchResult(this.searchJson).subscribe(res => {

      
      
      console.log(res);

      this.loaderShow = false;
     
      if (res.data.length == 0) {
        this.errorShow = true;
        this.errormsg = "Hotels not found, Please try again!";
        this.apicall.errorArrayShow(["Hotels not found, Please try again!"]);
      }

      this.hotelSearchResults = res.data;
      this.hotelCity = this.hotelSearchResults[0].local_db_data[0].HOTEL_CITY;
      this.hotelCountry = this.hotelSearchResults[0].local_db_data[0].HOTEL_COUNTRY;

      this.hotelListResp = res;

      let obj = this;
      $('#amount').val(
        obj.currency + " " + obj.numberWithCommas(obj.hotelListResp.minprice_curr) + ' - ' + obj.currency + " " + obj.numberWithCommas(obj.hotelListResp.maxprice_curr)
      );
      $('#slider-range').slider({
        range: true,
        min: obj.hotelListResp.minprice_curr,
        max: obj.hotelListResp.maxprice_curr,
        values: [obj.hotelListResp.minprice_curr, obj.hotelListResp.maxprice_curr],
        slide: function (event, ui) {
          $('#amount').val(obj.currency + " " + obj.numberWithCommas(ui.values[0]) + ' - ' + obj.currency + " " + obj.numberWithCommas(ui.values[1]));
          obj.priceFilter(ui);
        },
      });
    },
      (error) => {
        console.log(error);
      })
  }


  // navigationExtras: NavigationExtras = {
  //   queryParams: this.searchJson.rooms
  // };

  numberWithCommas(x: any) {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    else return '';
  }

  hotelroomInfo(index,hotelName) {

     

    localStorage.setItem('roomindex',JSON.stringify(index));

    localStorage.setItem('searchinfo',JSON.stringify(this.searchJson));

    let hotelID = this.hotelSearchResults[index].local_db_data[0].HOTEL_ID

    // this.router.navigate(['/details',this.searchJson.checkin,this.searchJson.checkout,this.searchJson.city_id,this.searchJson.currency,this.searchJson.hotel_id,this.searchJson.language,this.searchJson.location_id,this.searchJson.pagenumber,this.searchJson.perpagevalue,index], { queryParams: this.searchJson.rooms});

    this.router.navigate(['/details',this.searchJson.checkin,this.searchJson.checkout,this.searchJson.city_id,this.searchJson.req_currency,hotelID,this.searchJson.language,this.searchJson.pagenumber,this.searchJson.perpagevalue,this.adultCount,this.childCount,this.roomCount,index]);

    console.log(this.searchJson);


    // console.log(hotelName);

    // 'details/:checkin/:checkout/:city_id/:currency/:hotel_id/:language/:location_id/:pagenumber/:perpagevalue/:adultCount/:childCount/:roomCount/:index'

  }

  sort(event) {
    console.log(event);
    this.hotelSearchResults = this.hotelSearchResults.sort((a, b) => {
      if (event == 'price') {
        return (
          parseInt(a.dotw_db_data.from) - parseInt(b.dotw_db_data.from)

      );
    }
     
    });

  }

  hotelSearchFilter(value){

    
 
    this.hotelSearchResults = this.hotelSearchResults.filter(item =>  { 
       

      
       if (item.local_db_data[0].HOTEL_NAME.toLowerCase().indexOf(value.toLowerCase()) > -1) {
         item.namefilter = true;
         
       }
        
       else {
        item.namefilter = false;
       }

       return true;


      });

      console.log(this.hotelSearchResults);
  }

  // pricingRange() {
  //   let obj = this;
  //   $('#amount').val(
  //     obj.selectedCurrency.SHORTCUT + obj.hotelListResp.minprice_curr + ' - ' + obj.selectedCurrency.SHORTCUT + obj.hotelListResp.maxprice_curr
  //   );
  //   $('#slider-range').slider({
  //     range: true,
  //     min: obj.hotelListResp.minprice_curr,
  //     max: obj.hotelListResp.maxprice_curr,
  //     values: [obj.hotelListResp.minprice_curr, obj.hotelListResp.maxprice_curr],
  //     slide: function (event, ui) {
  //       $('#amount').val(obj.selectedCurrency.SHORTCUT + ui.values[0] + ' - ' + obj.selectedCurrency.SHORTCUT + ui.values[1]);
  //       obj.priceFilter(ui);
  //     },
  //   });

  // }


  priceFilter(ui) {

    this.hotelSearchResults.forEach((eachroom) => {
      eachroom.pricefilter = false;
      if (
        eachroom.dotw_db_data.from >=
          ui.values[0] &&
          eachroom.dotw_db_data.from <=
          ui.values[1]
      ) {
        eachroom.pricefilter = true;
      }
    });
  }
 
  starfilter() {

    
    if (!this.fiveStar && !this.fourStar && !this.threeStar && !this.twoStar && !this.oneStar) {
      this.hotelSearchResults.forEach((eachroom) => {
        eachroom.starfilter = true;
      });
    } else {
      this.hotelSearchResults.forEach((eachroom) => {
        eachroom.starfilter = false;
       
          if (this.oneStar) {
            if (eachroom.local_db_data[0].RATING == "559") {
              eachroom.starfilter = true;
            }
          }

          if (this.twoStar) {
            if (eachroom.local_db_data[0].RATING == "560") {
              eachroom.starfilter = true;
            }
          }

          if (this.threeStar) {
            if (eachroom.local_db_data[0].RATING == "561") {
              eachroom.starfilter = true;
            }
          }

          if (this.fourStar) {
            if (eachroom.local_db_data[0].RATING == "562") {
              eachroom.starfilter = true;
            }
          }

          if (this.fiveStar) {
            if (eachroom.local_db_data[0].RATING == "563") {
              eachroom.starfilter = true;
            }
          }

        
        });
      
    }
  }

  // OnApplyFilter(event) {
  //   if (event.action=='loggedin') {
  //     if(localStorage.loginDetails){
  //       this.isLogin = true;
  //     }
  //   }
  // }

  addToFavourites(favHotelData) {
    if(!localStorage.loginDetails){
      $('#login-signup').modal('show');
    }else {
      this.isFavIconClicked = false;
      let loginDetails = JSON.parse(localStorage.getItem('loginDetails'));

      let favJson = {
        "WishList": [{
          "hotelName": favHotelData.HOTEL_NAME,
          "noOfRooms": this.roomCount,
          "adultChildInfo": [{
            "residency": {
              "COUNTRY_CODE": "20",
              "COUNTRY_NAME": "India",
              "PHONECODE": "91",
              "NATIONALITY": "Indian",
              "FLAG": "in.png"
            },
            "nationality": {
              "COUNTRY_CODE": "20",
              "COUNTRY_NAME": "India",
              "PHONECODE": "91",
              "NATIONALITY": "Indian",
              "FLAG": "in.png"
            },
            "adults": {
              "value": this.adultCount,
              "text": this.adultCount
            },
            "children": {
              "value": this.childCount,
              "text": this.childCount
            },
            "age": []
          }],
          "city": favHotelData.HOTEL_CITY,
          "citycode": favHotelData.CITY_CODE,
          "hotelID": favHotelData.HOTEL_ID,
          "countryCode": favHotelData.COUNTRY_CODE,
          "RATING": [0, 1],
          "HOTEL_COUNTRY": favHotelData.HOTEL_COUNTRY
        }],
        "USER_ID": loginDetails.user.username,
        "travelOpt": "hotel",
        "origin": AppConstants.domainId,
        "cookie": ""
      }



        this.apicall.saveWishList(favJson).subscribe(res => {
          console.log(res);
        })
    }
  }


  
  


     

  


}
