import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage;
  @Input() pageTotalNumber;
  constructor( private _navRoute:Router) { }

  ngOnInit(): void {
  }

  counter(i: number) {
    return new Array(i);
}

onClick(pageNumber:number):void{
  this._navRoute.navigate(['products'],{
    queryParams:{
      'page':pageNumber
    }
  })
}

}
