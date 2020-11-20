import {
  Component,
  OnInit,
  AfterViewInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { AppConstants } from '../../AppConstants';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-flightsearchpanel',
  templateUrl: './flightsearchpanel.component.html',
  styleUrls: ['./flightsearchpanel.component.css'],
})
export class FlightsearchpanelComponent implements OnInit, AfterViewInit {
  @Output()
  reply: EventEmitter<any> = new EventEmitter<any>();
  flightFrom: any = '';
  flightTo: any = '';
  tripType: any = 'round';
  adultCount: number = 1;
  childCount: number = 0;
  infantCount: number = 0;
  flightTypeCheck: string = 'Y';
  departDate: any = '';
  validationMsg:any=["From location is empty!","To location is empty!","Departure date is empty!","Arrival date is empty!"];
  errorsArray:any=[];
  returnDate: any = '';
  flightTravellers: any = '';
  homepage: boolean;
  errorModalShow: boolean;
  selectedCurrency: any;
  currency: any;
  constructor(private router: Router, private route: ActivatedRoute,private apicall: ApicallService) {
    if(localStorage.selectedCurrency){
      this.selectedCurrency=JSON.parse(localStorage.getItem("selectedCurrency"));
      
    }else{
      this.selectedCurrency=AppConstants.defaultCurrencyCode;
     
    }
    this.currency=this.selectedCurrency.SHORTCUT;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res) => {
        if (this.router.url == '/'||this.router.url == '/hotel'||this.router.url == '/flight') {
          this.homepage = true;
        } else {
          this.homepage = false;
        }
      });
    
  }

  ngOnInit(): void {
    
    this.departDate = moment().add(7, 'days').format("D MMM YYYY");
    this.returnDate = moment().add(10, 'days').format("D MMM YYYY");
    if (this.homepage) {
      if (localStorage.searchDetail) {
        let searchdetl = JSON.parse(localStorage.getItem('searchDetail'));
        this.flightFrom = searchdetl.flightFrom;
        this.flightTo = searchdetl.flightTo;
        this.departDate = moment(searchdetl.departDate, ['YYYY-MM-DD']).format('D MMM YYYY');
        this.returnDate = moment(searchdetl.returnDate, ['YYYY-MM-DD']).format('D MMM YYYY');
        if (this.returnDate=="Invalid date") this.returnDate = this.departDate;
        this.adultCount = searchdetl.adultCount;
        this.childCount = searchdetl.childCount;
        this.infantCount = searchdetl.infantCount;
        this.flightTypeCheck = searchdetl.flightClass;
        this.tripType = searchdetl.tripType;
        this.currency = this.selectedCurrency.SHORTCUT;
        // this.flightTravellersCount();
      }
    } else {
      if (localStorage.searchDetail) {
        let searchdetl = JSON.parse(localStorage.getItem('searchDetail'));
        if(this.route.snapshot.paramMap.get('from')==searchdetl.flightFromCode ){
          this.flightFrom = searchdetl.flightFrom;
        }else{
          this.flightFrom = this.route.snapshot.paramMap.get('from');
        }
        if(this.route.snapshot.paramMap.get('to')==searchdetl.flightToCode ){
          
          this.flightTo = searchdetl.flightTo;
        }else{
          this.flightTo = this.route.snapshot.paramMap.get('to');
        }
        if(this.route.snapshot.paramMap.get('depart')==searchdetl.departDate ){
          this.departDate = moment(searchdetl.departDate, ['YYYY-MM-DD']).format('D MMM YYYY');
        }else{
          this.departDate = moment(this.route.snapshot.paramMap.get('depart'), ['YYYY-MM-DD']).format('D MMM YYYY');
        }
        if(this.route.snapshot.paramMap.get('return')==searchdetl.returnDate ){
          this.returnDate = moment(searchdetl.returnDate, ['YYYY-MM-DD']).format('D MMM YYYY');
        }else{
          this.returnDate = moment(this.route.snapshot.paramMap.get('return'), ['YYYY-MM-DD']).format('D MMM YYYY');
        }

        if (this.returnDate=="Invalid date") this.returnDate = this.departDate;

        if(parseInt(this.route.snapshot.paramMap.get('adult'))==searchdetl.adultCount ){
          this.adultCount = searchdetl.adultCount;
        }else{
          this.adultCount = parseInt(this.route.snapshot.paramMap.get('adult'));
        }
        if(parseInt(this.route.snapshot.paramMap.get('child'))==searchdetl.childCount ){
          this.childCount = searchdetl.childCount;
        }else{
          this.childCount = parseInt(this.route.snapshot.paramMap.get('child'));
        }
        if(parseInt(this.route.snapshot.paramMap.get('infant'))==searchdetl.infantCount ){
          this.infantCount = searchdetl.infantCount;
        }else{
          this.infantCount = parseInt(this.route.snapshot.paramMap.get('infant'));
        }
        if(this.route.snapshot.paramMap.get('class') == searchdetl.flightClass ){
          this.flightTypeCheck = searchdetl.flightClass;
        }else{
          this.flightTypeCheck = this.route.snapshot.paramMap.get('class');
        }
        
        if(this.route.snapshot.paramMap.get('tripType') == searchdetl.tripType ){
          this.tripType = searchdetl.tripType;
        }else{
          this.tripType = this.route.snapshot.paramMap.get('tripType');
          
        }
        if(this.route.snapshot.paramMap.get('currency') == this.selectedCurrency.SHORTCUT ){
          this.currency = this.selectedCurrency.SHORTCUT;
        }else{
          this.currency = this.route.snapshot.paramMap.get('currency');
          
        }
        // this.flightTravellersCount();
      } else {
        this.flightFrom = this.route.snapshot.paramMap.get('from');
        this.flightTo = this.route.snapshot.paramMap.get('to');
        this.departDate = moment(this.route.snapshot.paramMap.get('depart'), ['YYYY-MM-DD']).format('D MMM YYYY');
        this.returnDate = moment(this.route.snapshot.paramMap.get('return'), ['YYYY-MM-DD']).format('D MMM YYYY');
        if (this.returnDate=="Invalid date") this.returnDate = this.departDate;
        this.adultCount = parseInt(this.route.snapshot.paramMap.get('adult'));
        this.childCount = parseInt(this.route.snapshot.paramMap.get('child'));
        this.infantCount = parseInt(this.route.snapshot.paramMap.get('infant'));
        this.flightTypeCheck = this.route.snapshot.paramMap.get('class');
        this.tripType = this.route.snapshot.paramMap.get('tripType');
        this.currency = this.route.snapshot.paramMap.get('currency');
        // this.flightTravellersCount();
      }
    }
    this.flightTravellersCount();
  }
  ngAfterViewInit() {
    $(function () {
      'use strict';//#hotelsFrom
      $('.flightFrom,.flightTo')
        .autocomplete({
          minLength: 0,
          delay: 300,
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

      // Hotels Check In Date
      //  $('#hotelsCheckIn').daterangepicker({
      //   singleDatePicker: true,
      //   minDate: moment(),
      //   autoUpdateInput: false,
      //   }, function(chosen_date) {
      // $('#hotelsCheckIn').val(chosen_date.format('MM-DD-YYYY'));
      // });

      // Flight Depart Date
      //$(document).on('focusin', '#flightDepart', function () {
        $('#flightDepart').daterangepicker({
          singleDatePicker: true,
          minDate: moment(),
          locale: {
            format: 'D MMM YYYY',
          },
        });
      //});
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
      $(document).on('focusin', '#flightReturn', function () {
        $('#flightReturn').daterangepicker({
          singleDatePicker: true,
          minDate: moment($('#flightDepart').val(), "D MMM YYYY"),
          locale: {
            format: 'D MMM YYYY',
          },
        });
      });
    });
  }
  validationCheck(){
    this.errorsArray=[];
    //debugger;

    if(!$('#flightFrom').val()) this.errorsArray.push(this.validationMsg[0]);
    if(!$('#flightTo').val()) this.errorsArray.push(this.validationMsg[1]);
    if(!$('#flightDepart').val()) this.errorsArray.push(this.validationMsg[2]);
    if (this.tripType == 'round' && !$('#flightReturn').val()) this.errorsArray.push(this.validationMsg[3]);
    if(this.errorsArray.length!=0){
      this.apicall.errorArrayShow(this.errorsArray);
      this.errorModalShow=true;
      return false;
    }else{
      this.errorModalShow=false;
      return true;
    }
  }

  flightSearch() {
    if(this.validationCheck()){

    
    let searchJson = {
      flightFrom: $('#flightFrom').val(), //this.flightFrom,
      flightFromCode:$('#flightFrom').val().trim().length == 3? $('#flightFrom').val(): $('#flightFrom').val().substring(1, 4),
      flightToCode: $('#flightTo').val().trim().length == 3 ? $('#flightTo').val() : $('#flightTo').val().substring(1, 4),
      flightTo: $('#flightTo').val(),
      departDate: moment($('#flightDepart').val(), ['D MMM YYYY']).format('YYYY-MM-DD'),
      returnDate: moment($('#flightReturn').val(), ['D MMM YYYY']).format('YYYY-MM-DD'),
      adultCount: this.adultCount,
      childCount: this.childCount,
      infantCount: this.infantCount,
      flightClass: this.flightTypeCheck,
      tripType: this.tripType,
     
    };
    localStorage.setItem('searchDetail', JSON.stringify(searchJson));
    if(this.currency!=""){this.selectedCurrency.SHORTCUT=this.currency;}
    localStorage.setItem('selectedCurrency', JSON.stringify(this.selectedCurrency));
    localStorage.setItem("selectedAction","flights");
    // this.reply.emit(searchJson);
    if (this.tripType == 'oneWay') {
      //:tripType/:adult/:child/:infant/:class/:depart/:return/:from/:to
      this.router.navigate([
        '/flightresults',
        'oneWay',
        this.adultCount,
        this.childCount,
        this.infantCount,
        this.flightTypeCheck,
        moment($('#flightDepart').val(), ['D MMM YYYY']).format('YYYY-MM-DD'),
        $('#flightFrom').val().length == 3
          ? $('#flightFrom').val()
          : $('#flightFrom').val().substring(1, 4),
        $('#flightTo').val().length == 3
          ? $('#flightTo').val()
          : $('#flightTo').val().substring(1, 4),
          this.currency,
      ]);
    } else if (this.tripType == 'round') {
      this.router.navigate([
        '/flightresults',
        'round',
        this.adultCount,
        this.childCount,
        this.infantCount,
        this.flightTypeCheck,
        moment($('#flightDepart').val(), ['D MMM YYYY']).format('YYYY-MM-DD'),
        moment($('#flightReturn').val(), ['D MMM YYYY']).format('YYYY-MM-DD'),
        $('#flightFrom').val().length == 3
          ? $('#flightFrom').val()
          : $('#flightFrom').val().substring(1, 4),
        $('#flightTo').val().length == 3
          ? $('#flightTo').val()
          : $('#flightTo').val().substring(1, 4),
          this.currency,
      ]);
    }
    
  }
  }
  flightIncDec(forField, action) {
    if (forField == 'adult') {
      if (action == 'plus') {
        if (this.adultCount < 9) {
          this.adultCount += 1;
          if(this.adultCount<this.infantCount)this.infantCount = 0;
          this.flightTravellersCount();
        }
      } else if (action == 'minus') {
        if (this.adultCount > 1) {
          this.adultCount -= 1;
          if(this.adultCount<this.infantCount)this.infantCount = 0;
          this.flightTravellersCount();
        }
      } //childCount
    } else if (forField == 'child') {
      if (action == 'plus') {
        if (this.childCount < 8) {
          this.childCount += 1;
          this.flightTravellersCount();
        }
      } else if (action == 'minus') {
        if (this.childCount > 0) {
          this.childCount -= 1;
          this.flightTravellersCount();
        }
      } //childCount
    } else if (forField == 'infant') {
      if (action == 'plus') {
        if (this.infantCount < this.adultCount) {
          this.infantCount += 1;
          this.flightTravellersCount();
        }
      } else if (action == 'minus') {
        if (this.infantCount > 0) {
          this.infantCount -= 1;
          this.flightTravellersCount();
        }
      } //childCount
    }
  }

  flightTravellersCount() {
    let totalCount = this.adultCount + this.childCount + this.infantCount;
    let fc =
      this.flightTypeCheck == 'Y'
        ? 'Economic'
        : this.flightTypeCheck == 'S'
        ? 'Premium Economic'
        : this.flightTypeCheck == 'C'
        ? 'Business'
        : this.flightTypeCheck == 'F'
        ? 'First Class'
        : '';
    this.flightTravellers = totalCount + ' - ' + fc;
  }
}
