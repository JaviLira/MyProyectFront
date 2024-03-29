import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name:    ['', [ Validators.required, Validators.minLength(4) ]],
    email:    ['', [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    telefono: ['', [ Validators.required, Validators.min(600000000), Validators.max(999999999) ]],
    password: ['', [ Validators.required, Validators.minLength(4) ]],
  });


  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
  }

  registrar() {
    const user = this.miFormulario.value;

    this.authService.registrar(user)
    .subscribe({
       next: (resp => {
         this.router.navigateByUrl('/auth/login');
      }),
       error: resp => {
         Swal.fire('Servidor no disponible')
       }
    });

  }

  /**
   * metodo para validar que cada campo sea valido
   * @param campo
   * @returns
   */

  campoEsValido( campo: string ) {

    return this.miFormulario.controls[campo].errors
            && this.miFormulario.controls[campo].touched;
  }

  get emailErrorMensaje(): string {

    const errors = this.miFormulario.get('email')?.errors!;
    if ( errors['required'] ) {
      return 'Se requiere email';
    } else if ( errors['pattern'] ) {
      return 'Introduce un email en formato email';
    } else if ( errors['laVerdad'] ) {
      return 'El email esta en uso';
    }

    return '';
  }


  get nameErrorMensaje(): string {

    const errors = this.miFormulario.get('name')?.errors!;
    if ( errors['required'] ) {
      return 'Se requiere nombre';
    } else if ( errors['pattern'] ) {
      return 'Introduce un nombre de minimo 3 letras';
    } else if ( errors['laVerdad'] ) {
      return 'El nombre esta en uso';
    }

    return '';
  }
}
