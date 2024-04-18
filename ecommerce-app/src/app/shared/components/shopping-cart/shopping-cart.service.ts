import {Injectable} from '@angular/core';
import {Product} from "../../models/product";
import {Service} from "../../models/service";
import {Combo} from "../../models/combo";
import {ShoppingCart} from "../../models/shopping-cart";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService {
    private cartHasItemsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
    }

    verifyCartItems() {
        const cart: ShoppingCart = this.getShoppingCart();
        const hasItems = cart.combos.length > 0 || cart.products.length > 0 || cart.services.length > 0;
        this.cartHasItemsSubject.next(hasItems);
    }

    addToCart(item: Combo | Product | Service, itemType: 'combo' | 'product' | 'service') {
        const shoppingCart: ShoppingCart = this.getShoppingCart();
        if (this.isItemInCart(item.id, itemType)) {
            return;
        }
        const itemCart = this.getItem(shoppingCart, itemType);

        itemCart.push(item);

        this.saveCart(shoppingCart);
    }

    isItemInCart(itemId: number, itemType: 'combo' | 'product' | 'service'): boolean {
        const shoppingCart = this.getShoppingCart();
        const item = this.getItem(shoppingCart, itemType);
        return item.some((item: Combo | Product | Service) => item.id == itemId);
    }

    removeFromCart(itemId: number, itemType: 'combo' | 'product' | 'service') {
        const shoppingCart: ShoppingCart = this.getShoppingCart();
        const item = this.getItem(shoppingCart, itemType);
        const itemIndex = item.findIndex(item => item.id === itemId);

        if (itemIndex !== -1) {
            item.splice(itemIndex, 1);
            this.saveCart(shoppingCart);
        } else {
            console.log('Item não encontrado no carrinho.');
        }

    }

    getItem(shoppingCart: ShoppingCart, itemType: string): Combo[] | Product[] | Service[] {
        switch (itemType) {
            case 'combo':
                return shoppingCart.combos;
            case 'product':
                return shoppingCart.products;
            case 'service':
                return shoppingCart.services;
            default:
                throw new Error('Tipo de item inválido');
        }
    }

    getProductById(id: number): Product | undefined {
        const shoppingCart: ShoppingCart = this.getShoppingCart();
        return shoppingCart.products.find(product => product.id === id);
    }

    getCartHasItems(): Observable<boolean> {
        return this.cartHasItemsSubject.asObservable();
    }

    getShoppingCart(): ShoppingCart {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : {combos: [], products: [], services: []};
    }

    getTotalPrice() {
        const shoppingCart: ShoppingCart = this.getShoppingCart();
        if (shoppingCart) {
            const totalProducts = shoppingCart.products.reduce((a, b) => b.price ? a + +b.price * (b.quantity || 1) : 0, 0);
            const totalServices = shoppingCart.services.reduce((a, b) => b.price ? a + +b.price : 0, 0);
            const totalCombos = shoppingCart.combos.reduce((a, b) => b.price ? a + +b.price : 0, 0);
            return totalCombos + totalServices + totalProducts;
        }
        return 0;
    }

    updateProductQuantity(id: number, quantity: number) {
        const shoppingCart: ShoppingCart = this.getShoppingCart();
        const product = shoppingCart.products.find(product => product.id === id);
        if (product) {
            product.quantity = quantity;
        }
        console.log(shoppingCart)
        this.saveCart(shoppingCart);
    }

    clearCart() {
        localStorage.removeItem('cart');
    }

    private saveCart(cart: ShoppingCart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        const hasItems = cart.combos.length > 0 || cart.products.length > 0 || cart.services.length > 0;
        this.cartHasItemsSubject.next(hasItems);
    }
}
