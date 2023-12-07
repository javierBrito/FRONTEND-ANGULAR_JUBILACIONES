import { set, get } from 'lodash-es';
import { IcatZona } from '../interfaces/IcatZona';

export class CatZona implements IcatZona {
    constructor(data) {
        set(this, 'data', data);
    }
    get zonCodigo(): number {
        return get(this, 'data.zonCodigo');
    }
    get zonCodAd(): string {
        return get(this, 'data.zonCodAd');
    }
    get zonDescripcion(): string {
        return get(this, 'data.zonDescripcion');
    }
    get zonEstado(): number {
        return get(this, 'data.zonEstado');
    }
    get zonFechaCreacion(): Date {
        return get(this, 'data.zonFechaCreacion');
    }
    get zonProvincia(): string {
        return get(this, 'data.zonProvincia');
    }
}
