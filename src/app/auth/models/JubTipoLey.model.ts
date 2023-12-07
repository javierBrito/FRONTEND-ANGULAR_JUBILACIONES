import { set, get } from 'lodash-es';
import { IjubTipoLey } from "../interfaces/IjubTipoLey";

export class JubTipoLey implements IjubTipoLey {
    constructor(data) {
        set(this, 'data', data);
    }
    get tipleyCodigo(): number {
        return get(this, 'data.tipleyCodigo');
    }
    set tipleyCodigo(value: number) {
        set(this, 'data.tipleyCodigo', value);
    }
    get tipleyNombre(): string {
        return get(this, 'data.tipleyNombre');
    }
    set tipleyNombre(value: string) {
        set(this, 'data.tipleyNombre', value);
    }
    get tipleyFecha(): string {
        return get(this, 'data.tipleyFecha');
    }
    set tipleyFecha(value: string) {
        set(this, 'data.tipleyFecha', value);
    }
    get tipleyEstado(): number {
        return get(this, 'data.tipleyEstado');
    }
    set tipleyEstado(value: number) {
        set(this, 'data.tipleyEstado', value);
    }
    get desEstado(): any {
        return get(this, 'data.desEstado');
    }
    set desEstado(value: any) {
        set(this, 'data.desEstado', value);
    }
}
