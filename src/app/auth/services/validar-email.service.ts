import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthResponse } from '../Interzaces/auth';

@Injectable({
  providedIn: 'root'
})
export class ValidarEmailService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null>{
    const email = control.value;
    return this.comprobarEmail(email).pipe(
      map (resp => {
        if(resp != null){
           return {laVerdad: true};
        }else{
         return null;
        }
      }),
      catchError (err => {
         return of(null);
      })
    );

  }
  comprobarEmail(email:string):Observable<AuthResponse>{
    const url = `${ this.baseUrl }/user/email?email=${email}`;
    const header = new HttpHeaders()
    header.append('Access-Control-Allow-Origin','*');
    return this.http.get<AuthResponse>( url, {headers:header})
  }


}
