import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isToday } from './date-formatting';

export function createDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const today = new Date();

    const isFutureDate = control.value.getTime() > today.getTime();
    const isDateToday = isToday(control.value);
    return isDateToday || isFutureDate ? null
      : {'pastDate': {value: control.value}};
  }
}
