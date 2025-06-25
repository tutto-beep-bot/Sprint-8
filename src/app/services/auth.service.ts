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

	login(email: string, password: string) {
		return signInWithEmailAndPassword(this.auth, email, password);
	}

	register(email: string, password: string) {
		return createUserWithEmailAndPassword(this.auth, email, password);
	}

	logout(){
		return signOut(this.auth);
	}

	isAuthenticated() {
		return !!this.currentUser;
	}

	getCurrentUser() {
		return this.currentUser;
	}

}
