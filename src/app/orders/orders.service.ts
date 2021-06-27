import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Order } from './models/order';
import { OrderOffer } from './models/order-offer';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  
  endPoint = 'http://localhost:60108/Order';

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getOrders(): Observable<Order[]> {
    console.log('get orders');
    return this.httpClient.get<Order[]>(this.endPoint + '/getorders')
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  setSpecialOffer(offer:OrderOffer):Observable<any>{
    return this.httpClient.post<any>(this.endPoint + '/setspecialoffer', offer)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

   
 
  // saveOffer(offer: Offer): Observable<any> {
  //   return this.httpClient.post<any>(this.endPoint + '/addoffer',offer)
  //   .pipe(
  //     retry(1),
  //     catchError(this.httpError)
  //   )
  // }

  httpError(error:any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
