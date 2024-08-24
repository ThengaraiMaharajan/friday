import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'friday';

  @ViewChild('childTwo') childTwo!: ElementRef;

  toggleSidebar() {
    if (this.childTwo) {
      this.childTwo.nativeElement.classList.toggle('visible');
    }
  }

}
