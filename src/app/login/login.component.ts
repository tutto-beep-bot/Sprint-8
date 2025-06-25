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

	onSubmit() {
		this.authService.login(this.email, this.password)
			.then(() => {
				this.router.navigate(['/dashboard']);
			})
			.catch(error => {
				this.errorMessage = this.getErrorMessage(error.code)
			})
	}

	private getErrorMessage(code: string): string {
		switch(code) {
			case 'auth/invalid-email':
				return 'Invalid email format';
			case 'auth/user-disabled':
        		return 'This account has been disabled';
      		case 'auth/user-not-found':
        		return 'No account found with this email';
      		case 'auth/wrong-password':
        		return 'Incorrect password';
      		default:
        		return 'Login failed. Please try again';
		}
	}
}
