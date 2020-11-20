import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AppConstants } from '../AppConstants';
import { ApicallService } from '../services/apicall.service';
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
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit,AfterViewInit {

  randomKey: any = moment();
  
  profileJson:any={
    "gender":"M",
    "firstName":"",
    "lastName":"",
    "DOB":"",
    "email":"",
    "mealPref":"",
    "seatPref":"",
    "freqFlyNo":"",
    "mobileNo":"",
    "residency":"",
    "nationality":"",
    "issueCountry":"",
    "passportNo":"",
    "passportExpireOn":"",
    "address1":"",
    "address2":"",
    "city":"",
    "state":"",
    "zipcode":"",
    "country":"",
    "password":"",
    "revalidPassword":""
  }

  isLogin: boolean = false;
  selectedNationality: any;
  selectedResidency: any;
  selectedCountry: any;
  selectedIssuCountry: any;
  loaderShow: boolean = false;

  constructor(private apicall: ApicallService) { }

  loginDetails: any;

  ngOnInit(): void {
    this.getUserDetail();
    if(localStorage.loginDetails){
      this.isLogin = true;
    }
  }

  ngAfterViewInit() {
    var self = this;
    //Residency

    $(function() {

      'use strict';
    $('#residency' + self.randomKey).autocomplete({
      minLength: 0,
      delay: 300,
      source: function (request, response) {
        if(request.term.length==0){
          $.getJSON(
            AppConstants.url+'/api/hotelsearch/countrysearch?key=&lang=en',
          function (residencyResp) {

            response( $.map(residencyResp.countries, function( item ) {
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
             function (residencyResp) {
               response( $.map( residencyResp.countries, function( item ) {
                 
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

        

        let selectedCountry = ui.item;
        
        self.getValues(selectedCountry);
      }
  }).focus(function(){          

      $(this).data("uiAutocomplete").search($(this).val());
      
  });

  $('#date_of_birth').daterangepicker({
    
    singleDatePicker: true,
      maxDate: moment(),
      showDropdowns: true,
      }, function(chosen_date) {
    $('#date_of_birth').val(chosen_date.format('YYYY-MM-DD'));

    let dob = chosen_date._d;
    let date = JSON.stringify(dob)
    date = date.slice(1,11)
    self.profileJson.DOB = date;

  });

    $('#passportExpiredOn').daterangepicker({
      singleDatePicker: true,
      minDate: moment(),
       showDropdowns: true,
      }, function(chosen_date) {
    $('#passportExpiredOn').val(chosen_date.format('YYYY-MM-DD'));
    
    let passportExp = chosen_date._d;
    let date = JSON.stringify(passportExp)
    date = date.slice(1,11)
    self.profileJson.passportExpireOn = date;

    }); 
  
  });

  

  // Nationality
  
  $(function() {

    'use strict';
  $('#nationality' + self.randomKey).autocomplete({
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
      self.getNationality(nationality);
    }
}).focus(function(){          

    $(this).data("uiAutocomplete").search($(this).val());
});

});

// Issue Country

$(function() {

  'use strict';
$('#issueCountry' + self.randomKey).autocomplete({
  minLength: 0,
  delay: 300,
  source: function (request, response) {
    if(request.term.length==0){
      $.getJSON(
        AppConstants.url+'/api/hotelsearch/countrysearch?key=&lang=en',
      function (issueCountryResp) {

        response( $.map( issueCountryResp.countries, function( item ) {
              var object = new CountryObj();
              object.label = (item.ISO=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.ISO);
              object.value = (item.ISO=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.ISO);

              return object;
          }));
      }
    );
    }else{
      $.getJSON(
        AppConstants.url+'/api/hotelsearch/countrysearch?key='+request.term+'&lang=en',
         function (issueCountryResp) {
           response( $.map( issueCountryResp.countries, function( item ) {
             
            var object = new CountryObj();
            object.label = (item.ISO=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.ISO);
            object.value = (item.ISO=="NO_RESULT_FOUND"?"NO RESULT FOUND":item.ISO);
              return object;
          }));
         }
       );
    }
    
  },
  select: function (event, ui) {

    let issueCountry = ui.item;
    self.issueCountry(issueCountry);
  }
}).focus(function(){          

  $(this).data("uiAutocomplete").search($(this).val());
});

});

// Country

$(function() {

  'use strict';
$('#Country' + self.randomKey).autocomplete({
  minLength: 0,
  delay: 300,
  source: function (request, response) {
    if(request.term.length==0){
      $.getJSON(
        AppConstants.url+'/api/hotelsearch/countrysearch?key=&lang=en',
      function (countryResp) {

        response( $.map( countryResp.countries, function( item ) {
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
         function (countryResp) {
           response( $.map( countryResp.countries, function( item ) {
             
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

    let country = ui.item;
    self.getCountry(country);
  }
}).focus(function(){          

  $(this).data("uiAutocomplete").search($(this).val());
});

});

}

  getUserDetail(){
    //debugger
    if(localStorage.loginDetails){
    this.apicall.userDetailGet().subscribe(res => {
      
      if(res.status == 'ok') {
        
        
        this.loginDetails = res;
        this.profileJson.firstName=this.loginDetails.first_name;
        this.profileJson.lastName=this.loginDetails.last_name;
        this.profileJson.email=this.loginDetails.email;
        this.profileJson.gender=this.loginDetails.ihc_gender;
        this.profileJson.DOB=this.loginDetails.ihc_dob;
        this.profileJson.mealPref=this.loginDetails.ihc_meal_pref;
        this.profileJson.seatPref=this.loginDetails.ihc_seat_pref;
        this.profileJson.freqFlyNo=this.loginDetails.ihc_freq_fly_no;
        this.profileJson.mobileNo=this.loginDetails.phone;
        this.profileJson.residency=this.loginDetails.residency;
        this.profileJson.nationality=this.loginDetails.nationality;
        this.profileJson.issueCountry=this.loginDetails.ihc_pspt_country;
        this.profileJson.passportNo=this.loginDetails.ihc_pspt_no;
        this.profileJson.passportExpireOn=this.loginDetails.ihc_pspt_expiry;
        this.profileJson.address1=this.loginDetails.shipping_address_1;
        this.profileJson.address2=this.loginDetails.shipping_address_2;
        this.profileJson.city=this.loginDetails.shipping_city;
        this.profileJson.state=this.loginDetails.shipping_state;
        this.profileJson.zipcode=this.loginDetails.shipping_postcode;
        this.profileJson.country= this.loginDetails.shipping_country;
        // this.profileJson.password=this.loginDetails.email;
        // this.profileJson.revalidPassword=this.loginDetails.email;

      }
    },
      (err) => {
        // this.alreadyExist = err;
        // console.log( this.alreadyExist.error);
      })
  }
  }

 

  updateUserDetl(){

    this.loaderShow = true;
    //debugger
    console.log(this.profileJson);
    this.apicall.userDetailUpdate(this.profileJson).subscribe(res => {
      console.log(res);
      this.getUserDetail();
      this.loaderShow = false;
    },
      (err) => {
        // this.alreadyExist = err;
        // console.log( this.alreadyExist.error);
         console.log(err);
         this.loaderShow = false;
      })
  }

  getValues(selectedResidency: any) {

    this.selectedResidency = selectedResidency.value;
    this.profileJson.residency = this.selectedResidency;
  }

  getNationality(selectedNationality: any) {
   
    this.selectedNationality = selectedNationality.value;
    this.profileJson.nationality=this.selectedNationality;
  }

  getCountry(selectedCountry: any) {
    
    //debugger

    this.selectedCountry = selectedCountry.value;
    this.profileJson.country= this.selectedCountry;
    
  }

  issueCountry(selectedissueCountry: any) {
    
    this.selectedIssuCountry = selectedissueCountry.value;
    this.profileJson.issueCountry=this.selectedIssuCountry;
  }

//   onChange(event) {
//    this.profileJson.DOB = $('#date_of_birth').val().format('YYYY-MM-DD');
//   console.log( this.profileJson.DOB);
// } 

// selectOption(){
//   if(this.profileJson.seatPref=='Any')
//       return true;
//   else
//       return false;
      
// }

}
