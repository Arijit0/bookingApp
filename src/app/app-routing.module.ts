import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FlightResultsComponent } from './flight-results/flight-results.component';
import { HotelResultsComponent } from './hotel-results/hotel-results.component';
import { FlightConfirmComponent } from './flight-confirm/flight-confirm.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { LoginSignupPanelComponent } from './templates/login-signup-panel/login-signup-panel.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { PaymentComponent } from './payment/payment.component';
import { FlightItineraryComponent } from './flight-itinerary/flight-itinerary.component';
import { HotelConfirmComponent } from './hotel-confirm/hotel-confirm.component';
import { CurrencyComponent } from './currency/currency.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '' , component: HomeComponent},
  { path: 'hotel' , component: HomeComponent},
  { path: 'flight' , component: HomeComponent},
  { path: 'flightresults/:tripType/:adult/:child/:infant/:class/:depart/:return/:from/:to/:currency' , component: FlightResultsComponent},
  { path: 'flightresults/:tripType/:adult/:child/:infant/:class/:depart/:from/:to/:currency' , component: FlightResultsComponent},
  { path: 'profile/:tab' , component: ProfileComponent},
  // { path: 'order-history' , component: OrdersHistoryComponent},
  { path: 'flightconfirmation' , component: FlightConfirmComponent},
  { path: 'hotelresults/:type/:type_code/:type_name/:checkIn/:checkOut/:rooms/:adult/:child/:currency' , component: HotelResultsComponent},
  {path: 'login', component: LoginSignupComponent},
  {path: 'details/:checkin/:checkout/:city_id/:currency/:hotel_id/:language/:pagenumber/:perpagevalue/:adultCount/:childCount/:roomCount/:index', component: HotelDetailsComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'flight-itinerary/:hash', component: FlightItineraryComponent},
  { path: 'hotelconfirmation' , component: HotelConfirmComponent}

  //http://localhost:4200/hotelresults/type%20-%20city,%20hotel%20.%20landmark/city_code,hotel_id,location_id%20/10-17-2020/10-22-2020/3/10/AUD

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
