import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
	loginForm: FormGroup;
  	errorMessage: string = '';
	isLoading: boolean = false;

	constructor(private authService: AuthService, private router: Router, fb: FormBuilder){
		this.loginForm = fb.group({
      		email: ['', [Validators.required, Validators.email]],
      		password: ['', [Validators.required, Validators.minLength(6)]]
    	});
	}

	ngOnInit() {
  		if (this.authService.isAuthenticated()) {
    		this.router.navigate(['/']);
  		}
	}


	async onSubmit() {
		if (this.loginForm.invalid) return;
    	this.isLoading = true;
    	this.errorMessage = '';
		
		const { email, password } = this.loginForm.value;
    
    	try {
      		await this.authService.login(email, password);
      		this.router.navigate(['/']);
    	} catch (error: any) {
      		this.errorMessage = this.getErrorMessage(error.code);
    	} finally {
      		this.isLoading = false;
    	}
  	}

  	private getErrorMessage(code: string): string {
    	const errorMessages: Record<string, string> = {
      		'auth/invalid-email': 'Invalid email format',
      		'auth/user-disabled': 'This account has been disabled',
      		'auth/user-not-found': 'No account found with this email',
      		'auth/wrong-password': 'Incorrect password',
      		'default': 'Login failed. Please try again'
    	};
    	return errorMessages[code] || errorMessages['default'];
  	}

	get email() {
    	return this.loginForm.get('email');
  	}

  	get password() {
    	return this.loginForm.get('password');
  	}
}
