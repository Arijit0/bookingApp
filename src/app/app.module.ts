import { BrowserModule,Title  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CountdownModule } from 'ngx-countdown';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FlightResultsComponent } from './flight-results/flight-results.component';
import { HotelResultsComponent } from './hotel-results/hotel-results.component';
import { FlightConfirmComponent } from './flight-confirm/flight-confirm.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { FlightsearchpanelComponent } from './templates/flightsearchpanel/flightsearchpanel.component';
import { HotelsearchpanelComponent } from './templates/hotelsearchpanel/hotelsearchpanel.component';
import { LoginSignupPanelComponent } from './templates/login-signup-panel/login-signup-panel.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider
} from 'angularx-social-login';
import { PaymentComponent } from './payment/payment.component';
import { FlightItineraryComponent } from './flight-itinerary/flight-itinerary.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { HotelConfirmComponent } from './hotel-confirm/hotel-confirm.component';
import { ErrorModalComponent } from './templates/error-modal/error-modal.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CurrencyComponent } from './currency/currency.component';
import { FavouritesComponent } from './favourites/favourites.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FlightResultsComponent,
    HotelResultsComponent,
    FlightConfirmComponent,
    ProfileComponent,
    OrdersHistoryComponent,
    FlightsearchpanelComponent,
    HotelsearchpanelComponent,
    LoginSignupPanelComponent,
    LoginSignupComponent,
    HotelDetailsComponent,
    PaymentComponent,
    FlightItineraryComponent,
    PersonalInformationComponent,
    HotelConfirmComponent,
    ErrorModalComponent,
    UpdatePasswordComponent,
    CurrencyComponent,
    FavouritesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    SocialLoginModule,
    CountdownModule 
  ],
  providers: [
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(
                '989990533623-4k77pbicgg53m03pcijfimk5juf8iqpv.apps.googleusercontent.com'
              ),
            },
            {
              id: FacebookLoginProvider.PROVIDER_ID,
              provider: new FacebookLoginProvider('2517160125177717'),
            }
            // ,{
            //   id: AmazonLoginProvider.PROVIDER_ID,
            //   provider: new AmazonLoginProvider(
            //     'clientId'
            //   ),
            // },
            // {
            //   id: LinkedInLoginProvider.PROVIDER_ID,
            //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
            // }
          ],
        } as SocialAuthServiceConfig,
      },
      Title
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
