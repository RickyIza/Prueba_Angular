import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  us: string = '';
  ps: string = '';


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    })

  }

  onLogin() {
    if (this.loginForm.valid) {
      //Enviar Objetos
      this.auth.login().subscribe
        ({
          next: (v) => {

            this.us = v.user
            this.ps = v.pass
            console.log(this.ps)
            //  if (this.loginForm.value.user=='agrigorescu1' && this.loginForm.value.pass=='mFafYuhrv') 

            if (this.us == this.loginForm.value.user && this.ps == this.loginForm.value.pass) {

              localStorage.setItem("nombre", this.loginForm.value.user)
              this.loginForm.reset();
              Swal.fire({
                icon: 'success',
                title: 'Login...',
                text: 'Ingreso al sistema con exito!',
              })
              this.router.navigate(['dashboard']);

            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ingrese los datos correctos!',
              })
            }
          },
          error: (e) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se puede conectar a la api',
            })
          },
          complete: () => console.info('complete')
        })

    } else {
      //error
      this.validateForm(this.loginForm);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese todos los datos!',
      })
    }
  }

  private validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateForm(control)
      }
    })

  }


}
