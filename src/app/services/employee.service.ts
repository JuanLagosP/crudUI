import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeDto } from '../models/employee-dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL: string = 'http://localhost:8080/employess';

  constructor(private _http: HttpClient) { }

  private handleError(error: any) {
    const STATUS = error.status;

    switch(STATUS) {
      case 0:
        alert('Server Connection Fault!');
        break;
      case 400:
        alert(error.error.message);
        break;
      case 404:
        alert(error.error.message);
        break;
      case 500:
        alert('Internal Server Error!');
        break;       
    }

    return throwError(() => new Error('Something ocurred; please, try again later!'));
  }

  public getEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(this.baseURL)
      .pipe(catchError(this.handleError));
  }

  public getByEmployeeNumber(employeeNumber: string): Observable<Employee> {
    return this._http.get<Employee>(`${this.baseURL}/${employeeNumber}`)
      .pipe(catchError(this.handleError));
  }

  public saveEmployee(employee: EmployeeDto): Observable<EmployeeDto> {
    return this._http.post<EmployeeDto>(`${this.baseURL}`, employee)
      .pipe(catchError(this.handleError));
  }

  public updateEmployee(employeeNumber: string, employee: EmployeeDto): Observable<EmployeeDto> {
    return this._http.put<EmployeeDto>(`${this.baseURL}/${employeeNumber}`, employee)
      .pipe(catchError(this.handleError));
  }

  public deleteEmployee(employeeNumber: string): Observable<any> {
    return this._http.delete<any>(`${this.baseURL}/${employeeNumber}`)
      .pipe(catchError(this.handleError));
  }
}
