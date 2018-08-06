import { Tareas } from './tareas';

export interface HistoriaUsuario {
  _id: String;
  numero: number;
  nombre: String;
  descripcion: String;
  tipo: String;
  posX: Number;
  posY: Number;
  tareas: Tareas;
  iteracion: number;
  padres: String[];
  proyectoID: String;

}
