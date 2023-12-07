import { set, get } from 'lodash-es';
import { IjubTipoDiscapacidad } from '../interfaces/IjubTipoDiscapacidad';

export class JubTipoDiscapacidad implements IjubTipoDiscapacidad {
    constructor(data) {
        set(this, 'data', data);
    }
    get tipdisCodigo(): number {
        return get(this, 'data.tipdisCodigo');
    }
    set tipdisCodigo(value: number) {
        set(this, 'data.tipdisCodigo', value);
    }
    get tipdisNombre(): string {
        return get(this, 'data.tipdisNombre');
    }
    set tipdisNombre(value: string) {
        set(this, 'data.tipdisNombre', value);
    }
    get tipdisEstado(): number {
        return get(this, 'data.tipdisEstado');
    }
    set tipdisEstado(value: number) {
        set(this, 'data.tipdisEstado', value);
    }
    get desEstado(): any {
        return get(this, 'data.desEstado');
    }
    set desEstado(value: any) {
        set(this, 'data.desEstado', value);
    }
}
