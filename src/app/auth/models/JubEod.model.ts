import { set, get } from 'lodash-es';
import { IjubEod } from '../interfaces/IjubEod';

export class JubEod implements IjubEod {
    constructor(data) {
        set(this, 'data', data);
    }
    get eodCodigo(): number {
        return get(this, 'data.parCodigo');
    }
    set eodCodigo(value: number) {
        set(this, 'data.parCodigo', value);
    }
    get eodRuc(): string {
        return get(this, 'data.eodRuc');
    }
    set eodRuc(value: string) {
        set(this, 'data.eodRuc', value);
    }
    get eodNombre(): string {
        return get(this, 'data.parNombre');
    }
    set eodNombre(value: string) {
        set(this, 'data.parNombre', value);
    }
    get eodTipo(): string {
        return get(this, 'data.eodTipo');
    }
    set eodTipo(value: string) {
        set(this, 'data.eodTipo', value);
    }
    get eodZona(): string {
        return get(this, 'data.eodZona');
    }
    set eodZona(value: string) {
        set(this, 'data.eodZona', value);
    }
    get eodSubseCoorZona(): string {
        return get(this, 'data.eodSubseCoorZona');
    }
    set eodSubseCoorZona(value: string) {
        set(this, 'data.eodSubseCoorZona', value);
    }
    get eodProvincia(): string {
        return get(this, 'data.eodProvincia');
    }
    set eodProvincia(value: string) {
        set(this, 'data.eodProvincia', value);
    }
    get eodCanton(): string {
        return get(this, 'data.eodCanton');
    }
    set eodCanton(value: string) {
        set(this, 'data.eodCanton', value);
    }
    get eodEstado(): number {
        return get(this, 'data.parEstado');
    }
    set eodEstado(value: number) {
        set(this, 'data.parEstado', value);
    }
}
