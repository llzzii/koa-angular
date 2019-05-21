import { Injectable } from '@angular/core';
import{HttpClient,HttpParams,HttpHeaders} from '@angular/common/http'
import {Observable,throwError as observableThrowError} from 'rxjs' 
import {tap} from 'rxjs/operators'

const httpOptions={
  headers:new HttpHeaders({'Content-type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login (data):Observable<any>{
    return this.http.post('/api/login',JSON.stringify(data),httpOptions).pipe(
      tap(response=>response)
    )
  }
}
