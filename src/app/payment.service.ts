import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  details;
  constructor(private http: HttpClient) { }

  obtainCardDetails(data) {
    this.http.post('https://jsonplaceholder.typicode.com/posts', data).subscribe((resp: any) => {
      if (resp) {
        this.details = resp;
      }
    })
  }
}
