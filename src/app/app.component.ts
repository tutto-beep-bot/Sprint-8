import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { LogoComponent } from "./logo/logo.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LogoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'crud-api';
}
