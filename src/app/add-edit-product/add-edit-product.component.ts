import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../interfaces/product';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-product',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss'
})
export class AddEditProductComponent {
  form: FormGroup;
  id: number;
  operation: string = "Add";

  constructor(private fb: FormBuilder, private _productService: ProductService, private toastr: ToastrService, private router: Router, private aRouter: ActivatedRoute){
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    })
    this.id = Number(this.aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id !== 0) {
      this.operation = 'Edit ';
      this.getProduct(this.id);
    }
  }

  addProduct(){
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }

    if(this.id !== 0){
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info('Product was edited succesfully.', 'Edit complete.');
        this.router.navigate(['/'])
      })
    } else {
      this._productService.saveProduct(product).subscribe(() => {
      this.toastr.success(`${product.name} was added successfully.`, 'Product added')
      this.router.navigate(['/']);
    })
    }

    
  }

  getProduct(id: number) {
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    })
  }

}
