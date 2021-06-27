
import { OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbAlert, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProductViewModel } from '../models/product-view-model';
import { ProductService } from '../product.service';

 @Component({
  selector: 'app-products',
  styleUrls: ['products.component.css'],
  templateUrl: 'products.component.html',
})

export class ProductsComponent implements AfterViewInit, OnInit {

  products: ProductViewModel[] = [];
  currentProduct:any;

  constructor(private _productService: ProductService, config: NgbModalConfig, private modalService: NgbModal, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
   ngOnInit(): void {
     this.getProducts();
   }

  getProducts(){
    this._productService.getProducts().subscribe(res=>{
      this.products = res;
    });
  }
  newProduct(){
    this.router.navigate(['/products/add']);
  }
  open(content:any, product:ProductViewModel) {
    console.log('clicked');
    this.currentProduct = product;
    this.modalService.open(content);
  }

  saveOffer(percentage:string){
    console.log(percentage);
    console.log(this.currentProduct.id);
    this._productService.saveOffer({productId:this.currentProduct.id, percentage: +percentage})
        .subscribe(x=> {
          if(x.status){
            this.currentProduct.discountPercentage = percentage;
            this.currentProduct.newPrice = x.data;
            //popup here
            console.log(x.data);
            alert('success');
          }else{
            //popup error
            alert('error');
          }
        })
  }
  ngAfterViewInit() {}
}
