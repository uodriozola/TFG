import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Tareas } from '../clases/tareas';

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
            if (valueFinalizado === true && (valueA3 === false || valueA2 === false || valueA1 === false)) {
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

    /**
     * Valida que en los que no están habilitados se hayan mantenido a checked
     * @param a1 nombre de la tarea a1
     * @param a2 nombre de la tarea a2
     * @param a3 nombre de la tarea a3
     * @param finalizado nombre de la tarea finalizado
    */
    static habilitadas(a1: any, a2: any, a3: any, finalizado: any, tareas: Tareas): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const valueA1 = control.get(a1).value;
            const valueA2 = control.get(a2).value;
            const valueA3 = control.get(a3).value;
            const valueFinalizado = control.get(finalizado).value;
            if (!valueA1 && !tareas.a1.habilitado) {
                return { checkboxes: true };
            } else if (!valueA2 && !tareas.a2.habilitado) {
                return { checkboxes: true };
            } else if (!valueA3 && !tareas.a3.habilitado) {
                return { checkboxes: true };
            } else if (!valueFinalizado && !tareas.finalizado.habilitado) {
                return { checkboxes: true };
            } else {
                return null;
            }
        };
    }

    /**
   * Valida que dos campos tengan el mismo valor
   * @param campo1 nombre del campo 1
   * @param campo2 nombre del campo 2
  */
  static camposIguales(campo1: any, campo2: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const valueCampo1 = control.get(campo1).value;
      const valueCampo2 = control.get(campo2).value;
      if (valueCampo1 && valueCampo2) {
          return valueCampo1 === valueCampo2 ? null : { 'camposIguales': true };
      } else {
          return null;
      }

    };
  }

}
