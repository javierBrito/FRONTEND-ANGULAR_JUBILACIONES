import { Filas, ImineducMdtImpedimento } from './../interfaces/ImineducMdtImpedimento';
import { set, get } from 'lodash-es';
export class MineducMdtImpedimento implements ImineducMdtImpedimento {
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
