import { Component } from '@angular/core';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  productsList: Product[] = []

  constructor(private _productService: ProductService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getListProducts()
  }

  getListProducts() {
    this._productService.getListProducts().subscribe((data: Product[]) => {
      this.productsList = data;
    })
  }

  deleteProduct(id: number) {
    const confirmed: boolean = window.confirm('Are you sure you want to delete this product?');

    if(confirmed) {
      this._productService.deleteProduct(id).subscribe(() => {
        this.getListProducts();
        this.toastr.warning('Product was deleted successfully.', 'Product deleted')
      })
    }

  }


}
