import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import { CreditCardDetailsComponent } from './credit-card-details/credit-card-details.component';


const routes: Routes = [
  {
    path: 'credit-card-form',
    component: CreditCardFormComponent
  },
  {
    path: 'credit-card-details',
    component: CreditCardDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
