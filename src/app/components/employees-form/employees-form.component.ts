import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeDto } from 'src/app/models/employee-dto';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit{
  employee: EmployeeDto = new EmployeeDto();
  employeeForm: FormGroup;

  isEmployeeSel: boolean = false;
  selEmployeeNum: string = ''; 
  selEmployee: Employee = new Employee();

  minDate: Date = new Date('1925-01-01');
  maxDate: Date = new Date();

  constructor(private _employeeService: EmployeeService, private _router: Router) {
    this.employeeForm = this.validateFields();
  }

  private validateFields(): FormGroup {
    const emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    const phoneRegex = '^[0-9]{10}$';

    let validForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(phoneRegex)]),
      birthDate: new FormControl('', [Validators.required]),
      hireDate: new FormControl('', [Validators.required]),
    });

    return validForm;
  }

  private getSelEmployeeNum(): void {
    this._employeeService.getSelEmployeeNum().subscribe({
      next: selEmployeeNum => {
        this.selEmployeeNum = selEmployeeNum;
        if (this.selEmployeeNum.length > 0) {
          this.isEmployeeSel = true;
        }
      }
    });
  }

  private requestSelEmployee(): void {
    this._employeeService.getByEmployeeNumber(this.selEmployeeNum).subscribe({
      next: selEmployee => this.selEmployee = selEmployee
    });
  }

  private matchFormWithSelEmployeeInfo(): void {
    this.employeeForm.patchValue({
      name: this.selEmployee.name,
      surname: this.selEmployee.surname,
      email: this.selEmployee.email,
      phone: this.selEmployee.phone,
      birthDate: this.selEmployee.birthDate,
      hireDate: this.selEmployee.hireDate
    })
  }

  public saveOrUpdateEmployee(): void {
    if (this.employeeForm.valid) {
      this.employee = this.employeeForm.value;

      if (!this.isEmployeeSel) {
        this._employeeService.saveEmployee(this.employee).subscribe({
          next: () => {
            Swal.fire({
              toast: true,
              timer: 2000,
              timerProgressBar: true,
              icon: 'success',
              title: 'Employee successfully saved!',
              position: 'center',
              showConfirmButton: false
            }).then();
            setTimeout(() => this.goBack(), 100);
          }
        });
      } else {
        this._employeeService.updateEmployee(this.selEmployeeNum, this.employee).subscribe({
          next: () => {
            Swal.fire({
              toast: true,
              timer: 2000,
              timerProgressBar: true,
              icon: 'success',
              title: 'Employee successfully updated!',
              position: 'center',
              showConfirmButton: false
            }).then();
            setTimeout(() => this.goBack(), 100);
          }
        });
      }
    } else {
      Swal.fire({
        toast: true,
        timer: 2000,
        timerProgressBar: true,
        icon: 'warning',
        title: 'Please, fill all fields correctly!',
        position: 'center',
        showConfirmButton: false
      }).then();
    }
  }

  public goBack(): void {
    if (this.isEmployeeSel) {
      this._employeeService.setSelEmployeeNum('');
    } else {
      this.employeeForm.reset();
    }
    setTimeout(() => this._router.navigate(['/employees']).then(), 100);
  }
  
  ngOnInit(): void {
    this.getSelEmployeeNum();

    if (this.isEmployeeSel) {
      this.requestSelEmployee();
      setTimeout(() => this.matchFormWithSelEmployeeInfo(), 100);
    }
  }

}
