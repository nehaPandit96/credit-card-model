import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-credit-card-details',
  templateUrl: './credit-card-details.component.html'
})
export class CreditCardDetailsComponent implements OnInit {
  cardDetails;
  constructor(private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.cardDetails = this.paymentService.details;
    console.log('---', this.cardDetails);
  }

}
