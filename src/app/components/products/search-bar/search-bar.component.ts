import { CommonService } from '../services/common-functions.service';

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  limit:number=5;
  currentPage:number=1;
  @Output() limitNumberEvent = new EventEmitter<number>();
  constructor(private _commonServices:CommonService) { }

  ngOnInit(): void {
  }

  onClick(num):void{
    this.limit = num.target.value || 5;
    this._commonServices.onClick(this.currentPage,this.limit);
  }

  sendLimitNumber(): void {
    console.log('sendLimitNumber');
    this.limitNumberEvent.emit(this.limit);
  }
   onSubmit(stringFilter):void{
     console.log(stringFilter.value.productName)
    this._commonServices.onClick(this.currentPage,this.limit,stringFilter.value.productName);
   }
}
