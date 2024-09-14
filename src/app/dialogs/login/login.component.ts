import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  isLoginFormSubmitted : boolean = false;

  showLoginForm : boolean = true;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private restService : RestService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    this.isLoginFormSubmitted = true;
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      let params : any = {
        email : this.loginForm.value.email,
        password : this.loginForm.value.password
      }
      this.restService.post(params,'/api/auth/login').subscribe(
        (data : any) => {
          if(data.rcode === 200){
            let token = data.rObj.token;
            localStorage.setItem('token',token);
          }
        }
      )
    } else {
      console.log('Form is invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showRegisterForm(){
    this.showLoginForm = false;
  }

}
