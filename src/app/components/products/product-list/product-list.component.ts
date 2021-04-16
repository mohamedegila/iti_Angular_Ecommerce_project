import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
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
      private _coursesService: ProductsService,
      private _navRoute:Router) { }

  ngOnInit(): void {
    this._routParamSub = this._route.queryParamMap.subscribe(queryParamMap => {
    if(queryParamMap.has('page')){
            console.log(queryParamMap.get('page'));
            this._coursesService.getProductsByPage(queryParamMap.get('page'),queryParamMap.get('limit')).subscribe((res:any)=>{
              this.products = res.data;
              this.pageTotalNumber = res.total_pages;
              this.currentPage = Number(queryParamMap.get('page')) || 1;
              console.log("currentPage " + this.currentPage);
            })
          }else{
            this._coursesService.getProducts(12).subscribe((res: any) => {
              this.products = res.data;
              this.pageTotalNumber = res.total_pages;
              console.log("here");
            });
          }
        })  
    
      }
    
      ngOnDestroy(): void {
        this._routParamSub.unsubscribe();
      }
      counter(i: number) {
        return new Array(i);
    }
    
    onClick(pageNumber:number):void{
      this._navRoute.navigate(['courses'],{
        queryParams:{
          'page':pageNumber
        }
      })
    }

}
