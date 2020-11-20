import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Event,NavigationEnd } from '@angular/router';
import { ApicallService } from '../services/apicall.service';
declare var $:any;
@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  roomTypeInfo: any = [];
  roomInfo: any = [];
  selectedRoomType: any = [];
  view: boolean = false;
  roomInformation: any = [];
  sum: any = 0;
  // jsonData: any = [];
  urlSearchData: any = [];
  hotelrooms: any = [];
  loaderShow: boolean = false;
  errorModalShow: boolean;
  index: any;
  hotelDetails: any = [];
  hotelName: any;
  hotelAddress: any;
  hotelImages: any;
  starRating: any;
  leisure: any;
  amenities: any;
  description: any;
  values: any = "Select Room";
  roomCount: any;
  locationID: any = " ";
  checkin: string;
  checkout: string;
  city_id: string;
  currency: string;
  hotel_id: string;
  language: any;
  pagenumber: any;
  perpagevalue: string;
  adultCount: any;
  childCount: any;
  location_id: string;
  selectedCurrency: any = {};
  hotelID: any;
  cityCODE: any;
  description2: any;
  rooms: any = [];
  selectedRoomsArr: any = [];
  selectedRooms: any = [];
  isClicked: boolean = false;
  roomName: any;
  bookingData: any = [];
  roomLength: any = [];
  roomPrice: any = [];
  totalRoomPrice: number = 0;
  roomsArray: any = [];
  errorsArray: any = [];
  validationMsg: any = ["Please Select All Rooms"];


  constructor(private router: Router, private route: ActivatedRoute, private apicall: ApicallService) { 
    route.params.subscribe(val => {
      this.getRoomInfo();
    });
  }

  ngOnInit(): void {
    // this.getRoomInfo();
    // this.selectedRoom(2);
  }


  getRoomInfo() {

    // this.route.snapshot.paramMap.get("location_id")
    
    this.loaderShow = true;

    this.selectedCurrency = JSON.parse(localStorage.getItem('selectedCurrency'));

    this.checkin = this.route.snapshot.paramMap.get("checkin");
    this.checkout = this.route.snapshot.paramMap.get("checkout");
    this.city_id = this.route.snapshot.paramMap.get("city_id");
    this.currency = this.route.snapshot.paramMap.get("currency");
    this.hotel_id = this.route.snapshot.paramMap.get("hotel_id");
    this.language = this.route.snapshot.paramMap.get("language");
    this.pagenumber = this.route.snapshot.paramMap.get("pagenumber");
    this.perpagevalue = this.route.snapshot.paramMap.get("perpagevalue");
    this.adultCount = parseInt(this.route.snapshot.paramMap.get("adultCount"));
    this.childCount = parseInt(this.route.snapshot.paramMap.get("childCount"));
    this.roomCount = this.route.snapshot.paramMap.get("roomCount");
    this.index = this.route.snapshot.paramMap.get("index");

    this.selectedCurrency.SHORTCUT = this.currency;
    localStorage.setItem('selectedCurrency',JSON.stringify(this.selectedCurrency));
    

    for (let index = 0; index < this.roomCount; index++) {
      
      this.roomsArray.push( {
        "adults": this.adultCount, 
        "age": [], 
        "children": this.childCount,
        "nationality": 20,
        "residency": 20
      });
      
    }

    this.urlSearchData = {
      "checkin":this.checkin,
      "checkout":this.checkout,
      "city_id": this.city_id,
      "cookie": "",
      "currency": "373",
      "req_currency": this.currency,
      "hotel_id":this.hotel_id,
      "language":this.language,
      "location_id": "",
      "pagenumber":this.pagenumber,
      "perpagevalue":this.perpagevalue,
      "rooms":  this.roomsArray
     
    }

    // this.roomCount = this.route.snapshot.paramMap.get("roomCount"),
    // this.index = this.route.snapshot.paramMap.get("index")


    $(".owl-carousel").each(function (index) {
      var a = $(this);
    $(this).owlCarousel({
      autoplay: a.data('autoplay'),
      autoplayTimeout: a.data('autoplaytimeout'),
      autoplayHoverPause: a.data('autoplayhoverpause'),
      loop: a.data('loop'),
      speed: a.data('speed'),
      nav: a.data('nav'),
      dots: a.data('dots'),
      autoHeight: a.data('autoheight'),
      autoWidth: a.data('autowidth'),
      margin: a.data('margin'),
      stagePadding: a.data('stagepadding'),
      slideBy: a.data('slideby'),
      lazyLoad: a.data('lazyload'),
      navText:['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
      animateOut: a.data('animateout'),
      animateIn: a.data('animatein'),
      video: a.data('video'),
      items: a.data('items'),
      responsive:{
          0:{items: a.data('items-xs'),},
          576:{items: a.data('items-sm'),},
      768:{items: a.data('items-md'),},
          992:{items: a.data('items-lg'),}
      }
      });
  });
   


    this.apicall.hotelSearchResult(this.urlSearchData).subscribe(res => {

      this.loaderShow = false;
      this.hotelDetails = res.data[0];

      // console.log(this.hotelDetails.local_db_data[0].HOTEL_NAME);
      // console.log(this.hotelDetails);

      this.hotelImages = JSON.parse(this.hotelDetails.local_db_data[0].IMAGES);
      this.amenities = JSON.parse(this.hotelDetails.local_db_data[0].AMENITIE);
      this.leisure = JSON.parse(this.hotelDetails.local_db_data[0].LEISURE);
      this.description = this.hotelDetails.local_db_data[0].DESCRIPTION1;
      this.description2 = this.hotelDetails.local_db_data[0].DESCRIPTION2;
      this.hotelName = this.hotelDetails.local_db_data[0].HOTEL_NAME;
      this.hotelAddress = this.hotelDetails.local_db_data[0].HOTEL_STREET_ADDRESS;
      this.starRating = this.hotelDetails.local_db_data[0].RATING;
      this.hotelID = this.hotelDetails.local_db_data[0].HOTEL_ID;
      this.cityCODE = this.hotelDetails.local_db_data[0].CITY_CODE;

      this.rooms = this.hotelDetails.dotw_db_data.rooms.room;
      let ccnt = 0;
      this.rooms.forEach(element => {
        this.selectedRooms[ccnt++] = null;
      });

      this.roomTypeInfo = this.hotelDetails.dotw_db_data.rooms.room.roomType;

     console.log(this.roomTypeInfo);

     this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {

        this.apicall.setTitle(this.hotelName);
        
    }
    });

    },
      (error) => {
        console.log(error);
      });

     
     

  }


  selectedRoom(index) {


    this.view = true;

      this.selectedRoomType = this.roomTypeInfo[index].rateBases.rateBasis;

      // this.roomTypeInfo[index].rateBases.rateBasis.forEach(element => {
      //   this.selectedRoomType = element;
      // });

      console.log(this.urlSearchData.rooms);

      let totalPeopleCount = this.urlSearchData.rooms[0].adults+this.urlSearchData.rooms[0].children;
      let totalRoomCount = this.urlSearchData.rooms.length;
      this.values = totalRoomCount + ' ' + 'Room' + ' ' + '/' + ' ' + ' ' + totalPeopleCount + ' ' + 'People' ;
      
  } 

  add(roomcnt, rateBasisIndex, eachRateBasis, roomtype) {

    this.isClicked = true;

    let checkin = this.urlSearchData.checkin;
    let checkout = this.urlSearchData.checkout;
    let adult = this.urlSearchData.rooms[0].adults;
    let child = this.urlSearchData.rooms[0].children

    let allocationDetails = eachRateBasis.allocationDetails;
    let allowsBeddingPreference = eachRateBasis.allowsBeddingPreference;
    let attributesID = eachRateBasis.attributes.id;
    let roomtypecode = roomtype.attributes.roomtypecode;
    let maxExtraBed = roomtype.roomInfo.maxExtraBed;
    let roomName = roomtype.name;
    let roomPrice = eachRateBasis.total_curr;
    let description = eachRateBasis.attributes.description;

    this.selectedRooms[roomcnt] = rateBasisIndex;

    this.selectedRoomsArr[roomcnt] = {
    

      "adultsCode": adult,
      "allocationDetails": allocationDetails,
      "beddingPreference": allowsBeddingPreference,
      "children": child,
      "childrenage": [],
      "extraBed": maxExtraBed,
      "firstName": "",
      "lastName": "",
      "leading": "yes",
      "nationality": 20,
      'residency': 20,
      "roomTypeCode": roomtypecode,
      "salutation": "",
      "selectedRateBasis": attributesID,
      "price": roomPrice,
      "name": roomName,
      "roomIndex": roomcnt,
      "roomSubIndex": rateBasisIndex,
      "description": description

    
    };
   

    this.bookingData = {
      "BOOKING_DATA": {
      "checkin": checkin,
      "checkout": checkout, 
      "city_code": this.cityCODE,
      "cookie": "",
      "currency": "373",
      "req_currency": this.selectedCurrency.SHORTCUT,
      "hotel_id": this.hotelID,
      "language": "",
      "rooms": this.selectedRoomsArr
    }
  }

   let roomLengthh = this.bookingData.BOOKING_DATA.rooms;

    this.roomLength = roomLengthh.length;
    this.roomPrice = roomPrice;
    this.totalRoomPrice = this.totalRoomPrice+this.roomPrice;
    this.roomName = roomName;
    

  }

  numberWithCommas(x:any) {
    if (x)
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else
      return '';
  }

  validationCheck(){
    this.errorsArray=[];

    this.errorsArray.push(this.validationMsg[0]);
   
    
    if(this.errorsArray.length!=0){
      this.apicall.errorArrayShow(this.errorsArray);
      this.errorModalShow=true;
      return false;
    }else{
      this.errorModalShow=false;
      return true;
    }
  }

  hotelBooking(rooms) {

    if(rooms.length != this.rooms.length) {
      this.validationCheck();
    }else{
      
    let roomDetails = {
      "hotel_images": this.hotelImages,
      "star_rating": this.starRating,
      "roomName": this.roomName,
      "description": this.description2,
      "checkin": this.checkin,
      "checkout": this.checkout 
    }

    localStorage.setItem('BOOKING_DATA', JSON.stringify(this.bookingData));
    localStorage.setItem('roomDetails', JSON.stringify(roomDetails));

      localStorage.removeItem('countdown');
     this.router.navigate(['/hotelconfirmation']);
  }
  }



}
