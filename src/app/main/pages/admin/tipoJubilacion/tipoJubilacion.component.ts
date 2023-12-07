import { MensajesService } from './../../../../auth/service/mensajes/mensajes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { JubTipoJubilacion } from 'app/auth/models/JubTipoJubilacion.model';
import { TipoJubilacionService } from './service/tipoJubilacion/tipoJubilacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipoJubilacion',
  templateUrl: './tipoJubilacion.component.html',
  styleUrls: ['./tipoJubilacion.component.scss']
})
export class TipoJubilacionComponent implements OnInit {
  @ViewChild("modal_form_registro", { static: false }) modal_form_registro;
  public modalOption: NgbModalOptions = {};

  /*LISTAS*/
  public listaTipoJubilacion: JubTipoJubilacion[];
  public listaDesEstado: any;

  /*Formulario*/
  public formTipoJubilacion: FormGroup;

  /*SPINNER*/
  public loadTipoJubilacion: boolean;

  /*Variables*/
  public botonModal: string;

  // Mapear modelos
  public tipoJubilacion: JubTipoJubilacion;

  /*PAGINACION*/
  public page: number;
  public itemsRegistros: number;

  constructor(
    private modalService: NgbModal,
    private tipoJubilacionService: TipoJubilacionService,
    private formBuilder: FormBuilder,
    private mensajes: MensajesService
  ) {
    this.listaDesEstado = [{ "codigo": 1, "descripcion": "Activo" }, { "codigo": 0, "descripcion": "Inactivo" }];

    this.itemsRegistros = 5;
    this.page = 1;

    this.loadTipoJubilacion = true;
    this.botonModal = '';
    this.formTipoJubilacion = this.formBuilder.group({
      //tipjubNombre: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
      tipjubNombre: new FormControl('', Validators.required),
    });
    this.modalOption = {
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    this.listaTipoJubilacion = [];
  }

  ngOnInit() {
    this.listarTipoJubilacion();
  }

  listarTipoJubilacion(): void {
    this.loadTipoJubilacion = false;
    this.tipoJubilacionService.listarTipoJubilacion().subscribe(
      respuesta => {
        this.listaTipoJubilacion = respuesta['listado'];
        for (const registro of this.listaTipoJubilacion) {
          for (var i = 0; i < this.listaDesEstado.length; i++) {
            if (this.listaDesEstado[i].codigo == registro.tipjubEstado) {
              registro.desEstado = this.listaDesEstado[i];
            }
          }
        }
        // Ordenar lista por tipjubCodigo
        this.listaTipoJubilacion.sort((firstItem, secondItem) => firstItem.tipjubCodigo - secondItem.tipjubCodigo);

        if (this.listaTipoJubilacion.length < this.itemsRegistros) {
          this.page = 1;
        }

        setTimeout(() => {
          this.loadTipoJubilacion = true;
        }, 1000);
      }
    )
  }

  nuevoTipoJubilacion(): void {
    console.log("Guardar 1");
    this.resetTheForm();
    this.botonModal = 'Guardar';
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Guardar registro
        let item: any = {
          tipjubNombre: this.formTipoJubilacion.value.tipjubNombre,
          tipjubEstado: 1
        }
        this.tipoJubilacionService.guardarTipoJubilacion(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Añadir', 'Se ha añadido el registro');
          this.listarTipoJubilacion();
        });
        this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
    }).catch(() => { });
  }

  resetTheForm(): void {
    this.formTipoJubilacion.reset({
      tipjubCodigo: { value: '', disabled: false },
      tipjubNombre: { value: '', disabled: false },
    });
  }

  editarTipoJubilacion(tipoJubilacion) {
    this.resetTheForm();
    this.botonModal = 'Actualizar';
    this.formTipoJubilacion = this.formBuilder.group({
      tipjubCodigo: new FormControl(tipoJubilacion.tipjubCodigo, Validators.required),
      tipjubNombre: new FormControl(tipoJubilacion.tipjubNombre, Validators.required),
    });
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Actualizar registro
        let item: any = {
          tipjubCodigo: tipoJubilacion.tipjubCodigo,
          tipjubNombre: this.formTipoJubilacion.value.tipjubNombre,
          tipjubEstado: 1
        }
        this.tipoJubilacionService.guardarTipoJubilacion(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Actualizar', 'Se ha actualizado el registro');
          this.listarTipoJubilacion();
        });
        //this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
      this.modalService.dismissAll(this.modal_form_registro);
    }).catch(() => { });
  }

  eliminarTipoJubilacion(tipoJubilacion) {
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
          this.tipoJubilacionService.eliminarTipoJubilacionPorId(tipoJubilacion.tipjubCodigo).subscribe({
            next: (response) => {
              this.listarTipoJubilacion();
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
  get tipjubNombreField() {
    return this.formTipoJubilacion.get('tipjubNombre');
  }

}

