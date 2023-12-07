import { IigTbFactNomina } from './../interfaces/IigTbFactNomina';
import { set, get } from 'lodash-es';
export class IgTbFactNomina implements IigTbFactNomina {
    constructor(data) {
        set(this, 'data', data);
    }
    get acumulaDecCuarto(): string {
        return get(this, 'data.acumulaDecCuarto');
    }
    get acumulaDecTercero(): string {
        return get(this, 'data.acumulaDecTercero');
    }
    get apellidosNombres(): string {
        return get(this, 'data.apellidosNombres');
    }
    get aporteIndividual(): number {
        return get(this, 'data.aporteIndividual');
    }
    get aporteIndividualAdi(): number {
        return get(this, 'data.aporteIndividualAdi');
    }
    get aportePatronal(): number {
        return get(this, 'data.aportePatronal');
    }
    get bonoGeografico(): string {
        return get(this, 'data.bonoGeografico');
    }
    get cesantiaFreserva(): number {
        return get(this, 'data.cesantiaFreserva');
    }
    get codigoActividadLaboral(): string {
        return get(this, 'data.codigoActividadLaboral');
    }
    get codigoRegimenLaboral(): string {
        return get(this, 'data.codigoRegimenLaboral');
    }
    get codigoDenominacionPuesto(): string {
        return get(this, 'data.codigoDenominacionPuesto');
    }
    get codigoEscalaOcupacional(): string {
        return get(this, 'data.codigoEscalaOcupacional');
    }
    get codigoEstadoPuesto(): string {
        return get(this, 'data.codigoEstadoPuesto');
    }
    get codigoEstadoServidor(): string {
        return get(this, 'data.codigoEstadoServidor');
    }
    get codigoInstitucion(): string {
        return get(this, 'data.codigoInstitucion');
    }
    get codigoModalidadLaboral(): string {
        return get(this, 'data.codigoModalidadLaboral');
    }
    get codigoNivelOcupacional(): string {
        return get(this, 'data.codigoNivelOcupacional');
    }
    get codigoSucursal(): string {
        return get(this, 'data.codigoSucursal');
    }
    get codigoUnidadOrganizacional(): string {
        return get(this, 'data.codigoUnidadOrganizacional');
    }
    get comisionServicio(): string {
        return get(this, 'data.comisionServicio');
    }
    get comisionServicioTipo(): string {
        return get(this, 'data.comisionServicioTipo');
    }
    get ejercicioFiscal(): number {
        return get(this, 'data.ejercicioFiscal');
    }
    get enlaceConcepto(): string {
        return get(this, 'data.enlaceConcepto');
    }
    get enlaceEstructuraProgramatica(): string {
        return get(this, 'data.enlaceEstructuraProgramatica');
    }
    get enlaceGrupo(): string {
        return get(this, 'data.enlaceGrupo');
    }
    get estructuraOrganica(): string {
        return get(this, 'data.estructuraOrganica');
    }
    get fechaFin(): Date {
        return get(this, 'data.fechaFin');
    }
    get fechaInicio(): Date {
        return get(this, 'data.fechaInicio');
    }
    get fechaNacimiento(): Date {
        return get(this, 'data.fechaNacimiento');
    }
    get fechaReporte(): Date {
        return get(this, 'data.fechaReporte');
    }
    get fondoReserva(): string {
        return get(this, 'data.fondoReserva');
    }
    get fuente(): string {
        return get(this, 'data.fuente');
    }
    get genero(): string {
        return get(this, 'data.genero');
    }
    get gradoEscalaOcupacional(): number {
        return get(this, 'data.gradoEscalaOcupacional');
    }
    get identificadorDistributivo(): number {
        return get(this, 'data.identificadorDistributivo');
    }
    get nombreActividadLaboral(): string {
        return get(this, 'data.nombreActividadLaboral');
    }
    get nombreCanton(): string {
        return get(this, 'data.nombreCanton');
    }
    get nombreDenominacionPuesto(): string {
        return get(this, 'data.nombreDenominacionPuesto');
    }
    get nombreEscalaOcupacional(): string {
        return get(this, 'data.nombreEscalaOcupacional');
    }
    get nombreEstadoPuesto(): string {
        return get(this, 'data.nombreEstadoPuesto');
    }
    get nombreEstadoServidor(): string {
        return get(this, 'data.nombreEstadoServidor');
    }
    get nombreInstitucion(): string {
        return get(this, 'data.nombreInstitucion');
    }
    get nombreModalidadLaboral(): string {
        return get(this, 'data.nombreModalidadLaboral');
    }
    get nombreNivelOcupacional(): string {
        return get(this, 'data.nombreNivelOcupacional');
    }
    get nombreProvincia(): string {
        return get(this, 'data.nombreProvincia');
    }
    get nombreRegimenLaboral(): string {
        return get(this, 'data.nombreRegimenLaboral');
    }
    get nombreUnidadOrganizacional(): string {
        return get(this, 'data.nombreUnidadOrganizacional');
    }
    get numeroDocumento(): string {
        return get(this, 'data.numeroDocumento');
    }
    get partidaIndividual(): number {
        return get(this, 'data.partidaIndividual');
    }
    get porcentajeAportePatronalAdi(): number {
        return get(this, 'data.porcentajeAportePatronalAdi');
    }
    get porcentajeIece(): number {
        return get(this, 'data.porcentajeIece');
    }
    get porcentajeSecap(): number {
        return get(this, 'data.porcentajeSecap');
    }
    get rmuEscalaOcupacional(): number {
        return get(this, 'data.rmuEscalaOcupacional');
    }
    get rmuEscalaOcupacionalMaximo(): number {
        return get(this, 'data.rmuEscalaOcupacionalMaximo');
    }
    get rmuPuesto(): number {
        return get(this, 'data.rmuPuesto');
    }
    get rmuSobrevalorado(): string {
        return get(this, 'data.rmuSobrevalorado');
    }
    get rucPatronal(): string {
        return get(this, 'data.rucPatronal');
    }
    get tipoDocumento(): string {
        return get(this, 'data.tipoDocumento');
    }
}
