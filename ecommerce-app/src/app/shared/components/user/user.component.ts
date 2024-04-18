import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {AuthService} from "../../../core/auth.service";
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: 'user.component.html',
    imports: [ButtonModule, OverlayPanelModule, NgIf, RouterLink],
    styleUrl: 'user.component.scss'
})

export class UserComponent implements OnInit {
    isLoggedIn: boolean = false;
    username: string = '';

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.isLoggedIn().subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
            this.username = localStorage.getItem('username') || '';
        })
    }

    async logoutUser() {
        await this.authService.logoutUser();
    }
}
