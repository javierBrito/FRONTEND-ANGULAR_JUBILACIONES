import { set, get } from 'lodash-es';
import { Filas, IservicioExterno } from '../interfaces/IservicioExterno';

export class ServicioExterno implements IservicioExterno {
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
