import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function birthdateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        
        const value = control.value;

        // Empty input: validation not triggered
        if (!value) {
            return null;
        }

        const today = new Date();
        const birthdate = new Date(value);

        // Max age: 99 years old
        if (birthdate.getFullYear() < today.getFullYear() - 99) {
            return {tooOld: true};
        }

        // Min age: 18 years old
        const dayDiff = today.getDate() - birthdate.getDate();
        const monthDiff = today.getMonth() - birthdate.getMonth();
        
        let age = today.getFullYear() - birthdate.getFullYear();
        age = (monthDiff < 0 || (monthDiff == 0 && dayDiff < 0)) ? age - 1 : age;
        
        return age < 18 ? {validBirthdate: true} : null; 
    }
    
}