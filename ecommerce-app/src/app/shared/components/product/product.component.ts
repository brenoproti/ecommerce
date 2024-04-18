import {Component, Input, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {CurrencyPipe, NgIf} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {Product} from "../../models/product";
import {FormsModule} from "@angular/forms";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {TooltipModule} from "primeng/tooltip";
import {DropdownModule} from "primeng/dropdown";

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: 'product.component.html',
    imports: [
        ButtonModule,
        CardModule,
        CurrencyPipe,
        RatingModule,
        TagModule,
        FormsModule,
        NgIf,
        TooltipModule,
        DropdownModule
    ],
    styleUrl: 'product.component.scss'
})

export class ProductComponent implements OnInit {
    @Input()
    product: Product | null = null;
    @Input()
    type: "list" | "grid" = 'grid';
    isItemAlreadyInCart: boolean = false;
    quantity = 1;


    constructor(private shoppingCartService: ShoppingCartService) {
    }

    ngOnInit(): void {
        this.shoppingCartService.getCartHasItems().subscribe(res => {
            if (this.product) {
                this.product.quantity = 1;
                this.isItemAlreadyInCart = this.shoppingCartService.isItemInCart(this.product.id, 'product');
                if (this.isItemAlreadyInCart) {
                    this.product.quantity = this.shoppingCartService.getProductById(this.product.id)?.quantity
                }
            }
        });
    }

    getSeverity(product: Product): string {
        if (product.stockQuantity) {
            if (product.stockQuantity > 1) {
                return 'success';
            }
            if (product.stockQuantity == 1) {
                return 'warning';
            }
        }
        return 'danger';
    };

    getProductStatus(product: Product) {
        if (product.stockQuantity) {
            if (product.stockQuantity > 1) {
                return 'Disponivel';
            }
            if (product.stockQuantity == 1) {
                return 'Último';
            }
        }
        return 'Esgotado';
    }

    addProductToCart() {
        if (this.product) {
            this.product.quantity = this.quantity;
            this.shoppingCartService.addToCart(this.product, 'product');
            this.isItemAlreadyInCart = this.shoppingCartService.isItemInCart(this.product.id, 'product');
        }
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

    removeProductFromCart() {
        if (this.product) {
            this.shoppingCartService.removeFromCart(this.product.id, 'product');
            this.isItemAlreadyInCart = this.shoppingCartService.isItemInCart(this.product.id, 'product');
        }
    }
}
