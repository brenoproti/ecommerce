import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {BadgeModule} from "primeng/badge";
import {SidebarModule} from "primeng/sidebar";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrl: 'sidebar.component.scss',
    standalone: true,
    imports: [
        ButtonModule,
        BadgeModule,
        SidebarModule,
        MenuModule
    ]
})

export class SidebarComponent implements OnInit {
    sidebarVisible: boolean = true;
    items: MenuItem[] | undefined;

    constructor() {
  }

  ngOnInit() {
      this.items = [
          {
              label: 'Ecommerce',
              items: [
                  {
                      label: 'Produtos',
                      icon: 'pi pi-cart-arrow-down',
                      routerLink: '/produtos'
                  },
                  {
                      label: 'Serviços',
                      icon: 'pi pi-list-check',
                      routerLink: '/servicos'
                  },
                  {
                      label: 'Combos',
                      icon: 'pi pi-wifi',
                      routerLink: '/combos'
                  }
              ]
          },
      ];
  }
}
