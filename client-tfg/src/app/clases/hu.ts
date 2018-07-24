
export interface HistoriaUsuario {
  _id: String;
  numero: number;
  nombre: String;
  descripcion: String;
  tipo: String;
  posX: Number;
  posY: Number;
  a1: Boolean;
  a2: Boolean;
  a3: Boolean;
  finalizado: Boolean;
  iteracion: number;
  padres: String[];
  proyectoID: String;

}
