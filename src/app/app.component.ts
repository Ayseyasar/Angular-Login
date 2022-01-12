import { Component } from '@angular/core';
import "./app.component.css";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {class:'app-root'}
})
export class AppComponent {
  title = 'clinic';

}
