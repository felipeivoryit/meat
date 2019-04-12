
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http'

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Restaurant } from "./restaurant/restaurant.model";
//import {Response} from '@angular/http';

import {MEAT_API} from '../app.api';
import {ErrorHandler} from '../app.error-handler'
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";
import { NotificationService } from "app/shared/messages/notification.service";



@Injectable()
export class RestaurantsService{

    constructor(private http: HttpClient, private notificationService: NotificationService){

    }

    restaurants(search?: string): Observable<Restaurant[]> {

        let params: HttpParams = undefined
        if(search){
            params = new HttpParams().set('q', search)
        }

        // Consumindo a api
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
            /*
            .map(response => response.json())
            .catch((error: Response) => {
                this.messagemError(error)
                return Observable.throw(error)
            })
            */
    }

    messagemError(error: any){
        if(error.status == 0){
            this.notificationService.notify(`Erro no acesso da api`)   
        }
        else{
            this.notificationService.notify(`Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`)   
        }
                  
    }

    restaurantsById(id: string): Observable<Restaurant>{
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
            //.map(response => response.json())
            //.catch(ErrorHandler.handleError)
            
    }

    reviewsOfRestaurant(id: string): Observable<any>{
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
            //.map(response => response.json())
            //.catch(ErrorHandler.handleError)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`)
            //.map(response => response.json())
            //.catch(ErrorHandler.handleError)
    }
}