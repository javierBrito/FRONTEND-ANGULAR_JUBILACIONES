import { MensajesService } from './../../../../auth/service/mensajes/mensajes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { JubTipoLey } from 'app/auth/models/JubTipoLey.model';
import { TipoLeyService } from '../tipoLey/service/tipoLey/tipoLey.service';
import { JubTipoDesvinculacion } from 'app/auth/models/JubTipoDesvinculacion.model';
import { TipoDesvinculacionService } from './service/tipoDesvinculacion/tipoDesvinculacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipoDesvinculacion',
  templateUrl: './tipoDesvinculacion.component.html',
  styleUrls: ['./tipoDesvinculacion.component.scss']
})
export class TipoDesvinculacionComponent implements OnInit {
  @ViewChild("modal_form_registro", { static: false }) modal_form_registro;
  public modalOption: NgbModalOptions = {};

  /*LISTAS*/
  public listaTipoLey: JubTipoLey[];
  public listaTipoDesvinculacion: JubTipoDesvinculacion[];

  /*Formulario*/
  public formTipoDesvinculacion: FormGroup;

  /*SPINNER*/
  public loadTipoDesvinculacion: boolean;

  /*Variables*/
  public botonModal: string;

  // Mapear modelos
  public tipoDesvinculacion: JubTipoDesvinculacion;

  /*PAGINACION*/
  public page: number;
  public itemsRegistros: number;

  /*TABS*/
  public selectedTab: number;

  constructor(
    private modalService: NgbModal,
    private tipoLeyService: TipoLeyService,
    private tipoDesvinculacionService: TipoDesvinculacionService,
    private formBuilder: FormBuilder,
    private mensajes: MensajesService
  ) {
    this.itemsRegistros = 5;
    this.page = 1;
    this.selectedTab = 0;

    this.loadTipoDesvinculacion = true;
    this.botonModal = '';
    this.formTipoDesvinculacion = this.formBuilder.group({
      jubTipoLey: new FormControl('', Validators.required),
      tipdesNombre: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
    });
    this.modalOption = {
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    this.listaTipoLey = [];
    this.listaTipoDesvinculacion = [];
  }

  ngOnInit() {
    this.listarTipoDesvinculacion();
    this.listarTipoLey();
  }

  listarTipoDesvinculacion(): void {
    this.loadTipoDesvinculacion = false;
    this.tipoDesvinculacionService.listarTipoDesvinculacion().subscribe(
      respuesta => {
        this.listaTipoDesvinculacion = respuesta['listado'];
        for (const registro of this.listaTipoDesvinculacion) {
          /*
          this.tipoLeyService.buscarTipoLeyPorId(registro.tipleyCodigo).subscribe(
            (respuesta) => {
              registro.jubTipoLey = respuesta['objeto']
            }
          )
          */
          if (this.listaTipoDesvinculacion.length < this.itemsRegistros) {
            this.page = 1;
          }
        }

        setTimeout(() => {
          this.loadTipoDesvinculacion = true;
        }, 1000);
      }
    )
  }

  listarTipoLey(): void {
    this.loadTipoDesvinculacion = false;
    this.tipoLeyService.listarTipoLey().subscribe(
      respuesta => {
        this.listaTipoLey = respuesta['listado'];

        setTimeout(() => {
          this.loadTipoDesvinculacion = true;
        }, 1000);
      }
    )
  }

  nuevoTipoDesvinculacion(): void {
    this.resetTheForm();
    this.botonModal = 'Guardar';
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Guardar registro
        let item: any = {
          //tipleyCodigo: this.formTipoDesvinculacion.value.jubTipoLey.tipleyCodigo,
          jubTipoLey: this.formTipoDesvinculacion.value.jubTipoLey,
          tipdesNombre: this.formTipoDesvinculacion.value.tipdesNombre,
          tipdesEstado: 1
        }
        this.tipoDesvinculacionService.guardarTipoDesvinculacion(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Añadir', 'Se ha añadido el registro');
          this.listarTipoDesvinculacion();
        });
        this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
    }).catch(() => { });
  }

  resetTheForm(): void {
    this.formTipoDesvinculacion.reset({
      jubTipoLey: { value: '', disabled: false },
      tipdesNombre: { value: '', disabled: false },
    });
  }

  // Obtiene el objeto escogido en la lista
  compararTipoLey(o1, o2) {
    return o1 === undefined || o2 === undefined || o1 === null || o2 === null ? false : o1.tipleyCodigo === o2.tipleyCodigo;
  }

  editarTipoDesvinculacion(tipoDesvinculacion) {
    this.resetTheForm();
    this.botonModal = 'Actualizar';
    this.formTipoDesvinculacion = this.formBuilder.group({
      //tipleyCodigo: new FormControl(tipoDesvinculacion.tipleyCodigo, Validators.required),
      jubTipoLey: new FormControl(tipoDesvinculacion.jubTipoLey, Validators.required),
      //tipdesNombre: new FormControl(tipoDesvinculacion.tipdesNombre, Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
      tipdesNombre: new FormControl(tipoDesvinculacion.tipdesNombre, Validators.required),
    });
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Actualizar registro
        let item: any = {
          tipdesCodigo: tipoDesvinculacion.tipdesCodigo,
          //tipleyCodigo: this.formTipoDesvinculacion.value.jubTipoLey.tipleyCodigo,
          jubTipoLey: this.formTipoDesvinculacion.value.jubTipoLey,
          tipdesNombre: this.formTipoDesvinculacion.value.tipdesNombre,
          tipdesEstado: 1
        }
        this.tipoDesvinculacionService.guardarTipoDesvinculacion(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Actualizar', 'Se ha actualizado el registro');
          this.listarTipoDesvinculacion();
        });
        //this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
      this.modalService.dismissAll(this.modal_form_registro);
    }).catch(() => { });
  }

  eliminarTipoDesvinculacion(tipoDesvinculacion) {
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
          this.tipoDesvinculacionService.eliminarTipoDesvinculacionPorId(tipoDesvinculacion.tipdesCodigo).subscribe({
            next: (response) => {
              this.listarTipoDesvinculacion();
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

  /* Variables del html, para receptar datos y validaciones*/
  get tipdesNombreField() {
    return this.formTipoDesvinculacion.get('tipdesNombre');
  }
  /*
  get tipleyCodigoField() {
    return this.formTipoDesvinculacion.get('tipleyCodigo');
  }
  */
  get jubTipoLeyField() {
    return this.formTipoDesvinculacion.get('jubTipoLey');
  }

}
