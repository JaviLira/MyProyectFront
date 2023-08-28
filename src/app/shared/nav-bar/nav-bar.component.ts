import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarraService } from '../service/barra.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private barraService:BarraService, private serviceAuth:AuthService) { }

  ngOnInit(): void {
    this.barraService.sacarSacarUsuario();
    this.barraService.sacarSacarRolAdministrador();
  }



}
