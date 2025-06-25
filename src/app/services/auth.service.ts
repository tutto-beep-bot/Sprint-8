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

@Injectable({
  providedIn: 'root'
})

export class AuthService {
	private app = initializeApp(firebaseConfig);
	private auth = getAuth(this.app);
	currentUser: User | null = null;

  	constructor() {
		onAuthStateChanged(this.auth, (user) => {
			this.currentUser = user;
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
