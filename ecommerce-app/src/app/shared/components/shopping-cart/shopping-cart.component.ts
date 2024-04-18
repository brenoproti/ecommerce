import {Component, OnInit} from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {CurrencyPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {BadgeModule} from "primeng/badge";
import {ButtonModule} from "primeng/button";
import {ShoppingCartService} from "./shopping-cart.service";
import {ShoppingCart} from "../../models/shopping-cart";
import {TooltipModule} from "primeng/tooltip";
import {DividerModule} from "primeng/divider";
import {PanelModule} from "primeng/panel";
import {Combo} from "../../models/combo";
import {Product} from "../../models/product";
import {Service} from "../../models/service";
import {RouterLink} from "@angular/router";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-shopping-cart',
    standalone: true,
    templateUrl: 'shopping-cart.component.html',
    imports: [SidebarModule, NgOptimizedImage, BadgeModule, ButtonModule, NgIf, NgForOf, CurrencyPipe, TooltipModule, DividerModule, PanelModule, RouterLink, DropdownModule, FormsModule],
    styleUrl: 'shopping-cart.component.scss'
})

export class ShoppingCartComponent implements OnInit {
    visible: boolean = false;
    cartHasItems: boolean = false;
    shoppingCart: ShoppingCart | null = null;

    constructor(private shoppingCartService: ShoppingCartService) {
    }

    ngOnInit() {
        this.validateShoppingCart();
    }

    getCartQuantity(): string {
        if (this.shoppingCart) {
            const totalProducts = this.shoppingCart.products.reduce((a, b) => {
                if (!b.quantity) {
                    b.quantity = 1;
                }
                return a + b.quantity
            }, 0);
            return (this.shoppingCart.combos.length + this.shoppingCart.services.length + totalProducts).toString()
        }
        return '0';
    }

    getTotalPrice() {
        return this.shoppingCartService.getTotalPrice();
    }

    removeFromCart(item: Combo | Product | Service, type: 'product' | 'service' | 'combo') {
        this.shoppingCartService.removeFromCart(item.id, type);
    }

    validateShoppingCart() {
        this.shoppingCartService.verifyCartItems();
        this.shoppingCartService.getCartHasItems().subscribe(res => {
            this.cartHasItems = res;
            if (res) {
                this.shoppingCart = this.shoppingCartService.getShoppingCart();
                return;
            }
            this.shoppingCart = null;
        });
    }

    getProductQuantities(product: Product) {
        if (product.stockQuantity) {
            if (product.stockQuantity >= 5) {
                return [1, 2, 3, 4, 5];
            }
            const arr = [];
            for (let i = 1; i <= product.stockQuantity; i++) {
                arr.push(i);
            }
            return arr;
        }
        return [0];
    }

    getProductPrice(product: Product) {
        if (product.quantity) {
            return product.price * product.quantity;
        }
        return product.price;
    }

    updateProductQuantity(product: Product) {
        this.shoppingCartService.updateProductQuantity(product.id, product.quantity || 1);
    }
}
