import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  	email: string = '';
  	password: string = '';
  	errorMessage: string = '';

	constructor(private authService: AuthService, private router: Router){}

}
