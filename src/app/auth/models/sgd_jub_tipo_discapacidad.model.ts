import { Isgd_jub_tipo_discapacidad } from '../interfaces/Isgd_jub_tipo_discapacidad';
import { Isgd_jub_tipo_jubilacion } from '../interfaces/Isgd_jub_tipo_jubilacion';
import { set, get } from 'lodash-es';

export class Sgd_jub_tipo_discapacidad implements Isgd_jub_tipo_discapacidad {
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
    get fkTipjubCod(): Isgd_jub_tipo_jubilacion {
        return get(this, 'data.fkTipjubCod');
    }

    set fkTipjubCod(value: Isgd_jub_tipo_jubilacion) {
        set(this, 'data.fkTipjubCod', value);
    }
}
