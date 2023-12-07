import { Isgd_jub_tipo_jubilacion } from '../interfaces/Isgd_jub_tipo_jubilacion';
import { set, get } from 'lodash-es';

export class Sgd_jub_tipo_jubilacion implements Isgd_jub_tipo_jubilacion{

	constructor(data) {
        set(this, 'data', data);
	}

    get tipJubCod(): number {
        return get(this, 'data.tipJubCod');
    }

    set tipJubCod(value: number) {
        set(this, 'data.tipJubCod', value);
    }

    get tipJubNombre(): string {
        return get(this, 'data.tipJubNombre');
    }
    set tipJubNombre(value: string) {
        set(this, 'data.tipJubNombre', value);
    }

    get tipJubEstado(): number {
        return get(this, 'data.tipJubEstado');
    }
    set tipJubEstado(value: number) {
        set(this, 'data.tipJubEstado', value);
    }


}
