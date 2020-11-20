import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse} from '@angular/common/http';
import {AppConstants} from '../AppConstants'
import { Observable , Subject} from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {//https://bookcheap.com.au/api/flightApi/airportsearch?key=d
  public timer;
  private timerCountdown = new Subject<any>();
  countdownLeftTime$ = this.timerCountdown.asObservable();
  private routeSubject = new Subject<any>();
  presentRoute$ = this.routeSubject.asObservable();
  private errorModal = new Subject<any>();
  errorModalArray$ = this.errorModal.asObservable();
  constructor(private http: HttpClient, public router: Router,
    private titleService: Title) {
    this.timer=1200
    console.log("service apicall constructor")
   }
  setData (data) {
    this.timer = data;
    //console.log(data);
  }
  getData () {
    return this.timer;
  }
  countdown(leftTime:number){
    let obj = this;
    // this.timerCountdown.next(leftTime);
    console.log(leftTime);
    let timer= leftTime, minutes, seconds;
    // if(leftTime){
    //   timer=leftTime;
    // }else{
    //   timer=60 * 10;
    // }
    let interval=setInterval(function () {
    
      minutes = Math.floor(timer / 60);
      seconds = Math.floor(timer % 60);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        obj.timerCountdown.next(minutes + ":" + seconds);
        //display.textContent = minutes + ":" + seconds;
        //obj.apicall.countdown((parseInt(minutes)*60) + parseInt(seconds))
        //console.log((parseInt(minutes)*60) + parseInt(seconds))
        if (--timer < 0) {
            // timer = duration;
            clearInterval( interval );
            console.log("timeup")
        }
    }, 1000);
  }
  errorArrayShow(array:any){
    this.errorModal.next(array);
    console.log(array);
  }
  presentRouteIs(page:any){
    this.routeSubject.next(page);
  }
  loginKey: any = '5d407db5a687c';
  
  getAirportListJson(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });
    return this.http.post(AppConstants.url+"/s/hajaz/jsons/featuredlocation.json",null, {headers: headers});
  }

  getAirportListSearchByKey(key): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });
    return this.http.post(AppConstants.url+"/api/flightApi/airportsearch?key="+key,null, {headers: headers});
  }
  flightSearchResult(trip,json): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });
    return this.http.post(AppConstants.devUrl+"/api/flightRestApi/searchFlight/"+trip,json, {headers: headers});
  }
  login(username,password): Observable<any> {

    return this.http.get(AppConstants.url+"/account/api/userplus/generate_auth_cookie/?key="+this.loginKey+"&username="+username+"&password="+password);
  } 

  register(email,password,first_name,last_name): Observable<any> {

    return this.http.get(AppConstants.url+"/api/Account/register/bookcheap?username="+email+"&email="+email+"&first_name="+first_name+"&last_name="+last_name+"&notify=0&password="+password);
  }

  userDetailGet():Observable<any>{
    return this.http.get(AppConstants.url+"/account/api/userplus/get_user_meta/?key="+AppConstants.key+"&cookie="+JSON.parse(localStorage.getItem('loginDetails')).cookie)
}
userDetailUpdate(detailjson):Observable<any>{
  return this.http.get(AppConstants.url+"/account/api/userplus/update_user_meta_vars/?key="+AppConstants.key+"&first_name="+detailjson.firstName+"&last_name="+detailjson.lastName+"&ihc_dob="+detailjson.DOB+"&email="+detailjson.email+"&ihc_gender="+detailjson.gender+"&shipping_first_name="+detailjson.firstName+"&shipping_last_name="+detailjson.lastName+"&shipping_address_1="+detailjson.address1+"&shipping_address_2="+detailjson.address2+"&shipping_city="+detailjson.city+"&shipping_state="+detailjson.state+"&shipping_postcode="+detailjson.zipcode+"&shipping_country="+detailjson.country+"&ihc_meal_pref="+detailjson.mealPref+"&ihc_seat_pref="+detailjson.seatPref+"&ihc_freq_fly_no="+detailjson.freqFlyNo+"&ihc_pspt_no="+detailjson.passportNo+"&ihc_pspt_country="+detailjson.issueCountry+"&ihc_pspt_expiry="+detailjson.passportExpireOn+"&ihc_phone_country="+detailjson.country+"&phone="+detailjson.mobileNo+"&residency="+detailjson.residency+"&nationality="+detailjson.nationality+"&cookie="+JSON.parse(localStorage.getItem('loginDetails')).cookie)
}

orderHistoryGet(userId,origin):Observable<any>{
  return this.http.get(AppConstants.devUrl+"/api/Account/getbookinghistory?user_id="+userId+"&origin="+origin)
}

reqFBLogin(accessToken): Observable<any>{
 
    const httpOptions = {

      headers: new HttpHeaders({
 
       'Content-Type':  'text/html'
      })};
 
  return this.http.get(AppConstants.siteblogUrl+"api/userplus/fb_connect/?key=" + AppConstants.userpluskey + "&use_email=true&access_token="+accessToken, httpOptions)
}

reqGoogleLogin(idToken): Observable<any> {
  const httpOptions = {

    headers: new HttpHeaders({

     'Content-Type':  'text/html'
    })};

return this.http.get(AppConstants.siteblogUrl+"api/userplus/google_connect/?key=" + AppConstants.userpluskey + "&use_email=true&id_token="+idToken, httpOptions)
}

hotelSearchResult(json): Observable<any> {
  
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
      });
    return this.http.post(AppConstants.devUrl+"/api/hotelsearchApi/finalhotelsearch/",json, {headers: headers});
  
}
getAirRules(sourceCodeJson):Observable<any>{
  return this.http.post(AppConstants.devUrl+"/api/flightRestApi/getAirRules",sourceCodeJson)
}
reValidateAirFare(sourceCodeJson):Observable<any>{
  return this.http.post(AppConstants.devUrl+"/api/flightRestApi/reValidateAirFare",sourceCodeJson)
}
checkCoupon(promoJson,promoCode):Observable<any>{
  return this.http.post(AppConstants.devUrl+"/api/Apiservices/checkCoupon/flight/"+promoCode,promoJson)
}
getPaymentOptionsFromJson():Observable<any>{
  return this.http.get("./assets/paymentOptions.json")
}
getPopularRoutesFromJson():Observable<any>{
  return this.http.get("./assets/popularRoutes.json")
}
saveFlightBooking(flightBookingJson):Observable<any>{
  return this.http.post(AppConstants.devUrl+"/api/flightRestApi/saveFlightBooking",flightBookingJson);
}
getTripDetails(tripDetailsJson):Observable<any>{
  return this.http.post(AppConstants.devUrl+"/api/flightRestApi/getTripDetails",tripDetailsJson);
}
paymentCall(url,json){
  return this.http.post(url,json);
}

updatePassword(cookie,password) {

  const httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'
    })};

    return this.http.get(AppConstants.url+"/account/api/userplus/update_password/?key="+ AppConstants.key+"&password="+password+"&cookie="+cookie, httpOptions);

}
bookingCancel(json){
  return this.http.post(AppConstants.devUrl+"/api/flightRestApi/cancelBooking",json);
}
bookingEdit(json){
  return this.http.post(AppConstants.devUrl+"/api/flightRestApi/editBooking",json);
}
supportContact(json){
  return this.http.post(AppConstants.devUrl+"/api/flightRestApi/contactSupport",json);
}

getCurrencies(): Observable<any> {
  return this.http.post(AppConstants.devUrl+"/api/getCurrencies",null);
}

// getImageFromCurrency(image): Observable<any> {

//   const httpOptions = {

//     headers: new HttpHeaders({

//       'Content-Type': 'application/json'
//     })};

//   return this.http.get(AppConstants.cdnPath+image,httpOptions);
// }

// https://dev.bookcheap.com.au/api/Account/getWishlist?user_id=dibyendutry3@gmail.com&origin=devbookcheap

getWishList(userid): Observable<any> {
  return this.http.post(AppConstants.devUrl+"/api/Account/getWishlist?user_id="+userid+"&origin="+AppConstants.domainId,null);
}

getsalutations(): Observable<any> {

  const httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'text/html'
    })};

  return this.http.get(AppConstants.devUrl+"/api/hotelsearchApi/getsalutations", httpOptions);
}

bookingData(bookingData): Observable<any> {
  const httpOptions = {

    headers: new HttpHeaders({

     'Content-Type':  'text/html'
    })};

  return this.http.post(AppConstants.devUrl+"/api/HotelsearchApi/blockrooms",bookingData,httpOptions);
}

saveWishList(favData): Observable<any> {

  const httpOptions = {

    headers: new HttpHeaders({

     'Content-Type':  'text/html'
    })};

  return this.http.post(AppConstants.devUrl+"/api/Account/saveWishlist",favData,httpOptions);


  // http://dev.bookcheap.com.au/api/Account/saveWishlist
}

 // Get Parent Route if any
 parentUrl() {
  return this.router.url.split('')[1];
}

// Get Child Route if any
childUrl() {
  return this.router.url.split('/')[2];
}

// Set Title
setTitle(newTitle: string) {
  this.titleService.setTitle(newTitle);
}

// Uppercase First
Ucase(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}




}
