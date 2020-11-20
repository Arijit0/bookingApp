import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  loaderShow: boolean = false;
  isLogin: boolean = false;
  

  constructor(private apicall: ApicallService,private route: ActivatedRoute,private router: Router) {
   
   }

  ngOnInit(): void {
  }

  passwordUpdate(password,revalidatePassword) {

    this.loaderShow = true;
    

    let loginDetails = JSON.parse(localStorage.getItem('loginDetails'));

    if(password.value == revalidatePassword.value) {
      this.apicall.updatePassword(loginDetails.cookie,password.value).subscribe(res => {
       
        // if(res.status == 'error') {
          this.logout();
          this.router.navigate(['/login']);
          this.loaderShow = false;
        // }

       

        // error: "Invalid cookie. Use the `generate_auth_cookie` method."
        // status: "error"
        // this.loaderShow = false;
      },
      (error)=> {
        console.log(error);
        
      })
    }

   
  }

  logout(){
    localStorage.removeItem('loginDetails');
    this.isLogin = false;
  }

}
