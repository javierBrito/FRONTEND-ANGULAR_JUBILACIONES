import { MensajesService } from './../../../../auth/service/mensajes/mensajes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { JubTipoJubilacion } from 'app/auth/models/JubTipoJubilacion.model';
import { TipoJubilacionService } from '../tipoJubilacion/service/tipoJubilacion/tipoJubilacion.service';
import { JubParametro } from 'app/auth/models/JubParametro.model';
import { ParametroService } from './service/parametro/parametro.service';
import Swal from 'sweetalert2';
import { JubTipoDiscapacidad } from 'app/auth/models/JubTipoDiscapacidad.model';
import { TipoDiscapacidadService } from '../tipoDiscapacidad/service/tipoDiscapacidad/tipoDiscapacidad.service';
import { TipoLeyService } from '../tipoLey/service/tipoLey/tipoLey.service';
import { JubTipoLey } from 'app/auth/models/JubTipoLey.model';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.scss']
})
export class ParametroComponent implements OnInit {
  @ViewChild("modal_form_registro", { static: false }) modal_form_registro;
  public modalOption: NgbModalOptions = {};

  /*LISTAS*/
  public listaTipoJubilacion: JubTipoJubilacion[];
  public listaParametro: JubParametro[];
  public listaTipoDiscapacidad: JubTipoDiscapacidad[];
  public listaTipoLey: JubTipoLey[];
  public listaDesEstado: any;

  /*Formulario*/
  public formParametro: FormGroup;

  /*SPINNER*/
  public loadParametro: boolean;

  /*Variables*/
  public botonModal: string;

  // Mapear modelos
  public parametro: JubParametro;

  /*PAGINACION*/
  public page: number;
  public itemsRegistros: number;

  /*TABS*/
  public selectedTab: number;

  constructor(
    private modalService: NgbModal,
    private tipoJubilacionService: TipoJubilacionService,
    private tipoDiscapacidadService: TipoDiscapacidadService,
    private tipoLeyService: TipoLeyService,
    private parametroService: ParametroService,
    private formBuilder: FormBuilder,
    private mensajes: MensajesService
  ) {
    this.listaDesEstado = [{ "codigo": 1, "descripcion": "Activo" }, { "codigo": 0, "descripcion": "Inactivo" }];

    this.itemsRegistros = 7;
    this.page = 1;
    this.selectedTab = 0;

    this.loadParametro = true;
    this.botonModal = '';
    this.formParametro = this.formBuilder.group({
      tipjubCodigo: new FormControl('', Validators.required),
      tipleyCodigo: new FormControl('', Validators.required),
      tipdisCodigo: new FormControl(''),
      tipdisPorcentaje: new FormControl(''),
      //parNombre: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
      //parNemonico: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
      parNombre: new FormControl('', Validators.required),
      parNemonico: new FormControl('', Validators.required),
      parEdadMin: new FormControl(''),
      parEdadMax: new FormControl(''),
      parMinAportaciones: new FormControl('', Validators.required),
      parTiempoServicio: new FormControl('', Validators.required),
    });
    this.modalOption = {
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    this.listaTipoJubilacion = [];
    this.listaTipoDiscapacidad = [];
    this.listaParametro = [];
  }

  ngOnInit() {
    this.listarParametro();
    this.listarTipoJubilacion();
    this.listarTipoDiscapacidad();
    this.listarTipoLey();
  }

  listarParametro(): void {
    this.loadParametro = false;
    this.parametroService.listarParametro().subscribe(
      respuesta => {
        this.listaParametro = respuesta['listado'];
        for (const registro of this.listaParametro) {
          this.tipoDiscapacidadService.buscarTipoDiscapacidadPorId(registro.tipdisCodigo ?? 0).subscribe(
            (respuesta) => {
              registro.jubTipoDiscapacidad = respuesta['objeto']
            }
          );
          this.tipoJubilacionService.buscarTipoJubilacionPorId(registro.tipjubCodigo ?? 0).subscribe(
            (respuesta) => {
              registro.jubTipoJubilacion = respuesta['objeto']
            }
          );
          this.tipoLeyService.buscarTipoLeyPorId(registro.tipleyCodigo ?? 0).subscribe(
            (respuesta) => {
              registro.jubTipoLey = respuesta['objeto']
            }
          );
          for (var i = 0; i < this.listaDesEstado.length; i++) {
            if (this.listaDesEstado[i].codigo == registro.parEstado) {
              registro.desEstado = this.listaDesEstado[i];
            }
          };

          if (this.listaParametro.length < this.itemsRegistros) {
            this.page = 1;
          };
        }

        setTimeout(() => {
          this.loadParametro = true;
        }, 1000);
      }
    )
  }

  listarTipoJubilacion(): void {
    this.loadParametro = false;
    this.tipoJubilacionService.listarTipoJubilacion().subscribe(
      respuesta => {
        this.listaTipoJubilacion = respuesta['listado'];
        // Ordenar lista por tipjubCodigo
        this.listaTipoJubilacion.sort((firstItem, secondItem) => firstItem.tipjubCodigo - secondItem.tipjubCodigo);

        setTimeout(() => {
          this.loadParametro = true;
        }, 1000);
      }
    )
  }

  listarTipoDiscapacidad(): void {
    this.loadParametro = false;
    this.tipoDiscapacidadService.listarTipoDiscapacidad().subscribe(
      respuesta => {
        this.listaTipoDiscapacidad = respuesta['listado'];
        // Ordenar lista por tipdisCodigo
        this.listaTipoDiscapacidad.sort((firstItem, secondItem) => firstItem.tipdisCodigo - secondItem.tipdisCodigo);

        setTimeout(() => {
          this.loadParametro = true;
        }, 1000);
      }
    )
  }

  listarTipoLey(): void {
    this.loadParametro = false;
    this.tipoLeyService.listarTipoLey().subscribe(
      respuesta => {
        this.listaTipoLey = respuesta['listado'];
        // Ordenar lista por tipdisCodigo
        this.listaTipoLey.sort((firstItem, secondItem) => firstItem.tipleyCodigo - secondItem.tipleyCodigo);

        setTimeout(() => {
          this.loadParametro = true;
        }, 1000);
      }
    )
  }

  nuevoParametro(): void {
    this.resetTheForm();
    this.botonModal = 'Guardar';
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Guardar registro
        let item: any = {
          tipjubCodigo: this.formParametro.value.tipjubCodigo ?? 0,
          tipdisCodigo: this.formParametro.value.tipdisCodigo ?? 0,
          tipleyCodigo: this.formParametro.value.tipleyCodigo ?? 0,
          tipdisPorcentaje: this.formParametro.value.tipdisPorcentaje,
          parNombre: this.formParametro.value.parNombre,
          parNemonico: this.formParametro.value.parNemonico,
          parEdadMin: this.formParametro.value.parEdadMin,
          parEdadMax: this.formParametro.value.parEdadMax,
          parMinAportaciones: this.formParametro.value.parMinAportaciones,
          parTiempoServicio: this.formParametro.value.parTiempoServicio,
          parEstado: 1
        }
        this.parametroService.guardarParametro(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Añadir', 'Se ha añadido el registro');
          this.listarParametro();
        });
        this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
    }).catch(() => { });
  }

  resetTheForm(): void {
    this.formParametro.reset({
      tipjubCodigo: { value: '', disabled: false },
      tipdisCodigo: { value: '', disabled: false },
      tipleyCodigo: { value: '', disabled: false },
      tipdisPorcentaje: { value: '', disabled: false },
      parNombre: { value: '', disabled: false },
      parNemonico: { value: '', disabled: false },
      parEdadMin: { value: '', disabled: false },
      parEdadMax: { value: '', disabled: false },
      parMinAportaciones: { value: '', disabled: false },
      parTiempoServicio: { value: '', disabled: false },
    });
  }

  editarParametro(parametro) {
    this.resetTheForm();
    this.botonModal = 'Actualizar';
    this.formParametro = this.formBuilder.group({
      tipjubCodigo: new FormControl(parametro.tipjubCodigo, Validators.required),
      tipdisCodigo: new FormControl(parametro.tipdisCodigo),
      tipleyCodigo: new FormControl(parametro.tipleyCodigo),
      tipdisPorcentaje: new FormControl(parametro.tipdisPorcentaje),
      //parNombre: new FormControl(parametro.parNombre, Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
      //parNemonico: new FormControl(parametro.parNemonico, Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
      parNombre: new FormControl(parametro.parNombre, Validators.required),
      parNemonico: new FormControl(parametro.parNemonico, Validators.required),
      parEdadMin: new FormControl(parametro.parEdadMin),
      parEdadMax: new FormControl(parametro.parEdadMax),
      parMinAportaciones: new FormControl(parametro.parMinAportaciones, Validators.required),
      parTiempoServicio: new FormControl(parametro.parTiempoServicio, Validators.required),
    });
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Actualizar registro
        this.parametro = new JubParametro({
          parCodigo: parametro.parCodigo,
          tipjubCodigo: this.formParametro.value.tipjubCodigo ?? 0,
          tipdisCodigo: this.formParametro.value.tipdisCodigo ?? 0,
          tipleyCodigo: this.formParametro.value.tipleyCodigo ?? 0,
          tipdisPorcentaje: this.formParametro.value.tipdisPorcentaje,
          parNombre: this.formParametro.value.parNombre,
          parNemonico: this.formParametro.value.parNemonico,
          parEdadMin: this.formParametro.value.parEdadMin,
          parEdadMax: this.formParametro.value.parEdadMax,
          parMinAportaciones: this.formParametro.value.parMinAportaciones,
          parTiempoServicio: this.formParametro.value.parTiempoServicio,
          parEstado: 1,
        })
        this.parametroService.guardarParametro(this.parametro['data']).subscribe(() => {
          this.mensajes.mensajeCorrecto('Actualizar', 'Se ha actualizado el registro');
          this.listarParametro();
        });
        //this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
      this.modalService.dismissAll(this.modal_form_registro);
    }).catch(() => { });
  }

  eliminarParametro(parametro) {
    Swal
      .fire({
        title: "Eliminar Registro",
        text: "¿Quiere eliminar el registro?'",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      })
      .then(resultado => {
        if (resultado.value) {
          // Hicieron click en "Sí, eliminar"
          this.parametroService.eliminarParametroPorId(parametro.parCodigo).subscribe({
            next: (response) => {
              this.listarParametro();
              this.mensajes.mensajeCorrecto('Eliminar', 'Se ha eliminado el registro');
            },
            error: (error) => {
              this.mensajes.mensajeCorrecto('Eliminar', 'Ha habido un problema al eliminar el registro');
            }
          });
        } else {
          // Hicieron click en "Cancelar"
          console.log("*Se cancela el proceso...*");
        }
      });
  }

  /* Variables del html, para receptar datos y validar*/
  get parNombreField() {
    return this.formParametro.get('parNombre');
  }
  get parNemonicoField() {
    return this.formParametro.get('parNemonico');
  }
  get tipjubCodigoField() {
    return this.formParametro.get('tipjubCodigo');
  }
  get tipdisCodigoField() {
    return this.formParametro.get('tipdisCodigo');
  }
  get tipleyCodigoField() {
    return this.formParametro.get('tipleyCodigo');
  }
  get parEdadMinField() {
    return this.formParametro.get('parEdadMin');
  }
  get parEdadMaxField() {
    return this.formParametro.get('parEdadMax');
  }
  get parMinAportacionesField() {
    return this.formParametro.get('parMinAportaciones');
  }
  get parTiempoServicioField() {
    return this.formParametro.get('parTiempoServicio');
  }
  get tipdisPorcentajeField() {
    return this.formParametro.get('tipdisPorcentaje');
  }

}
