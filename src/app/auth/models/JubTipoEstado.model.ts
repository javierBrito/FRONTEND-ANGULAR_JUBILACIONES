import { set, get } from 'lodash-es';
import { IjubTipoEstado } from '../interfaces/IjubTipoEstado';

export class JubTipoEstado implements IjubTipoEstado {
    constructor(data) {
        set(this, 'data', data);
    }
    get tipestCodigo(): number {
        return get(this, 'data.tipestCodigo');
    }
    set tipestCodigo(value: number) {
        set(this, 'data.tipestCodigo', value);
    }
    get tipestNombre(): string {
        return get(this, 'data.tipestNombre');
    }
    set tipestNombre(value: string) {
        set(this, 'data.tipestNombre', value);
    }
    get tipestEstado(): number {
        return get(this, 'data.tipestEstado');
    }
    set tipestEstado(value: number) {
        set(this, 'data.tipestEstado', value);
    }
    get desEstado(): any {
        return get(this, 'data.desEstado');
    }
    set desEstado(value: any) {
        set(this, 'data.desEstado', value);
    }
}
