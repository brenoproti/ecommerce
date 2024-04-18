import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {FormGroup, FormControl, Validators, ReactiveFormsModule, Form} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {StepperModule} from "primeng/stepper";
import {DropdownModule} from "primeng/dropdown";
import {UfEnum} from "../../shared/enums/uf.enum";
import {InputMaskModule} from "primeng/inputmask";
import {TooltipModule} from "primeng/tooltip";
import {PaginatorModule} from "primeng/paginator";
import {ZipCodeService} from "../../shared/services/zip-code.service";
import {FileUploadModule} from "primeng/fileupload";
import {FormUtils} from "../../shared/utils/form.utils";
import {RegisterService} from "./register.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: 'register.component.html',
    imports: [
        CardModule,
        FloatLabelModule,
        InputTextModule,
        ButtonModule,
        PasswordModule,
        ReactiveFormsModule,
        NgIf,
        StepperModule,
        DropdownModule,
        InputMaskModule,
        TooltipModule,
        PaginatorModule,
        FileUploadModule,
        ToastModule
    ],
    styleUrls: ['register.component.scss'],
    providers: [RegisterService, MessageService]
})

export class RegisterComponent implements OnInit {
    basicDataForm = new FormGroup({
        document: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        age: new FormControl(null, Validators.required),
    });
    addressForm = new FormGroup({
        state: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        neighborhood: new FormControl('', Validators.required),
        address: new FormControl(null, Validators.required),
        zipCode: new FormControl('', Validators.required),
    });
    ufs = Object.keys(UfEnum);
    activeStep: number = 0;
    loadingZipCode: boolean = false;

    constructor(private zipCodeService: ZipCodeService, private router: Router, private registerService: RegisterService, private messageService: MessageService) {
    }

    ngOnInit() {
    }

    validateBasicData() {
        if (FormUtils.isFormValid(this.basicDataForm)) {
            if (this.basicDataForm.get('password')?.value != this.basicDataForm.get('confirmPassword')?.value) {
                return;
            }
            this.activeStep = 1;
        }
    }

    save() {
        if (!FormUtils.isFormValid(this.basicDataForm) || !FormUtils.isFormValid(this.addressForm)) {
            return;
        }

        const userData: any = this.basicDataForm.getRawValue();
        userData.address = this.addressForm.getRawValue();

        this.registerService.create(userData)
            .subscribe( {
                next: async () => {
                    await this.router.navigate(['/login']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Atenção', detail: err.error.message });
                }
            })
    }

    async findAddress() {
        const zipCode: string = this.addressForm.get('zipCode')?.value || '';
        if (zipCode) {
            this.loadingZipCode = true;
            const address = await this.zipCodeService.findAddress(zipCode);
            if (address) {
                this.addressForm.get('address')?.setValue(address.logradouro);
                this.addressForm.get('city')?.setValue(address.localidade);
                this.addressForm.get('neighborhood')?.setValue(address.bairro);
                this.addressForm.get('state')?.setValue(address.uf);
            }
            this.loadingZipCode = false;
        }

    }
}
