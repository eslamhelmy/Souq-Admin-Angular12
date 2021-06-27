import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../file.service';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  submitted = false;
  model: Product = {id:0, name:'', description:'',price:0,categoryId:0};
  categories: Category[] = [];
  fileName: string='';
  image: any;
 
  constructor(private _productService: ProductService,private _fileService: FileService, private _router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this._productService.getCategories().subscribe(x=> {
      this.categories = x;
    })
  }
  onSubmit() { 
   // this.submitted = true; 
    console.log('submitted');
    this.model.image = this.image;
    this._productService.addProduct(this.model).subscribe(x=>{
      if(x)
        this._router.navigate(['/products']);
      
    })
  }

  //upload image
  onFileSelected(event: any) {
    console.log('file selected');
    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("file", file);

        this._fileService.upload(formData).subscribe(x=>{
          if(x.status)
            this.image = x.data;
        });
        // const upload$ = this.http.post("/api/thumbnail-upload", formData);

        // upload$.subscribe();
    }
}
}
