import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInput]'
})
export class InputDirective {

  constructor(private _el: ElementRef, private _control: NgControl) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    
    let value = input.value;

    value = value.toUpperCase();

    // Remove accents
    value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Update input's display value
    this._el.nativeElement.value = value;

    // Update form control's value
    if (this._control && this._control.control) {
      this._control.control.setValue(value);
    }
  }

}
