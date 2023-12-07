import { MensajesService } from './../../../../auth/service/mensajes/mensajes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { JubTipoDiscapacidad } from 'app/auth/models/JubTipoDiscapacidad.model';
import { TipoDiscapacidadService } from './service/tipoDiscapacidad/tipoDiscapacidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipoDiscapacidad',
  templateUrl: './tipoDiscapacidad.component.html',
  styleUrls: ['./tipoDiscapacidad.component.scss']
})
export class TipoDiscapacidadComponent implements OnInit {
  @ViewChild("modal_form_registro", { static: false }) modal_form_registro;
  public modalOption: NgbModalOptions = {};

  /*LISTAS*/
  public listaTipoDiscapacidad: JubTipoDiscapacidad[];
  public listaDesEstado: any;

  /*Formulario*/
  public formTipoDiscapacidad: FormGroup;

  /*SPINNER*/
  public loadTipoDiscapacidad: boolean;

  /*Variables*/
  public botonModal: string;

  // Mapear modelos
  public tipoDiscapacidad: JubTipoDiscapacidad;

  /*PAGINACION*/
  public page: number;
  public itemsRegistros: number;

  constructor(
    private modalService: NgbModal,
    private tipoDiscapacidadService: TipoDiscapacidadService,
    private formBuilder: FormBuilder,
    private mensajes: MensajesService
  ) {
    this.listaDesEstado = [{ "codigo": 1, "descripcion": "Activo" }, { "codigo": 0, "descripcion": "Inactivo" }];

    this.itemsRegistros = 5;
    this.page = 1;

    this.loadTipoDiscapacidad = true;
    this.botonModal = '';
    this.formTipoDiscapacidad = this.formBuilder.group({
      //tipdisNombre: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
      tipdisNombre: new FormControl('', Validators.required),
    });
    this.modalOption = {
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    this.listaTipoDiscapacidad = [];
  }

  ngOnInit() {
    this.listarTipoDiscapacidad();
  }

  listarTipoDiscapacidad(): void {
    this.loadTipoDiscapacidad = false;
    this.tipoDiscapacidadService.listarTipoDiscapacidad().subscribe(
      respuesta => {
        this.listaTipoDiscapacidad = respuesta['listado'];
        for (const registro of this.listaTipoDiscapacidad) {
          for (var i = 0; i < this.listaDesEstado.length; i++) {
            if (this.listaDesEstado[i].codigo == registro.tipdisEstado) {
              registro.desEstado = this.listaDesEstado[i];
            }
          }
        }
        // Ordenar lista por regCodigo
        this.listaTipoDiscapacidad.sort((firstItem, secondItem) => firstItem.tipdisCodigo - secondItem.tipdisCodigo);

        if (this.listaTipoDiscapacidad.length < this.itemsRegistros) {
          this.page = 1;
        }

        setTimeout(() => {
          this.loadTipoDiscapacidad = true;
        }, 1000);
      }
    )
  }

  nuevoTipoDiscapacidad(): void {
    console.log("Guardar 1");
    this.resetTheForm();
    this.botonModal = 'Guardar';
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Guardar registro
        let item: any = {
          tipdisNombre: this.formTipoDiscapacidad.value.tipdisNombre,
          tipdisEstado: 1
        }
        this.tipoDiscapacidadService.guardarTipoDiscapacidad(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Añadir', 'Se ha añadido el registro');
          this.listarTipoDiscapacidad();
        });
        this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
    }).catch(() => { });
  }

  resetTheForm(): void {
    this.formTipoDiscapacidad.reset({
      tipdisCodigo: { value: '', disabled: false },
      tipdisNombre: { value: '', disabled: false },
    });
  }

  editarTipoDiscapacidad(tipoDiscapacidad) {
    this.resetTheForm();
    this.botonModal = 'Actualizar';
    this.formTipoDiscapacidad = this.formBuilder.group({
      tipdisCodigo: new FormControl(tipoDiscapacidad.tipdisCodigo, Validators.required),
      //tipdisNombre: new FormControl(tipoDiscapacidad.tipdisNombre, Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
      tipdisNombre: new FormControl(tipoDiscapacidad.tipdisNombre, Validators.required),
    });
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Actualizar registro
        let item: any = {
          tipdisCodigo: tipoDiscapacidad.tipdisCodigo,
          tipdisNombre: this.formTipoDiscapacidad.value.tipdisNombre,
          tipdisEstado: 1
        }
        this.tipoDiscapacidadService.guardarTipoDiscapacidad(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Actualizar', 'Se ha actualizado el registro');
          this.listarTipoDiscapacidad();
        });
        //this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
      this.modalService.dismissAll(this.modal_form_registro);
    }).catch(() => { });
  }

  eliminarTipoDiscapacidad(tipoDiscapacidad) {
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
          this.tipoDiscapacidadService.eliminarTipoDiscapacidadPorId(tipoDiscapacidad.tipdisCodigo).subscribe({
            next: (response) => {
              this.listarTipoDiscapacidad();
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
  get tipdisNombreField() {
    return this.formTipoDiscapacidad.get('tipdisNombre');
  }

}

