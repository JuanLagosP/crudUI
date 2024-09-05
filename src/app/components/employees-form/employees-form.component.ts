import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { birthdateValidator } from 'src/app/functions/birthdate-validator';
import { hireDateValidator } from 'src/app/functions/hiredate-validator';
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

  constructor(private _employeeService: EmployeeService, private _fb: FormBuilder, 
    private _router: Router) {
    this.employeeForm = this.validateFields();
  }

  private validateFields(): FormGroup {
    const phoneRegex = '^[0-9]{10}$';

    let validForm = this._fb.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(2)]
      }],
      surname: ['', {
        validators: [Validators.required, Validators.minLength(2)]
      }],
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      phone: ['', {
        validators: [Validators.required, Validators.pattern(phoneRegex)]
      }],
      birthDate: ['', {
        validators: [Validators.required, birthdateValidator()],
        updateOn: 'change'
      }],
      hireDate: ['', {
        validators: [Validators.required, hireDateValidator()],
        updateOn: 'change'
      }]
    })

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
