import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ApicallService } from '../services/apicall.service';

declare var $: any;

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  @Output()
  reply:EventEmitter<any>= new EventEmitter<any>();

  @Input() public pageFrom: string;

  constructor(private apicall:ApicallService) { }

  currencies: any = [];

  ngOnInit(): void {

    this.getAllCurrencies();
  }

  getAllCurrencies() {
    this.apicall.getCurrencies().subscribe(res => {
      this.currencies = res.countries;

    })
  }

  selectedCurrency(event) {
    console.log(event);

    localStorage.setItem('selectedCurrency', JSON.stringify(event));

    $('.modal').modal('hide');

    window.location.reload();
  }

}
