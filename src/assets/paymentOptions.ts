// import { InjectionToken } from "@angular/core";


// export let APP_CONFIG = new InjectionToken("app.config");

export class paymentOptions {

    public static get paymentGateway(): any {return  [ {
        'name':'wirecardcc',
        'title':'WIRECARD_DATA_TITLE',
        'subtitle':'WIRECARD_DATA_SUBTITLE',
        'gateway':'wirecard',
        'charge': '2',
        'showname':'Credit/Debit Cards',
        'paramname':'payment_method',
        'paramvalue':'creditcard',
        'transaction_type':'purchase',
        'status': 1,
        'logo':'https://bookcheap.com.au/cdn/wp-content/uploads/CC.jpg',
        'header' : 'WIRECARD_DATA_HEADER',
        'details':'WIRECARD_DATA_DETAILS'
      },
      {
        'name':'wirecardpoli',
        'title':'POLI_DATA_TITLE',
        'subtitle':'POLI_DATA_SUBTITLE',
        'showname':'Poli Card',
        'gateway':'wirecard',
        'charge': '0',
        'paramname':'payment_method',
        'paramvalue':'poli',
        'transaction_type':'debit',
        'status': 0,
        'logo':'https://bookcheap.com.au/cdn/wp-content/uploads/Poli-1.jpg',
        'header' : 'POLI_DATA_HEADER',
        'details':'POLI_DATA_DETAILS'
      },
      {
        'name':'wirecardpaypal',
        'title':'PAYPAL_DATA_TITLE',
        'showname':'Paypal Card',
        'subtitle':'PAYPAL_DATA_SUBTITLE',
        'gateway':'wirecard',
        'charge': '0',
        'paramname':'payment_method',
        'paramvalue':'paypal',
        'transaction_type':'authorization',
        'status': 0,
        'logo':'https://bookcheap.com.au/cdn/wp-content/uploads/paypal.png',
        'header' : 'PAYPAL_DATA_HEADER',
        'details':'PAYPAL_DATA_DETAILS'
      },
      {
        'name':'firstdatacc',
        'title':'FIRST_DATA_TITLE',
        'showname':'CC',
        'subtitle':'FIRST_DATA_SUBTITLE',
        'gateway':'firstdata',
        'charge': '0',
        'paramname':'',
        'paramvalue':'',
        'transaction_type':'',
        'status': 0,
        'logo':'https://bookcheap.com.au/cdn/wp-content/uploads/CC.jpg',
        'header' : 'FIRST_DATA_HEADER',
        'details':'FIRST_DATA_DETAILS'
      },
      {
        'name':'paypal',
        'title':'PAYPAL_DATA_TITLE',
        'showname':'Paypal',
        'subtitle':'PAYPAL_DATA_SUBTITLE',
        'gateway':'paypal',
        'charge': '6',
        'paramname':'payment_method',
        'paramvalue':'paypal',
        'transaction_type':'authorization',
        'status': 1,
        'logo':'https://bookcheap.com.au/cdn/wp-content/uploads/paypal.png',
        'header' : 'PAYPAL_DATA_HEADER',
        'details':'PAYPAL_DATA_DETAILS'
      },
      {
        'name':'poli',
        'title':'POLI_DATA_TITLE',
        'showname':'Poli',
        'subtitle':'POLI_DATA_SUBTITLE',
        'gateway':'poli',
        'charge': '1',
        'paramname':'payment_method',
        'paramvalue':'poli',
        'transaction_type':'debit',
        'status': 1,
        'logo':'https://bookcheap.com.au/cdn/wp-content/uploads/Poli-1.jpg',
        'header' : 'POLI_DATA_HEADER',
        'details':'POLI_DATA_DETAILS'
      },
      {
        'name':'paybycash',
        'title':'CASH_DATA_TITLE',
        'showname':'Direct debit',
        'subtitle':'CASH_DATA_SUBTITLE',
        'gateway':'',
        'charge': '0',
        'paramname':'',
        'paramvalue':'',
        'transaction_type':'',
        'status': 1,
        'logo':'https://bookcheap.com.au/cdn/wp-content/uploads/direct-debit.png',
        'header' : 'CASH_DATA_HEADER',
        'details':'CASH_DATA_DETAILS'
      }
];
}



}
