import { set, get } from 'lodash-es';
import { IjubAspirante } from '../interfaces/IjubAspirante';

export class JubAspirante implements IjubAspirante {
    constructor(data) {
        set(this, 'data', data);
    }

    get aspCodigo(): number {
        return get(this, 'data.aspCodigo');
    }
    set aspCodigo(value: number) {
        set(this, 'data.aspCodigo', value);
    }
    get aspCedula(): string {
        return get(this, 'data.aspCedula');
    }
    set aspCedula(value: string) {
        set(this, 'data.aspCedula', value);
    }    
    get aspUnidadEdu(): string {
        return get(this, 'data.aspUnidadEdu');
    }
    set aspUnidadEdu(value: string) {
        set(this, 'data.aspUnidadEdu', value);
    }
    
    get aspRegimenLab(): number {
        return get(this, 'data.aspRegimenLab');
    }
    set aspRegimenLab(value: number) {
        set(this, 'data.aspRegimenLab', value);
    }    
    get aspPartidaInd(): number {
        return get(this, 'data.aspPartidaInd');
    }
    set aspPartidaInd(value: number) {
        set(this, 'data.aspPartidaInd', value);
    }    
    get aspPartidaGen(): string {
        return get(this, 'data.aspPartidaGen');
    }
    set aspPartidaGen(value: string) {
        set(this, 'data.aspPartidaGen', value);
    }    
    get aspModalidadCon(): number {
        return get(this, 'data.aspModalidadCon');
    }
    set aspModalidadCon(value: number) {
        set(this, 'data.aspModalidadCon', value);
    }    
    get aspCorreo(): string {
        return get(this, 'data.aspCorreo');
    }
    set aspCorreo(value: string) {
        set(this, 'data.aspCorreo', value);
    }    
    get aspTelefono(): string {
        return get(this, 'data.aspTelefono');
    }
    set aspTelefono(value: string) {
        set(this, 'data.aspTelefono', value);
    }    
    get aspDireccion(): string {
        return get(this, 'data.aspDireccion');
    }
    set aspDireccion(value: string) {
        set(this, 'data.aspDireccion', value);
    }    
    get aspAportacionesPri(): number {
        return get(this, 'data.aspAportacionesPri');
    }
    set aspAportacionesPri(value: number) {
        set(this, 'data.aspAportacionesPri', value);
    }    
    get aspAportacionesPub(): number {
        return get(this, 'data.aspAportacionesPub');
    }
    set aspAportacionesPub(value: number) {
        set(this, 'data.aspAportacionesPub', value);
    }    
    get aspImpedimento(): number {
        return get(this, 'data.aspImpedimento');
    }
    set aspImpedimento(value: number) {
        set(this, 'data.aspImpedimento', value);
    }    
    get tipdisCodigo(): number {
        return get(this, 'data.tipdisCodigo');
    }
    set tipdisCodigo(value: number) {
        set(this, 'data.tipdisCodigo', value);
    }    
    get parCodigo(): number {
        return get(this, 'data.parCodigo');
    }
    set parCodigo(value: number) {
        set(this, 'data.parCodigo', value);
    }    
    get tipdisPorcentaje(): number {
        return get(this, 'data.tipdisPorcentaje');
    }
    set tipdisPorcentaje(value: number) {
        set(this, 'data.tipdisPorcentaje', value);
    }    
    get tipdisNomDiscapacidad(): string {
        return get(this, 'data.tipdisNomDiscapacidad');
    }
    set tipdisNomDiscapacidad(value: string) {
        set(this, 'data.tipdisNomDiscapacidad', value);
    }    
    get aspNumeroRes(): string {
        return get(this, 'data.aspNumeroRes');
    }
    set aspNumeroRes(value: string) {
        set(this, 'data.aspNumeroRes', value);
    }    
    get aspEstado(): number {
        return get(this, 'data.aspEstado');
    }
    set aspEstado(value: number) {
        set(this, 'data.aspEstado', value);
    }    
    get aspNomRegimenLab(): string {
        return get(this, 'data.aspNomRegimenLab');
    }
    set aspNomRegimenLab(value: string) {
        set(this, 'data.aspNomRegimenLab', value);
    }    
    get aspNomModalidadCon(): string {
        return get(this, 'data.aspNomModalidadCon');
    }
    set aspNomModalidadCon(value: string) {
        set(this, 'data.aspNomModalidadCon', value);
    }    
    get aspNomImpedimento(): string {
        return get(this, 'data.aspNomImpedimento');
    }
    set aspNomImpedimento(value: string) {
        set(this, 'data.aspNomImpedimento', value);
    }    
    get tipjubNomJubilacion(): string {
        return get(this, 'data.tipjubNomJubilacion');
    }
    set tipjubNomJubilacion(value: string) {
        set(this, 'data.tipjubNomJubilacion', value);
    }    
    get jubParametro(): any {
        return get(this, 'data.jubParametro');
    }
    set jubParametro(value: any) {
        set(this, 'data.jubParametro', value);
    }    
    get aspFecha(): string {
        return get(this, 'data.aspFecha');
    }
    set aspFecha(value: string) {
        set(this, 'data.aspFecha', value);
    }    
    get listaEstadoTramite(): any {
        return get(this, 'data.listaEstadoTramite');
    }
    set listaEstadoTramite(value: any) {
        set(this, 'data.listaEstadoTramite', value);
    }    

}
