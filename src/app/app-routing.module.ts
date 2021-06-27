import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/product.module')
      .then(mod => mod.ProductModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module')
      .then(mod => mod.OrdersModule)
  }
  ,
  {
    path: '',
    loadChildren: () => import('./orders/orders.module')
      .then(mod => mod.OrdersModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
