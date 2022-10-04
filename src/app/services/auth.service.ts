import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string='https://my.api.mockaroo.com/prueba?key=ec124670'

  constructor(private http : HttpClient) { 
  }

  login(){
    return this.http.get<any>(this.baseUrl)

  }

}
