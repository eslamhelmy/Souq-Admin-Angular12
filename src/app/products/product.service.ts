import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Category } from './models/category';
import { Offer } from './models/offer';
import { Product } from './models/product';
import { ProductViewModel } from './models/product-view-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  endPoint = 'http://localhost:60108/product';

  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getProducts(): Observable<ProductViewModel[]> {
    return this.httpClient.get<ProductViewModel[]>(this.endPoint + '/getproducts')
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.endPoint + '/getcategories')
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }
  
  addProduct(product:Product): Observable<any> {
    console.log(product);
    return this.httpClient.post<any>(this.endPoint + '/add', product)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

   getProductById(id: number): Observable<ProductViewModel> {
    return this.httpClient.get<ProductViewModel>(this.endPoint + '/GetProductById/'+id)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }
 
  saveOffer(offer: Offer): Observable<any> {
    return this.httpClient.post<any>(this.endPoint + '/addoffer',offer)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

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

