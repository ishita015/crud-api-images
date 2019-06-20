import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Add } from './models/add';
import { Router } from '@angular/router';
import{URL} from './url';

@Injectable({
  providedIn: 'root'
})

export class DataService {
 

  constructor(private http: HttpClient, private router: Router) { }
  
  public addUser(userAddInfo: any): Observable<any> {
    return this.http.post(URL.ADD_USER , userAddInfo);
  }

  public listUser(): Observable<any> {
    return this.http.get(URL.LIST_USER );
  }
}
