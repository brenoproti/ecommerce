import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {DataViewLazyLoadEvent, DataViewModule} from "primeng/dataview";
import {CurrencyPipe, NgClass, NgForOf} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {SelectItem} from "primeng/api";
import {Product} from "../../shared/models/product";
import {ProductComponent} from "../../shared/components/product/product.component";
import {ProductsService} from "./products.service";
import {PageableUtils} from "../../shared/utils/pageable.utils";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    standalone: true,
    imports: [CardModule, DataViewModule, NgForOf, NgClass, ButtonModule, FormsModule, DropdownModule, ProductComponent],
    providers: [ProductsService]
})

export class ProductsComponent implements OnInit {
    products: Product[] = [];
    layout: "list" | "grid" = "list";
    sortOptions!: SelectItem[];
    sortOrder!: number;
    totalRecords: number = 1;
    first: number = 0;


    constructor(private service: ProductsService) {
    }

    ngOnInit() {
        this.sortOptions = PageableUtils.getSortOptions();
    }

    findProducts(event: DataViewLazyLoadEvent) {
        const pageable = PageableUtils.getPageable(event)

        this.service.getProducts(pageable).subscribe(res => {
            this.totalRecords = res.meta.itemCount;
            this.products = res.data;
        })
    }

    onSortChange(event: any) {
        const sort= PageableUtils.onSortChange(event);
        this.sortOrder = sort.sortOrder;
    }
}
