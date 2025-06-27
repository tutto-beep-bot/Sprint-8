import { Injectable, inject } from '@angular/core';
import {  
  	signInWithEmailAndPassword, 
  	createUserWithEmailAndPassword,
  	signOut,
  	onAuthStateChanged,
  	User
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

	private auth: Auth = inject(Auth);;
	
	private userSubject = new BehaviorSubject<User | null>(null);
	user$ = this.userSubject.asObservable();
	private _isAuthResolved = new ReplaySubject<boolean>(1);
  	isAuthResolved$ = this._isAuthResolved.asObservable();
	
	currentUser: User | null = null;

  	constructor() {
		console.log('AuthService started!');

		onAuthStateChanged(this.auth, (user) => {
			console.log('onAuthStateChanged fired!', user);
			this.currentUser = user;
			this.userSubject.next(user);
			this._isAuthResolved.next(true);
		})
	}

	async login(email: string, password: string) {
    	try {
      		await signInWithEmailAndPassword(this.auth, email, password);
      		return true;
    	} catch (error) {
      		console.error('Login error:', error);
      		throw error;
    	}
  	}

  	async register(email: string, password: string) {
    	try {
      		await createUserWithEmailAndPassword(this.auth, email, password);
      		return true;
    	} catch (error) {
      		console.error('Registration error:', error);
      		throw error;
    	}
  	}

  	async logout() {
    	try {
      		await signOut(this.auth);
      		return true;
    	} catch (error) {
      		console.error('Logout error:', error);
      		throw error;
    	}
  	}

  	isAuthenticated() {
    	return !!this.currentUser;
  	}

}
