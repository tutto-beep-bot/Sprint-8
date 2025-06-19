import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  productsList: Product[] = []

  constructor(private _productService: ProductService) {

  }

  ngOnInit(): void {
    this.getListProducts()
  }

  getListProducts(){
    this._productService.getListProducts().subscribe((data) => {
      this.productsList = data;
    })
  }
}
