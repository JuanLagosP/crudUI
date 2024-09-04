import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeDto } from '../models/employee-dto';
import Swal from 'sweetalert2';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL: string = 'http://localhost:8080/api/employees';
  private selEmployee$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private _http: HttpClient) { }

  private handleError(error: any) {
    const STATUS = error.status;

    switch(STATUS) {
      case 0:
        Swal.fire({
          toast: true,
          timer: 2000,
          timerProgressBar: true,
          icon: 'error',
          title: 'Server connection fault!',
          position: 'center',
          showConfirmButton: false
        }).then();
        break;
      case 400:
        Swal.fire({
          toast: true,
          timer: 2000,
          timerProgressBar: true,
          icon: 'warning',
          title: error.error.message,
          position: 'center',
          showConfirmButton: false
        }).then();
        break;
      case 404:
        Swal.fire({
          toast: true,
          timer: 2000,
          timerProgressBar: true,
          icon: 'warning',
          title: error.error.message,
          position: 'center',
          showConfirmButton: false
        }).then();
        break;
      case 500:
        Swal.fire({
          toast: true,
          timer: 2000,
          timerProgressBar: true,
          icon: 'error',
          title: 'Internal server error!',
          position: 'center',
          showConfirmButton: false
        }).then();
        break;       
    }

    return throwError(() => new Error('Something ocurred; please, try again later!'));
  }


  public getSelEmployeeNum(): Observable<string> {
    return this.selEmployee$.asObservable();
  }

  public setSelEmployeeNum(employeeNumber: string): void {
    this.selEmployee$.next(employeeNumber);
  }

  public getEmployees(page: number, size: number): Observable<Page<Employee>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this._http.get<Page<Employee>>(this.baseURL, {params: params})
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
