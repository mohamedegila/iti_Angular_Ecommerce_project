import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { CommonService } from '../services/common-functions.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  // Params
  products: Product[];
  pageTotalNumber:number;
  currentPage:number;
  private _routParamSub:Subscription;

  constructor(
      private _route: ActivatedRoute,
      private _productsService: ProductsService,
      private _commonServices:CommonService
     ) { }

  ngOnInit(): void {
    this._routParamSub = this._route.queryParamMap.subscribe(queryParamMap => {
    if(queryParamMap.has('page')){
            console.log(queryParamMap.get('page'));
            this._productsService.getProductsByPage(queryParamMap.get('page'),queryParamMap.get('limit'),queryParamMap.get('q')).subscribe((res:any)=>{
              this.products = res.data;
              this.pageTotalNumber = res.total_pages;
              this.currentPage = Number(queryParamMap.get('page')) || 1;
              console.log("currentPage " + this.currentPage);
            })
          }else{
            this._productsService.getProducts(12).subscribe((res: any) => {
              this.products = res.data;
              this.pageTotalNumber = res.total_pages;
              this.currentPage = Number(queryParamMap.get('page')) || 1;
              this._commonServices.clearStrimg();
              console.log("here");
            });
          }
        })  
    
      }
    
      ngOnDestroy(): void {
        this._routParamSub.unsubscribe();
      }
     
}
