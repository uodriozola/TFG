import { Component, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { HistoriaUsuario } from '../../clases/hu'; // importo la clase HistoriaUsuario
import { HuService } from '../../servicios/hu.service'; // importo el servicio husService
import { LogicaHuService } from '../../servicios/logica-hu.service';
import { ContadorService } from '../../servicios/contador.service';
import { Proyecto } from '../../clases/proyecto';
import { Params, ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { IteracionService } from '../../servicios/iteracion.service';
import { Iteracion } from '../../clases/iteracion';
declare var vis: any;

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit, OnDestroy {
  public options: any;
  public data: any;
  public nodes = new vis.DataSet();
  public edges = new vis.DataSet();
  public network: any;

  // Para poder unsubscribe sin que falle asigno la subscripción a una variable y luego me unsubscribe a ella.
  subscrip1: any;
  subscrip2: any;
  subscrip3: any;

  iteraciones: Iteracion[] = [];

  errorMessage: any;

  @Input() public proyectoID: String;

  constructor(private element: ElementRef,
    private huService: HuService,
    private iteracionService: IteracionService,
    private logicaService: LogicaHuService,
    private contadorService: ContadorService,
    private _route: ActivatedRoute) {

  }

  ngOnDestroy() {

    this.subscrip1.unsubscribe();
    this.subscrip2.unsubscribe();
    this.subscrip3.unsubscribe();

  }

  ngOnInit() {

    // Ponemos el contador de nodos y el de iteraciones a 0
    this.contadorService.inicializa();
    this.contadorService.inicializaIt();

    this.options = {
      edges: {
        color: 'grey',
        arrows: {
          to: { enabled: true, scaleFactor: 1 }
        },
        smooth: false
      },
      interaction: {
        selectConnectedEdges: false,
        multiselect: true
      },
      manipulation: {
        enabled: true,
        addNode: (nodeData, callback) => {
          this.añadeNodo(nodeData);
        },
        addEdge: (nodeEdge, callback) => {
          if (nodeEdge.from !== nodeEdge.to) {
            this.añadeArista(nodeEdge, callback);
          }
        },
        deleteNode: (nodeData, callback) => {
          this.borraElemento(nodeData, callback);
        }
      },
      physics: {
        hierarchicalRepulsion: {
          nodeDistance: 0,
          springConstant: 0
        }
      },
      groups: {
        Direct: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          color: { background: 'white' },
          image: '../assets/images/Directo.jpg'
        },
        Division: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          color: { background: 'white' },
          image: '../assets/images/Division.png'
        },
        Fusion: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          color: { background: 'white' },
          image: '../assets/images/Fusion.png'
        },
        Increment: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          color: { background: 'white' },
          image: '../assets/images/Incremento.jpeg'
        },
        Incremented: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          color: { background: 'white' },
          image: '../assets/images/Incrementado.png'
        },
        Reused: {
          shape: 'circularImage',
          size: 15,
          shapeProperties: { borderDashes: [0, 30] },
          color: { background: 'white' },
          image: '../assets/images/Reutilizado.png'
        },
        Warning: {
          color: { background: '#FF0000' }
        },
        Iteraciones: {
          shape: 'circularImage',
          size: 10,
          color: {
            border: 'grey',
            background: 'white'
          }
        }
      },
      nodes: {
        physics: false
      }
    };

    // Cargamos las HUS y las iteraciones de la base de datos para mostrarlas en el gráfico
    this.cargaGrafico();

    this.data = {
      nodes: this.nodes,
      edges: this.edges
    };



    // Creo un Network
    this.network = new vis.Network(this.element.nativeElement, this.data, this.options);
    // El fit yo creo que no hace nada
    this.network.fit();


    // -------------------------------EVENTOS DEL GRÁFICO---------------------------------------


    // Paso a huService el nodo seleccionado si no es de tipo Iteraciones
    this.network.on('select', (params) => {
      const node = this.nodes.get(params.nodes[0]);
      if (node.id === 'flecha-izq' || node.id === 'flecha-der') {
        this.selecItersLado(node);
      } else if (node.group !== 'Iteraciones') {
        this.logicaService.updateNodoSel(params.nodes[0]);
      } else {
        // Selecciono ambos nodos para mover la iteración en vertical
        this.network.selectNodes([node.id, (+node.id * (-1)).toString()]);
        this.nodes.update({ id: node.id, fixed: { y: false } });
        this.nodes.update({ id: (+node.id * (-1)).toString(), fixed: { y: false } });
      }
    });

    // Cuando se deseleccionan los nodos iteración vuelve a no poder moverse en vertical
    this.network.on('deselectNode', (params) => {
      this.nodes.update({ id: 'flecha-der', fixed: { y: true, x: true } });
      this.nodes.update({ id: 'flecha-izq', fixed: { y: true, x: true } });
      const node = this.nodes.get(params.previousSelection.nodes[0]);
      if (node.group === 'Iteraciones') {
        this.nodes.update({ id: node.id, fixed: { y: true, x: true } });
        this.nodes.update({ id: (+node.id * (-1)).toString(), fixed: { y: true, x: true } });
      }
    });

    // Guarda las nuevas posiciones de los nodos al moverlos y modifico su iteración si fuera necesario
    this.network.on('dragEnd', (params) => {
      this.guardaPosiciones(params);
    });


    // --------------------------------------------------------------------------------


    // Actualizamos los detalles del nodo que se ha modificado en el componente de Detalles
    this.subscrip1 = this.logicaService.huDetallesCambio.subscribe((huID) => {
      this.huService.getHu(huID).subscribe(hu => {
        this.nodes.update({ id: huID, label: hu.numero, group: hu.tipo });
      });
    });

    // Visualizamos en el gráfico la HU creada desde Detalles
    this.subscrip2 = this.logicaService.huDetallesCreado.subscribe((huID) => {
      this.huService.getHu(huID).subscribe(hu => {
        this.nodes.add({ id: huID, label: hu.numero, group: hu.tipo, x: hu.posX, y: hu.posY });
      });
    });

    // Creamos una nueva iteración al clicar en el botón correspondiente desde Proyecto
    this.subscrip3 = this.logicaService.nuevaIteracion.subscribe(() => {
      this.addIteracion();
    });

  }


  // -------------------------------MÉTODOS Y FUNCIONES--------------------------------------------


  // Dado el ID de proyecto actual, carga las HUS
  cargaGrafico() {
    Observable.forkJoin(this.huService.getHus(this.proyectoID),
      this.iteracionService.getIteraciones(this.proyectoID))
      .subscribe(
        response => {
          this.cargaOUs(this.huService.hus);
          this.cargaIteraciones(response[1]);
        },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
          }
        });
  }

  // Carga las iteraciones de la BD, en caso de que no haya ninguna añade una primera automáticamente
  private cargaIteraciones(iteraciones: Iteracion[]) {
    this.iteracionService.getIteraciones(this.proyectoID).subscribe(res => {
      if (res.length !== 0) {
        this.iteraciones = res;
        // Añado las flechas en la posición correspondiente
        this.creaFlechas(this.iteraciones.find(iteracion => iteracion.numero === 1));
        for (const iteracion of iteraciones) {
          this.contadorService.incrementaIt();
          this.nodes.add({
            id: iteracion.numero, group: 'Iteraciones', label: iteracion.numero, x: iteracion.posXder,
            y: iteracion.posY, fixed: { y: true, x: true }, image: '../assets/images/der.png'
          });
          this.nodes.add({
            id: '-' + iteracion.numero, group: 'Iteraciones', x: iteracion.posXizq,
            y: iteracion.posY, fixed: { y: true, x: true }, image: '../assets/images/izq.png'
          });
          this.edges.add({
            from: '-' + iteracion.numero, to: iteracion.numero,
            color: 'grey', dashes: true, arrows: { to: { enabled: false } }
          });
        }
      } else {
        // Añado las flechas en la posición por defecto
        this.creaFlechas(null);
        this.addIteracion();
      }
    });
  }


  // Pasa las hus en el formato solicitado por VIS (nodos por un lado y edges por otro)
  private cargaOUs(historiasUsuario: HistoriaUsuario[]) {
    for (const hu of historiasUsuario) {
      this.contadorService.incrementa();
      this.nodes.add({ id: hu._id, group: hu.tipo, label: hu.numero, x: hu.posX, y: hu.posY }); // relleno el DataSet de nodes
      // relleno el Dataset de edges
      if (hu.padres !== undefined) {
        for (const padre of hu.padres) {
          this.edges.add({ from: padre, to: hu._id });
        }
      }
    }
  }

  // Guarda el nodo creado como una nueva Historia de Usuario en la Base de Datos
  private añadeNodo(nodo: any) {
    this.contadorService.incrementa();
    const hu = {
      proyectoID: this.proyectoID,
      nombre: 'Nuevo',
      descripcion: 'Descripcion de Nuevo',
      tipo: 'Direct',
      _id: nodo.id,
      posX: nodo.x,
      posY: nodo.y,
      numero: this.contadorService.contador,
      iteracion: 0,
      padres: [],
      a1: false,
      a2: false,
      a3: false,
      finalizado: false
    };
    nodo.label = hu.numero;
    hu.iteracion = this.compruebaIteracion(hu);
    this.huService.addHu(hu).subscribe(
      response => {
        this.huService.historiaUsuario = response.hu;
        this.nodes.remove(nodo.id);
        this.nodes.add({
          id: this.huService.historiaUsuario._id, group: this.huService.historiaUsuario.tipo,
          label: nodo.label, x: this.huService.historiaUsuario.posX,
          y: this.huService.historiaUsuario.posY
        });
        if (!response.hu) {
          alert('Error en el servidor');
        } else {
          // console.log('HU añadida');
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
        }
      });
  }

  // Modifica el objeto de tipo HistoriaUsuario basándose en la arista pasada como parámetro
  private añadeArista(arista: any, callback: any) {
    Observable.forkJoin(this.huService.getHu(arista.to),
      this.huService.getHu(arista.from)).subscribe(res => {
        const hijo = res[0];
        const padre = res[1];
        Observable.forkJoin(this.huService.getHijosTipo(padre._id),
          this.huService.getPadres(hijo._id)).subscribe(dev => {
            const hermanos = dev[0].hus;
            const padres = dev[1];
            const nuevos = this.logicaService.setTipo(padre, hijo, hermanos, padres);
            const tipo = this.nodes.get(arista.to).group;
            console.log(tipo);
            if (nuevos[0].tipo === tipo && nuevos[0].tipo !== 'Fusion' && nuevos[0].tipo !== 'Incremented') {
              callback(null);
            } else {
              for (const nuevo of nuevos) {
                this.nodes.update({ id: nuevo._id, group: nuevo.tipo });
                this.huService.updateHu(nuevo._id, nuevo).subscribe(resul => {
                });
              }
              // Actualizo los detalles en el momento
              this.logicaService.updateNodoSel(undefined);
              callback(arista);
            }
          });
      },
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
          }
        });
  }

  // Decide si tiene que borrar una OU o una Iteración, en otro caso no realiza el borrado
  private borraElemento(nodo: any, callback: any) {
    if (nodo.nodes.length === 1) {
      this.borraOU(nodo, callback);
    } else if (nodo.nodes.length === 2 && +nodo.nodes[0]) {
      this.borraIteracion(nodo, callback);
    } else {
      callback(null);
    }
  }

  // Borra la OU hoja seleccionada de la Base de Datos
  private borraOU(nodo: any, callback: any) {
    this.huService.getHijosTipo(nodo.nodes[0]).subscribe(hu => {
      if (hu.hus.length === 0) {
        this.huService.deleteHu(nodo.nodes[0]).subscribe(
          response => {
            this.contadorService.decrementa();
            if (response.hu.padres[0] !== undefined) {
              this.huService.getHijosTipo(response.hu.padres[0]).subscribe(res => {
                if (res.hus.length === 1) {
                  res.hus[0].tipo = 'Warning';
                  this.huService.updateHu(res.hus[0]._id, res.hus[0]).subscribe(nuevo => {
                    this.nodes.update({ id: res.hus[0]._id, group: 'Warning' });
                  });
                }
              });
            }
            if (!response.hu) {
              alert('Error en el servidor');
            }
            callback(nodo);
          },
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
            }
          });
      } else {
        callback(null);
      }
    });
  }

  // Borra la Iteración hoja seleccionada de la Base de Datos
  private borraIteracion(nodo: any, callback: any) {
    const iteracion = Math.abs(nodo.nodes[0]);
    if (iteracion === this.contadorService.iteraciones) {
      this.iteracionService.deleteIteracion(iteracion.toString()).subscribe(res => {
        this.contadorService.decrementaIt();
        this.iteraciones.pop();
        this.logicaService.eliminaIteration(iteracion.toString());
        // Modifico la iteración de los nodos que estaban en esa iteración
        this.huService.getHusIter(this.proyectoID, iteracion).subscribe(nodos => {
          nodos.forEach(n => {
            n.iteracion -= 1;
            this.huService.updateHu(n._id, n).subscribe(nuevo => {
            });
          });
        });
        callback(nodo);
      });
    } else {
      callback(null);
    }
  }

  // Guarda en la base de datos las posiciones de los nodos pasados como parámetro
  private guardaPosiciones(params: any) {
    const posiciones = this.network.getPositions(params.nodes);
    if (posiciones != null) {
      for (const pos of Object.keys(posiciones)) {
        if (Object.keys(posiciones).filter(res => res === 'flecha-der' || res === 'flecha-izq').length > 0) {
          if (!isNaN(+pos)) {
            const posAbs = Math.abs(+pos);
            this.iteracionService.getIteracion(posAbs.toString()).subscribe(iter => {
              if (+pos > 0) {
                iter.posXder = posiciones[+pos].x;
                this.nodes.update({ id: pos, x: iter.posXder });
                this.nodes.update({ id: 'flecha-der', x: iter.posXder });
              } else {
                iter.posXizq = posiciones[+pos].x;
                this.nodes.update({ id: pos, x: iter.posXizq });
                this.nodes.update({ id: 'flecha-izq', x: iter.posXizq });
              }
              this.iteracionService.updateIteracion(iter._id, iter).subscribe(nuevo => {
              });
            },
              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                }
              });
          }
        } else if (isNaN(+pos)) {
          this.huService.getHu(pos).subscribe(hu => {
            const ou = hu;
            ou.posX = posiciones[pos].x;
            ou.posY = posiciones[pos].y;
            this.nodes.update({ id: pos, x: ou.posX, y: ou.posY });
            ou.iteracion = this.compruebaIteracion(ou);
            this.huService.updateHu(pos, ou).subscribe(nuevo => {
              // Actualizo los detalles en el momento
              this.logicaService.updateNodoSel(params.nodes[0]);
            });
          },
            error => {
              this.errorMessage = <any>error;
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
              }
            });
          // Si se trata de una iteración moviendose en vertical
        } else {
          if (+pos > 0) {
            this.iteracionService.getIteracion(pos).subscribe(iter => {
              // Compruebo si hay algún nodo que tenga que cambiar su iteración
              Observable.forkJoin(this.huService.getHusIter(this.proyectoID, iter.numero),
                this.huService.getHusIter(this.proyectoID, iter.numero - 1)).subscribe(res => {
                  const actual = res[0];
                  const anterior = res[1];
                  // En los de la iteración actual miramos si pertenecen a la anterior
                  res[0].forEach(n => {
                    if (n.posY < posiciones[+pos].y) {
                      n.iteracion -= 1;
                      this.huService.updateHu(n._id, n).subscribe(nuevo => {
                      });
                    }
                  });
                  res[1].forEach(n => {
                    if (n.posY > posiciones[+pos].y) {
                      n.iteracion += 1;
                      this.huService.updateHu(n._id, n).subscribe(nuevo => {
                      });
                    }
                  });
                });
              iter.posY = posiciones[+pos].y;
              this.iteracionService.updateIteracion(iter._id, iter).subscribe(nuevo => {
                this.nodes.update({ id: pos, y: iter.posY });
              });
            },
              error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                  console.log(this.errorMessage);
                }
              });
          }
        }
      }
    }
  }

  // Añade una iteración
  addIteracion() {
    this.contadorService.incrementaIt();
    // Guardo en la variable maxPosY el valor del nodo iteración que está más abajo
    let nodos = this.nodes.get({ group: 'Iteraciones' });
    nodos = nodos.filter(res => +res.id > 0);
    let maxPosY = -300;
    Math.max(nodos.map(n => {
      maxPosY = Math.max(maxPosY, n.y);
    }));
    const posXder = this.nodes.get('flecha-der').x;
    const posXizq = this.nodes.get('flecha-izq').x;
    this.nodes.add({
      id: this.contadorService.iteraciones, label: this.contadorService.iteraciones,
      y: maxPosY + 70, x: posXder, fixed: { y: true, x: true }, group: 'Iteraciones',
      image: '../assets/images/der.png'
    });

    this.nodes.add({
      id: '-' + this.contadorService.iteraciones, y: maxPosY + 70, x: posXizq,
      fixed: { y: true, x: true }, group: 'Iteraciones', image: '../assets/images/izq.png'
    });

    this.edges.add({
      from: '-' + this.contadorService.iteraciones, to: this.contadorService.iteraciones,
      color: 'grey', dashes: true, arrows: { to: { enabled: false } }
    });

    const iteracion: Iteracion = {
      _id: this.contadorService.iteraciones.toString(),
      numero: this.contadorService.iteraciones,
      nombre: 'Prueba',
      descripcion: 'Descripción de prueba',
      posXder: posXder,
      posXizq: posXizq,
      posY: maxPosY + 70,
      proyectoID: this.proyectoID
    };
    // Si hay algún nodo por debajo de la iteración añadida se la modifico
    this.huService.getHusIter(this.proyectoID, this.contadorService.iteraciones - 1).subscribe(iter => {
      iter.forEach(n => {
        if (n.posY > iteracion.posY) {
          n.iteracion += 1;
          this.huService.updateHu(n._id, n).subscribe(nuevo => {
          });
        }
      });
    });
    this.iteracionService.addIteracion(iteracion).subscribe(res => {
      this.logicaService.detallesIteration(iteracion.numero.toString());
    });
  }

  // Dado un nodo comprueba la iteración en la que se encuentra mediante su posición en el gráfico
  compruebaIteracion(hu: HistoriaUsuario): number {
    let iteraciones = this.nodes.get({ group: 'Iteraciones' });
    iteraciones = iteraciones.filter(res => +res.id > 0);
    let actual = 0;
    for (const it of iteraciones) {
      actual = it.y < hu.posY ? it.id : actual;
    }
    return actual;
  }

  // Selecciona los nodos iteración correspondientes a la flecha seleccionada y permite moverlos en horizontal
  selecItersLado(flecha: any) {
    let nodos = this.nodes.get();
    if (flecha.id === 'flecha-der') {
      nodos = nodos.filter(der => +der.id > 0);
    } else {
      nodos = nodos.filter(der => +der.id < 0);
    }
    // Selecciono todos los nodos correspondientes para mover la iteración en horizontal
    const selec = nodos.map(res => res.id);
    selec.push(flecha.id);
    this.network.selectNodes(selec);
    for (const nodo of nodos) {
      this.nodes.update({ id: nodo.id, fixed: { x: false } });
    }
    this.nodes.update({ id: flecha.id, fixed: { x: false } });
  }

  // Crea las flechas para desplazar las iteraciones a los lados
  creaFlechas(iter: Iteracion) {
    let posXizq = -300;
    let posXder = 300;
    if (iter !== null) {
      posXizq = iter.posXizq;
      posXder = iter.posXder;
    }
    this.nodes.add({
      id: 'flecha-der', shape: 'circularImage', size: 10, x: posXder, y: -255, fixed: { y: true, x: true },
      image: '../assets/images/flecha-der.png', color: { border: 'black', background: 'white' }
    });
    this.nodes.add({
      id: 'flecha-izq', shape: 'circularImage', size: 10, x: posXizq, y: -255, fixed: { y: true, x: true },
      image: '../assets/images/flecha-izq.png', color: { border: 'black', background: 'white' }
    });
  }


}
