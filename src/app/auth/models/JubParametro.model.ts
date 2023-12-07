import { set, get } from 'lodash-es';
import { IjubParametro } from '../interfaces/IjubParametro';

export class JubParametro implements IjubParametro {
    constructor(data) {
        set(this, 'data', data);
    }
    get parCodigo(): number {
        return get(this, 'data.parCodigo');
    }
    set parCodigo(value: number) {
        set(this, 'data.parCodigo', value);
    }
    get parNombre(): string {
        return get(this, 'data.parNombre');
    }
    set parNombre(value: string) {
        set(this, 'data.parNombre', value);
    }
    get parNemonico(): string {
        return get(this, 'data.parNemonico');
    }
    set parNemonico(value: string) {
        set(this, 'data.parNemonico', value);
    }
    get parEdadMin(): number {
        return get(this, 'data.parEdadMin');
    }
    set parEdadMin(value: number) {
        set(this, 'data.parEdadMin', value);
    }
    get parEdadMax(): number {
        return get(this, 'data.parEdadMax');
    }
    set parEdadMax(value: number) {
        set(this, 'data.parEdadMax', value);
    }
    get parMinAportaciones(): number {
        return get(this, 'data.parMinAportaciones');
    }
    set parMinAportaciones(value: number) {
        set(this, 'data.parMinAportaciones', value);
    }
    get parTiempoServicio(): number {
        return get(this, 'data.parTiempoServicio');
    }
    set parTiempoServicio(value: number) {
        set(this, 'data.parTiempoServicio', value);
    }
    get parEstado(): number {
        return get(this, 'data.parEstado');
    }
    set parEstado(value: number) {
        set(this, 'data.parEstado', value);
    }

    get tipjubCodigo(): number {
        return get(this, 'data.tipjubCodigo');
    }
    set tipjubCodigo(value: number) {
        set(this, 'data.tipjubCodigo', value);
    }
    get jubTipoJubilacion(): any {
        return get(this, 'data.jubTipoJubilacion');
    }
    set jubTipoJubilacion(value: any) {
        set(this, 'data.jubTipoJubilacion', value);
    }
    get tipdisCodigo(): number {
        return get(this, 'data.tipdisCodigo');
    }
    set tipdisCodigo(value: number) {
        set(this, 'data.tipdisCodigo', value);
    }
    get tipdisPorcentaje(): number {
        return get(this, 'data.tipdisPorcentaje');
    }
    set tipdisPorcentaje(value: number) {
        set(this, 'data.tipdisPorcentaje', value);
    }
    get jubTipoDiscapacidad(): any {
        return get(this, 'data.jubTipoDiscapacidad');
    }
    set jubTipoDiscapacidad(value: any) {
        set(this, 'data.jubTipoDiscapacidad', value);
    }
    get desEstado(): any {
        return get(this, 'data.desEstado');
    }
    set desEstado(value: any) {
        set(this, 'data.desEstado', value);
    }

    get tipleyCodigo(): number {
        return get(this, 'data.tipleyCodigo');
    }
    set tipleyCodigo(value: number) {
        set(this, 'data.tipleyCodigo', value);
    }
    get jubTipoLey(): any {
        return get(this, 'data.jubTipoLey');
    }
    set jubTipoLey(value: any) {
        set(this, 'data.jubTipoLey', value);
    }

}
