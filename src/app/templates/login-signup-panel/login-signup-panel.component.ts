import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApicallService } from '../../services/apicall.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";


declare var $: any;

@Component({
  selector: 'app-login-signup-panel',
  templateUrl: './login-signup-panel.component.html',
  styleUrls: ['./login-signup-panel.component.css']
})
export class LoginSignupPanelComponent implements OnInit {
  @Output()
  reply:EventEmitter<any>= new EventEmitter<any>();

  homepage: boolean;
  loginError: any;
  isLogin: boolean = false;
  isGoogleClicked: boolean = false;
  loaderLogin: any;
  username:any;
  loginErrorMsg: any;
  loggedinusername: any;
  page: any;
  siteblogUrl: any;
  emailAlreadyExist: any;
  facebookLoginDetails: any = [];
  googleDetails: any = [];
  password: any;
  loaderShow: boolean = false;
  errorsArray:any=[];
  errorModalShow: boolean;

  @Input() public pageFrom: string;

  constructor(private router: Router, private route: ActivatedRoute,private apicall: ApicallService,private authService: SocialAuthService) {

    router.events.forEach((event) => {
      if (event instanceof NavigationEnd ) {
        console.log(event['url'])
        if (event['url'] == '/') {
          this.homepage=true;
        } else {
          this.homepage=false;
        }
      }
    });
   }

  ngOnInit(): void {

    /*this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      console.log(user);

    });*/
  }

  signInWithGoogle(): void {
    this.errorsArray=[];
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => { 
      this.googleDetails = res;
      
      if( this.googleDetails != undefined) {
        this.googlelogin();}
    },
    (error) => {
      console.log(error);
    });
  }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x =>
  //      console.log(x)
  //      this.facebookLoginDetails = x;
  //      );
  // }

  signInWithFB(): any {

    this.errorsArray=[];
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {

      this.facebookLoginDetails = res;
        if( this.facebookLoginDetails != undefined) {
        this.fblogin();}
    },
      (error) => {
        console.log(error);
      })

  }

  

  fblogin() {

    this.loaderShow = true;

    this.apicall.reqFBLogin(this.facebookLoginDetails.authToken).subscribe(res => {

      if(res.status == "ok") {

        res.user.id = res.user.ID;
        res.user.displayname = res.user.display_name;
        res.user.firstname = res.user.first_name;
        res.user.lastname = res.user.last_name;
        res.user.nicename = res.user.nice_name;
        res.user.nickname = res.user.email;
        res.user.username = res.user.user_login;


        delete res.user.display_name;
        delete res.user.first_name;
        delete res.user.last_name;
        delete res.user.nice_name;
        delete res.user.user_login;

        localStorage.setItem('loginDetails', JSON.stringify(res));
       
        
          // this.loginProcess(res.email,this.password)
  
          $('.modal').modal('hide');

          this.isLogin = true;

          this.loaderShow = false;

          this.reply.emit({'action':'loggedin'});
        
      }

    },
    
    (error) => {

      this.loaderShow = false;



      this.errorsArray.push(error.error);
      this.apicall.errorArrayShow(this.errorsArray);
      this.errorModalShow=true;

      console.log(error);
    })
  }

  googlelogin() {

    this.loaderShow = true;

    this.apicall.reqGoogleLogin (this.googleDetails.idToken).subscribe(res => {

      if(res.status == "ok") {

        res.user.id = res.user.ID;
        res.user.displayname = res.user.display_name;
        res.user.firstname = res.user.first_name;
        res.user.lastname = res.user.last_name;
        res.user.nicename = res.user.nice_name;
        res.user.nickname = res.user.email;
        res.user.username = res.user.user_login;


        delete res.user.display_name;
        delete res.user.first_name;
        delete res.user.last_name;
        delete res.user.nice_name;
        delete res.user.user_login;

        localStorage.setItem('loginDetails', JSON.stringify(res));

       
        
          // this.loginProcess(res.email,this.password)
  
          $('.modal').modal('hide');

          this.isLogin = true;

          this.loaderShow = false;

          this.reply.emit({'action':'loggedin'});
        
  }

    },
    
    (error) => {

      this.loaderShow = false;

      this.errorsArray.push(error.error);
      this.apicall.errorArrayShow(this.errorsArray);
      this.errorModalShow=true;

      console.log(error);
    })
  }
 

 
  signOut(): void {
    this.authService.signOut();
  }


  loginProcess(user,pass) {

    this.loaderShow = true;
    this.errorsArray=[];

    this.apicall.login(user.value,pass.value).subscribe((res) => {
      if(res.status == 'ok') {

        this.loaderShow = false;

        localStorage.setItem('loginDetails', JSON.stringify(res));

        if(JSON.parse(localStorage.getItem('loginDetails'))) {

          $('.modal').modal('hide');
   
          this.isLogin = true;

          this.router.navigate(['/profile']);
          
        }
      } else {
        $('.modal').modal('hide');
        this.errorsArray.push(res.error);
        this.apicall.errorArrayShow(this.errorsArray);
        this.errorModalShow=true;
        this.loaderShow = false;
        this.loginError = res.error;
      }
    },
    
    (error) => {

      this.loaderShow = false;

      this.errorsArray.push(error.error.message.replace(/<[^>]*>/g, ''));
      this.apicall.errorArrayShow(this.errorsArray);
      this.errorModalShow=true;

      console.log(error);
    })
  }

  registration(email,pass,first_name,last_name) {

    this.loaderShow = true;

    this.apicall.register(email.value,pass.value,first_name.value,last_name.value).subscribe(res => {
      
      if(res.status == 'ok') {

        this.loaderShow = false;
        this.password = pass;

        this.loginProcess(email,this.password)

        $('.modal').modal('hide');
      }
      else {

        $('.modal').modal('hide');
        this.loaderShow = false;
        this.errorsArray.push(res.error);
        this.apicall.errorArrayShow(this.errorsArray);
        this.errorModalShow=true;
      }
      this.emailAlreadyExist = res.error;
      // console.log(this.emailAlreadyExist);
    },
      (err) => {
        // this.alreadyExist = err;
        // console.log( this.alreadyExist.error);
      })
  }

  // goToProfile() {
  //   this.isLogin = true;
  //   this.router.navigate(['/profile']); 
  //   // return false;
  //   }

}
