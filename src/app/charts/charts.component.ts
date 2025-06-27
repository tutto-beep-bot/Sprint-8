import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChartData, ChartType } from 'chart.js';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-charts',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {
    topStockData: { name: string; value: number }[] = [];
	priceData: { name: string; value: number }[] = [];
  	loading = true;
  	error = false;

	colorScheme = 'vivid'

  	constructor(private http: HttpClient) {}

  	ngOnInit(): void {
    	this.http.get<any[]>('http://localhost:3000/api/products')
      		.subscribe({
        		next: (products) => {
          		const top10 = [...products]
            		.sort((a, b) => b.stock - a.stock)
            		.slice(0, 10);

          		this.topStockData = top10.map(p => ({
            		name: p.name,
            		value: p.stock
          		}));

				this.priceData = products.map(p => ({
            		name: p.name,
            		value: p.price
          		}));

          		this.loading = false;
        	},
        	error: (err) => {
          		console.error('Failed to load products:', err);
          		this.error = true;
          		this.loading = false;
        	}
      	});
  	}
}
