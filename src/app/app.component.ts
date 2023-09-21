import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestBoard';
  constructor( private sanitizer: DomSanitizer){}
  satanizedImageURL = this.sanitizer.bypassSecurityTrustResourceUrl('../assets/img/ZKW-Logo.png');
}
