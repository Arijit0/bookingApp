import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private apicall: ApicallService) { }

  ngOnInit(): void {

    
    if(localStorage.loginDetails){
      this.router.navigate(['/profile']);    }
  }

}
