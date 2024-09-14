import { Component } from '@angular/core';
import { LoginComponent } from './dialogs/login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public dialog: MatDialog) {}

  isSidebarVisible = false;
  isUserLoggedIn : boolean = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '50vw',
      // height: '50vh',
      panelClass: 'shadow-light',
      backdropClass: 'shadow-light',
      disableClose : true,
      autoFocus : true
      // You can pass data to the dialog if needed
      // data: { name: this.name, animal: this.animal }
    });
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result here if needed
    });
  }

}
