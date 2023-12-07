import { Filas, ImspDiscapacidad } from './../interfaces/ImspDiscapacidad';
import { set, get } from 'lodash-es';
export class MspDiscapacidad implements ImspDiscapacidad {

    constructor(data) {
        set(this, 'data', data);
    }
    get nombre(): string {
        return get(this, 'data.nombre');
    }
    get filas(): Filas {
        return get(this, 'data.filas');
    }
}
