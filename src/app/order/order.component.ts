import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { NotificationService } from 'app/shared/messages/notification.service';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value:'REF'}
  ]

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('' , [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, { validator: OrderComponent.equalsTo })
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean}{
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if(!email || !emailConfirmation){
      return undefined
    }

    if(email.value !== emailConfirmation.value){
      return {emailsNotMatch:true}
    }

    return undefined
  }

  itensValue(): number{
    return this.orderService.itensValue()
  }

  cartItens(): CartItem[]{
    return this.orderService.cartItens()
  }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item)
  }

  descreaseQty(item: CartItem){
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }

  checkOrder(order: Order){
    order.orderItens = this.cartItens()
                        .map((item:CartItem)=>new OrderItem(item.quatity, item.menuItem.id))
    this.orderService.checkOrder(order)
                     .subscribe((orderId: String) => {
                                    this.router.navigate(['/order-summary'])
                                    this.orderService.clear()},
                                response =>  //HttpErrorResponse
                                this.notificationService.notify(response.error.message)
                               )                
  }

}