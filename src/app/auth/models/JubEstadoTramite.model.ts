import { set, get } from 'lodash-es';
import { IjubEstadoTramite } from "../interfaces/IjubEstadoTramite";

export class JubEstadoTramite implements IjubEstadoTramite {
    constructor(data) {
        set(this, 'data', data);
    }
    get esttraCodigo(): number {
        return get(this, 'data.esttraCodigo');
    }
    set esttraCodigo(value: number) {
        set(this, 'data.esttraCodigo', value);
    }
    get esttraNombre(): string {
        return get(this, 'data.esttraNombre');
    }
    set esttraNombre(value: string) {
        set(this, 'data.esttraNombre', value);
    }
    get esttraFecha(): string {
        return get(this, 'data.esttraFecha');
    }
    set esttraFecha(value: string) {
        set(this, 'data.esttraFecha', value);
    }
    get esttraUsuario(): string {
        return get(this, 'data.esttraUsuario');
    }
    set esttraUsuario(value: string) {
        set(this, 'data.esttraUsuario', value);
    }
    get esttraEstado(): number {
        return get(this, 'data.esttraEstado');
    }
    set esttraEstado(value: number) {
        set(this, 'data.esttraEstado', value);
    }
    get desEstado(): any {
        return get(this, 'data.desEstado');
    }
    set desEstado(value: any) {
        set(this, 'data.desEstado', value);
    }
    get aspCodigo(): number {
        return get(this, 'data.jubAspirante');
    }
    set aspCodigo(value: number) {
        set(this, 'data.jubAspirante', value);
    }
    get jubTipoEstado(): any {
        return get(this, 'data.jubTipoEstado');
    }
    set jubTipoEstado(value: any) {
        set(this, 'data.jubTipoEstado', value);
    }
}
