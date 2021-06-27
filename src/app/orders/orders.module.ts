import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const routes: Routes = [
{
  path: '',component: OrdersComponent
}
];

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule
  ]
})
export class OrdersModule { }
