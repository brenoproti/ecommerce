import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {DataViewLazyLoadEvent, DataViewModule} from "primeng/dataview";
import {NgClass, NgForOf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {SelectItem} from "primeng/api";
import {Service} from "../../shared/models/service";
import {ServiceComponent} from "../../shared/components/service/service.component";
import {PageableUtils} from "../../shared/utils/pageable.utils";
import {ServicesService} from "./services.service";


@Component({
    selector: 'app-products',
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss',
    standalone: true,
    imports: [CardModule, DataViewModule, NgForOf, NgClass, ButtonModule, FormsModule, DropdownModule, ServiceComponent],
    providers: [ServicesService]
})

export class ServicesComponent implements OnInit {
    services: Service[] = [];
    layout: "list" | "grid" = "list";
    sortOptions!: SelectItem[];
    sortOrder!: number;
    sortField!: string;
    totalRecords: number = 1;
    first: number = 0;

    constructor(private servicesService: ServicesService) {
    }

    ngOnInit() {
        this.sortOptions = [{label: 'Maior preço', value: '!price'}, {label: 'Menor preço', value: 'price'}];
    }

    onSortChange(event: any) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    findServices(event: DataViewLazyLoadEvent) {
        const pageable = PageableUtils.getPageable(event)

        this.servicesService.getServices(pageable).subscribe(res => {
            this.totalRecords = res.meta.itemCount;
            this.services = res.data;
        })
    }
}
