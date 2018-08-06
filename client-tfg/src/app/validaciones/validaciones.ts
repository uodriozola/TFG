import { AbstractControl, ValidatorFn } from '@angular/forms';

export class Validaciones {

  /**
   * Valida que en los checkbox de tareas no haya una marcada si no está marcada la anterior
   * @param a1 nombre de la tarea a1
   * @param a2 nombre de la tarea a2
   * @param a3 nombre de la tarea a3
   * @param finalizado nombre de la tarea finalizado
  */
  static checkboxes(a1: any, a2: any, a3: any, finalizado: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const valueA1 = control.get(a1).value;
      const valueA2 = control.get(a2).value;
      const valueA3 = control.get(a3).value;
      const valueFinalizado = control.get(finalizado).value;
      if ( valueFinalizado === true && (valueA3 === false || valueA2 === false || valueA1 === false)) {
          return { checkboxes: true };
      } else if (valueA3 === true && (valueA2 === false || valueA1 === false)) {
          return { checkboxes: true };
      } else if (valueA2 === true && valueA1 === false) {
          return { checkboxes: true };
      } else {
          return null;
      }
    };
  }

}
