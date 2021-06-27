import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openProducts(){
    this.router.navigate(["products"]);
  }

  openOrders(){
    this.router.navigate(["orders"]); 
  }

}
