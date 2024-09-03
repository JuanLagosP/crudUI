export class EmployeeDto {
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthDate: Date;
    hireDate: Date;

    constructor() {
        this.name = '';
        this.surname = '';
        this.email = '';
        this.phone = '';
        this.birthDate = new Date();
        this.hireDate = new Date();
    }
}
