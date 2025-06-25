import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
	registerForm: FormGroup;
	errorMessage: string = '';
	isLoading: boolean = false;

	constructor(private _authService: AuthService, private router: Router, private fb: FormBuilder){.
		this.registerForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', Validators.required]
		}, { Validator: this.passwordMatchValidator });
	}

	private passwordMatchValidator(g: FormGroup) {
		return g.get('password')?.value === g.get('confirmPassword')?.value
			? null : {mismatch: true};
	}

	async onSubmit(){
		if (this.registerForm.invalid) return;

		this.isLoading = true;
		this.errorMessage = '';

		const { email, password } = this.registerForm.value;

		try {
			await this._authService.register(email, password);
			this.router.navigate(['/']);
		} catch (error: any) {
			this.errorMessage = this.getErrorMessage(error.code);
		} finally {
			this.isLoading = false;
		}
	}

	private getErrorMessage(code: string): string {
    	const errorMessages: Record<string, string> = {
      		'auth/email-already-in-use': 'Email already in use',
      		'auth/invalid-email': 'Invalid email format',
      		'auth/weak-password': 'Password should be at least 6 characters',
      		'default': 'Registration failed. Please try again'
    	};
    	return errorMessages[code] || errorMessages['default'];
  	}	

	get email() { return this.registerForm.get('email'); }
	get password() { return this.registerForm.get('password'); }
  	get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}
