import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker'
import * as _moment from 'moment';
import { Moment } from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../payment.service';

const moment = _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})

export class CreditCardFormComponent implements OnInit {

  creditCardForm: FormGroup;
  expiryYear;
  expirationDate;
  formInvalid = false;
  currentDate;
  dateValidation;
  constructor(private router: Router, private paymentService: PaymentService) {
    this.creditCardForm = new FormGroup({
      creditCardNumber: new FormControl(),
      creditCardHolder: new FormControl(),
      securityCode: new FormControl(),
      amount: new FormControl(),
      date: new FormControl(moment())
    })
  }

  chosenYearHandler(year) {
    this.expiryYear = year.format('YYYY');
    const ctrlValue = this.creditCardForm.controls.date.value;
    ctrlValue.year(year.year());
    this.creditCardForm.controls.date.setValue(ctrlValue);
  }

  chosenMonthHandler(month, datepicker: MatDatepicker<Moment>) {
    let seletedDate = month.format('YYYY-MM-DD');
    this.dateValidation = moment(seletedDate).isAfter(this.currentDate, 'year');
    let expiryMonth = month.format('MM');
    const ctrlValue = this.creditCardForm.controls.date.value;
    ctrlValue.month(month.month());
    this.creditCardForm.controls.date.setValue(ctrlValue);
    datepicker.close();
    this.expirationDate = expiryMonth + '/' + this.expiryYear;
  }

  ngOnInit(): void {
    this.currentDate = this.creditCardForm.controls.date.value.format('YYYY-MM-DD');
    document.getElementById('cardNumber').addEventListener('input', (e) => {
      (<HTMLInputElement>e.target).value = (<HTMLInputElement>e.target).value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    });
  }

  submitForm() {
    if (this.creditCardForm.status === "INVALID") {
      this.formInvalid = !this.formInvalid;
    } else {
      this.creditCardForm.controls.date.setValue(this.expirationDate);
      this.router.navigate(['/credit-card-details']);
      this.paymentService.obtainCardDetails(this.creditCardForm.value);
      this.formInvalid = !this.formInvalid;
      this.creditCardForm.reset();
    }
  }

}
