import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrdersService } from '../orders.service';
import { NgbActiveModal, NgbAlert, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  currentOrder: any;

  constructor(private _orderService: OrdersService, config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit(): void {
    this._orderService.getOrders().subscribe(res=>{
      this.orders = res;
    });
  }

   
  open(content:any, order:Order) {
    console.log('clicked');
    this.currentOrder = order;
    this.modalService.open(content);
  }

  setSpecialOffer(price:string){
    this._orderService.setSpecialOffer({orderId:this.currentOrder.id, price: +price})
        .subscribe(x=> {
          if(x){
            this.currentOrder.price = price;
            //popup here
            this.modalService.dismissAll();
            console.log(x.data);
          }else{
            //popup error
          }
        })
  }
}
