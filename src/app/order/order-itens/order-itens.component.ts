import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order-itens',
  templateUrl: './order-itens.component.html'
})
export class OrderItensComponent implements OnInit {

  @Input() itens: CartItem[]

  @Output() increaseQty = new EventEmitter<CartItem>()
  @Output() descreaseQty = new EventEmitter<CartItem>()
  @Output() remove = new EventEmitter<CartItem>()


  constructor() { }

  ngOnInit() {
  }

  emitIncreaseQty(item: CartItem){
    this.increaseQty.emit(item)
  }

  emitDecreaseQty(item: CartItem){
    this.descreaseQty.emit(item)
  }

  emitRemove(item: CartItem){
    this.remove.emit(item)
  }

}
