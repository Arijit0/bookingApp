import { InjectionToken } from "@angular/core";


export let APP_CONFIG = new InjectionToken("app.config");

export class AppConstants {

    

    /************** Local Start *********************/
    public static get testEnv(): string {return  'true';}
    public static get key(): string {return  '5d407db5a687c';}
    public static get titelUrl(): string {return  'BookCheap.com.au';}
    public static get url(): string {return  'https://bookcheap.com.au';}//5d407db5a687c
    public static get commonUrl(): string {return  'https://dev.bookcheap.com.au/api';}
    public static get devUrl(): string {return  'https://dev.bookcheap.com.au';}
    public static get userpluskey(): string {return  '5d407db5a687c';}
    public static get siteblogUrl(): string {return  'https://bookcheap.com.au/account/';}
    public static get domainId(): string {return  'local';} //newdevbookcheap
    public static get mainUrl(): string {return  'https://localhost:4200/';}
    public static get FirstPaymentUrl(): string {return  'https://test.ipg-online.com/connect/gateway/processing';}
    public static get WirecardPaymentUrl(): string {return  'https://test.wirecard.com.sg/engine/hpp/';}
    public static get PaypalPaymentUrl(): string {return  'https://www.sandbox.paypal.com/cgi-bin/webscr';}
    public static get PoliPaymentUrl(): string {return  'https://dev.bookcheap.com.au/api/PoliPayment/payment';}

    public static get cdnPath(): string {return  'https://bookcheap.com.au/cdn/wp-content/uploads/';}

    
    /************** Local End ************************/

    /************** Server Dev Start *********************
    public static get testEnv(): string {return  'true';}
    public static get key(): string {return  '5d407db5a687c';}
    public static get titelUrl(): string {return  'BookCheap.com.au';}
    public static get url(): string {return  'https://bookcheap.com.au';}//5d407db5a687c
    public static get commonUrl(): string {return  'https://dev.bookcheap.com.au/api';}
    public static get devUrl(): string {return  'https://dev.bookcheap.com.au';}
    public static get userpluskey(): string {return  '5d407db5a687c';}
    public static get siteblogUrl(): string {return  'https://bookcheap.com.au/account/';}
    public static get domainId(): string {return  'devbookcheap';}
    public static get mainUrl(): string {return  'https://dev.bookcheap.com.au/new/';}
    public static get FirstPaymentUrl(): string {return  'https://test.ipg-online.com/connect/gateway/processing';}
    public static get WirecardPaymentUrl(): string {return  'https://test.wirecard.com.sg/engine/hpp/';}
    public static get PaypalPaymentUrl(): string {return  'https://www.sandbox.paypal.com/cgi-bin/webscr';}
    public static get PoliPaymentUrl(): string {return  'https://dev.bookcheap.com.au/api/PoliPayment/payment';}
    public static get cdnPath(): string {return  'https://bookcheap.com.au/cdn/wp-content/uploads/';}
    
    ************** Server Dev End ************************/


   public static get defaultCurrencyCode(): any {return  {
    "NAME": "Australian Dollar",
    "CODE": "036",
    "SYMBOL": "$",
    "SHORTCUT": "AUD",
    "FLAG": "au.png",
    "STATUS": "1"
  }};


    public static get flightClass(): any {return  {
        Y:"Economic",
        S:"Premium Economic",
        C:"Business",
        F:"First Class"
    }};

    public static get statusJsonArray(): any {return  {
        "f-new-booking": "New Booking",
        "f-payment-pending": "Payment Pending",
        "f-payment-remind": "Payment Remind",
        "f-payment-success": "Payment Success",
        "f-ticket-process": "Ticket Process",
        "f-ticket-success": "Ticket Success",
        "f-failed-booking": "Failed Booking",
        "f-edit-booking": "Edit Booking",
        "f-cancel-booking": "Cancel Booking",
        "f-refund-pending": "Refund Pending",
        "f-redund-complete": "Refund Complete",
      }};


    public static get mealList(): any {
        return  (
        [
            {
                value: 'ANY3',
                text: "Any"
            },
            {
                value: 'AVML',
                text: "Vegetarian Meal (AVML)"
            },
            {
                value: 'BBML',
                text: "BabyInfant Meal (BBML)"
            },
            {
                value: 'BLML',
                text: "Bland Meal (BLML)"
            },
            {
                value: 'CHML',
                text: "Child Meal (CHML"
            },
            {
                value: 'DBML',
                text: "Diabetic Meal (DBML)"
            },
            {
                value: 'FFML',
                text: "Frequent Flyer Meal (FFML)"
            },
            {
                value: 'FPML',
                text: "Fruit Plate Meal (FPML)"
            },
            {
                value: 'GFML',
                text: "Gluten Free Meal (GFML"
            },
            {
                value: 'HFML',
                text: "High Fiber Meal (HFML)"
            },
            {
                value: 'HNML',
                text: "Hindu Meal (HNML"
            },
            {
                value: 'VJML',
                text: "Jain Meal (VJML)"
            },
            {
                value: 'KSML',
                text: "Kosher Meal (KSML)"
            },
            {
                value: 'LCML',
                text: "Low Calorie Meal (LCML)"
            },
            {
                value: 'LFML',
                text: "Low Cholesterol Low Fat Meal (LFML)"
            },
            {
                value: 'LSML',
                text: "Low Sodium Low Salt Meal (LSML)"
            },
            {
                value: 'LPML',
                text: "Low Protein Meal (LPML)"
            },
            {
                value: 'MOML',
                text: "Muslim Meal (MOML)"
            },
            {
                value: 'NLML',
                text: "Non-Lactose Meal (NLML)"
            },
            {
                value: 'ORML',
                text: "Asian Meal (ORML)"
            },
            {
                value: 'PRML',
                text: "Low Purin Meal (PRML)"
            },
            {
                value: 'RVML',
                text: "Raw Vegetarian Meal (RVML)"
            },
            {
                value: 'SPML',
                text: "Special Meal (SPML)"
            },
            {
                value: 'SPMLJ',
                text: "Japanese Meal  (SPMLJ)"
            },
            {
                value: 'SFML',
                text: "Sea Food Meal (SFML)"
            },
            {
                value: 'VGML',
                text: "Vegetarian Vegan Meal (VGML)"
            },
            {
                value: 'VLML',
                text: "OvoLacto Vegetarian Meal (VLML)"
            },
            {
                value: 'VOML',
                text: "Vegetarian Oriental Meal (VOML)"
            }
        ]);
    }

    public static get payLang(): any {return {
            "FIRST_DATA_TITLE": "Credit/Debit Cards Checkout",
            "FIRST_DATA_SUBTITLE": "Fast and secure credit/debit card payment with Visa, Master, Amex",
            "FIRST_DATA_HEADER": "How to pay with FirstData Credit or Debit Cards Checkout Page?",
            "FIRST_DATA_DETAILS": "Customers will be redirected to Secure FirstData Checkout Payment page to complete their purchase. Once the payment is complete, customers will be redirected back to the site to confirm the order. Customers can pay you with major card types, including Visa, MasterCard, and American Express",
            "WIRECARD_DATA_TITLE": "Credit/Debit Cards Checkout",
            "WIRECARD_DATA_SUBTITLE": "Fast and secure credit/debit card payment with Visa, Master, Amex",
            "WIRECARD_DATA_HEADER": "How to pay with Wirecard Credit or Deibit Cards Checkout Page?",
            "WIRECARD_DATA_DETAILS": "Customers will be redirected to Secure Wirecard Checkout Payment page to complete their purchase. Once the payment is complete, customers will be redirected back to the site to confirm the order. Customers can pay you with major card types, including Visa, MasterCard, and American Express",
            "POLI_DATA_TITLE": "Poli Netbanking Checkout",
            "POLI_DATA_SUBTITLE": "Fast and secure Australia & New Zealand Netbanking payment",
            "POLI_DATA_HEADER": "How to pay with POLi Netbanking Checkout Page?",
            "POLI_DATA_DETAILS": "POLi is an online payment solution which facilitates secure internet banking payment from a customer's bank account without the need of credit or debit card. POLi service operates with Australian and New Zealand banks only and is owned by Australia Post.",
            "PAYPAL_DATA_TITLE": "Paypal Checkout (Worldwide)",
            "PAYPAL_DATA_SUBTITLE": "Fast and secure card or bank payment",
            "PAYPAL_DATA_HEADER": "How to pay with Paypal Checkout Page?",
            "PAYPAL_DATA_DETAILS": "PayPal is the safer, easier way to pay worldwide. Paypal allows anyone to pay in any way they prefer, including through credit cards, bank accounts, PayPal Smart Connect or account balances, without sharing financial information.",
            "CASH_DATA_TITLE": "Book Now and Pay Later",
            "CASH_DATA_SUBTITLE": "Pay conveniently with Free Cancellation",
            "CASH_DATA_HEADER": "How to pay with Book Now and Pay Later?",
            "CASH_DATA_DETAILS": "Book Now and Pay Later option is ideal for customers who want to make netbanking or cash payment. This option also enables customers to book their flight or hotel booking with Free Cancellations for a limited time. Once the customer settles the payment, ticket will be automatically issued to the customer.",
    }}


}
