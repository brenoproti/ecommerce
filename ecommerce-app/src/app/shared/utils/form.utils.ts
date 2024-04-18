import {FormGroup} from "@angular/forms";

export class FormUtils {

    static isFormValid(form: FormGroup) {
        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            control?.markAsDirty();
        });

        return form.valid;
    }
}
