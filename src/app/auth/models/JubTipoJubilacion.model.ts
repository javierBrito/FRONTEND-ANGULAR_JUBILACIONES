import { set, get } from 'lodash-es';
import { IjubTipoJubilacion } from '../interfaces/IjubTipoJubilacion';

export class JubTipoJubilacion implements IjubTipoJubilacion {
    constructor(data) {
        set(this, 'data', data);
    }
    get tipjubCodigo(): number {
        return get(this, 'data.tipjubCodigo');
    }
    set tipjubCodigo(value: number) {
        set(this, 'data.tipjubCodigo', value);
    }
    get tipjubNombre(): string {
        return get(this, 'data.tipjubNombre');
    }
    set tipjubNombre(value: string) {
        set(this, 'data.tipjubNombre', value);
    }
    get tipjubEstado(): number {
        return get(this, 'data.tipjubEstado');
    }
    set tipjubEstado(value: number) {
        set(this, 'data.tipjubEstado', value);
    }
    get desEstado(): any {
        return get(this, 'data.desEstado');
    }
    set desEstado(value: any) {
        set(this, 'data.desEstado', value);
    }
}
