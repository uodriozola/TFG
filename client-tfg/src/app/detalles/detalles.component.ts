import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HistoriaUsuario } from '../clases/hu'; // importo la clase HistoriaUsuario
import { HuService } from '../clases/hu.service'; // importo el servicio HuService
import { LogicaHuService } from '../clases/logica-hu.service';
import { ContadorService } from '../clases/contador.service';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit, OnDestroy {

  @Input() public proyectoID: String;

  errorMessage: any;

  subscrib: any;

  public hu: HistoriaUsuario = null;
  public huSel: Boolean = false;
  public tipos: String[] = [ 'Direct', 'Increment', 'Reused' ];

  constructor(private huService: HuService,
    private logicaService: LogicaHuService,
    private contadorService: ContadorService) { }

    ngOnDestroy() {
      this.subscrib.unsubscribe();
    }

  ngOnInit() {

    // Actualizamos los detalles del nodo seleccionado
    this.subscrib = this.logicaService.huSel.subscribe((huID) => {
      this.tipos = null;
      if (huID !== undefined) {
        this.huService.getHu(huID).subscribe(hu => {
          this.huSel = true;
          this.hu = hu;
          this.comboTipo();
        });
      } else {
        this.tipos = [ 'Direct', 'Increment', 'Reused' ];
        this.huSel = false;
      }
    });
  }

  cambiaHu() {
    this.huService.updateHu(this.hu._id, this.hu).subscribe( nuevo => {
      this.logicaService.detallesNodoCambio(this.hu._id);
    });
  }

  creaHu(formulario: NgForm) {
    this.contadorService.incrementa();
    this.hu = new HistoriaUsuario (this.proyectoID, undefined, undefined, undefined, this.contadorService.contador, formulario.value.nombre,
    formulario.value.descripcion, formulario.value.tipo, formulario.value.tareas, formulario.value.iteracion);
    this.huService.addHu(this.hu).subscribe(
      response => {
        this.huService.historiaUsuario = response.hu;
        if (!response.hu) {
          alert ('Error en el servidor');
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
    if (this.hu.padres.length === 0) {
      this.tipos = [ 'Direct', 'Increment', 'Reused' ];
    } else {
      this.tipos = [ this.hu.tipo ];
    }
  }

}
