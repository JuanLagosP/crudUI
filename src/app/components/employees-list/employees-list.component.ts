import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private _employeeService: EmployeeService, private _router: Router) {
  }

  private requestEmployees(): void {
    this._employeeService.getEmployees().subscribe({
      next: employees => this.employees = employees.filter(emp => emp.active)
    });
  }

  public newEmployee(): void {
    this._router.navigate(['/registration']).then();
  }

  public selectEmployee(employeeNum: string): void {
    this._employeeService.setSelEmployeeNum(employeeNum);
    setTimeout(() => this._router.navigate(['/registration']).then(), 200);
  }

  public deleteEmployee(employeeNum: string): void {
    this._employeeService.deleteEmployee(employeeNum).subscribe({
      next: () => {
        Swal.fire({
          toast: true,
          timer: 2000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Employee successfully deleted!',
          position: 'center',
          showConfirmButton: false
        }).then();
      }
    });
    setTimeout(() => {
      this._router.navigateByUrl('/registration', {skipLocationChange: true, replaceUrl: false})
        .then(() => this._router.navigate(['/employees']).then());
    }, 100);
  }

  ngOnInit(): void {
    this.requestEmployees();
  }
}
