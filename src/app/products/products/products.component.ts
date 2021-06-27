
import { OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbAlert, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Category } from '../models/category';
import { PagingModel } from '../models/paging-model';
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
  pageNumber: number = 1;
  pagination: PagingModel | undefined ;
  categoryId: number = -1;
   categories: Category[]=[];
  constructor(private _productService: ProductService, config: NgbModalConfig, private modalService: NgbModal, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
   ngOnInit(): void {
     this.getCategories();
     this.getProducts(this.pageNumber,this.categoryId);
   }

  getProducts(pageNumber:number , category:any){
    this._productService.getProducts(pageNumber,category).subscribe(res=>{
      this.products = res.items;
      this.pagination = {currentPage: res.currentPage, totalPages: res.totalPages, totalItems:res.totalItems};
      console.log(this.pagination);
    });
  }
  newProduct(){
    this.router.navigate(['/products/add']);
  }

  
  getCategories(){
    this._productService.getCategories().subscribe(x=> {
      this.categories = x;
    })
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

  pageChanged(event:any){
    this.pageNumber = event.page;
    this.getProducts(this.pageNumber,this.categoryId);
    
  }

  resetFilters(){
    this.categoryId= -1;
  }

  loadProducts(){
    this.getProducts(this.pageNumber,this.categoryId);
  }
}
