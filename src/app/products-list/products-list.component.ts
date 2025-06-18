import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  productsList: Product[] = [
    { id: 1, name: 'Jamon', description: '250g', price: 1.99, stock: 12},
    { id: 2, name: 'Coca-Cola', description: 'Cancer in a bottle', price: 1.89, stock: 87}
  ]
}
