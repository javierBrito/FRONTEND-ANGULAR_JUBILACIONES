import { MensajesService } from './../../../../auth/service/mensajes/mensajes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { JubTipoEstado } from 'app/auth/models/JubTipoEstado.model';
import { TipoEstadoService } from './service/tipoEstado/tipoEstado.service';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

@Component({
  selector: 'app-tipoEstado',
  templateUrl: './tipoEstado.component.html',
  styleUrls: ['./tipoEstado.component.scss']
})
export class TipoEstadoComponent implements OnInit {
  @ViewChild("modal_form_registro", { static: false }) modal_form_registro;
  public modalOption: NgbModalOptions = {};

  /*LISTAS*/
  public listaTipoEstado: JubTipoEstado[];
  public listaDesEstado: any;

  /*Formulario*/
  public formTipoEstado: FormGroup;

  /*SPINNER*/
  public loadTipoEstado: boolean;

  /*Variables*/
  public botonModal: string;

  // Mapear modelos
  public jubTipoEstado: JubTipoEstado;

  /*PAGINACION*/
  public page: number;
  public itemsRegistros: number;

  constructor(
    private modalService: NgbModal,
    private tipoEstadoService: TipoEstadoService,
    private formBuilder: FormBuilder,
    private mensajes: MensajesService
  ) {
    this.listaDesEstado = [{ "codigo": 1, "descripcion": "Activo" }, { "codigo": 0, "descripcion": "Inactivo" }];

    this.itemsRegistros = 5;
    this.page = 1;

    this.loadTipoEstado = true;
    this.botonModal = '';
    this.formTipoEstado = this.formBuilder.group({
      tipestNombre: new FormControl('', Validators.required),
      tipestFecha: new FormControl('', Validators.required),
    });
    this.modalOption = {
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    this.listaTipoEstado = [];
  }

  ngOnInit() {
    this.listarTipoEstado();
  }

  listarTipoEstado(): void {
    this.loadTipoEstado = false;
    this.tipoEstadoService.listarTipoEstado().subscribe(
      respuesta => {
        this.listaTipoEstado = respuesta['listado'];
        for (const registro of this.listaTipoEstado) {
          for (var i = 0; i < this.listaDesEstado.length; i++) {
            if (this.listaDesEstado[i].codigo == registro.tipestEstado) {
              registro.desEstado = this.listaDesEstado[i];
            }
          }
        }
        if (this.listaTipoEstado.length < this.itemsRegistros) {
          this.page = 1;
        }

        setTimeout(() => {
          this.loadTipoEstado = true;
        }, 1000);
      }
    )
  }

  nuevoTipoEstado(): void {
    this.resetTheForm();
    this.botonModal = 'Guardar';
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Guardar registro
        let item: any = {
          tipestNombre: this.formTipoEstado.value.tipestNombre,
          tipestFecha: dayjs(this.formTipoEstado.value.tipestFecha).format("YYYY-MM-DD HH:mm:ss.SSS"),
          tipestEstado: 1
        }
        this.tipoEstadoService.guardarTipoEstado(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Añadir', 'Se ha añadido el registro');
          this.listarTipoEstado();
        });
        this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
    }).catch(() => { });
    console.log("Guardar 3");
  }

  resetTheForm(): void {
    this.formTipoEstado.reset({
      tipestCodigo: { value: '', disabled: false },
      tipestNombre: { value: '', disabled: false },
    });
  }

  editarTipoEstado(jubTipoEstado) {
    this.resetTheForm();
    this.botonModal = 'Actualizar';
    this.formTipoEstado = this.formBuilder.group({
      tipestCodigo: new FormControl(jubTipoEstado.tipestCodigo, Validators.required),
      tipestNombre: new FormControl(jubTipoEstado.tipestNombre, Validators.required),
    });
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Actualizar registro
        let item: any = {
          tipestCodigo: jubTipoEstado.tipestCodigo,
          tipestNombre: this.formTipoEstado.value.tipestNombre,
          tipestEstado: 1
        }
        this.tipoEstadoService.guardarTipoEstado(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Actualizar', 'Se ha actualizado el registro');
          this.listarTipoEstado();
        });
      } else {
        console.log("Cancelamos");
      }
      this.modalService.dismissAll(this.modal_form_registro);
    }).catch(() => { });
  }

  eliminarTipoEstado(jubTipoEstado) {
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
          this.tipoEstadoService.eliminarTipoEstadoPorId(jubTipoEstado.tipestCodigo).subscribe({
            next: (response) => {
              this.listarTipoEstado();
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
  get tipestNombreField() {
    return this.formTipoEstado.get('tipestNombre');
  }

}

