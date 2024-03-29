import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { BarraService } from '../../shared/service/barra.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService,private barraService:BarraService) { }

  ngOnInit(): void {
  }


  email!: string;
  password!: string;

  login() {
    this.authService.login( this.email, this.password )
    .subscribe({
       next: (resp => {
         localStorage.setItem('token',resp.access_token!);
         this.barraService.sacarSacarUsuario();
         console.log(resp.access_token);
         //this.router.navigateByUrl('/paginas/ordenadores');
      }),
       error: resp => {
         Swal.fire('Usuario o contraseña invalido/s', resp.error.message, 'error')
       }
    });
  }



}
