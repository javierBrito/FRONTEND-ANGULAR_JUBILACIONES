import { set, get } from 'lodash-es';
import { IjubTipoDesvinculacion } from "../interfaces/IjubTipoDesvinculacion";

export class JubTipoDesvinculacion implements IjubTipoDesvinculacion {
    constructor(data) {
        set(this, 'data', data);
    }
    get tipdesCodigo(): number {
        return get(this, 'data.tipdesCodigo');
    }
    set tipdesCodigo(value: number) {
        set(this, 'data.tipdesCodigo', value);
    }
    get tipdesNombre(): string {
        return get(this, 'data.tipdesNombre');
    }
    set tipdesNombre(value: string) {
        set(this, 'data.tipdesNombre', value);
    }
    get tipleyCodigo(): number {
        return get(this, 'data.tipleyCodigo');
    }
    set tipleyCodigo(value: number) {
        set(this, 'data.tipleyCodigo', value);
    }
    get tipdesEstado(): number {
        return get(this, 'data.tipdesEstado');
    }
    set tipdesEstado(value: number) {
        set(this, 'data.tipdesEstado', value);
    }
    get jubTipoLey(): any {
        return get(this, 'data.jubTipoLey');
    }
    set jubTipoLey(value: any) {
        set(this, 'data.jubTipoLey', value);
    }
}
