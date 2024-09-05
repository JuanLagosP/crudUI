import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function hireDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        // Empty input: validation not triggered
        if (!value) {
            return null;
        }

        const today = new Date();
        const hireDate = new Date(value);

        let tooLate = false;
        let tooSoon = false;

        // Max hire date: today
        if (hireDate > today) {
            tooLate = true;
        }

        // Min hire date: 10 years ago
        if (hireDate.getFullYear() < today.getFullYear() - 10) {
            tooSoon = true;
        }

        return tooLate || tooSoon ? {validHireDate: true} : null;
    }
}