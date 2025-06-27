import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class MapService {

	private apiUrl = 'http://localhost:3000/api/locations';

	constructor(private http: HttpClient) {}

	getLocations() {
		return this.http.get<Location[]>(this.apiUrl);
	}
	
	createLocation(location: Location) {
		return this.http.post<Location>(this.apiUrl, location)
	}
}
