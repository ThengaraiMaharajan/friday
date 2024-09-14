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

  registrationForm!: FormGroup;
  isRegistrationFormSubmitted : boolean = false;

  otpForm!: FormGroup;
  isOtpFormSubmitted : boolean = false;

  passwordForm!: FormGroup;
  isPasswordFormSubmitted : boolean = false;

  showForm : number = 4;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private restService : RestService
  ) {}

  ngOnInit() {

    
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });

    this.registrationForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      phoneNo: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      countryCode: [null, [Validators.required, Validators.pattern(/^\+\d{1,4}$/)]]
    });

    this.otpForm = this.fb.group({
      token: [null, [Validators.required]],
      code: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.passwordForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8)]]
    });


  }

  loginFormOnSubmit() {
    this.isLoginFormSubmitted = true;
    console.log('Form submitted:', this.loginForm.value);
    if (this.loginForm.valid) {
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

  registrationFormOnSubmit() {
    this.isRegistrationFormSubmitted = true;
    console.log('Form submitted:', this.registrationForm.value);
    if (this.registrationForm.valid) {
      let params : any = {
        email : this.registrationForm.value.email,
        firstName : this.registrationForm.value.firstName,
        lastName : this.registrationForm.value.lastName,
        phoneNo : this.registrationForm.value.phoneNo,
        countryCode : this.registrationForm.value.countryCode
      }
      this.restService.post(params,'/api/user/registration').subscribe(
        (data : any) => {
          if(data.rcode === 200){
            this.otpForm.patchValue({
              token : data.rObj.token,
              code : data.rObj.code
            });
            this.showForm = 3;
          }
        }
      )
    } else {
      console.log('Form is invalid');
    }
  }

  otpFormOnSubmit() {
    this.isOtpFormSubmitted = true;
    console.log('Form submitted:', this.otpForm.value);
    if (this.otpForm.valid) {
      let params : any = {
        token : this.otpForm.value.token,
        code : this.registrationForm.value.code
      }
      this.restService.post(params,'/api/user/verify').subscribe(
        (data : any) => {
          if(data.rcode === 200){
            this.showForm = 4;
          }
        }
      )
    } else {
      console.log('Form is invalid');
    }
  }

  passwordFormOnSubmit() {
    this.isPasswordFormSubmitted = true;
    console.log('Form submitted:', this.otpForm.value);
    if (this.passwordForm.valid) {
      if(this.passwordForm.value.password === this.passwordForm.value.confirmPassword){
        let params : any = {
          password : this.passwordForm.value.password
        }
        this.restService.post(params,'/api/user/setpassword').subscribe(
          (data : any) => {
            if(data.rcode === 200){
              
            }
          }
        )
      }else{

      }
    } else {
      console.log('Form is invalid');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showRegisterForm(){
    this.showForm = 2;
  }

}
