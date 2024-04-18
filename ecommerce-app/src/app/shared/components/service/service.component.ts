import {Component, Input, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {CurrencyPipe, NgIf} from "@angular/common";
import {Service} from "../../models/service";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {TooltipModule} from "primeng/tooltip";

@Component({
    selector: 'app-service',
    standalone: true,
    templateUrl: 'service.component.html',
    imports: [
        ButtonModule,
        CardModule,
        CurrencyPipe,
        NgIf,
        TooltipModule
    ],
    styleUrl: 'service.component.scss'
})

export class ServiceComponent implements OnInit{
    @Input()
    service: Service | null = null;
    @Input()
    type: "list" | "grid" = 'grid';
    isItemAlreadyInCart: boolean = false;

    constructor(private shoppingCartService: ShoppingCartService) {
    }

    ngOnInit(): void {
        this.shoppingCartService.getCartHasItems().subscribe(res => {
            if (this.service) {
                this.isItemAlreadyInCart = this.shoppingCartService.isItemInCart(this.service.id, 'service');
            }
        });
    }

    addServiceToCart() {
        if (this.service) {
            this.shoppingCartService.addToCart(this.service, 'service');
            this.isItemAlreadyInCart = this.shoppingCartService.isItemInCart(this.service.id, 'service');
        }
    }

    removeServiceFromCart() {
        if (this.service) {
            this.shoppingCartService.removeFromCart(this.service.id, 'service');
            this.isItemAlreadyInCart = this.shoppingCartService.isItemInCart(this.service.id, 'product');
        }
    }
}
