import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string='https://ecovitali.presttoapp.net/Puertto/PostCalidad/Api/api/Login'

  constructor(private http : HttpClient) { 
  }

  login():Observable<any>{
    return this.http.get<any>(this.baseUrl)

  }

}
