import {Component, HostListener, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {TopbarComponent} from "../shared/components/topbar/topbar.component";
import {NgClass} from "@angular/common";
import {SidebarComponent} from "../shared/components/sidebar/sidebar.component";

@Component({
    selector: 'app-pages',
    standalone: true,
    imports: [
        RouterOutlet,
        TopbarComponent,
        NgClass,
        SidebarComponent
    ],
    templateUrl: 'pages.component.html',
    styleUrl: './pages.component.scss'
})

export class PagesComponent implements OnInit {
    sidebarOpen: boolean = true;
    isMobile: boolean = window.innerWidth < 991;

    constructor() {
    }

    ngOnInit() {
    }

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.checkIsMobile(); // Verifica o tamanho da tela ao redimensionar a janela
    }

    private checkIsMobile() {
        this.isMobile = window.innerWidth < 991; // Define isMobile como verdadeiro se a largura da tela for menor que 991px
    }
}
