import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HistoriaUsuario } from '../../clases/hu'; // importo la clase HistoriaUsuario
import { HuService } from '../../servicios/hu.service'; // importo el servicio HuService
import { LogicaHuService } from '../../servicios/logica-hu.service';
import { ContadorService } from '../../servicios/contador.service';
import { IteracionService } from '../../servicios/iteracion.service';
import { Iteracion } from '../../clases/iteracion';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit, OnDestroy {

  @Input() public proyectoID: String;

  errorMessage: any;

  public formulario: FormGroup;
  public formNuevo: FormGroup;

  subscrib: any;
  subscrib1: any;
  subscrib2: any;

  public iteraciones: Iteracion[];
  public hu: HistoriaUsuario = null;
  public huSel: Boolean = false;
  public tipos: String[] = ['Direct', 'Increment', 'Reused'];

  constructor(private fb: FormBuilder,
    private huService: HuService,
    private logicaService: LogicaHuService,
    private contadorService: ContadorService,
    private iteracionService: IteracionService) { }

  ngOnDestroy() {
    this.subscrib.unsubscribe();
    this.subscrib1.unsubscribe();
    this.subscrib2.unsubscribe();
  }

  ngOnInit() {
    this.cargarFormNuevo();
    this.iteracionService.getIteraciones(this.proyectoID).subscribe(iter => {
      this.iteraciones = iter;
    });

    // Actualizamos los detalles del nodo seleccionado
    this.subscrib = this.logicaService.huSel.subscribe((huID) => {
      this.tipos = null;
      if (huID !== undefined) {
        this.huService.getHu(huID).subscribe(hu => {
          this.huSel = true;
          this.hu = hu;
          this.comboTipo();
          this.cargarFormulario();
        });
      } else {
        this.tipos = ['Direct', 'Increment', 'Reused'];
        this.huSel = false;
        this.cargarFormNuevo();
      }
    });

    // Actualizamos el número de iteraciones que hay al añadir una nueva a la BD
    this.subscrib1 = this.logicaService.detallesIteracion.subscribe((iterID) => {
      this.iteracionService.getIteracion(iterID).subscribe(res => {
        this.iteraciones.push(res);
      });
    });
    // Actualizamos el número de iteraciones que hay al eliminar una iteración
    this.subscrib2 = this.logicaService.eliminaIteracion.subscribe((iterID) => {
      this.iteraciones.pop();
    });
  }

  cargarFormulario() {
    // Se definen los campos del formulario
    this.formulario = this.fb.group({
      nombre: [this.hu.nombre, Validators.compose([Validators.required])],
      descripcion: [this.hu.descripcion, Validators.compose([Validators.required])],
      iteracion: [this.hu.iteracion, Validators.compose([Validators.required])],
      tipo: [this.hu.tipo, Validators.compose([Validators.required])],
      a1: [{ value: this.hu.a1, disabled: false }],
      a2: [{ value: this.hu.a2, disabled: true }],
      a3: [{ value: this.hu.a3, disabled: true }],
      finalizado: [{ value: this.hu.finalizado, disabled: true }]
    });
  }

  cargarFormNuevo() {
    // Se definen los campos del formulario
    this.formNuevo = this.fb.group({
      nombre: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      iteracion: ['', Validators.compose([Validators.required])],
      tipo: ['', Validators.compose([Validators.required])],
      a1: [{ value: false, disabled: true }],
      a2: [{ value: false, disabled: true }],
      a3: [{ value: false, disabled: true }],
      finalizado: [{ value: false, disabled: true }]
    });
  }

  cambiaHu() {
    Object.assign(this.hu, this.formulario.value);
    this.huService.updateHu(this.hu._id, this.hu).subscribe(nuevo => {
      this.logicaService.detallesNodoCambio(this.hu._id);
    });
  }

  creaHu() {
    const iteracion = this.iteraciones.filter(iter => iter.numero === this.formNuevo.value.iteracion);
    this.contadorService.incrementa();
    this.hu = {
      proyectoID: this.proyectoID,
      nombre: this.formNuevo.value.nombre,
      descripcion: this.formNuevo.value.descripcion,
      tipo: this.formNuevo.value.tipo,
      _id: undefined,
      posX: -250,
      posY: iteracion[0].posY + 20,
      numero: this.contadorService.contador,
      iteracion: this.formNuevo.value.iteracion,
      padres: [],
      a1: this.formNuevo.value.a1,
      a2: this.formNuevo.value.a2,
      a3: this.formNuevo.value.a3,
      finalizado: this.formNuevo.value.finalizado
    };
    this.huService.addHu(this.hu).subscribe(
      response => {
        this.huService.historiaUsuario = response.hu;
        if (!response.hu) {
          alert('Error en el servidor');
        } else {
          this.logicaService.addHuDetalles(response.hu._id);
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
        }
      });
  }

  comboTipo() {
    this.huService.getHijosTipo(this.hu._id).subscribe(res => {
      if (this.hu.padres.length === 0 && res.hus.length === 0) {
        this.tipos = ['Direct', 'Increment', 'Reused'];
      } else {
        this.tipos = [this.hu.tipo];
      }
    });
  }

}
