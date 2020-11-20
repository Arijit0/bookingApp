import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApicallService } from '../services/apicall.service';
import { Subscription ,Observable } from 'rxjs';
import {Title} from "@angular/platform-browser";
import * as moment from 'moment';
import { AppConstants } from '../AppConstants';
declare var $: any;
@Component({
  selector: 'app-flight-results',
  templateUrl: './flight-results.component.html',
  styleUrls: ['./flight-results.component.css'],
})
export class FlightResultsComponent implements OnInit {
  flightFrom: any = '';
  flightTo: any = '';
  cdnPath:any=AppConstants.cdnPath;
  scrolltoelement: ElementRef;
  flightToBox: boolean = false;
  airportSearchResult: any = [];
  keyword = 'airportCode';
  matrixModalShow: boolean = false;
  loaderShow: boolean = false;
  inloaderShow: boolean = false;
  oneWayTrip: boolean = true;
  roundTrip: boolean = false;
  box1: boolean = false;
  flightFromShort: any = '';
  flightToShort: any = '';
  isLoadingResult: boolean;
  flightFromBox: boolean;
  adultCount: number = 1;
  childCount: number = 0;
  infantCount: number = 0;
  flightTypeCheck: string = 'Y';
  departDate: any = '';
  returnDate: any = '';
  tripType: any = 'roundTrip';
  airportlist: any[];
  showReturnDiv: boolean = false;
  eachFlightDetails: any = {};
  eachFareDetails: any = {};
  flightTravellers: any = '';
  originToDestination: any = {};
  selectedFlight: any = {};
  destinationToOrigin: any = {};
  selectedFlightFare: any = {};
  showSelectMsg: boolean;
  nonstop: any;
  onestop: any;
  twoplusstop: any;
  filterAirportList: any=[];
  airlineNameList: any;
  selectedairlinecodes: any = [];
  highestrate: number;
  selectedjDeparture: any = [];
  selectedrDeparture: any = [];
  selectedrArrival: any = [];
  selectedjArrival: any = [];
  airlineNameCodePair: any = {};
  selectedFlightBrandName: any;
  errormsg: any;
  errorShow: boolean = false;
  flightSubscription: Subscription;
  selectedCurrency: any;
  currency: string;
  airlinesMatrixList: any = [];
  airportNameCodePair: any = {};
  eachflightSourceCode: any;
  fareRuleList: any;
  ffd_airlinecode: any;
  eachflightIsRefundable: any;
  constructor(
    private titleService:Title,
    private router: Router,
    private apicall: ApicallService,
    private route: ActivatedRoute,
    private myElement: ElementRef
  ) {
    this.titleService.setTitle(this.route.snapshot.paramMap.get('from')+' - '+this.route.snapshot.paramMap.get('to')+" Flight Results | "+AppConstants.titelUrl);
    $('.modal').modal('hide');
    if(localStorage.selectedCurrency){
      this.selectedCurrency=JSON.parse(localStorage.getItem("selectedCurrency"));
      
    }else{
      this.selectedCurrency=AppConstants.defaultCurrencyCode;
     
    }
    this.currency=this.selectedCurrency.SHORTCUT;
    route.params.subscribe(val => {
      this.flightInfoGet();
    });
  }

  ngOnInit(): void {
    /**if (localStorage.favioriteFlightDetail) {
      let ffd = JSON.parse(localStorage.getItem('favioriteFlightDetail'));
      this.ffd_airlinecode = ffd.airline.split(',')[0];
    }*/
    
    
  }

  flightInfoGet() {
    console.log(this.flightSubscription);
    $('#timeOutErrorModal').modal('hide');
    setTimeout(function(){  $("#timeOutErrorModal").modal(); }, 600000);
    if (localStorage.searchDetail) {
      let fF=false,fT=false,dD=false,rD=false,aC=false,cC=false,iC=false,c=false,fTC=false,tT=false;
      let searchdetl = JSON.parse(localStorage.getItem('searchDetail'));
      if(this.route.snapshot.paramMap.get('from')==searchdetl.flightFromCode ){
        //let flightFromCode=this.flightFrom.trim().length == 3? this.flightFrom: this.flightFrom.substring(1, 4),
        this.flightFrom = searchdetl.flightFrom;
      }else{
        this.flightFrom = this.route.snapshot.paramMap.get('from');
        fF=true;
      }
      if(this.route.snapshot.paramMap.get('to')==searchdetl.flightToCode ){
        //let flightFromCode=this.flightFrom.trim().length == 3? this.flightFrom: this.flightFrom.substring(1, 4),
        this.flightTo = searchdetl.flightTo;
      }else{
        this.flightTo = this.route.snapshot.paramMap.get('to');
        fT=true;
      }
      if(this.route.snapshot.paramMap.get('depart')==searchdetl.departDate ){
        this.departDate =  moment(searchdetl.departDate, ['YYYY-MM-DD']).format('D MMM YYYY');
      }else{
        this.departDate = moment(this.route.snapshot.paramMap.get('depart'), ['YYYY-MM-DD']).format('D MMM YYYY');;
        dD=true;
      }
      if(this.route.snapshot.paramMap.get('return')==searchdetl.returnDate ){
        this.returnDate =  moment(searchdetl.returnDate, ['YYYY-MM-DD']).format('D MMM YYYY');;
      }else{
        this.returnDate = moment(this.route.snapshot.paramMap.get('return'), ['YYYY-MM-DD']).format('D MMM YYYY');;
        rD=true;
      }
      if(parseInt(this.route.snapshot.paramMap.get('adult'))==searchdetl.adultCount ){
        this.adultCount = searchdetl.adultCount;
      }else{
        this.adultCount = parseInt(this.route.snapshot.paramMap.get('adult'));
        aC=true;
      }
      if(parseInt(this.route.snapshot.paramMap.get('child'))==searchdetl.childCount ){
        this.childCount = searchdetl.childCount;
      }else{
        this.childCount = parseInt(this.route.snapshot.paramMap.get('child'));
        cC=true;
      }
      if(parseInt(this.route.snapshot.paramMap.get('infant'))==searchdetl.infantCount ){
        this.infantCount = searchdetl.infantCount;
      }else{
        this.infantCount = parseInt(this.route.snapshot.paramMap.get('infant'));
        iC=true;
      }
      if(this.route.snapshot.paramMap.get('class') == searchdetl.flightClass ){
        this.flightTypeCheck = searchdetl.flightClass;
      }else{
        this.flightTypeCheck = this.route.snapshot.paramMap.get('class');
        fTC=true;
      }
      if(this.route.snapshot.paramMap.get('currency') == this.selectedCurrency.SHORTCUT ){
        this.currency = this.selectedCurrency.SHORTCUT;
      }else{
        this.currency = this.route.snapshot.paramMap.get('currency');
        c=true;
      }
      if(this.route.snapshot.paramMap.get('tripType') == searchdetl.tripType ){
        this.tripType = searchdetl.tripType;
      }else{
        this.tripType = this.route.snapshot.paramMap.get('tripType');
        tT=true;
      }
      if(fF || fT || dD || rD || aC || cC || iC || c || fTC || tT){
        this.search()
      }
    } else {
      this.flightFrom = this.route.snapshot.paramMap.get('from');
      this.flightTo = this.route.snapshot.paramMap.get('to');
      this.departDate = moment(this.route.snapshot.paramMap.get('depart'), ['YYYY-MM-DD']).format('D MMM YYYY');
      this.returnDate = moment(this.route.snapshot.paramMap.get('return'), ['YYYY-MM-DD']).format('D MMM YYYY');
      this.adultCount = parseInt(this.route.snapshot.paramMap.get('adult'));
      this.childCount = parseInt(this.route.snapshot.paramMap.get('child'));
      this.infantCount = parseInt(this.route.snapshot.paramMap.get('infant'));
      this.flightTypeCheck = this.route.snapshot.paramMap.get('class');
      this.tripType = this.route.snapshot.paramMap.get('tripType');
      this.currency = this.route.snapshot.paramMap.get('currency');
      // this.flightTravellersCount();
      this.search()
    }
    
    //this.search();
    this.flightSearch();
  }

  flightConfirm() {
    this.router.navigate(['/flightconfirmation']);
    var fiveMdurationInMinutes = 60 * 10;
    // this.startTimer(displayElement);
   // this.apicall.countdown(fiveMdurationInMinutes);
   localStorage.removeItem('countdown');
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
  flightIncDec(forField, action) {
    if (forField == 'adult') {
      if (action == 'plus') {
        if (this.adultCount < 9) {
          this.infantCount = 0;
          this.adultCount += 1;
          this.flightTravellersCount();
        }
      } else if (action == 'minus') {
        if (this.adultCount > 1) {
          this.infantCount = 0;
          this.adultCount -= 1;
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
  search() {
    let searchJson = {
      flightFrom: this.flightFrom,
      flightFromCode:this.flightFrom.trim().length == 3? this.flightFrom: this.flightFrom.substring(1, 4),
      flightTo: this.flightTo,
      flightToCode: this.flightTo.trim().length == 3 ? this.flightTo : this.flightTo.substring(1, 4),
      departDate:  moment(this.departDate, ['D MMM YYYY']).format('YYYY-MM-DD'),
      returnDate:  moment(this.returnDate, ['D MMM YYYY']).format('YYYY-MM-DD'),
      adultCount: this.adultCount,
      childCount: this.childCount,
      infantCount: this.infantCount,
      flightClass: this.flightTypeCheck,
      tripType: this.tripType,
      
    };
    localStorage.setItem('searchDetail', JSON.stringify(searchJson));
    if(this.currency!=""){this.selectedCurrency.SHORTCUT=this.currency;}
    localStorage.setItem('selectedCurrency', JSON.stringify(this.selectedCurrency));
    // this.flightSearch();
  }
  flightSearch() {
    this.loaderShow = true;
    let trip = '';
    this.flightFromShort =
      this.flightFrom.length == 3
        ? this.flightFrom
        : this.flightFrom.substring(1, 4);
    this.flightToShort =
      this.flightTo.length == 3 ? this.flightTo : this.flightTo.substring(1, 4);
    let searchforJson = {
      AdultQty: this.adultCount,
      ChildQty: this.childCount,
      InfantQty: this.infantCount,
      Currency: this.currency,
      originDestinationInformation: [
        {
          DepartureDateTime:
          moment(this.departDate, ['D MMM YYYY']).format('YYYY-MM-DD') +
            'T00:00:00',
          DestinationLocationCode:
            this.flightTo.length == 3
              ? this.flightTo
              : this.flightTo.substring(1, 4),
          OriginLocationCode:
            this.flightFrom.length == 3
              ? this.flightFrom
              : this.flightFrom.substring(1, 4),
        },
      ],
      CabinPreference: this.flightTypeCheck,
    };
    if (this.tripType == 'round') {
      trip = 'Return';
      searchforJson.originDestinationInformation.push({
        DepartureDateTime:
          moment(this.returnDate, ['D MMM YYYY']).format('YYYY-MM-DD') +
          'T00:00:00',
        DestinationLocationCode:
          this.flightFrom.length == 3
            ? this.flightFrom
            : this.flightFrom.substring(1, 4),
        OriginLocationCode:
          this.flightTo.length == 3
            ? this.flightTo
            : this.flightTo.substring(1, 4),
      });
    } else if (this.tripType == 'oneWay') {
      trip = 'OneWay';
    }

    this.apicall.flightSearchResult(trip, searchforJson).subscribe(
      (airportListResp) => {
        if(airportListResp.length != 0){
        this.loaderShow = false;
        if (trip == 'OneWay') {
          this.showReturnDiv = false;
        } else if (trip == 'Return') {
          this.showReturnDiv = true;
        }
        this.showSelectMsg = true;
        if (airportListResp.flightdata.length != 0) {
          this.errorShow = false;

          airportListResp.flights.forEach((element) => {
            this.airlineNameCodePair[element.ac] = element.an;
          });
          airportListResp.airports.forEach((element) => {
            this.airportNameCodePair[element.ac] = {
              an: element.an,
              cn: element.cn,
              ct: element.ct,
            };
          });
          console.log(this.airportNameCodePair);
          localStorage.setItem(
            'airlineList',
            JSON.stringify(this.airlineNameCodePair)
          );
          localStorage.setItem(
            'airportList',
            JSON.stringify(this.airportNameCodePair)
          );
          this.airportlist = airportListResp.flightdata;
          this.airlineNameList = airportListResp.flights;

          this.filterAirportList = this.airportlist;
          this.flightSelect(this.airportlist[0]);
          this.highestrate = 34;
          let obj = this;
          $('#amount').val(
            obj.currency+" "+ obj.numberWithCommas(airportListResp.minprice_curr) + ' - '+obj.currency+" "+ obj.numberWithCommas(airportListResp.maxprice_curr
          ));
          $('#slider-range').slider({
            range: true,
            min: airportListResp.minprice_curr,
            max: airportListResp.maxprice_curr,
            values: [airportListResp.minprice_curr, airportListResp.maxprice_curr],
            slide: function (event, ui) {
              $('#amount').val(obj.currency+" " + obj.numberWithCommas(ui.values[0]) + ' - '+obj.currency+" " + obj.numberWithCommas(ui.values[1]));
              obj.priceFilter(ui);
            },
          });
          if(localStorage.searchDetail&&localStorage.favioriteFlightDetail){
            let sd=JSON.parse(localStorage.getItem('searchDetail'));
            let ffd = JSON.parse(localStorage.getItem('favioriteFlightDetail'));
            this.ffd_airlinecode = ffd.airline.split(',')[0];
            if(sd.flightFromCode==ffd.flightFromCode&&sd.flightToCode==ffd.flightToCode&&sd.tripType==ffd.tripType){
              let event={target:{checked:true}};
              let airlineCode=ffd.airline.split(',')[0];
              this.airlineFilter(event, airlineCode);
              $("#"+airlineCode).click();
            }
          }
        } else {
          this.errorShow = true;
          this.errormsg = airportListResp.Errors[0].Message;
          this.apicall.errorArrayShow([airportListResp.Errors[0].Message]);
        }

        console.log(this.airportlist);
      }else{
        this.apicall.errorArrayShow(["Flights not found , Please try again!"]);
      }
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
    this.eachflightIsRefundable = isRefundable;
    this.airRules(this.eachflightSourceCode);
  }

  flightSelect(selectedFlight) {
    localStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));

    this.showSelectMsg = false;
    this.selectedFlight = selectedFlight;
    // console.log(this.selectedFlight);
  }

  stopsfilter() {
    if (!this.nonstop && !this.onestop && !this.twoplusstop) {
      let filtercnt = 0;
      this.filterAirportList.forEach((eachflight) => {
        eachflight.stopfilter = true;
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
      });
      if (filtercnt>0) {
        this.errorShow = false;
      }
      else  {
        this.errorShow = true;
          this.errormsg = "No result found!";
      }
    } else {
      let filtercnt = 0;

      this.filterAirportList.forEach((eachflight) => {
        eachflight.stopfilter = false;
        eachflight.OriginDestinationOptions.forEach((element) => {
          if (this.nonstop) {
            if (element.stops == 0) {
              eachflight.stopfilter = true;
            }
          }

          if (this.onestop) {
            if (element.stops == 1) {
              eachflight.stopfilter = true;
            }
          }

          if (this.twoplusstop) {
            if (element.stops >= 2) {
              eachflight.stopfilter = true;
            }
          }
        });

        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
      });

      if (filtercnt>0) {
        this.errorShow = false;
      }
      else  {
        this.errorShow = true;
          this.errormsg = "No result found!";
      }
    }
  }
  airlineFilter(event, airlineCode) {
    if (event.target.checked) {
      let filtercnt = 0;
      this.selectedairlinecodes.push(airlineCode);
      let sizeofselectedairlinecodes = this.selectedairlinecodes.length;
      this.filterAirportList.forEach((eachflight) => {
        if (sizeofselectedairlinecodes == 1) eachflight.airlinefilter = false;
        if (eachflight.ValidatingAirlineCode == airlineCode)
          eachflight.airlinefilter = true;
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
      });
      if (filtercnt>0) {
        this.errorShow = false;
      }
      else  {
        this.errorShow = true;
          this.errormsg = "No result found!";
      }
    } else {
      let filtercnt = 0;
      this.selectedairlinecodes = this.selectedairlinecodes.filter(
        (e) => e != airlineCode
      ); //airlinecode from

      let sizeofselectedairlinecodes = this.selectedairlinecodes.length;
      this.filterAirportList.forEach((eachflight) => {
        if (sizeofselectedairlinecodes == 0) {
          eachflight.airlinefilter = true;
        } else if (eachflight.ValidatingAirlineCode == airlineCode) {
          eachflight.airlinefilter = false;
        }
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
      });
      if (filtercnt>0) {
        this.errorShow = false;
      }
      else  {
        this.errorShow = true;
          this.errormsg = "No result found!";
      }
    }
  }
  priceFilter(ui) {
    let filtercnt = 0;
    this.filterAirportList.forEach((eachflight) => {
      eachflight.pricefilter = false;
      if (
        eachflight.AirItineraryPricingInfo.ItinTotalFare.TotalFare_curr >=
          ui.values[0] &&
        eachflight.AirItineraryPricingInfo.ItinTotalFare.TotalFare_curr <=
          ui.values[1]
      ) {
        eachflight.pricefilter = true;
      }
      if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
        filtercnt++;
      }
    });
    if (filtercnt>0) {
        this.errorShow = false;
      }
      else  {
        this.errorShow = true;
          this.errormsg = "No result found!";
      }
  }

  removeSpaceAndMakeLowerCase(str) {
    return str.replace(/\s/g, "").toLowerCase();
  }

  timeFilter(from, timeValue, event) {
    if (from == 'jDeparture') {
      if (event.target.checked) {
        let filtercnt = 0;
        this.selectedjDeparture.push(timeValue);
        let sizeofselectedjDeparture = this.selectedjDeparture.length;
        this.filterAirportList.forEach((eachflight) => {
          if (sizeofselectedjDeparture == 1) eachflight.jdepttimefilter = false;
          if (eachflight.journeyDepartTimeSlot == timeValue) {
            eachflight.jdepttimefilter = true;
          }
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
        });
        if (filtercnt>0) {
          this.errorShow = false;
        }
        else  {
          this.errorShow = true;
            this.errormsg = "No result found!";
        }
      } else {
        let filtercnt = 0;
        this.selectedjDeparture = this.selectedjDeparture.filter(
          (e) => e != timeValue
        );
        let sizeofselectedjDeparture = this.selectedjDeparture.length;
        this.filterAirportList.forEach((eachflight) => {
          if (sizeofselectedjDeparture == 0) {
            eachflight.jdepttimefilter = true;
          } else if (eachflight.journeyDepartTimeSlot == timeValue) {
            eachflight.jdepttimefilter = false;
          }
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
        });
        if (filtercnt>0) {
        this.errorShow = false;
      }
      else  {
        this.errorShow = true;
          this.errormsg = "No result found!";
      }
      }
    } else if (from == 'jArrival') {
      if (event.target.checked) {
        let filtercnt = 0;
        this.selectedjArrival.push(timeValue);
        let sizeofselectedjArrival = this.selectedjArrival.length;
        this.filterAirportList.forEach((eachflight) => {
          if (sizeofselectedjArrival == 1) eachflight.jarritimefilter = false;
          if (eachflight.journeyArrivalTimeSlot == timeValue) {
            eachflight.jarritimefilter = true;
          }
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
        });
        if (filtercnt>0) {
          this.errorShow = false;
        }
        else  {
          this.errorShow = true;
            this.errormsg = "No result found!";
        }
      } else {
        let filtercnt = 0;
        this.selectedjArrival = this.selectedjArrival.filter(
          (e) => e != timeValue
        );
        let sizeofselectedjArrival = this.selectedjArrival.length;
        this.filterAirportList.forEach((eachflight) => {
          if (sizeofselectedjArrival == 0) {
            eachflight.jarritimefilter = true;
          } else if (eachflight.journeyArrivalTimeSlot == timeValue) {
            eachflight.jarritimefilter = false;
          }
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
        });
        if (filtercnt>0) {
          this.errorShow = false;
        }
        else  {
          this.errorShow = true;
            this.errormsg = "No result found!";
        }
      }
    } else if (from == 'rDeparture') {
      if (event.target.checked) {
        let filtercnt = 0;
        this.selectedrDeparture.push(timeValue);
        let sizeofselectedrDeparture = this.selectedrDeparture.length;
        this.filterAirportList.forEach((eachflight) => {
          if (sizeofselectedrDeparture == 1) eachflight.rdepttimefilter = false;
          if (eachflight.returnDepartTimeSlot == timeValue) {
            eachflight.rdepttimefilter = true;
          }
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
        });
        if (filtercnt>0) {
        this.errorShow = false;
      }
      else  {
        this.errorShow = true;
          this.errormsg = "No result found!";
      }
      } else {
        let filtercnt = 0;
        this.selectedrDeparture = this.selectedrDeparture.filter(
          (e) => e != timeValue
        );
        let sizeofselectedrDeparture = this.selectedrDeparture.length;
        this.filterAirportList.forEach((eachflight) => {
          if (sizeofselectedrDeparture == 0) {
            eachflight.rdepttimefilter = true;
          } else if (eachflight.returnDepartTimeSlot == timeValue) {
            eachflight.rdepttimefilter = false;
          }
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
        });
        if (filtercnt>0) {
          this.errorShow = false;
        }
        else  {
          this.errorShow = true;
            this.errormsg = "No result found!";
        }
      }
    } else if (from == 'rArrival') {
      if (event.target.checked) {
        let filtercnt = 0;
        this.selectedrArrival.push(timeValue);
        let sizeofselectedrArrival = this.selectedrArrival.length;
        this.filterAirportList.forEach((eachflight) => {
          if (sizeofselectedrArrival == 1) eachflight.rarritimefilter = false;
          if (eachflight.returnArrivalTimeSlot == timeValue) {
            eachflight.rarritimefilter = true;
          }
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
        });
        if (filtercnt>0) {
          this.errorShow = false;
        }
        else  {
          this.errorShow = true;
            this.errormsg = "No result found!";
        }
      } else {
        let filtercnt = 0;
        this.selectedrArrival = this.selectedrArrival.filter(
          (e) => e != timeValue
        );
        let sizeofselectedrArrival = this.selectedrArrival.length;
        this.filterAirportList.forEach((eachflight) => {
          if (sizeofselectedrArrival == 0) {
            eachflight.rarritimefilter = true;
          } else if (eachflight.returnArrivalTimeSlot == timeValue) {
            eachflight.rarritimefilter = false;
          }
        if (eachflight.stopfilter && eachflight.airlinefilter  && eachflight.jarritimefilter&& eachflight.jdepttimefilter&& eachflight.rarritimefilter&& eachflight.rdepttimefilter&& eachflight.pricefilter) {
          filtercnt++;
        }
        });
        if (filtercnt>0) {
          this.errorShow = false;
        }
        else  {
          this.errorShow = true;
            this.errormsg = "No result found!";
        }
      }
    }
  }

  sort(event) {
    //this.filterAirportList=this.airportlist;
    console.log(event);
    this.filterAirportList = this.filterAirportList.sort((a, b) => {
      if (event == 'price') {
        return (
          parseInt(a.AirItineraryPricingInfo.ItinTotalFare.TotalFare) -
          parseInt(b.AirItineraryPricingInfo.ItinTotalFare.TotalFare)
        );
      } else if (event == 'duration') {
        return (
          parseInt(a.OriginDestinationOptions[0].totalDuration) -
          parseInt(b.OriginDestinationOptions[0].totalDuration)
        );
      }else if (event == 'departure') {
        
        return (
          parseInt(a.DepartureTS) - parseInt(b.DepartureTS)
        );
      }else if (event == 'return') {
        return (
          parseInt(a.ReturnTS) - parseInt(b.ReturnTS)
        );
      }
    });
  }
  numberWithCommas(x: any) {
    if (x) return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    else return '';
  }

  flightMatrixbuild() {
    //airlineNameList
    //filterAirportList
    this.airlinesMatrixList = [];
    this.airlineNameList.forEach((eachAirline) => {
      let nonstop = 0,
        onestop = 0,
        twoplusstop = 0,
        nonId = 0,
        oneId = 0,
        twoplusId = 0;
      this.filterAirportList.forEach((eachFlight, i) => {
        if (
          eachAirline.ac === eachFlight.ValidatingAirlineCode &&
          eachFlight.stopfilter &&
          eachFlight.airlinefilter &&
          eachFlight.jarritimefilter &&
          eachFlight.jdepttimefilter &&
          eachFlight.rarritimefilter &&
          eachFlight.rdepttimefilter &&
          eachFlight.pricefilter
        ) {
          if (eachFlight.OriginDestinationOptions[0].stops == 0) {
            if (
              nonstop != 0 &&
              eachFlight.AirItineraryPricingInfo.ItinTotalFare.TotalFare <
                nonstop
            ) {
              nonstop =
                eachFlight.AirItineraryPricingInfo.ItinTotalFare.TotalFare;
              nonId = i;
            } else if (nonstop == 0) {
              nonstop =
                eachFlight.AirItineraryPricingInfo.ItinTotalFare.TotalFare;
              nonId = i;
            }
          } else if (eachFlight.OriginDestinationOptions[0].stops == 1) {
            if (
              onestop != 0 &&
              eachFlight.AirItineraryPricingInfo.ItinTotalFare.TotalFare <
                onestop
            ) {
              onestop =
                eachFlight.AirItineraryPricingInfo.ItinTotalFare.TotalFare;
              oneId = i;
            } else if (onestop == 0) {
              onestop =
                eachFlight.AirItineraryPricingInfo.ItinTotalFare.TotalFare;
              oneId = i;
            }
          } else if (eachFlight.OriginDestinationOptions[0].stops >= 2) {
            if (
              twoplusstop != 0 &&
              eachFlight.AirItineraryPricingInfo.ItinTotalFare.TotalFare <
                twoplusstop
            ) {
              twoplusstop =
                eachFlight.AirItineraryPricingInfo.ItinTotalFare.TotalFare;
              twoplusId = i;
            } else if (twoplusstop == 0) {
              twoplusstop =
                eachFlight.AirItineraryPricingInfo.ItinTotalFare.TotalFare;
              twoplusId = i;
            }
          }
        }
      });
      this.airlinesMatrixList.push({
        code: eachAirline.ac,
        nonStop: nonstop == 0 ? '-' : this.currency + ' ' + nonstop,
        oneStop: onestop == 0 ? '-' : this.currency + ' ' + onestop,
        twoPlusStop: twoplusstop == 0 ? '-' : this.currency + ' ' + twoplusstop,
        nonId: nonId,
        oneId: oneId,
        twoplusId: twoplusId,
      });
    });
    console.log(this.airlinesMatrixList);
  }

  scroll(el: any) {
    console.log(el);
    //const itemToScrollTo = document.getElementById(el);
    // document.querySelector('#'+el).scrollIntoView();
    let ele = this.myElement.nativeElement.querySelector("#"+el);
    ele.scrollIntoView();
  }
  airRules(sourceCode){
    this.inloaderShow = true;
    let sourceCodeJson={
      "FareSourceCode":sourceCode
    }

    this.fareRuleList=[];
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
  backtoHome(){
    $('#timeOutErrorModal').modal('hide');
    this.router.navigate(['/',]);
  }
  favoriteCall(id,flightDtl){
    if(localStorage.searchDetail && localStorage.loginDetails){
      let loginDetl=JSON.parse(localStorage.getItem('loginDetails'));
      let searchdetl = JSON.parse(localStorage.getItem('searchDetail'));
      let favoriiteCallJson={
        "WishList": [{
          "leavingFrom": flightDtl.DepartureAirport,
          "goingTo": flightDtl.ArrivalAirport,
          "departingTime": {
            "value": "Lowest fare",
            "text": "Lowest fare"
          },
          "flightOpt": searchdetl.tripType,
          "flightClassOpt": searchdetl.flightClass,
          "flightAirlineOpt": flightDtl.FlightSegments[0].MarketingAirlineCode+','+this.airlineNameCodePair[flightDtl.FlightSegments[0].MarketingAirlineCode],
          "flightAdultOption": searchdetl.adultCount,
          "flightChildOption": searchdetl.childCount,
          "flightInfantOption": searchdetl.infantCount,
          "arrivingTime": {
            "value": "Lowest fare",
            "text": "Lowest fare"
          }
        }],
        "USER_ID": loginDetl.user.email,
        "travelOpt": "flight",
        "origin": AppConstants.domainId,
        "cookie": loginDetl.cookie
      }
      this.apicall.saveWishList(favoriiteCallJson).subscribe(resp=>{
        $("#"+id).attr("src","../../assets/images/yellow_star.png")
      })
    }else{
      $("#login-signup").modal();
    }
    
    
  }
}
