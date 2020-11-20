import { Component, ElementRef, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApicallService } from '../services/apicall.service';

declare var $: any;

@Component({
  selector: 'app-hotel-confirm',
  templateUrl: './hotel-confirm.component.html',
  styleUrls: ['./hotel-confirm.component.css']
})
export class HotelConfirmComponent implements OnInit {
  BookingData: any;
  hotelImages: any;
  roomTypeInfo: any;
  starRating: any;
  selectedCurrency: any;
  roomName: any = [];
  room: any = [];
  loaderShow: boolean = false;
  roomDetails: any;
  description: any;
  timer1: any;
  popupTimer: any;
  rooms: any = [];
  isLogin: boolean = true;
  userEmail: any;
  userPhone: any;

  

  constructor(private apicall: ApicallService,private myElement: ElementRef) { }

  hotelConfirmInfo: any = [];
  salutations: any = [];
  selectedOption: any;

  ngOnInit(): void {
    this.loaderShow = true;
    var displayElement = this.myElement.nativeElement.querySelector('#time');
    this.startTimer(displayElement);

   
    this.hotelConfirMationDetails();
  }


    hotelConfirMationDetails() {

      if(localStorage.loginDetails){

        this.apicall.userDetailGet().subscribe(res => {
          if(res.status == 'ok') {
            this.isLogin = false;
            let loginDetails = res;
            this.userEmail = loginDetails.email;
            this.userPhone = loginDetails.phone;
          }
        })

      }

     this.BookingData = JSON.parse(localStorage.getItem("BOOKING_DATA"));
     this.roomDetails = JSON.parse(localStorage.getItem("roomDetails"));
     this.selectedCurrency = JSON.parse(localStorage.getItem('selectedCurrency'));
     this.hotelImages = this.roomDetails.hotel_images;
     this.starRating = this.roomDetails.star_rating;
     this.roomName = this.roomDetails.roomName;
     this.description = this.roomDetails.description; 

     this.apicall.bookingData(this.BookingData).subscribe(res => {
      this.hotelConfirmInfo = res;
      this.loaderShow = false;

      this.rooms = this.hotelConfirmInfo.hotel.rooms.room;
      // this.roomTypeInfo =  this.hotelConfirmInfo.hotel.rooms.room.roomType;

      this.rooms.forEach(room => {
        room.roomType.forEach(eachRoom => {
          eachRoom.rateBases.rateBasis.forEach(eachRateBasis => {
            if(eachRateBasis.status == "checked") {
              this.room.push(eachRateBasis);
              console.log(this.room);
            } else {
              console.log("Rooms Not AVailable");
            }
          });
        });
      });

     },
     (error) => {
      console.log(error);
      
     })

     

    this.apicall.getsalutations().subscribe(res => {
      this.salutations = res.salutation;
      console.log(this.salutations);
      
    })

     

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
    
      this.timer1 = setInterval(function () {
        timer=(timerduration - (moment().unix() - oricountdown));
        // console.log(moment().unix());
        if (--timer < 0) {
          // timer = duration;
          // console.log("timeup"); 
          clearInterval(this.timer1);
          // redirect to result page
        } else {
          minutes = Math.floor(timer / 60);
          seconds = Math.floor(timer % 60);
      
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
      
            display.textContent = minutes + ":" + seconds;
            // localStorage.setItem('countdown',((parseInt(minutes)*60) + parseInt(seconds)).toString())
            // console.log((parseInt(minutes)*60) + parseInt(seconds))

          this.popupTimer =  display.textContent;

          // console.log(this.popupTimer);

          if(this.popupTimer == "05:00") {

            $('#timeout').modal('show');
          }
            
        }
        
        
      }, 1000);
    
    }

}
