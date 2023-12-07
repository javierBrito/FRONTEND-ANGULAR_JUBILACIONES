import { MensajesService } from './../../../../auth/service/mensajes/mensajes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { JubTipoLey } from 'app/auth/models/JubTipoLey.model';
import { TipoLeyService } from './service/tipoLey/tipoLey.service';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

@Component({
  selector: 'app-tipoLey',
  templateUrl: './tipoLey.component.html',
  styleUrls: ['./tipoLey.component.scss']
})
export class TipoLeyComponent implements OnInit {
  @ViewChild("modal_form_registro", { static: false }) modal_form_registro;
  public modalOption: NgbModalOptions = {};

  /*LISTAS*/
  public listaTipoLey: JubTipoLey[];
  public listaDesEstado: any;

  /*Formulario*/
  public formTipoLey: FormGroup;

  /*SPINNER*/
  public loadTipoLey: boolean;

  /*Variables*/
  public botonModal: string;

  // Mapear modelos
  public jubTipoLey: JubTipoLey;

  /*PAGINACION*/
  public page: number;
  public itemsRegistros: number;

  constructor(
    private modalService: NgbModal,
    private tipoLeyService: TipoLeyService,
    private formBuilder: FormBuilder,
    private mensajes: MensajesService
  ) {
    this.listaDesEstado = [{ "codigo": 1, "descripcion": "Activo" }, { "codigo": 0, "descripcion": "Inactivo" }];

    this.itemsRegistros = 5;
    this.page = 1;

    this.loadTipoLey = true;
    this.botonModal = '';
    this.formTipoLey = this.formBuilder.group({
      //tipleyNombre: new FormControl('', Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
      tipleyNombre: new FormControl('', Validators.required),
      tipleyFecha: new FormControl('', Validators.required),
    });
    this.modalOption = {
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    this.listaTipoLey = [];
  }

  ngOnInit() {
    this.listarTipoLey();
  }

  listarTipoLey(): void {
    this.loadTipoLey = false;
    this.tipoLeyService.listarTipoLey().subscribe(
      respuesta => {
        this.listaTipoLey = respuesta['listado'];
        for (const registro of this.listaTipoLey) {
          registro.tipleyFecha = dayjs(registro.tipleyFecha).format("YYYY-MM-DD");
          for (var i = 0; i < this.listaDesEstado.length; i++) {
            if (this.listaDesEstado[i].codigo == registro.tipleyEstado) {
              registro.desEstado = this.listaDesEstado[i];
            }
          }
        }
        if (this.listaTipoLey.length < this.itemsRegistros) {
          this.page = 1;
        }

        setTimeout(() => {
          this.loadTipoLey = true;
        }, 1000);
      }
    )
  }

  nuevoTipoLey(): void {
    this.resetTheForm();
    this.botonModal = 'Guardar';
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Guardar registro
        let item: any = {
          tipleyNombre: this.formTipoLey.value.tipleyNombre,
          tipleyFecha: dayjs(this.formTipoLey.value.tipleyFecha).format("YYYY-MM-DD HH:mm:ss.SSS"),
          tipleyEstado: 1
        }
        this.tipoLeyService.guardarTipoLey(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Añadir', 'Se ha añadido el registro');
          this.listarTipoLey();
        });
        this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
    }).catch(() => { });
    console.log("Guardar 3");
  }

  resetTheForm(): void {
    this.formTipoLey.reset({
      tipleyCodigo: { value: '', disabled: false },
      tipleyNombre: { value: '', disabled: false },
    });
  }

  editarTipoLey(jubTipoLey) {
    this.resetTheForm();
    this.botonModal = 'Actualizar';
    this.formTipoLey = this.formBuilder.group({
      tipleyCodigo: new FormControl(jubTipoLey.tipleyCodigo, Validators.required),
      tipleyFecha: new FormControl(dayjs(jubTipoLey.tipleyFecha).format("YYYY-MM-DD")),
      //tipleyNombre: new FormControl(jubTipoLey.tipleyNombre, Validators.compose([Validators.pattern('[a-zA-Z\u00C0-\u017F ]*'), Validators.required])),
      tipleyNombre: new FormControl(jubTipoLey.tipleyNombre, Validators.required),
    });
    this.modalService.open(this.modal_form_registro, this.modalOption).result.then(result => {
      if (result === "yes") {
        // Actualizar registro
        let item: any = {
          tipleyCodigo: jubTipoLey.tipleyCodigo,
          tipleyNombre: this.formTipoLey.value.tipleyNombre,
          tipleyFecha: dayjs(this.formTipoLey.value.tipleyFecha).format("YYYY-MM-DD HH:mm:ss.SSS"),
          tipleyEstado: 1
        }
        this.tipoLeyService.guardarTipoLey(item).subscribe(() => {
          this.mensajes.mensajeCorrecto('Actualizar', 'Se ha actualizado el registro');
          this.listarTipoLey();
        });
        //this.resetTheForm();
      } else {
        console.log("Cancelamos");
      }
      this.modalService.dismissAll(this.modal_form_registro);
    }).catch(() => { });
  }

  eliminarTipoLey(jubTipoLey) {
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
          this.tipoLeyService.eliminarTipoLeyPorId(jubTipoLey.tipleyCodigo).subscribe({
            next: (response) => {
              this.listarTipoLey();
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
  get tipleyNombreField() {
    return this.formTipoLey.get('tipleyNombre');
  }
  get tipleyFechaField() {
    return this.formTipoLey.get('tipleyFecha');
  }

}

