import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export function createDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dateParts = control.value.split('.');
    const dateStr = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Convert to 'YYYY-MM-DD'
    const inputDate = new Date(dateStr);
    const isValidDate = !isNaN(inputDate.getTime());
    const today = new Date();
    const isFutureDate = inputDate > new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return isValidDate && isFutureDate ? null
      : !isValidDate ? {'invalidDate': {value: control.value}}
      : !isFutureDate ? {'pastDate': {value: control.value}} : null;
  }
}
