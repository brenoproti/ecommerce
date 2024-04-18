import {Component, OnInit, ViewChild} from '@angular/core';
import {CardModule} from "primeng/card";
import {DataViewModule} from "primeng/dataview";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {MessageService, SelectItem} from "primeng/api";
import {InputMaskModule} from "primeng/inputmask";
import {Combo} from "../../shared/models/combo";
import {ComboComponent} from "../../shared/components/combo/combo.component";
import {CombosService} from "./combos.service";
import {ProductComponent} from "../../shared/components/product/product.component";
import {PageableUtils} from "../../shared/utils/pageable.utils";
import {ToastModule} from "primeng/toast";

@Component({
    selector: 'app-products',
    templateUrl: './combos.component.html',
    styleUrl: './combos.component.scss',
    standalone: true,
    imports: [CardModule, DataViewModule, NgForOf, NgClass, ButtonModule, FormsModule, DropdownModule, InputMaskModule, NgIf, ComboComponent, ReactiveFormsModule, ProductComponent, ToastModule],
    providers: [CombosService, MessageService]
})

export class CombosComponent implements OnInit {
    combos: Combo[] = [];
    layout: "list" | "grid" = "list";
    sortOptions!: SelectItem[];
    sortOrder!: number;
    sortField!: string;
    form = new FormGroup({
        zipCode: new FormControl(''),
    });
    totalRecords: number = 0;
    first: number = 0;
    zipCodeSearch: string = '';
    @ViewChild('dataView', { static: false }) dataView: any = {};

    constructor(private combosService: CombosService, private messageService: MessageService) {
    }

    ngOnInit() {
        this.sortOptions = [{label: 'Maior preço', value: '!price'}, {label: 'Menor preço', value: 'price'}];
    }

    openFindZipCodeLink() {
        window.open("https://buscacepinter.correios.com.br/app/endereco/index.php", '_blank');
    }

    findCombos(event: any, click: boolean) {
        const zipCode = this.form.get('zipCode')?.value;
        if (click && !zipCode) {
            this.messageService.add({ severity: 'info', summary: 'Atenção', detail: 'Informe o CEP para prosseguir' });
        }

        if (!zipCode) {
            return;
        }
        if (!event) {
            event = this.dataView;
        }
        if (zipCode) {
            const pageable = PageableUtils.getPageable(event);
            this.zipCodeSearch = zipCode;
            this.combosService.getCombos(zipCode, pageable).subscribe(res => {

                if (res) {
                    this.combos = res?.data;
                    this.totalRecords = res.meta.itemCount;
                    return;
                }
                this.totalRecords = 0;
                this.combos = [];
                this.messageService.add({ severity: 'info', summary: 'Atenção', detail: 'Não foram encontrados Combos disponíveis para localização informada' });
            })
        }
    }
}
