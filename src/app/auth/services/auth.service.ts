import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../Interzaces/auth';
import { Usuario } from '../Interzaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(email:string, password: string){
    const url = `${this.baseUrl}/user/login`;
    const body =  {
      "email":email,
      "password": password};
    const header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin','*');
    return this.http.post<AuthResponse>(url, body,{headers:header});
  }

  registrar(user:Usuario){
    const url = `${this.baseUrl}/user/register`;
    return this.http.post<AuthResponse>(url, user);
  }
}
