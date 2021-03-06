import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order } from "./order.model";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MEAT_API } from "app/app.api";
import { LoginService } from "app/security/login/login.service";

@Injectable()
export class OrderService{

    constructor(private cartService: ShoppingCartService,
                private http: HttpClient){}

    itensValue(): number{
        return this.cartService.total()
    }

    cartItens(): CartItem[]{
        return this.cartService.itens
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        this.cartService.removeItem(item)
    }

    clear(){
        this.cartService.clear()
    }

    checkOrder(order: Order): Observable<string>{
        
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
                        .map(order => order.id)

        /*
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(`${MEAT_API}/orders`, 
                                JSON.stringify(order),
                                new RequestOptions({headers: headers}))
                        .map(response=> response.json())
                        .map(order => order.id)
                        
        */                
    }

}