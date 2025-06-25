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

	
}
