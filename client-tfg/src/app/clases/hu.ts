
export class HistoriaUsuario {
  public _id: String;
  public numero: number;
  public nombre: String;
  public descripcion: String;
  public tipo: String;
  public posX: Number;
  public posY: Number;
  public tareas: String[];
  public iteracion: number;
  public padres: String[];
  public proyectoID: String;


  // Constructor (obligatorio que tenga proyectoID, resto de parámetros opcionales)
  constructor (proyectoID: String, _id?: String, posX?: Number, posY?: Number, numero?: number, nombre?: String,
    descripcion?: String, tipo?: String, tareas?: String[], iteracion?: number, padres?: String[]) {
    this.proyectoID = proyectoID;

    this._id = _id;

    this.numero = numero;

    if (nombre === undefined) {
      this.nombre = 'Nuevo';
    } else {
      this.nombre = nombre;
    }

    if (descripcion === undefined) {
      this.descripcion = 'Descripción de ' + this.nombre;
    } else {
      this.descripcion = descripcion;
    }

    if (tipo === undefined) {
      this.tipo = 'Direct';
    } else {
      this.tipo = tipo;
    }

    if (posX === undefined) {
      this.posX = 0;
    } else {
      this.posX = posX;
    }

    if (posY === undefined) {
      this.posY = 0;
    } else {
      this.posY = posY;
    }

    if (tareas === undefined) {
      this.tareas = [];
    } else {
      this.tareas = tareas;
    }

    if (iteracion === undefined) {
      this.iteracion = 1;
    } else {
      this.iteracion = iteracion;
    }

    if (padres === undefined) {
      this.padres = [];
    } else {
      this.padres = padres;
    }
  }

  // Añade el padre y modifica el tipo de la HU
  public añadePadre(padre: String) {
    this.padres.push(padre); // Le añado el padre
    this.decideTipo(); // Le pongo el tipo correspondiente
  }

  // Devuelve el número de padres que tiene la hu
  public cuentaPadres() {
    return this.padres.length;
  }

  // Decide el tipo del que es la hu
  private decideTipo() {
    if (this.padres.length === 0) {
      this.tipo = 'Direct';
    } else if (this.padres.length === 1) {
      this.tipo = 'Division';
    } else {
      this.tipo = 'Fusion';
    }
  }

}
