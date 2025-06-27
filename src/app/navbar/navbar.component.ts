import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
	isLoggedIn = false;

	constructor(private _auth: AuthService, private router: Router) {}

	ngOnInit(){
		this._auth.user$.subscribe(user => {
			this.isLoggedIn = !!user;
			console.log('🔔 Navbar sees user:', user, '→ isLoggedIn=', this.isLoggedIn);
		});
	}

	logout(){
		this._auth.logout().then(() => {
			this.router.navigate(['login']);
		});
	}
}
