import { GestionIgTbFactNominaService } from './../../../auth/service/IgTbFactNomina/gestionIgTbFactNomina.service';
import { IgTbFactNomina } from './../../../auth/models/igTbFactNomina.model';
import { MspDiscapacidad } from './../../../auth/models/mspDiscapacidad.model';
import { MineducMdtImpedimento } from './../../../auth/models/mineducMdtImpedimento.model';
import { GestionSgdVwPersonaDTOService } from './../../../auth/service/sgdVwPersonaDTO/gestionSgdVwPersonaDTO.service';
import { GestionMvCeduladoMeducacionService } from './../../../auth/service/mvCeduladoMeducacion/gestionMvCeduladoMeducacion.service';
import { Component, OnInit } from '@angular/core';
import { MvCeduladoMeducacion } from 'app/auth/models/mvCeduladoMeducacion.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SgdVwPersonaDTO } from '../../../auth/models/sgdVwPersonaDTO';
import { MensajesService } from 'app/auth/service/mensajes/mensajes.service';
import { JubAspirante } from 'app/auth/models/JubAspirante';
import { CatDistrito } from 'app/auth/models/CatDistrito.model';
import { MyValidators } from 'app/utils/validators';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'app/auth/service';
import { ServicioExterno } from 'app/auth/models/ServicioExterno.model';
import { ExternoService } from 'app/auth/service/Externo/Externo.service';
import { JubTipoDiscapacidad } from 'app/auth/models/JubTipoDiscapacidad.model';
import { TipoDiscapacidadService } from '../admin/tipoDiscapacidad/service/tipoDiscapacidad/tipoDiscapacidad.service';
import { User } from 'app/auth/models';
import { TipoJubilacionService } from '../admin/tipoJubilacion/service/tipoJubilacion/tipoJubilacion.service';
import { ParametroService } from '../admin/parametro/service/parametro/parametro.service';
import { JubTipoJubilacion } from 'app/auth/models/JubTipoJubilacion.model';
import { JubParametro } from 'app/auth/models/JubParametro.model';
import { ReporteDTO } from 'app/auth/models/ReporteDTO.model';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { JubEod } from 'app/auth/models/JubEod.model';
import { TipoLeyService } from '../admin/tipoLey/service/tipoLey/tipoLey.service';
import dayjs from "dayjs";
import { JubTipoEstado } from 'app/auth/models/JubTipoEstado.model';
import { JubEstadoTramite } from 'app/auth/models/JubEstadoTramite.model';
import { TipoEstadoService } from '../admin/tipoEstado/service/tipoEstado/tipoEstado.service';
import { AspiranteService } from '../inscripcion/service/aspirante/aspirante.service';

@Component({
  selector: 'app-estadoTramite',
  templateUrl: './estadoTramite.component.html',
  styleUrls: ['./estadoTramite.component.scss']
})
export class EstadoTramiteComponent implements OnInit {
  // Mapear modelos
  public usuario: MvCeduladoMeducacion;
  public docente: SgdVwPersonaDTO;
  public cedulaAbuscar: string;
  public impedimento: MineducMdtImpedimento;
  public discapacidad: MspDiscapacidad;
  public nomina: IgTbFactNomina;
  public jubAspirante: JubAspirante;
  public aportesIess: ServicioExterno;
  public jubTipoDiscapacidad: JubTipoDiscapacidad;
  public currentUser: User;
  public reporteDTO: ReporteDTO;
  public jubEod: JubEod;
  public jubTipoEstado: JubTipoEstado;
  public jubEstadoTramite: JubEstadoTramite;

  /*Formulario*/
  public formEstadoTramite: FormGroup;
  public formEstadoTramiteCedula: FormGroup;

  /*SPINNER*/
  public loadDatos: boolean;

  /*Variables*/
  public tipdisCodigo: number;
  public tipdisPorcentaje: number;
  public aspImpedimento: number;
  public existeEstadoTramite: boolean;
  public aspNomImpedimento: string;
  public tipdisNomDiscapacidad: string;
  public aspAportacionesPub: number;
  public tipjubNombre: string;
  public tieneImpedimento: string;
  public verificarDocente: string;
  public tieneInvalidez: boolean;
  public parCodigo: number;
  public prefijoReporte: string;
  public desDiscapacidad: string;
  public numMinAportaciones240: number;
  public numMinAportaciones300: number;
  public edad: number;
  public tipestNombre: string;
  public visibleEstadoTramite: boolean;
  public visibleBotonEstadoTramite: boolean;

  /*Listas*/
  public listaDistrito: CatDistrito[] = [];
  public listaDiscapacidad: JubTipoDiscapacidad[] = [];
  public listaTipoJubilacion: JubTipoJubilacion[] = [];
  public listaParametro: JubParametro[] = [];
  public listaEstadoTramite: JubEstadoTramite[] = [];
  public listaTipoEstado: JubTipoEstado[] = [];
  public listaTipoEstadoAux: JubTipoEstado[] = [];

  constructor(
    private adminMvCeduladoMeducacion: GestionMvCeduladoMeducacionService,
    private adminSgdVwPersonaDTO: GestionSgdVwPersonaDTOService,
    private adminIgTbFactNomina: GestionIgTbFactNominaService,
    private servicioExterno: ExternoService,
    private formBuilder: FormBuilder,
    private mensaje: MensajesService,
    private aspiranteServicio: AspiranteService,
    private autenticacion: AuthenticationService,
    private tipoDiscapacidadServicio: TipoDiscapacidadService,
    private tipoJubilacionServicio: TipoJubilacionService,
    private tipoLeyServicio: TipoLeyService,
    private parametroServicio: ParametroService,
    private tipoEstadoServicio: TipoEstadoService,
  ) {
    // Inicio - Para acceder directamente a la página de inscripción
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser == null) {
      this.iniciarSesion();
    };
    // Fin - Para acceder directamente a la página de inscripción
  }

  ngOnInit() {
    this.tipdisCodigo = 0;
    this.tipdisPorcentaje = 0;
    this.aspImpedimento = 0;
    this.usuario = null;
    this.docente = null;
    this.impedimento = null;
    this.discapacidad = null;
    this.nomina = null;
    this.aportesIess = null;
    this.cedulaAbuscar = '';
    this.loadDatos = true;
    this.aspNomImpedimento = "NO TIENE IMPEDIMENTO";
    this.tipdisNomDiscapacidad = "";
    this.tieneInvalidez = false;
    this.parCodigo = 0;
    this.reporteDTO = null;
    this.prefijoReporte = "estadoTramite_cedula_";
    this.desDiscapacidad = "INTELECTUAL";
    this.numMinAportaciones240 = 240;
    this.numMinAportaciones300 = 300;
    this.jubEod = null;
    this.edad = 0;
    this.tipestNombre = "INSCRIPCION";
    this.visibleEstadoTramite = true;
    this.visibleBotonEstadoTramite = true;

    this.formEstadoTramiteCedula = this.formBuilder.group({
      cedulaAbuscar: new FormControl('', Validators.compose([
        MyValidators.isCedulaValid,
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$"),
      ])),
      estadoTramite: new FormControl('')
    })
    this.formEstadoTramite = this.formBuilder.group({
      nombre: new FormControl(''),
      fechaNacimiento: new FormControl(''),
      edad: new FormControl(''),
      genero: new FormControl(''),
      aspAportacionesPub: new FormControl(''),
      zona: new FormControl(''),
      provincia: new FormControl(''),
      distrito: new FormControl(''),
      canton: new FormControl(''),
      unidadEducativa: new FormControl(''),
      aspNomImpedimento: new FormControl(''),
      tipdisNomDiscapacidadVer: new FormControl(''),
      aspNomRegimenLab: new FormControl(''),
      partIndividual: new FormControl(''),
      aspNomModalidadCon: new FormControl(''),
      partGeneral: new FormControl(''),
      tipjubNombre: new FormControl(''),
      aspCorreo: new FormControl({ value: '', disabled: true }, Validators.compose([
        Validators.required,
        Validators.email])),
      aspTelefono: new FormControl({ value: '', disabled: true }, Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$"),
      ])),
      aspDireccion: new FormControl({ value: '', disabled: true }, Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])),
    })
  }

  // Inicio - Para acceder directamente a la página de inscripción
  // Crear usuario para acceso directo a la página de inscripción
  iniciarSesion() {
    this.autenticacion.login('1004298020', 'Jayllidlt1997.').subscribe(
      (respuesta) => {
        console.log("respuesta = " + respuesta);
      }
    );
  }
  // Fin - Para acceder directamente a la página de inscripción

  listarDistrito() {
    this.adminSgdVwPersonaDTO.listarDistrito().subscribe(
      (respuesta) => {
        this.listaDistrito = respuesta['listado'];
      }
    );
  }

  listarJubTipoDiscapacidad() {
    this.tipoDiscapacidadServicio.listarTipoDiscapacidad().subscribe(
      (respuesta) => {
        this.listaDiscapacidad = respuesta['listado'];
      }
    );
  }

  listarJubTipoJubilacion() {
    this.tipoJubilacionServicio.listarTipoJubilacion().subscribe(
      (respuesta) => {
        this.listaTipoJubilacion = respuesta['listado'];
      }
    );
  }

  listarTipoEstado() {
    this.tipoEstadoServicio.listarTipoEstado().subscribe(
      (respuesta) => {
        this.listaTipoEstado = respuesta['listado'];
        this.listaTipoEstado.sort((firstItem, secondItem) => firstItem.tipestCodigo - secondItem.tipestCodigo);
      }
    );
  }

  listarJubParametro() {
    this.parametroServicio.listarParametro().subscribe(
      (respuesta) => {
        this.listaParametro = respuesta['listado'];
        for (const registro of this.listaParametro) {
          this.tipoJubilacionServicio.buscarTipoJubilacionPorId(registro.tipjubCodigo ?? 0).subscribe(
            (respuesta) => {
              registro.jubTipoJubilacion = respuesta['objeto']
            })
          this.tipoDiscapacidadServicio.buscarTipoDiscapacidadPorId(registro.tipdisCodigo ?? 0).subscribe(
            (respuesta) => {
              registro.jubTipoDiscapacidad = respuesta['objeto']
            })
          this.tipoLeyServicio.buscarTipoLeyPorId(registro.tipleyCodigo ?? 0).subscribe(
            (respuesta) => {
              registro.jubTipoLey = respuesta['objeto']
            })
        }
      }
    );
  }

  buscarCedula = async () => {
    this.visibleEstadoTramite = true;
    this.visibleBotonEstadoTramite = true;
    this.loadDatos = false;
    this.aspAportacionesPub = 0;
    // Verificar si tiene invalidez
    this.tieneInvalidez = false;
    // Inicializar todos los valores del html
    this.resetTheForm();

    // Listar todos los distritos, para obtener el nemonico
    this.listarDistrito();
    // Listar toda las tabla de discapacidades, para obtener el codigo
    this.listarJubTipoDiscapacidad();
    // Listar toda la tabla de tipo jubilacion
    this.listarJubTipoJubilacion();
    // Listar toda la tabla de tipo jubilacion
    this.listarTipoEstado();
    // Listar toda la tabla de parametro
    this.listarJubParametro();

    // Receptar la identificación de formEstadoTramiteCedula.value
    let estadoTramiteCedulaTemp = this.formEstadoTramiteCedula.value;
    this.cedulaAbuscar = estadoTramiteCedulaTemp.cedulaAbuscar;

    // Verificar si el aspírante ya esta inscrito jbrito-20230330
    await this.verificarEstadoTramite();

    // Obtener usuario
    await this.obtenerUsuario();
    /*
    // Obtener docente
    await this.obtenerDocente();
    // Obtener nomina
    await this.obtenerNomina();
    // Obtener aportesIess
    await this.obtenerAportesIess();
    // Obtener Impedimento
    await this.obtenerImpedimento();
    // Obtener Discapacidad
    await this.obtenerDiscapacidad();
    */
    setTimeout(() => {
      this.loadDatos = true;
    }, 1000);
  }

  verificarEstadoTramite() {
    this.jubAspirante = null;
    return new Promise((resolve, rejects) => {
      this.aspiranteServicio.buscarAspirantePorCedula(this.cedulaAbuscar).subscribe({
        next: (respuesta) => {
          this.jubAspirante = respuesta['objeto']

          if (this.jubAspirante != null) {
            // Obtener la lista de Estado Tramite del aspirante
            console.log("this.jubAspirante.listaEstadoTramite.length = " + this.jubAspirante.listaEstadoTramite.length);
            if (this.jubAspirante.listaEstadoTramite[0] != null) {
              // Obtener el indice del estado del tramite actual
              let indiceActual = this.jubAspirante.listaEstadoTramite.length - 1;
              this.listaEstadoTramite = this.jubAspirante.listaEstadoTramite;
              this.visibleEstadoTramite = false;
              if (indiceActual > 0) {
                this.visibleBotonEstadoTramite = true;
              } else {
                this.visibleBotonEstadoTramite = false;
              }
              this.jubEstadoTramite = this.jubAspirante.listaEstadoTramite[indiceActual];
              this.formEstadoTramiteCedula.controls.estadoTramite.setValue(this.jubEstadoTramite.jubTipoEstado.tipestNombre + " / " + dayjs(this.jubEstadoTramite.esttraFecha).format("YYYY-MM-DD HH:mm:ss.SSS"));

              // Para obtener el estado del trámite y su fecha
              for (const registro of this.listaTipoEstado) {
                // Se utiliza el campo tipestEstado para manejo del check
                registro.tipestEstado = 0;
                for (const registro1 of this.listaEstadoTramite) {
                  if (registro.tipestCodigo == registro1.jubTipoEstado.tipestCodigo) {
                    // Se utiliza el campo tipestEstado para manejo del check
                    registro.tipestEstado = 1;
                    registro.tipestNombre = registro.tipestNombre + " / " + registro1.esttraFecha;
                    break;
                  }
                }
                console.log("registro.tipestNombre Despues " + registro.tipestNombre);
              }
            }

            this.existeEstadoTramite = true;
            this.formEstadoTramite.controls.aspCorreo.setValue(this.jubAspirante.aspCorreo);
            this.formEstadoTramite.controls.aspTelefono.setValue(this.jubAspirante.aspTelefono);
            this.formEstadoTramite.controls.aspDireccion.setValue(this.jubAspirante.aspDireccion);
            this.formEstadoTramite.controls.aspNomRegimenLab.setValue(this.jubAspirante.aspNomRegimenLab);
            this.formEstadoTramite.controls.aspNomModalidadCon.setValue(this.jubAspirante.aspNomModalidadCon);
            this.formEstadoTramite.controls.aspNomImpedimento.setValue(this.jubAspirante.aspNomImpedimento);
            this.formEstadoTramite.controls.tipdisNomDiscapacidadVer.setValue(this.obtenerDesDiscapacidad(this.jubAspirante.tipdisNomDiscapacidad, this.jubAspirante.tipdisPorcentaje));
            this.formEstadoTramite.controls.aspAportacionesPub.setValue(this.jubAspirante.aspAportacionesPub);
            this.formEstadoTramite.controls.tipjubNombre.setValue(this.jubAspirante.tipjubNomJubilacion);
            this.formEstadoTramite.controls.partIndividual.setValue(this.jubAspirante.aspPartidaInd);
            this.formEstadoTramite.controls.partGeneral.setValue(this.jubAspirante.aspPartidaGen);
          } else {
            this.existeEstadoTramite = false;
            this.mensaje.mensajeAdvertencia('Advertencia', 'El aspirante, no se encuentra inscrito...');
          }
          resolve(respuesta);
        }, error: (error) => {
          this.mensaje.mensajeError('Error al traer el servicio. Inscripción', ' Error = ' + error)
          rejects("Error");
        }
      })
    })
  }

  obtenerUsuario() {
    this.usuario = null;
    return new Promise((resolve, rejects) => {
      let datosBusqueda = {
        usuario: "Dinardap",
        cedula: this.cedulaAbuscar,
        clave: "M1n3DUC2022*",
      }
      this.adminMvCeduladoMeducacion.buscarPorCedula(datosBusqueda).subscribe({
        next: (respuesta) => {
          this.usuario = respuesta
          if (this.usuario != null) {
            // Datos usuario
            this.formEstadoTramite.controls.nombre.setValue(this.usuario[0].nombres)
            this.formEstadoTramite.controls.fechaNacimiento.setValue(this.usuario[0].fechaNacimiento);
            this.formEstadoTramite.controls.edad.setValue(this.calcularEdad());
            this.formEstadoTramite.controls.genero.setValue(this.obtenerGenero(this.usuario[0].codSexo));
          } else {
            this.mensaje.mensajeAdvertencia('Advertencia', 'Inconvenientes al obtener el usuario, intente más tarde...');
          }
          resolve(respuesta);
        }, error: (error) => {
          this.mensaje.mensajeError('Error al traer el servicio. Usuario', ' Error = ' + error)
          rejects("Error");
        }
      })
    })
  }

  obtenerDocente() {
    this.docente = null;
    return new Promise((resolve, rejects) => {
      this.adminSgdVwPersonaDTO.buscarPorCedulaDocente(this.cedulaAbuscar).subscribe({
        next: (respuesta) => {
          this.docente = respuesta['listado'];
          console.log("this.docente = ", this.docente["length"]);
          // Obtener datos de Docente, si lo tiene
          if (this.docente != null) {
            this.verificarDocente = this.docente[0]?.cedula ?? "NoDocente";
            // Datos docente
            if (this.verificarDocente === "NoDocente" && !this.existeEstadoTramite) {
              this.mensaje.mensajeError("Error", "El usuario " + this.usuario[0].nombres + ", no es docente activo.")
            } else {
              this.formEstadoTramite.controls.zona.setValue(this.docente[0]?.codZona);
              this.formEstadoTramite.controls.provincia.setValue(this.docente[0]?.nomProvincia);
              this.formEstadoTramite.controls.distrito.setValue(this.obtenerCodigoDistrito(this.docente[0]?.nomDistrito) + ' - ' + this.docente[0]?.nomDistrito);
              this.formEstadoTramite.controls.canton.setValue(this.docente[0]?.nomCanton);
              this.formEstadoTramite.controls.unidadEducativa.setValue(this.docente[0]?.amie + ' - ' + this.docente[0]?.nomInstitucion);
              if (!this.existeEstadoTramite) {
                this.formEstadoTramite.controls.aspCorreo.setValue(this.docente[0].correo);
                this.formEstadoTramite.controls.aspTelefono.setValue(this.docente[0].celular);
                this.formEstadoTramite.controls.aspDireccion.setValue(this.obtenerDireccion());
                this.formEstadoTramite.controls['aspCorreo'].enable();
                this.formEstadoTramite.controls['aspTelefono'].enable();
                this.formEstadoTramite.controls['aspDireccion'].enable();
              }
            }
          }
          resolve(respuesta);
        }, error: (error) => {
          this.mensaje.mensajeError('Error al traer el servicio. Docente', ' Error = ' + error)
          rejects("Error");
        }
      })
    })
  }

  obtenerNomina() {
    this.nomina = null;
    return new Promise((resolve, rejects) => {
      this.adminIgTbFactNomina.buscarNominaPorCI(this.cedulaAbuscar).subscribe({
        next: (respuesta) => {
          this.nomina = respuesta['objeto'];
          console.log("this.nomina = ", this.nomina);
          if (this.nomina != null) {
            this.formEstadoTramite.controls.partIndividual.setValue(this.nomina.partidaIndividual);
            this.formEstadoTramite.controls.partGeneral.setValue(this.nomina.enlaceEstructuraProgramatica);
            this.formEstadoTramite.controls.aspNomRegimenLab.setValue(this.nomina.nombreRegimenLaboral);
            this.formEstadoTramite.controls.aspNomModalidadCon.setValue(this.nomina.nombreModalidadLaboral);
            if (!this.existeEstadoTramite) {
              this.formEstadoTramite.controls['aspCorreo'].enable();
              this.formEstadoTramite.controls['aspTelefono'].enable();
              this.formEstadoTramite.controls['aspDireccion'].enable();
            }
            // Obtener datos de EOD
            if (this.docente["length"] == 0) {
              this.buscarEod(1);
            }
          } else {
            this.mensaje.mensajeError("Error", "El usuario " + this.usuario[0].nombres + ", no se encuentra en nomina.")
          }
          resolve(respuesta);
        }, error: (error) => {
          this.mensaje.mensajeError('Error al traer el servicio. Nomina', ' Error = ' + error)
          rejects("Error");
        }
      })
    })
  }

  buscarEod(eopCodigo: number) {
    this.aspiranteServicio.buscarEodPorCodigo(eopCodigo).subscribe({
      next: (response) => {
        this.jubEod = response["objeto"];
        if (this.jubEod != null) {
          this.formEstadoTramite.controls.zona.setValue(this.jubEod.eodZona);
          this.formEstadoTramite.controls.provincia.setValue(this.jubEod.eodProvincia);
          this.formEstadoTramite.controls.distrito.setValue(this.jubEod.eodSubseCoorZona);
          this.formEstadoTramite.controls.canton.setValue(this.jubEod.eodCanton);
          this.formEstadoTramite.controls.unidadEducativa.setValue(this.jubEod.eodNombre);
        }
      },
      error: (error) => {
        console.log("Error: " + error);
      }
    });

  }

  obtenerAportesIess() {
    this.aportesIess = null;
    return new Promise((resolve, rejects) => {
      this.servicioExterno.buscarAportesIessPorCedula(this.cedulaAbuscar).subscribe({
        next: (respuesta) => {
          this.aportesIess = respuesta;
          console.log("this.aportesIess = ", this.aportesIess)
          if (!this.existeEstadoTramite) {
            if (this.aportesIess != null) {
              // Datos aportesIess
              this.aspAportacionesPub = this.aportesIess[4]?.filas.fila[7].columnas.columna[0]?.valor;
              this.formEstadoTramite.controls.aspAportacionesPub.setValue(this.aspAportacionesPub);
            } else {
              this.mensaje.mensajeAdvertencia('Advertencia', 'Inconvenientes al obtener los aportes del IESS, intente más tarde...');
            }
          }
          resolve(respuesta);
        }, error: (error) => {
          this.mensaje.mensajeError('Error al traer el servicio. AportesIess', ' Error = ' + error)
          rejects("Error");
        }
      })
    })
  }

  obtenerImpedimento() {
    this.impedimento = null;
    return new Promise((resolve, rejects) => {
      this.servicioExterno.buscarImpedimentoMdtCI(this.cedulaAbuscar).subscribe({
        next: (respuesta) => {
          this.impedimento = respuesta;
          console.log("this.impedimento = ", this.impedimento);
          // Obtener datos de Impedimento, si lo tiene
          if (this.impedimento != null) {
            this.tieneImpedimento = this.obtenerDesImpedimento(this.impedimento);
            this.formEstadoTramite.controls.aspNomImpedimento.setValue(this.aspNomImpedimento);
            if (this.tieneImpedimento === "SI TIENE IMPEDIMENTO" && !this.existeEstadoTramite) {
              this.mensaje.mensajeError("Error", "El usuario " + this.usuario[0].nombres + ", tiene impedimento => " + this.aspNomImpedimento)
              this.formEstadoTramite.controls['aspCorreo'].disable();
              this.formEstadoTramite.controls['aspTelefono'].disable();
              this.formEstadoTramite.controls['aspDireccion'].disable();
            }
          }
          resolve(respuesta);
        }, error: (error) => {
          this.mensaje.mensajeError('Error al traer el servicio. Impedimento', ' Error = ' + error)
          rejects("Error");
        }
      })
    })
  }

  obtenerDiscapacidad() {
    this.discapacidad = null;
    return new Promise((resolve, rejects) => {
      this.servicioExterno.buscarDiscapacidadMdtCI(this.cedulaAbuscar).subscribe({
        next: (respuesta) => {
          this.discapacidad = respuesta;
          // Obtener datos de Discapacidad, si lo tiene
          if (this.discapacidad != null) {
            this.tipdisNomDiscapacidad = this.discapacidad[0].filas.fila[0].columnas.columna[2].valor;
            this.tipdisPorcentaje = this.discapacidad[0].filas.fila[0].columnas.columna[4].valor;
            this.formEstadoTramite.controls.tipdisNomDiscapacidadVer.setValue(this.obtenerDesDiscapacidad(this.tipdisNomDiscapacidad, this.tipdisPorcentaje));
            // Verificar si tiene discapacidad
            if (this.tipdisNomDiscapacidad != "") {
              this.obtenerCodigoDiscapacidad(this.tipdisNomDiscapacidad);
            }
          }
          resolve(respuesta);
        }, error: (error) => {
          this.mensaje.mensajeError('Error al traer el servicio. Discapacidad', ' Error = ' + error)
          rejects("Error");
        }
      })
    })
  }

  obtenerParametroJubilacion() {
    this.tipjubNombre = "";
    for (const registro of this.listaParametro) {
      registro.tipdisCodigo = registro.tipdisCodigo ?? 0;
      // Voluntaria Primera (360 aportes) y Segunda (180 aportes)
      if (registro.parEdadMin != 0 && registro.parEdadMax != 0 && !this.tieneInvalidez &&
        registro.parMinAportaciones <= this.aspAportacionesPub &&
        registro.parEdadMin <= this.edad && registro.tipdisCodigo == 0 &&
        registro.parEdadMax >= this.edad && this.tipdisCodigo == 0) {
        this.parCodigo = registro.parCodigo;
        this.tipjubNombre = registro.jubTipoJubilacion?.tipjubNombre + " / " + registro.jubTipoLey?.tipleyNombre;
        break;
      }
      // Voluntaria Tercera 480 aportes
      if (registro.parEdadMin == 0 && registro.parEdadMax == 0 && !this.tieneInvalidez &&
        registro.parMinAportaciones <= this.aspAportacionesPub && registro.parMinAportaciones == 480) {
        this.parCodigo = registro.parCodigo;
        this.tipjubNombre = registro.jubTipoJubilacion?.tipjubNombre + " / " + registro.jubTipoLey?.tipleyNombre;
        break;
      }
      // Discapacidad Primera (240 aportes) y Segunda (300 aportes)
      if (registro.tipdisCodigo != 0 && this.tipdisCodigo != 0 && !this.tieneInvalidez &&
        registro.parEdadMin == 0 && registro.parEdadMax == 0 &&
        registro.parMinAportaciones <= this.aspAportacionesPub &&
        registro.tipdisPorcentaje <= this.tipdisPorcentaje) {
        if (registro.jubTipoDiscapacidad.tipdisNombre == this.tipdisNomDiscapacidad &&
          registro.jubTipoDiscapacidad.tipdisNombre == this.desDiscapacidad) {
          if (registro.parMinAportaciones == this.numMinAportaciones240) {
            this.parCodigo = registro.parCodigo;
            this.tipjubNombre = registro.jubTipoJubilacion?.tipjubNombre + " / " + registro.jubTipoLey?.tipleyNombre;
            break;
          }
        } else {
          if (registro.parMinAportaciones == this.numMinAportaciones300) {
            this.parCodigo = registro.parCodigo;
            this.tipjubNombre = registro.jubTipoJubilacion?.tipjubNombre + " / " + registro.jubTipoLey?.tipleyNombre;
            break;
          }
        }
      }
      // Invalidez 60 aportes
      if (registro.parEdadMin == 0 && registro.parEdadMax == 0 && this.tieneInvalidez &&
        registro.parMinAportaciones <= this.aspAportacionesPub) {
        this.parCodigo = registro.parCodigo;
        this.tipjubNombre = registro.jubTipoJubilacion?.tipjubNombre + " / " + registro.jubTipoLey?.tipleyNombre;
        break;
      }
      // Validar Obligatoria 70 años
      if (registro.parEdadMin != 0 && registro.parEdadMax == 0 && !this.tieneInvalidez &&
        registro.parEdadMin <= this.edad &&
        registro.parMinAportaciones <= this.aspAportacionesPub) {
        this.parCodigo = registro.parCodigo;
        this.tipjubNombre = registro.jubTipoJubilacion?.tipjubNombre + " / " + registro.jubTipoLey?.tipleyNombre;
        break;
      }
    }
  }

  confirmarEliminar() {
    if (this.formEstadoTramite.controls.aspCorreo.value == null ||
      this.formEstadoTramite.controls.aspTelefono.value == null ||
      this.formEstadoTramite.controls.aspDireccion.value == null) {
      this.mensaje.mensajeError('Error: ', 'Ingrese datos de: Correo electrónico, Teléfono y Dirección ...');
    } else {
      Swal
        .fire({
          title: "Continuar Eliminar Inscripción",
          text: "¿Quiere eliminar la inscripción?'",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        })
        .then(async resultado => {
          if (resultado.isConfirmed) {
            //Swal.fire('Saved!', '', 'success')
            this.eliminar();
          } else if (resultado.isDismissed) {
            //Swal.fire('Changes are not saved', '', 'info')
          }
        });
    }
  }

  eliminar() {
    console.log("ELIMINANDO....", this.formEstadoTramite.value);
    //this.obtenerCodigoDiscapacidad(this.tipdisNomDiscapacidad);
    this.aspiranteServicio.eliminarAspirantePorId(this.jubAspirante.aspCodigo).subscribe({
      next: async (response) => {
        this.visibleEstadoTramite = false;
        this.visibleBotonEstadoTramite = false;
        this.mensaje.mensajeCorrecto('Correcto', 'Se ha eliminado la inscripción correctamente...');
      },
      error: (error) => {
        this.mensaje.mensajeError('Error', 'Ha habido un problema al eliminar la inscripción...');
      }
    });
  }

  resetTheForm(): void {
    this.formEstadoTramite.reset();
  }

  obtenerDesDiscapacidad(tipdisNomDiscapacidad: any, tipdisPorcentaje: any): string {
    if (tipdisNomDiscapacidad && tipdisPorcentaje !== '') {
      return tipdisNomDiscapacidad + " - " + tipdisPorcentaje + " %";
    } else {
      return 'NO TIENE DISCAPACIDAD';
    }
  }

  obtenerDesImpedimento(impedimento: any): string {
    if (impedimento[1].filas.fila[0]?.columnas?.columna[1].valor === undefined) {
      this.aspNomImpedimento = 'NO TIENE IMPEDIMENTO';
      return 'NO TIENE IMPEDIMENTO';
    } else {
      this.aspImpedimento = 1;
      this.aspNomImpedimento = impedimento[1].filas.fila[0]?.columnas?.columna[1].valor + " - " + this.impedimento[1].filas.fila[0]?.columnas?.columna[0].valor;
      return 'SI TIENE IMPEDIMENTO';
    }
  }

  obtenerDireccion(): string {
    if (this.docente[0].direccion == null) {
      return 'N/D';
    } else {
      return this.docente[0].direccion;
    }
  }

  obtenerGenero(genCodigo: number): string {
    if (genCodigo === 1) {
      return "Masculino";
    } else {
      return "Femenino";
    }
  }

  obtenerCodigoDistrito(disDescripcion: string): string {
    let disCodAd: string = "";
    for (const registro of this.listaDistrito) {
      if (registro.disDescripcion == disDescripcion) {
        disCodAd = registro.disCodAd;
      }
    }
    if (disCodAd === "") {
      disCodAd = "N/D";
    }

    return disCodAd;
  }

  obtenerCodigoDiscapacidad(disDescripcion: string) {
    this.tipdisCodigo = 0;
    for (const registro of this.listaDiscapacidad) {
      if (registro.tipdisNombre == disDescripcion) {
        this.tipdisCodigo = registro.tipdisCodigo;
      }
    }
  }

  calcularEdad(): number {
    let fechaNacimiento: any = new Date(this.usuario[0].fechaNacimiento);
    if (this.usuario[0].fechaNacimiento) {
      this.edad = ~~((Date.now() - fechaNacimiento || Date.now()) / (24 * 3600 * 365.25 * 1000));
    } else {
      this.edad = 0;
    }

    return this.edad;
  }

  // Contar los caracteres de la cedula para activar boton <Buscar>
  onKey(event) {
    if (event.target.value.length != 10) {
      this.resetTheForm();
      this.visibleEstadoTramite = true;
      this.visibleBotonEstadoTramite = true;
    }
  }

  validateFormat(event) {
    let key;
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      key = event.keyCode;
      key = String.fromCharCode(key);
    }

    const regex = /[0-9]/;

    if (!regex.test(key)) {
      event.returnValue = false;
      if (event.preventDefault) {
        event.preventDefault();
      }
    }
  }

  imprimirPDF() {
    this.reporteDTO = new ReporteDTO({
      cedula: this.cedulaAbuscar,
      apellidoNombre: this.usuario[0].nombres,
      fechaNacimiento: this.usuario[0].fechaNacimiento,
      edad: this.edad,
    });
    this.aspiranteServicio.generarArchivoPDF(this.reporteDTO['data']).subscribe({
      next: (respuesta) => {
        this.resportProgress(respuesta, this.prefijoReporte + this.cedulaAbuscar);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>, nombreArchivo: string): void {
    switch (httpEvent.type) {
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          //for (const filename of httpEvent.body) {
          //}
        } else {
          saveAs(new Blob([httpEvent.body!],
            { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8` }),
            nombreArchivo);
        }
        this.fileStatus.status = 'done';
        break;
      default:
        break;
    }
  }
  fileStatus = { status: '', requestType: '', percent: 0 };

  enviarCorreo() {
    this.reporteDTO = new ReporteDTO({
      cedula: this.cedulaAbuscar,
      apellidoNombre: this.usuario[0].nombres,
      fechaNacimiento: this.usuario[0].fechaNacimiento,
      edad: this.edad,
      from: "transparenciame@educacion.gob.ec",
      nombreArchivo: "inscripcion_cedula_" + this.cedulaAbuscar + ".pdf",
      subject: "Inscripción para jubilación - INSJUB",
      text: "Estimad@ usuari@,<br><br>Nombre: " + this.usuario[0].nombres + "<br>Identificación: CED - " + this.cedulaAbuscar + "<br><br><b>Se adjunta el documento de inscripción para la jubilación.</b>",
      //to: "javier.brito@educacion.gob.ec"      
      to: this.jubAspirante.aspCorreo,
    });
    this.aspiranteServicio.enviarCorreo(this.reporteDTO['data']).subscribe({
      next: (respuesta) => {
        if (respuesta['codigoRespuesta'] == "Ok") {
          this.mensaje.mensajeCorrecto('Correcto', 'Se a enviado el correo a ' + this.reporteDTO['data'].to);
        } else {
          this.mensaje.mensajeError('Error: ', respuesta['mensaje']);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  /* Variables del html, para receptar datos y validaciones*/
  get cedulaAbuscarField() {
    return this.formEstadoTramiteCedula.get('cedulaAbuscar');
  }
  get aspCorreoField() {
    return this.formEstadoTramite.get('aspCorreo');
  }
  get aspDireccionField() {
    return this.formEstadoTramite.get('aspDireccion');
  }
  get aspTelefonoField() {
    return this.formEstadoTramite.get('aspTelefono');
  }
}
