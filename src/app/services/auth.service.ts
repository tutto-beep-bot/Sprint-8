import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  	getAuth, 
  	signInWithEmailAndPassword, 
  	createUserWithEmailAndPassword,
  	signOut,
  	onAuthStateChanged,
  	User
} from 'firebase/auth';
import { firebaseConfig } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
	private app = initializeApp(firebaseConfig);
	private auth = getAuth(this.app);
	
	private userSubject = new BehaviorSubject<User | null>(null);
	user$ = this.userSubject.asObservable();
	
	currentUser: User | null = null;

  	constructor() {
		console.log('AuthService started!');

		onAuthStateChanged(this.auth, (user) => {
			console.log('onAuthStateChanged fired!', user);
			this.currentUser = user;
			this.userSubject.next(user);
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
