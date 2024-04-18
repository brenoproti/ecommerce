import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {ShoppingCart} from "../../shared/models/shopping-cart";
import {ShoppingCartService} from "../../shared/components/shopping-cart/shopping-cart.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {PanelModule} from "primeng/panel";
import {TooltipModule} from "primeng/tooltip";
import {Combo} from "../../shared/models/combo";
import {Product} from "../../shared/models/product";
import {Service} from "../../shared/models/service";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {Purchase} from "../../shared/models/purchase";
import {ItemTypeEnum} from "../../shared/enums/item-type.enum";
import {CheckoutService} from "./checkout.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-checkout',
    standalone: true,
    templateUrl: 'checkout.component.html',
    imports: [CardModule, NgIf, ButtonModule, CurrencyPipe, DividerModule, NgForOf, PanelModule, TooltipModule, DropdownModule, FormsModule],
    styleUrl: 'checkout.component.scss',
    providers: [CheckoutService],
})

export class CheckoutComponent implements OnInit {
    shoppingCart: ShoppingCart | null = null;

    constructor(private shoppingCartService: ShoppingCartService, private checkoutService: CheckoutService, private router: Router) {
    }

    ngOnInit() {
        this.validateShoppingCart();
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

    updateProductQuantity(product: Product) {
        this.shoppingCartService.updateProductQuantity(product.id, product.quantity || 1);
    }

    getProductPrice(product: Product) {
        if (product.quantity) {
            return product.price * product.quantity;
        }
        return product.price;
    }

    setProducts(purchase: Purchase) {
        this.shoppingCart?.products.forEach(product => {
            purchase.items?.push({
                productId: product.id,
                quantity: product.quantity,
                type: ItemTypeEnum.PRODUCT
            })
        })
    }

    setServices(purchase: Purchase) {
        this.shoppingCart?.services.forEach(service => {
            purchase.items?.push({
                serviceId: service.id,
                type: ItemTypeEnum.SERVICE
            })
        })
    }

    setCombos(purchase: Purchase) {
        this.shoppingCart?.combos.forEach(combo => {
            purchase.items?.push({
                comboId: combo.id,
                type: ItemTypeEnum.COMBO
            })
        })
    }

    save() {
        const purchase: Purchase = { items: []};

        this.setServices(purchase);
        this.setCombos(purchase);
        this.setProducts(purchase);

        this.checkoutService.save(purchase).subscribe({
            next: async () => {
                this.shoppingCartService.clearCart();
                await this.router.navigate(['combos']);
            },
        })
    }
}
