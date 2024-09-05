import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeesFormComponent } from './components/employees-form/employees-form.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { InputDirective } from './directives/input.directive';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesFormComponent,
    EmployeesListComponent,
    InputDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
