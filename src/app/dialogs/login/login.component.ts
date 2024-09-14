import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public dialogRef: MatDialogRef<LoginComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
