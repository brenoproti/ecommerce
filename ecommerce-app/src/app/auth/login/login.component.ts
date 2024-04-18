import {Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../../core/auth.service";
import {Router, RouterLink} from "@angular/router";
import {InputMaskModule} from "primeng/inputmask";
import {FormUtils} from "../../shared/utils/form.utils";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: 'login.component.html',
    imports: [
        CardModule,
        FloatLabelModule,
        InputTextModule,
        ButtonModule,
        PasswordModule,
        ReactiveFormsModule,
        NgIf,
        InputMaskModule,
        RouterLink,
        ToastModule
    ],
    styleUrls: ['login.component.scss'],
    providers: [MessageService]
})

export class LoginComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
    }

     loginForm = new FormGroup({
        document: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    ngOnInit() {
    }

    doLogin() {
        if (FormUtils.isFormValid(this.loginForm)) {
            this.authService.loginUser(this.loginForm.getRawValue()).subscribe({
                next: async () => {
                    await this.router.navigate(['/produtos']);
                },
                error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Atenção', detail: 'CPF ou senha inválidos' });
                }
            });
        }
    }
}
