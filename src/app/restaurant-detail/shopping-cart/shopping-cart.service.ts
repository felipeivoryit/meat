import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { Injectable } from "@angular/core";
import { NotificationService } from "app/shared/messages/notification.service";


@Injectable()
export class ShoppingCartService{
    
    itens: CartItem[] = []

    constructor(private notificationService: NotificationService) {}

    clear(){
        this.itens = []
    }

    addItem(item:MenuItem){
        let foundItem = this.itens.find((mItem) => mItem.menuItem.id === item.id)
        if(foundItem){
            this.increaseQty(foundItem)
        }else{
            this.itens.push(new CartItem(item))
        }

        this.notificationService.notify(`Você adicionou o item ${item.name}`)
    }

    removeItem(item:CartItem){
        this.itens.splice(this.itens.indexOf(item), 1)
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
    }

    total(): number{
        return this.itens
                .map(item => item.value())
                .reduce((prev, value)=> prev+value, 0)
    }

    increaseQty(item: CartItem){
        item.quatity = item.quatity + 1
    }

    decreaseQty(item: CartItem){
        item.quatity = item.quatity - 1
        if(item.quatity === 0){
            this.removeItem(item)
        }
    }

}