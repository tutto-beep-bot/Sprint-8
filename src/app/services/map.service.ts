import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class MapService {
	private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

	async getLocations(): Promise<Location[]> {
    	const { data, error } = await this.supabase
      		.from('locations')
      		.select('*');
    	if (error) throw error;
    	return data as Location[];
	}

	async createLocation(location: Location): Promise<Location> {
    	const { data, error } = await this.supabase
      		.from('locations')
      		.insert([location])
      		.select()
      		.single();
    	if (error) throw error;
    	return data as Location;
  	}


	// private apiUrl = 'http://localhost:3000/api/locations';

	// constructor(private http: HttpClient) {}

	// getLocations() {
	// 	return this.http.get<Location[]>(this.apiUrl);
	// }
	
	// createLocation(location: Location) {
	// 	return this.http.post<Location>(this.apiUrl, location)
	// }
}
