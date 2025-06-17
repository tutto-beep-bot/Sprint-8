import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  productsList: Product[] = []
}
