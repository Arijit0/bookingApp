import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../services/apicall.service';
declare var $: any;
@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  errorMsgs: any=[];

  constructor(private apicall:ApicallService) {

   }

  ngOnInit(): void {

    this.apicall.errorModalArray$.subscribe(msg=>{
      console.log(msg);
      this.errorMsgs=[];
        this.errorMsgs=msg;
        $("#errorModal").modal();
    });

  }

}
