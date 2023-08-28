import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../auth/Interzaces/usuario';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarraService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  sesionIniciada:boolean=false;
  usuario!:Usuario;
  rolAdministrador:boolean=false;

  sacarUsuario():Observable<Usuario>{
    const url = `${ this.baseUrl }/user`;
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Usuario>( url, {headers})
  }

  sacarSacarUsuario(){
    console.log(localStorage.getItem('token'));

    this.sacarUsuario()
    .subscribe({
       next: (resp => {
        this.usuario=resp;
        this.sacarSacarRolAdministrador();
        this.sesionIniciada=true;
      }),
       error: resp => {
        console.log("sesion no iniciada");

       }
    });
  }

  sacarRolAdministrador():Observable<Usuario>{
    const url = `${ this.baseUrl }/validarRolAdministrador`;
    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Usuario>( url, {headers})
  }

  sacarSacarRolAdministrador(){
    this.sacarRolAdministrador()
    .subscribe({
       next: (resp => {
        this.rolAdministrador=true;
      }),
       error: resp => {
        this.rolAdministrador=false;
       }
    });
  }
}
