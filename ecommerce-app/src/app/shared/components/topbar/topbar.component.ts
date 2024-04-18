import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {UserComponent} from "../user/user.component";

@Component({
    selector: 'app-topbar',
    templateUrl: 'topbar.component.html',
    styleUrl: 'topbar.component.scss',
    standalone: true,
    imports: [
        ButtonModule,
        BadgeModule,
        ShoppingCartComponent,
        UserComponent
    ]
})

export class TopbarComponent implements OnInit {
    sidebarVisible: boolean = false;

    @Output() sidebarToggled = new EventEmitter<void>();

    constructor() {
    }

    toggleSidebar() {
        this.sidebarToggled.emit();
    }

    ngOnInit() {
    }
}
