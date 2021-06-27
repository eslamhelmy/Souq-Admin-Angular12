
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  
  httpHeader = {
    headers: new HttpHeaders({
    //  'Content-Type': 'multipart/form-data'
    })
  }  
  endPoint = 'http://localhost:60108/file/upload';

        /** In Angular 5, including the header Content-Type can invalidate your request */
        
  constructor(private httpClient: HttpClient) { }

  upload(file: any):Observable<any>{
    return this.httpClient.post<any>(this.endPoint, file,this.httpHeader)
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
