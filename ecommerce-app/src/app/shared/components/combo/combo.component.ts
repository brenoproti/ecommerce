import {Component, Input, OnInit} from '@angular/core';
import {Combo} from "../../models/combo";
import {CardModule} from "primeng/card";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {TooltipModule} from "primeng/tooltip";

@Component({
    selector: 'app-combo',
    standalone: true,
    templateUrl: 'combo.component.html',
    imports: [
        CardModule,
        NgIf,
        NgForOf,
        ButtonModule,
        CurrencyPipe,
        TooltipModule
    ],
    styleUrl: 'combo.component.scss'
})

export class ComboComponent implements OnInit {
    @Input()
    combo: Combo | null = null
    isItemAlreadyInCart: boolean = false;

    constructor(private shoppingCartService: ShoppingCartService) {
    }

    ngOnInit(): void {
        this.shoppingCartService.getCartHasItems().subscribe(res => {
            if (this.combo) {
                this.isItemAlreadyInCart = this.shoppingCartService.isItemInCart(this.combo.id, 'combo');
            }
        });
    }

    addComboToCart() {
        if (this.combo) {
            this.shoppingCartService.addToCart(this.combo, 'combo');
            this.isItemAlreadyInCart = this.shoppingCartService.isItemInCart(this.combo.id, 'combo');
        }
    }

    removeComboFromCart() {
        if (this.combo) {
            this.shoppingCartService.removeFromCart(this.combo.id, 'combo');
            this.isItemAlreadyInCart = this.shoppingCartService.isItemInCart(this.combo.id, 'combo');
        }
    }
}
