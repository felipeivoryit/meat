import { Component, OnInit, Input } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms/src/directives';

@Component({
  selector: 'mt-delivery-costs',
  templateUrl: './delivery-costs.component.html'
})
export class DeliveryCostsComponent implements OnInit {

  @Input() delivery: number
  @Input() itensValue: number

  constructor() { }

  ngOnInit() {
  }

  total(): number{
    return this.delivery + this.itensValue
  }

}
