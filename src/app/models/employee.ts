export class Employee {
    employeeId: number;
    employeeNumber: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthDate: Date;
    hireDate: Date;
    active: boolean;

    constructor() {
        this.employeeId = 0;
        this.employeeNumber = '';
        this.name = '';
        this.surname = '';
        this.email = '';
        this.phone = '';
        this.birthDate = new Date();
        this.hireDate = new Date();
        this.active = true;
    }
}
