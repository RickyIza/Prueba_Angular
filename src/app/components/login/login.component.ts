import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from  'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

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
      console.log(this.loginForm.value)
      this.auth.login().subscribe
        ({
          next: (v) => {
            console.log(v);
            const user = v.find((a: any) => {
              return a.user === this.loginForm.value.user && a.pass === this.loginForm.value.pass
            })
            console.log('res', user);

            if (this.loginForm.value.user=='agrigorescu1' && this.loginForm.value.pass=='mFafYuhrv') 
            {

              localStorage.setItem("nombre",this.loginForm.value.user)
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
                text: 'Ingrese los datos correstos!',
              })
            }
          },
          error: (e) => {        
            alert("No se puede ingrsar al back")},
          complete: () => console.info('complete')
        })

    } else {
      //error
      this.validateForm(this.loginForm);
      alert('Formulario no valido')
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
