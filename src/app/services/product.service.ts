import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { createClient } from '@supabase/supabase-js';
// import { Observable } from 'rxjs';
// import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
	private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
//   private myAppUrl: string; 
//   private myApiUrl: string;

// 	constructor(private http: HttpClient) {
// 		this.myAppUrl = environment.endpoint;
//     	this.myApiUrl = 'api/products/'
//    	}

//    	getListProducts(): Observable<Product[]> {
//     	return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
//    	}

//    	deleteProduct(id: number): Observable<void> {
//     	return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
//    	}

//    	saveProduct(product: Product): Observable<void> {
//     	return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product)
//    	}

//    	getProduct(id: number): Observable<Product> {
//     	return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${id}`)
//    	}

// 	updateProduct(id: number, product: Product): Observable<void> {
// 		return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, product)
// 	}

	async getProducts() {
		const { data, error } = await this.supabase
			.from('products')
			.select('*');
		console.log('Supabase products:', data, error);
		if (error) throw error;
		return data;
  	}

	async addProduct(product: any) {
		const { data, error } = await this.supabase
			.from('products')
			.insert([product]);
		if (error) throw error;
		return data;
	}

	async updateProduct(id: number, updates: any) {
		const { data, error } = await this.supabase
			.from('products')
			.update(updates)
			.eq('id', id);
		if (error) throw error;
		return data;
	}

	async deleteProduct(id: number) {
		const { data, error } = await this.supabase
			.from('products')
			.delete()
			.eq('id', id);
		if (error) throw error;
		return data;
	}
}
