
import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


    pageNumber:number=1;
    limit:number ;
    quary:string;
  constructor(private _navRoute:Router) { }

  onClick(pageNumber:number,limit?:number,stringFilter?:string):void{
    this.pageNumber = pageNumber || 1;
    this.limit      = limit || this.limit;
    this.quary      = stringFilter|| this.quary ;
    
    console.log(this.quary);
    if(this.quary != undefined){
      this._navRoute.navigate(['products'],{
      
        queryParams:{
          'page' : this.pageNumber,
          'limit': this.limit,
          'q'    : this.quary 
        }
      })
    }else{
      this._navRoute.navigate(['products'],{
      
        queryParams:{
          'page' : this.pageNumber,
          'limit': this.limit
        }
      })
    }
    
  }

  clearStrimg():void{
    this.quary='';
  }
  
}